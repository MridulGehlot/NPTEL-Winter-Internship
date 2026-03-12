const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
const { MongoDBAtlasVectorSearch } = require("@langchain/mongodb");
const { MongoClient } = require("mongodb");
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");



let collection;
// Toggle embeddings via env var. Default: disabled for reliable demos.
const ENABLE_EMBEDDINGS = process.env.ENABLE_EMBEDDINGS === 'true';
const initVectorDB = async () => {
    if (process.env.MONGO_URI && process.env.MONGO_URI !== 'your_mongodb_cluster_uri_here') {
        try {
            const client = new MongoClient(process.env.MONGO_URI);
            await client.connect();
            const db = client.db("nitisetu");
            collection = db.collection("scheme_vectors");
            console.log("MongoDB Vector Search collection linked.");
        } catch (err) {
            console.error("Vector DB init error:", err);
        }
    }
};

initVectorDB();

const processPdf = async (filePath, schemeId) => {
    if (!collection) throw new Error("MongoDB Vector DB not initialized");

    try {
        // Load and parse PDF
        const loader = new PDFLoader(filePath);
        const docs = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const splitDocs = await textSplitter.splitDocuments(docs);

        // Normalize documents into plain objects and include pageContent for text search
        const docsWithMetadata = splitDocs.map(doc => {
            const pageContent = doc.pageContent || doc.text || doc.content || '';
            const metadata = { ...doc.metadata, schemeId: schemeId.toString() };
            return { metadata, pageContent, text: pageContent };
        });

        // Always store the parsed chunks so text-search retrieval works for demos.
        try {
            await collection.insertMany(docsWithMetadata);
            console.log(`✓ PDF processed and stored for scheme ${schemeId} (text search ready)`);
        } catch (dbErr) {
            console.error('Failed to insert parsed PDF chunks into DB:', dbErr.message);
        }

        // Optional: try to create embeddings only if explicitly enabled
        if (ENABLE_EMBEDDINGS) {
            try {
                const embeddings = new GoogleGenerativeAIEmbeddings({ apiKey: process.env.GEMINI_API_KEY });
                await MongoDBAtlasVectorSearch.fromDocuments(docsWithMetadata, embeddings, {
                    collection,
                    indexName: "vector_index",
                    textKey: "text",
                    embeddingKey: "embedding",
                });
                console.log(`✓ PDF processed and embedded successfully for scheme ${schemeId}`);
            } catch (embErr) {
                console.warn(`⚠ Embedding (optional) failed: ${embErr.message}`);
            }
        }

        return { success: true, chunks: splitDocs.length };
    } catch (err) {
        console.error("Error processing PDF:", err.message);
        throw new Error(`PDF processing failed: ${err.message}`);
    }
};

const checkEligibility = async (profileData, schemeId) => {
    if (!collection) throw new Error("MongoDB Vector DB not initialized");

    try {
        // Ensure API key present (LLM used for reasoning)
        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is not set in environment");
            return {
                isEligible: null,
                reasoning: "Server configuration error: GEMINI_API_KEY not found.",
                citation: "N/A",
                missingInfo: "API Key",
                requiredDocuments: [],
                status: "error"
            };
        }

        // If there are no stored documents for this scheme, tell the frontend to upload PDF
        const docCount = await collection.countDocuments({ schemeId: schemeId.toString() });
        if (docCount === 0) {
            return {
                isEligible: null,
                reasoning: "Scheme document not yet uploaded. Please upload the scheme PDF in Admin Upload to check eligibility.",
                citation: "N/A",
                missingInfo: "Scheme guidelines document",
                requiredDocuments: [],
                status: "pending_document"
            };
        }

        // Create LLM for reasoning (we avoid embedding calls if possible)
        const llm = new ChatGoogleGenerativeAI({ modelName: "gemini-1.5-flash", apiKey: process.env.GEMINI_API_KEY, temperature: 0 });

        const queryText = `${profileData.state || ''} ${profileData.district || ''} ${profileData.landHolding || ''} ${Array.isArray(profileData.cropType) ? profileData.cropType.join(' ') : (profileData.cropType || '')} ${profileData.socialCategory || ''}`.trim();

        // Primary retrieval: MongoDB text/regex search on stored pageContent (reliable demo path)
        const keywords = [profileData.state, profileData.district]
            .concat(Array.isArray(profileData.cropType) ? profileData.cropType : [profileData.cropType])
            .concat([profileData.socialCategory])
            .filter(Boolean);
        const safeKeywords = keywords.map(k => k.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'));
        const regex = new RegExp(safeKeywords.join('|'), 'i');
        let docs = await collection.find({ schemeId: schemeId.toString(), pageContent: { $regex: regex } }).limit(6).toArray();
        let relevantDocs = docs.map(d => ({ metadata: d.metadata || {}, pageContent: d.pageContent || d.text || '' }));

        // Optional: if embeddings are enabled, try vector retrieval and override results if successful
        if (ENABLE_EMBEDDINGS) {
            try {
                const embeddings = new GoogleGenerativeAIEmbeddings({ apiKey: process.env.GEMINI_API_KEY });
                const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
                    collection,
                    indexName: "vector_index",
                    textKey: "text",
                    embeddingKey: "embedding",
                });
                const retriever = vectorStore.asRetriever({
                    k: 6,
                    filter: { preFilter: { schemeId: { $eq: schemeId.toString() } } }
                });
                const vecRes = await retriever.invoke(queryText);
                if (Array.isArray(vecRes) && vecRes.length > 0) {
                    relevantDocs = vecRes.map(d => ({ metadata: d.metadata || {}, pageContent: d.pageContent || d.text || '' }));
                }
            } catch (vecErr) {
                console.warn('Vector retrieval (optional) failed, keeping text-search results:', vecErr.message);
            }
        }

        if (!relevantDocs || relevantDocs.length === 0) {
            return {
                isEligible: null,
                reasoning: "No relevant excerpts found for this scheme. Please upload a detailed scheme PDF.",
                citation: "N/A",
                missingInfo: "Scheme guidelines document",
                requiredDocuments: [],
                status: "pending_document"
            };
        }

        const contextText = relevantDocs.map(doc => `Page ${doc.metadata.loc?.pageNumber || 'Unknown'}: ${doc.pageContent}`).join("\\n\\n");

        const systemPrompt = `You are Niti-Setu, an AI consultant for Indian agricultural schemes.\\nBased ONLY on the following official scheme document excerpts, determine if the farmer is eligible.\\nFarmer Profile:\\n- State: ${profileData.state}\\n- District: ${profileData.district}\\n- Land Holding: ${profileData.landHolding} acres\\n- Crop Types: ${Array.isArray(profileData.cropType) ? profileData.cropType.join(', ') : profileData.cropType}\\n- Social Category: ${profileData.socialCategory}\\n\\nDocument Excerpts:\\n${contextText}\\n\\nRespond with a JSON object ONLY in this structure: {\\n  "isEligible": true/false,\\n  "reasoning": "Short 1-2 sentence explanation",\\n  "citation": "Exact quote from document supporting decision, include page number",\\n  "missingInfo": null or "string",\\n  "requiredDocuments": ["Doc 1", "Doc 2"],\\n  "status": "completed"\\n}`;

        const response = await llm.invoke(systemPrompt);

        // Normalize response text
        let text = response;
        if (response && typeof response === 'object') {
            text = response.content || response.text || response.output_text || JSON.stringify(response);
        }
        if (typeof text !== 'string') text = String(text);
        text = text.replace(/```json\\n?/g, '').replace(/```\\n?/g, '').trim();
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) text = text.substring(jsonStart, jsonEnd + 1);

        const result = JSON.parse(text);
        result.status = result.status || 'completed';
        return result;

    } catch (err) {
        console.error('Error in checkEligibility:', err.message);
        return {
            isEligible: null,
            reasoning: 'Scheme document not yet uploaded or system error.',
            citation: 'N/A',
            missingInfo: 'Scheme guidelines document',
            requiredDocuments: [],
            status: 'pending_document'
        };
    }
};

module.exports = { processPdf, checkEligibility };

require('dotenv').config();
const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String },
    description: { type: String },
    pdfPath: { type: String },
    createdAt: { type: Date, default: Date.now }
});
const Scheme = mongoose.model('SchemeTest', schemeSchema);

async function runTest() {
    try {
        console.log("Connecting to Mongoose...");
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log("Mongoose connected. State:", mongoose.connection.readyState);

        console.log("Attempting to insert document...");
        const newScheme = new Scheme({ name: "Test Scheme", description: "Test Desc", pdfPath: "dummy.pdf" });
        await newScheme.save();
        console.log("Document saved successfully!");

        await mongoose.disconnect();
    } catch (err) {
        console.error("Test failed:", err);
    }
}

runTest();

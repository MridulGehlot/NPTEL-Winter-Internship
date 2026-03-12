const { spawn } = require('child_process');
const fs = require('fs');

async function runLocalE2ETest() {
    console.log("Starting server...");
    const serverProcess = spawn('node', ['server.js'], { stdio: 'pipe' });

    serverProcess.stdout.on('data', (data) => console.log(`[SERVER]: ${data}`));
    serverProcess.stderr.on('data', (data) => console.error(`[SERVER_ERR]: ${data}`));

    // Wait for server to start
    await new Promise(r => setTimeout(r, 4000));

    console.log("Creating dummy PDF...");
    fs.writeFileSync('dummy.pdf', 'dummy content');

    console.log("Sending upload request to localhost:5000/api/schemes/upload...");
    try {
        const formData = new FormData();
        formData.append("name", "E2E Test Scheme");
        formData.append("description", "Testing express timeout");
        formData.append("pdf", new Blob([fs.readFileSync('dummy.pdf')]), "dummy.pdf");

        const res = await fetch('http://localhost:5000/api/schemes/upload', {
            method: 'POST',
            body: formData
        });

        const json = await res.json();
        console.log("API Response:", json);
    } catch (e) {
        console.error("API Fetch Error:", e);
    } finally {
        console.log("Shutting down server...");
        serverProcess.kill();
    }
}

runLocalE2ETest();

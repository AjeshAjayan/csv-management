import { generateResponseFormat } from "../utils/generateResponseFormat.js";
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Convert the worker file URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerFilePath = resolve(__dirname, '../workers/parseCSV.worker.js');

export const csvUploadController = (req, res) => {
    const worker = spawn('node', [workerFilePath], {
        stdio: ['pipe', 'pipe', 'pipe'] // Ensure stdio is set to pipe
    });

    // worker.stdout.on('data', (data) => {
    //     console.log(`Worker stdout: ${data}`);
    // });
    
    // worker.stderr.on('data', (data) => {
    //     console.error(`Worker stderr: ${data}`);
    // });
    
    worker.on('close', (code) => {
        console.log(`Worker process exited with code ${code}`);
    });

    // worker.onerror = (err) => {
    //     console.error("Worker error:", err);
    // }

    // worker.onmessage = (event) => {
    //     if (event?.data?.error) {
    //         // notify error to client
    //     } else {
    //         // notify client
    //     }
    // }
    
    req.pipe(worker.stdin);

    res.status(200).send(
        generateResponseFormat(
            'File is being processed.',
            200,
            'success',
            null,
        )
    );
}

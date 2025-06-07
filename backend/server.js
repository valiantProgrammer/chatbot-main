import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(cors());
app.use(express.json());

app.post('/api', (req, res) => {
  const userMessage = req.body.message;
  console.log("Message received from client:", userMessage);

  const python = spawn('python', ['classifier.py']);

  let resultData = '';
  let errorData = '';

  // Collect Python stdout
  python.stdout.on('data', (data) => {
    resultData += data.toString();
  });

  // Collect Python stderr
  python.stderr.on('data', (data) => {
    errorData += data.toString();
  });

  // When Python process finishes
  python.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python process exited with code ${code}`);
      console.error(errorData);
      return res.status(500).json({ error: 'Python script failed', details: errorData });
    }

    const category = resultData.trim();
    console.log("Predicted category:", category);
    res.send(category);
  });

  // Send input text to Python stdin
  python.stdin.write(userMessage);
  python.stdin.end(); // Close stdin so Python can finish reading
});

// Serve static files from dist (Vite build output)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start server


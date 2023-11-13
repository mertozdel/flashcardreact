const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const { ImageAnnotatorClient } = require('@google-cloud/vision');
const {Translate} = require('@google-cloud/translate').v2;

const app = express();
app.use(cors()); 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const translate = new Translate();
const storage = multer.memoryStorage();
const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 },storage: storage });
const client = new ImageAnnotatorClient();

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  try {
    const [result] = await client.labelDetection({
      image: { content: req.file.buffer },
    });

    const labels = result.labelAnnotations;

    const imageBase64 = req.file.buffer.toString('base64');

    res.json({ labels: labels, image: imageBase64 });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
  
});
async function translateText(text, targetLanguage) {
  try {
    let [translation] = await translate.translate(text, targetLanguage);
    return translation;
  } catch (error) {
    console.error("Error in translation:", error);
    throw error;
  }
}

// Endpoint for translation
app.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;
  if (!targetLanguage) {
    return res.status(400).send('Target language not specified.');
  }

  try {
    const translatedText = await translateText(text, targetLanguage);
    res.json({ translatedText });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 


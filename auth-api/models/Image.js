const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageData: String, // Base64 string or URL of the image
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  }, // Reference to the user who uploaded the image
  labels: [{ 
    description: String, 
    score: Number 
  }], // Labels detected in the image
  uploadDate: { 
    type: Date, 
    default: Date.now 
  } // Date of upload
});

module.exports = mongoose.model('Image', imageSchema);

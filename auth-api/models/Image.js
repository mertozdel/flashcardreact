const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageData: String, 
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  }, 
  labels: [{ 
    description: String, 
    score: Number 
  }],
  uploadDate: { 
    type: Date, 
    default: Date.now 
  } 
});

module.exports = mongoose.model('Image', imageSchema);

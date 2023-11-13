const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const multer = require('multer'); 

const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/User');
const Image = require('./models/Image');

const { authenticate, authorize } = require('./middleware/auth');



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myAuthDB')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const storage = multer.memoryStorage();
const upload = multer({ limits: { fileSize: 50 * 1024 * 1024,    fieldSize: 10 * 1024 * 1024  
},storage: storage });
// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({ token, role: user.role }); // Include role in the response
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.delete('/api/users/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

app.put('/api/users/:id', authenticate, authorize(['admin']), async (req, res) => {
  const { email, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { email, role }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


app.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  const { userId } = req.user; 
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const newImage = new Image({
      imageData: req.file.buffer.toString('base64'),
      user: req.user.id,
    });

    await newImage.save();


    res.status(201).json({ 
      message: 'Image uploaded successfully',
      imageId: newImage._id,
      uploadDate: newImage.uploadDate
    });

  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).send('Error saving image.');
  }
});



app.get('/my-images', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const images = await Image.find({ user: userId }); 
    res.json(images);
  } catch (error) {
    res.status(500).send('Error fetching images.');
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; 
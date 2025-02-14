const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// CORS সেট করা
app.use(cors());

// Static ফোল্ডার সেট করা
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// "/" রুটকে index.html এ রিডাইরেক্ট করো
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/index.html'));
// });

// Multer সেটআপ (ইমেজ আপলোডের জন্য)
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // ইউনিক নাম দেওয়া হচ্ছে
    }
});

const upload = multer({ storage });

// ইমেজ আপলোড API
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // ইমেজের URL জেনারেট করা
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

// সার্ভার চালু করা
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

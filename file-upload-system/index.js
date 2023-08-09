const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 8080;

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).single('file');

// Set up static files directory
app.use(express.static('public'));

// Serve HTML form for file upload
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send('An error occurred: ' + err.message);
    } else {
      if (!req.file) {
        res.send('No file selected.');
      } else {
        res.send('File uploaded successfully.');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

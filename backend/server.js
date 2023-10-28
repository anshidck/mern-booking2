const express = require('express');
const dotenv = require('dotenv');
const PORT = 5000 || process.env.PORT
const connectDB = require('./config/db')
const userRouter = require('./router/userRouter');
const placeRouter = require('./router/placeRouter')
const bookingRouter = require('./router/bookingRouter')
const imageDownloader = require('image-downloader');
const cors = require('cors')
const multer = require('multer');
const fs = require('fs');
const path= require('path')
const app = express();
dotenv.config()
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(__dirname + '/uploads/'));
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}));

app.post('/api/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/'+ newName ,
    });
    res.json(newName);
});

const photosMiddleware = multer({ dest: __dirname + '/uploads/'});
app.post('/api/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newFileName = Date.now() + '.' + ext;
        const newPath = req.files[i].destination + newFileName;
        fs.renameSync(req.files[i].path, newPath);
        uploadedFiles.push(newFileName);
    }
    res.json(uploadedFiles);
});

app.use('/api/auth', userRouter);
app.use('/api/place', placeRouter)
app.use('/api/booking', bookingRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(PORT, () => {
    console.log(`server started: ${PORT}`)
})
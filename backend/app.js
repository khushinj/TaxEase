const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const Grid = require('gridfs-stream');
const { MongoClient } = require('mongodb');
const path = require('path');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));

const port = 5000;
let gfs;
const secret_key = process.env.secret_key;

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to Database");
        const conn = mongoose.connection;
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
    })
    .catch((error) => {
        console.log("Error in connecting", error);
    });


const userDetails = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const userData = mongoose.model('userData', userDetails);


const documentDetails = mongoose.Schema({
    userEmail: { type: String, required: true },
    documentName: { type: String, required: true },
    documentType: {
        type: String,
        enum: ['PDF'],
        required: true
    },
    file: { type: Buffer, required: true },
    dateUploaded: { type: Date, default: Date.now }
});

const documentData = mongoose.model('documentData', documentDetails);


app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userData.findOne({ email });

        if (user) {
            res.status(400).send({ message: "User already exists" });
        }

        const newUser = new userData({ name, email, password });
        await newUser.save();
        res.status(200).send({ message: "Signed Up successfully!", newUser });
    } catch (err) {
        console.log("Error while signing up:", err);
        res.status(500).send({ message: "Internal server error" });
    }
});


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userData.findOne({ email });

        if (!user) {
            res.status(400).send({ message: "Email does not exist!" });
            return;
        }

        if (password !== user.password) {
            res.status(400).send({ message: "Incorrect password" });
            return;
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, secret_key, { expiresIn: '5h' });
        res.status(200).json({ message: "Login successful!", token, loggedIn: "true" });
    } catch (err) {
        console.log("Error while logging in:", err);
        res.status(500).send({ message: "Internal server error" });
    }
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post('/upload-document', upload.single('document'), async (req, res) => {
    try {
        const { userEmail, documentName, documentType } = req.body;
        const file = req.file;

        const allowedTypes = ['PDF'];
        if (!allowedTypes.includes(documentType)) {
            return res.status(400).send({ message: 'Invalid document type. Only PDF allowed.' });
        }

        const newDocument = new documentData({
            userEmail,
            documentName,
            documentType,
            file: file.buffer,
        });

        await newDocument.save();
        res.status(200).send({ message: "Document uploaded successfully!", newDocument });
    } catch (err) {
        console.log("Error while uploading document:", err);
        res.status(500).send({ message: "Internal server error" });
    }
});


app.post('/fetch-documents', async (req, res) => {
    try {
        const { userEmail } = req.body;

        if (!userEmail) {
            return res.status(400).send({ message: 'Email is required' });
        }

        const documents = await documentData.find({ userEmail });

        if (documents.length === 0) {
            return res.status(404).send({ message: 'No documents found for this user' });
        }

        res.status(200).send({ message: 'Documents fetched successfully', documents });
    } catch (err) {
        console.log("Error while fetching documents:", err);
        res.status(500).send({ message: 'Internal server error' });
    }
});



app.get('/download-document/:id', async (req, res) => {
    try {
        const documentId = req.params.id;

        const document = await documentData.findById(documentId);

        if (!document) {
            return res.status(404).send({ message: 'Document not found' });
        }

        const fileType = document.documentType.toLowerCase();
        const fileName = document.documentName;

        const mimeTypeMap = {
            pdf: 'application/pdf',
        };

        const contentType = mimeTypeMap[fileType] || 'application/octet-stream';

        res.set('Content-Type', contentType);
        res.set(
            'Content-Disposition',
            `attachment; filename="${fileName}.${fileType}"`
        );


        res.send(document.file);
    } catch (err) {
        console.error('Error downloading document:', err);
        res.status(500).send({ message: 'Internal server error' });
    }
});


app.delete('/delete-document/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const document = await documentData.findByIdAndDelete(id);

        if (!document) {
            return res.status(404).send({ message: "Document not found" });
        }

        res.status(200).send({ message: "Document deleted successfully" });
    } catch (err) {
        console.log("Error deleting document:", err);
        res.status(500).send({ message: "Internal server error" });
    }
});






app.listen(port, () => {
    console.log(`Server listening onn ${port}`);
});

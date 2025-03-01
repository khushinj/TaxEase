const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const Grid = require('gridfs-stream');
const { MongoClient } = require('mongodb');
const path = require('path');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcryptjs');
require('dotenv').config();
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: [`${process.env.FRONTEND_URL}`, 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.options('*', cors()); // Handles preflight requests for all routes

app.use(express.urlencoded({ extended: true }));

const notificationSchema = mongoose.Schema({
    userEmail: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

app.get('/notifications/:userEmail', async (req, res) => {
    try {
        const { userEmail } = req.params;
        const notifications = await Notification.find({ userEmail });
        res.status(200).send({ message: "Notifications fetched", notifications });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});

// Create a notification
app.post('/notifications', async (req, res) => {
    try {
        const { userEmail, message } = req.body;
        const newNotification = new Notification({ userEmail, message });
        await newNotification.save();
        res.status(200).send({ message: "Notification created", newNotification });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});

// Mark notification as read
app.patch('/notifications/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Notification.findByIdAndUpdate(id, { isRead: true });
        res.status(200).send({ message: "Notification marked as read" });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});

// Delete notification
app.delete('/notifications/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Notification.findByIdAndDelete(id);
        res.status(200).send({ message: "Notification deleted" });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});



const port = process.env.PORT || 5000;
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



setInterval(() => {
    fetch(`${process.env.BACKEND_URL}`)
        .then(() => console.log("Keeping backend alive"))
        .catch((err) => console.error("Keep-alive error:", err));
}, 30 * 60 * 1000);

const userDetails = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const userData = mongoose.model('userData', userDetails);

app.get('/u', async (req, res) => {
    try {
        const users = await userData.find({}, { password: 0 });

        if (users.length === 0) {
            return res.status(404).send({ message: "No users found" });
        }

        res.status(200).send({ message: "Users fetched successfully", users });
    } catch (err) {
        console.log("Error while fetching users:", err);
        res.status(500).send({ message: "Internal server error" });
    }
});



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
            return res.status(400).send({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        const newUser = new userData({ name, email, password: hashedPassword });
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
            return res.status(400).send({ message: "Email does not exist!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Incorrect password" });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, secret_key, { expiresIn: '5h' });
        res.status(200).json({ message: "Login successful!", token });
    } catch (err) {
        console.log("Error while logging in:", err);
        res.status(500).send({ message: "Internal server error" });
    }
});



const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send({ message: "Access Denied" });

    jwt.verify(token, secret_key, (err, user) => {
        if (err) return res.status(403).send({ message: "Invalid Token" });
        req.user = user;
        next();
    });
};


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post('/upload-document', authenticateToken, upload.single('document'), async (req, res) => {
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


app.get('/', (req, res) => {
    res.json("hi");
})



app.listen(port, () => {
    console.log(`Server listening onn ${port}`);
});

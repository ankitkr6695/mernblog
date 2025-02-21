

const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const user = require('./models/user');
const Post = require('./models/post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs');
require('dotenv').config()

app.use(cors({ credentials: true, origin: `${process.env.APP_URL}` }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
mongoose.connect(process.env.MONGODB_URL)

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;
app.post('/register', async (req, res) => {
    const { Username, Password } = req.body;
    try {
        const userdoc = await user.create(
            {
                Username,
                Password: bcrypt.hashSync(Password, salt)
            });
        res.json(userdoc);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }

});
app.post('/login', async (req, res) => {
    const { Username, Password } = req.body;
    const userDoc = await user.findOne({ Username })
    const passOk = bcrypt.compareSync(Password, userDoc.Password)
    if (passOk) {
        jwt.sign({ Username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json({
                id: userDoc._id,
                Username,
            });
        })

    }
    else {
        res.status(400).json("wrong Credential")
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id
        });
        res.json(postDoc);

    })



})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('Not Authorized');
        }
        // await postDoc.update({
        //     title,
        //     summary,
        //     content,
        //     cover: newPath? newPath : postDoc.cover
        // })
        // res.json(postDoc)

        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;  // ✅ Ensure content is updated
        if (newPath) postDoc.cover = newPath;

        await postDoc.save();
        res.json(postDoc);


    })
})

app.get('/post', async (req, res) => {
    res.json(await Post.find().populate('author', ['Username']).sort({ createdAt: -1 }).limit(20)
    );

})

app.get('/post/:id', async (req, res) => {
    res.json(await Post.findById(req.params.id).populate('author', ['Username']));
})
app.listen(process.env.PORT);



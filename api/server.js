const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const port = 3000;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    const homePage = path.resolve('public/index.html');
    res.sendFile(homePage, (err) => {
        if (err) {
            res.status(500).send('Server: Error loading the home page.');
        }
    });
});

app.get('/library', (req, res) => {
    const libraryPage = path.resolve('public/library.html');
    res.sendFile(libraryPage, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server: Error loading the library page.');
        }
    });
});

app.get('/privacy', (req, res) => {
    const privacyPage = path.resolve('public/privacy.html');
    res.sendFile(privacyPage, (err) => {
        if (err) {
            res.status(500).send('Server: Error loading the privacy page.');
        }
    });
});

app.get('/api/books', (req, res) => {
    fs.readFile(path.resolve('db.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Server: Error getting books from database.');
        } else {
            const books = JSON.parse(data).books;
            res.json(books);
        }
    });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;

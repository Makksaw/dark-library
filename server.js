const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/books', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'db.json'), 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).json({error: 'Could not read database file'})
        }
        const books = JSON.parse(data).books
        res.json(books)
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
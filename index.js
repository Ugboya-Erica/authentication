const express = require('express');
const app = express();
const PORT = 3000;
const localhost = '127.0.0.1'


//HTTP authentication middleware
app.use((req, res, next) => {
    if(!req.get('Authorization')){
        const err = new Error('Not Authenticated!')
        res.status(401).set('WWW-Authenticate', 'Basic')
        next(err)
    }
    else{
        const info = Buffer.from(req.get('Authorization').split(' ')[1], 'base64')
        // <Buffer 75 73 65 72 6e 61 6d 65 3a 70 61 73 73 77 6f 72 64>
        .toString()
        .split(':')

        var username = info[0]
        var password = info[1]
        
        // for invalid info
        if(!(username === 'erica' && password === 'ericaaa')){
            const err = new Error('Not Authenticated!')
            res.status(401).set('WWW-Authenticate', 'Basic')
            next(err)
        } 
        res.status(200)
        next()
    }
})

// Endpoints
app.get('/', (req, res) => {
    res.send('This route is protected with Basic HTTP Authentication, input the correct details!')
})

//GET, POST, PUT, PATCH, DELETE for authors route
app.get('/books', (req, res) => {
    const books = {
        book1: "A Tale Of Two Cities",
        book2: "The Little Prince",
        book3: "Harry potter and the Philosopher's Stone",
        book4: "And Then There Were None",
        book5: "Dream Of The Red Chamber",
        book6: "The Hobbit"
    }

    res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(books));
})

app.post('/books', (req, res) => {
    res.send('Hello! Post')
    res.end()
})

app.put('/books', (req, res) => {
    res.send('Hey Put')
    res.end()
})

app.patch('/books', (req, res) => {
    res.send('Hola Patch')
    res.end()
})

app.delete('/books', (req, res) => {
    res.send('Hola, Books have been Deleted')
})

//GET, POST, PUT, PATCH, DELETE
app.get('/authors', (req, res) => {
    const author = {
        "A Tale Of Two Cities": "Charles Dickens",
        "The Little Prince": "Antoine de Saint-Exupery",
        "Harry potter and the Philosopher's Stone": "J.K Rowling",
        "And Then There Were None": "Agatha Christie",
        "Dream Of The Red Chamber": "Cao Xueqin",
        "The Hobbit": "J. R. R. Tolkien"
    }
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify(author));
})

app.post('/authors', (req, res) => {
    res.send('Hello! This is from the Authors of those books'), 
    res.end()
})

app.put('/authors', (req, res) => {
    res.send('Hey, Enjoy your day')
    res.end()
})

app.patch('/authors', (req, res) => {
    res.send('Hola Patch, como se llama?')
    res.end()
})

app.delete('/authors', (req, res) => {
    res.send('Hola, me llama Erica. Lo siento, All Authors have been Deleted')
})


// Run the server
app.listen(PORT, localhost, () => {
    console.log(`Listening to port at ${localhost}:${PORT}`)
})

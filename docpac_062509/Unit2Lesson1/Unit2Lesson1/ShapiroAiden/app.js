const express = require('express');
const app = express();
const dotenv = require('dotenv')
const http = require('http')
const fs = require('fs')
const { URL } = require('node:url')
dotenv.config()
const PORT = process.env.PORT

app.listen(PORT)
app.use((req, res, next) => {
    console.log('request received:', req.method, req.url)
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

/*require('dotenv').config()
const http = require('http');
const name = process.env.APP_NAME
const port = process.env.PORT
const fs = require('fs');
const server = http.createServer((req, res) => {
    //res.writeHead(200, { 'Content-Type': 'text/plain' });

    //res.end('Hello, World!\n');
    console.log(`URL: ${req.url}`, `Method: ${req.method}`, `Listening on port: ${port}`)
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.write('Plain text response')
        res.end()
    }
    else if (req.url == '/form' && req.method == 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log('Raw form data:', body);


            const formData = new URLSearchParams(body);
            const studentName = formData.get('studentName');
            const studentEmail = formData.get('studentEmail');
            const projectSize = formData.get('studentPTS');
            const projectType = formData.get('projectType');
            const technologies = formData.getAll('technologies'); // Note: getAll for multiple checkboxes!
            const contactPerm = formData.get('contactPermission');
            const expLevel = formData.get('experienceLevel');
            const projectDesc = formData.get('projectDescription');



            if (!studentName || studentName.trim() === '') {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.write('<h1>Invalid Submission</h1>');
                res.write('<p>Name is required and cannot be blank.</p>');
                res.write('<a href="/form">Go back to form</a>');
                res.end();
                return;
            }


            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Form Submitted Successfully!</h1>');
            res.write(`<p><strong>Name:</strong> ${studentName}</p>`);
            res.write(`<p><strong>Email:</strong> ${studentEmail || 'Not provided'}</p>`);
            res.write(`<p><strong>Preferred Project Size:</strong> ${projectSize || 'Not provided'}</p>`);
            res.write(`<p><strong>Project Type:</strong> ${projectType || 'Not selected'}</p>`);
            res.write(`<p><strong>Technologies:</strong> ${technologies.length > 0 ? technologies.join(', ') : 'None selected'}</p>`);
            res.write(`<p><strong>Contact Permission:</strong> ${contactPerm ? 'Yes' : 'No'}</p>`);
            res.write(`<p><strong>Experience Level:</strong> ${expLevel || 'Not selected'}</p>`);
            res.write(`<p><strong>Project Description:</strong> ${projectDesc || 'Not provided'}</p>`);
            res.write('<a href="/form">Submit another response</a>');
            res.end();
        });
    }

    else if (req.url.startsWith('/query') && req.method == 'GET') {
        const parsedUrl = new URL(req.url, `http://localhost:${port}`);
        const message = parsedUrl.searchParams.get('message');

        if (!message) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.write('Missing message parameter. Use: /query?message=YourMessage');
            res.end();
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(`You sent: ${message}`);
        res.end();
    }

    else if (req.url == '/form' && req.method == 'GET') {
        fs.readFile('./pages/form.html', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file: ', err)
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.write('Error loading form')
                res.end()
                return
            }

            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(data)
            res.end()
        })

    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.write('The requested page was not found.')
        res.end()
    }




});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);

});
*/
require('dotenv').config()
const express = require('express');
const name = process.env.APP_NAME;
const port = process.env.PORT;
const app = express();

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Hello World from Express!');

});





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});








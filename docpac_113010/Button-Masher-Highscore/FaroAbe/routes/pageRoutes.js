const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Homepage',
        heading: 'Welcome to My Express App',
        message: 'EJS is SO Awesome!',
        subtitle: 'Learning dynamic templates',
        features: [
            { name: 'Express Routing', description: 'Organized routes in separate modules' },
            { name: 'EJS Templates', description: 'Dynamic server-side rendering' },
            { name: 'Partials', description: 'Reusable header and footer components' },
            { name: 'Form Handling', description: 'Processing user input safely' }
        ]
    });
});

module.exports = router;
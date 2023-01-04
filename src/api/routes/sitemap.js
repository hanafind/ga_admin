const express = require('express');
const router = express.Router();

const fs = require('fs');

const SitemapGenerator = require('sitemap-generator');

router.get('/', async (req, res, next) => {
    res.set('Content-Type', 'text/xml');
    res.send(fs.readFileSync('./sitemap.xml', 'utf8'));
});

router.post('/', async (req, res, next) => {
    // create generator
    const generator = SitemapGenerator('http://141.164.57.30:4000/', {
        stripQuerystring: false,
        lastMod: true,
        changeFreq: 'daily'
    });
   
    // register event listeners
    generator.on('done', () => {
        res.end('');
    });

    generator.on('error', (error) => {
        console.log(error);
    });
    
    // start the crawler
    await generator.start();
});

module.exports = router;
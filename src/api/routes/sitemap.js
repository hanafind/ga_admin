const express = require('express');
const router = express.Router();

const fs = require('fs');

const SitemapGenerator = require('sitemap-generator');

router.get('/', async (req, res, next) => {
    const data = fs.readFileSync('./sitemap.xml', 'utf8');
    res.set('Content-Type', 'text/xml');
    res.send(data);
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
        res.send({});
    });
    
    // start the crawler
    generator.start();
});

module.exports = router;
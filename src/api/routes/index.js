const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
})

router.use('/blogs', require('./blogs'));
router.use('/products_direct', require('./products_direct'));
router.use('/auths', require('./auths'));
router.use('/sitemap', require('./sitemap'));

router.get('/test', async (req, res, next) => {
  const response = await axios.get('https://www.e-insmarket.or.kr/mins/search.knia?prdtSmlClsCd=G003&insrCmpyCd=N01&insrCmpyCd=N02&insrCmpyCd=N03&insrCmpyCd=N04&insrCmpyCd=N05&insrCmpyCd=N08&insrCmpyCd=N09&insrCmpyCd=N10&insrCmpyCd=N11&insrCmpyCd=N71&insrCmpyCd=L01&insrCmpyCd=L03&insrCmpyCd=L04&insrCmpyCd=L05&insrCmpyCd=L42&insrCmpyCd=L71&insrCmpyCd=L74&joinScrtDivCd=A&joinScrtDivCd=B&joinScrtDivCd=E&joinScrtDivCd=F&joinScrtDivCd=G&sexDiv=ML&sex=M&sex=L&startDt=19851128&age=37');
  
  const $ = cheerio.load(response.data, null, false);
  let data = [];
  $('.table_type01 tbody tr').each((i, el)=>{
    let total_cost = {};
    total_cost.male = $(el).find('.total_cost').eq(0).text();
    total_cost.female = $(el).find('.total_cost').eq(1).text();
    let product_name = $(el).find('.prod p').text();
    data.push({
      company_name: $(el).find('.tag_bizdiv').text(),
      product_name: product_name,
      total_cost: {male: total_cost.male.split('\n').join('').split('\t').join(''), female: total_cost.female.split('\n').join('').split('\t').join('')}
    });
  });
  res.json(data);
});

module.exports = router;
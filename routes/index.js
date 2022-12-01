var express = require('express');
var router = express.Router();
const c = require('../controllers')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IOT-API' });
});
router.post('/iot/sensor', c.value);
router.get('/iot/sensor', c.getAll);

module.exports = router;
module.exports = router;

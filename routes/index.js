const express = require('express');
const router = express.Router();
const c = require('../controllers')

router.post('/iot/sensor', c.value);
router.get('/iot/sensor', c.getAll);

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send({response: "Hello Soonvibes!"}).status(200);
});

module.exports = router


"use strict"

const express = require('express');
const router = express.Router();
// nesse arquivo fica a rota que lida com os cartoes
router.get("/",(req, res, next) => {
    res.send("ok");
});

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("Dashboard Api Successfull ✅");
})

module.exports = router;
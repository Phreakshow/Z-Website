const router = require('express').Router();
const Zbot =require('./coinSchema');

router.route('').get((req,res) => {
    Zbot.find()
    .then(coins => res.json(coins))
    .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router;
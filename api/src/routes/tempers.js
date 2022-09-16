const { Router } = require("express");
const { Temper } = require("../db.js");
const { getTempers } = require("../middlewares/TemperMiddleware.js");

const router = Router();

router.get('/', async (req,res)=>{
    const temp = await Temper.findAll()
    if(temp.length < 1){
        await getTempers()
    }
    res.send(temp)
})

module.exports = router;
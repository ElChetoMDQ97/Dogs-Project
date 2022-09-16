const { Router } = require("express");
const { Dog, Temper } = require("../db.js");
const { getDogs } = require("../middlewares/DogMiddleware.js");

const router = Router();

router.get('/', async (req,res)=>{
    const dg = await Dog.findAll({
        include:{
        model: Temper,
        attributes:['t_name'],
        through: {
            attributes: [],
        }
    }})
    if(dg.length < 1){
        await getDogs()
    }

    const { name } = req.query;
    if(name){
    const dogName = await Dog.findOne({where:{name: name}, include:{
        model: Temper,
        attributes: ['t_name'], 
        through: {
            attributes: [],
        }}})
    if(!dogName){res.status(404).send('Dog dont found by id')}
    else{res.status(200).send(dogName)}
    }
res.send(dg)
})

router.get('/:id', async (req, res)=>{

const { id }= req.params

const dog = await Dog.findOne({where:{id: id}});

if(!dog){
    res.status(404).send(`Id: ${id} not found`)
}else{
    res.status(200).send(dog)
}
})

router.post('/', async (req,res)=>{
    let { name, heightMin, heightMax, weightMin, weightMax, life_ageMin, life_ageMax, origin, breed_group, bred_for, tempers, img} = req.body
    if(!name){return res.status(409).send('Name is require')}
    if(
    isNaN(heightMin) ||
    isNaN(heightMax) ||
    isNaN(weightMin) ||
    isNaN(weightMax) ||
    isNaN(life_ageMin) ||
    isNaN(life_ageMax)
    ){return res.status().send('One or more arguments are not a number')}
 
    const existe = await Pokemon.findOne({ where: { name: name }})
    if (existe) return res.status(409).send("Dog already exist");

    const dog = await Dog.create({
        name: name.toLowerCase(),
        heightMin: heightMin,
        heightMax: heightMax,
        weightMin: weightMin,
        weightMax: weightMax,
        life_ageMin: life_ageMin,
        life_ageMax: life_ageMax,
        origin: origin ? origin : 'Not specified by user',
        breed_group: breed_group ? breed_group : 'Not specified by user',
        bred_for: bred_for ? bred_for : 'Not specified by user',
        img: img ? img : "https://img.favpng.com/19/10/9/question-mark-symbol-sign-computer-icons-png-favpng-T3t3e8dw8dHkGeyPW3MKvVewM.jpg",
        fan: true,
      });
      if(!tempers.length){tempers = [118]}

    await dog.addTemper(tempers)
    res.status(200).send('Dog created successfully')
})

module.exports = router;
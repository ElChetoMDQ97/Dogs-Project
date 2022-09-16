const { Router } = require("express");
const { Dog, Temper } = require("../db.js");
const { getDogs } = require("../middlewares/DogMiddleware.js");

const router = Router();

router.get('/', async (req,res)=>{
    const dg = await Dog.findAll({
        order:['id'],
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

    const {name, id} = req.query;
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
   if(Number(id)){
   const dogId = await Dog.findOne({where:{id: id}, include:{
    model: Temper,
    attributes: ['t_name'],
    through: {
        attributes: [],
    }}})
   if(!dogId){res.status(404).send('Dog dont found by id')}
   else{res.status(200).send(dogId)}
   }
res.send(dg)
})

router.get('/:id', async (req, res)=>{

const { id }= req.params

const dog = await Dog.findOne({where:{id: id}, include:{
    model: Temper,
    attributes: ['t_name'], 
    through: {
        attributes: [],
    }}});

if(!dog){
    res.status(404).send(`Id: ${id} not found`)
}else{
    res.status(200).send(dog)
}
})

router.post('/', async (req,res)=>{
    let { name, height, weight, life_age, origin, breed_group, bred_for, tempers, img} = req.body
    if(!name){return res.status(409).send('Name is require')}
 
    const existe = await Pokemon.findOne({ where: { name: name }})
    if (existe) return res.status(409).send("Dog already exist");

    const dog = await Dog.create({
        name: name.toLowerCase(),
        height: height ? height : 'Not specified by user',
        weight: weight ? weight : 'Not specified by user',
        life_age: life_age ? life_age : 'Not specified by user',
        origin: origin ? origin : 'Not specified by user',
        breed_group: breed_group ? breed_group : 'Not specified by user',
        bred_for: bred_for ? bred_for : 'Not specified by user',
        img: img ? img : "https://img.favpng.com/19/10/9/question-mark-symbol-sign-computer-icons-png-favpng-T3t3e8dw8dHkGeyPW3MKvVewM.jpg",
        fan: true,
      });
      if(!tempers.length){tempers = ['Not specified']}

    await dog.addTemper(tempers)
    res.status(200).send('Dog created successfully')
})

module.exports = router;
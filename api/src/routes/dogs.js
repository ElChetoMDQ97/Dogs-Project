const { Router } = require("express");
const { Dog, Temper } = require("../db.js");
const { getAll } = require("../middlewares/DogMiddleware.js");

const router = Router();

router.get('/', async (req,res)=>{
const { name } = req.query
let all = await getAll()
if(name){
    let dogName = all.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
    if(dogName.length > 0){
    return   res.status(200).send(dogName)
    } else {
    return   res.status(404).send('Error 404: name not found')
    }
} else {
    res.status(200).send(all)
}
})

router.get('/:id', async (req, res)=>{
 const { id } = req.params
 let all = await getAll()
 let exist = all.filter(d => d.id === id)
 if(exist.length > 0){
    res.status(200).send(exist)
 } else {
    res.status(404).send(`Error 404: Cant found dog with id: ${id}`)
 }
})

router.post('/', async (req,res)=>{
    let { 

        name, heightMin, heightMax, weightMin, 
        weightMax, life_ageMin, life_ageMax, 
         Tempers, image, origin,
    } = req.body

    if(!name){return res.status(409).send('Name is require')}
 
    const existe = await Dog.findOne({ where: { name: name }})
    if (existe) return res.status(409).send("Dog already exist");

    const dog = await Dog.create({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_ageMin,
        origin,
        life_ageMax: life_ageMax + ' years',
        image: image ? image : "https://img.favpng.com/19/10/9/question-mark-symbol-sign-computer-icons-png-favpng-T3t3e8dw8dHkGeyPW3MKvVewM.jpg",
      });

      if(Tempers.length === 0){Tempers = 'Aloof'}

      let associatedTemp = await Temper.findAll({
        where: { name: Tempers},
    })

    await dog.addTemper(associatedTemp)
    res.status(200).send('Dog created successfully')
})

module.exports = router;


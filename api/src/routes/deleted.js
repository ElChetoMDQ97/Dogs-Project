const { Router } = require("express");
const { Dog } = require("../db.js");
const { getAll }= require('../Middlewares/DogMiddleware.js')

const router = Router();

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    let dogsTotal = await getAll();
    let dogFind = dogsTotal.filter(dog => dog.id === id);
    if(dogFind.length > 0){
        await Dog.destroy({
            where: { id: id },
        });
        res.status(200).send({ message: 'Deleting dog' });
    } else {
        res.status(404).send({ message: 'Error 412: cant delete dog' });
    }
});

module.exports = router;
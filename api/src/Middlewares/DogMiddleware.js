const { Dog, Temper } = require("../db.js");
const dotenv = require('dotenv')
const  axios  = require('axios')
dotenv.config({ path: '../../.env'})

const api = process.env.API_KEY

const getDogsApi = async () => {
  try{
    const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api}`)
    const dgs = await dogsApi.data.map((dog) =>{
      
      let temperamentArray = [];
      let originArray = []
        if (!dog.temperament) {
            temperamentArray = ["Unknown"];
        }
        if (dog.temperament) {
            temperamentArray = dog.temperament.split(", ");
        }
         
        let weightMin = dog.weight.metric.split(" - ")[0];
        let weightMax = dog.weight.metric.split(" - ")[1];
        let heightMin = dog.height.metric.split(" - ")[0];
        let heightMax = dog.height.metric.split(" - ")[1];
        let lifeAgeAll = dog.life_span.split(" - ");
        let lifeAgeMin = lifeAgeAll[0];
        let lifeAgeMax = lifeAgeAll[1];
        if(dog.name === "Smooth Fox Terrier"){ 
            weightMin = "6";
        }
        if(dog.name === "Olde English Bulldogge"){
            weightMin = "20";
            weightMax = "30"; 
        }
        if(!dog.heightMin){heightMin = 16}
        if(!dog.weightMin){weightMin = 12}
        if(!dog.lifeAgeMin){lifeAgeMin = 6}
        if(!dog.heightMax){heightMax = heightMin + 2}
        if(!dog.weightMax){weightMax = weightMin + 2}
        if(!dog.lifeAgeMax){lifeAgeMax = lifeAgeMin + 4}
        return {
            id: String(dog.id),
            name: dog.name,
            image: dog.image.url,
            Tempers: temperamentArray,
            weightMin: weightMin,
            weightMax: weightMax,
            heightMin: heightMin,
            heightMax: heightMax,
            life_ageMin: lifeAgeMin,
            life_ageMax: lifeAgeMax,
            origin: dog.origin ? dog.origin : 'Unkown' ,
        }
    });
    return dgs
    } catch(e){
      return e
    }
}

const getDogsDB = async () => {
  return await Dog.findAll({
      include: {
          model: Temper,
          attributes: ['name'],
          through: {
              attributes: [],
          },
      }
  })
};

const getAll = async () => {
  const api = await getDogsApi();
  const db = await getDogsDB();
  const infoTotal = db.concat(api);  
  return infoTotal;
}

module.exports = {
  getDogsApi,
  getDogsDB,
  getAll,
}




/*
        const exist = await Dog.findOne({where:{
          name: dog.name,
        }})
        
        if(!exist){
let dg = await Dog.create({
            name: dog.name,
            heightMin: hMin,
            heightMax: hMax,
            weightMin: wMin,
            weightMax: wMax,
            life_ageMin: lsMin,
            life_ageMax: lsMax,
            origin: dog.origin ? dog.origin : "Not specified",
            bred_for: dog.bred_for ? dog.bred_for : "Not specified",
            breed_group: dog.breed_group ? dog.breed_group : "Not specified",
            img: dog.image.url ? dog.image.url : "https://i.gifer.com/origin/c4/c4e585501041d76b475c301fa9f47779_w200.gif",
          })
          dg.addTemper(ids)
        }
*/
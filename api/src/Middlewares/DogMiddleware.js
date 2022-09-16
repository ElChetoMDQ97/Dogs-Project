const { Dog, Temper } = require("../db.js");
const dotenv = require('dotenv')
const  axios  = require('axios')
dotenv.config({ path: '../../.env'})

const api = process.env.API_KEY
//`https://api.thedogapi.com/v1/breeds?api_key=${api}`
const getDogs = async () => {
    axios.get('https://api.thedogapi.com/v1/breeds')
     .then(json => json.data.map(async (dog) =>{
      try{
        const exist = await Dog.findOne({where:{
          name: dog.name,
        }})
        if(!exist){
          if(!dog.temperament){dog.temperament = 'Unknown'};
          const info = dog.temperament.split(', ');
          var ids = [];
          for(let i = 0;i < info.length;i++){
           let temp = await Temper.findOne({where:{t_name: info[i]}})
           let id = temp.t_id
          ids.push(id)
          }

          let wMin = dog.weight.metric.split(" - ")[0];
          let wMax = dog.weight.metric.split(" - ")[1]; 
          let hMin = dog.height.metric.split(" - ")[0]; 
          let hMax = dog.height.metric.split(" - ")[1];
          let lsMin = dog.life_span.split(" - ")[0];
          let lsMax = dog.life_span.split(" - ")[1];

          if(dog.name === "Smooth Fox Terrier"){ 
              weightMin = "6";
          }
          if(dog.name === "Olde English Bulldogge"){
              weightMin = "20";
              weightMax = "30"; 
          }

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
      }
      catch(e){
        return e
      }
     }
     ))
}

module.exports = {
    getDogs,
}
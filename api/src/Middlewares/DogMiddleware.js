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
          id: dog.id,
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
          let dg = await Dog.create({
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            origin: dog.origin ? dog.origin : "Not specified",
            bred_for: dog.bred_for ? dog.bred_for : "Not specified",
            breed_group: dog.breed_group ? dog.breed_group : "Not specified",
            life_age: dog.life_span,
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
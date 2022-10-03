import axios from "axios";

export function getDogs(){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/dogs")
        return dispatch({
            type: "GET_DOGS",
            payload: response.data
        })
    }
}

export function getTemperament(){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/tempers")
        return dispatch({
            type: "GET_TEMPERS",
            payload: response.data
        })
    }
}

export function getName(name){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: "GET_NAME",
                payload: response.data
            })
        } catch (error) {
            alert("Error 404: dog not found")
        }
    }
}
export function PostDog(payload){
    return async function(){
        try{
            const response = await axios.post("http://localhost:3001/dogs", payload)
            alert('Dog created succesfully')
            return response
        }catch(error){
            alert("Error 412: cant create dog")
        }
    }
}

export function filterDogByTemperament(payload){
    return {
        type: "FILTER_DOG_BY_TEMPERAMENT",
        payload
    }
}

export function filterDogByCreated(payload){
    return {
        type: "FILTER_DOG_BY_CREATED",
        payload
    }
}

export function filterDogByName(payload){
    return {
        type: "FILTER_DOG_BY_NAME",
        payload
    }
}
export function filterDogByWeight(payload){
    return {
        type: "FILTER_DOG_BY_WEIGHT",
        payload
    }
}

export function getDetail(id) {
    return async function(dispatch){
        try{
        const response = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: "GET_DETAIL",
            payload: response.data
        })
        } catch (error) {
            alert("Error 404: Dog info dont found, see if that dog exist first.")
        }
    }
}

export function removeDog(id){
    return async function(dispatch){
        try{        
        const response = await axios.delete(`http://localhost:3001/deleted/${id}`);
        return dispatch({
            type: "REMOVE_DOG",
            payload: response.data
        })}
        catch(error){
            alert('Error 412: cant delete dog')
        }
    }
}

export function clearDetail(){
    return {
        type: "CLEAR_DETAIL"
    }
}
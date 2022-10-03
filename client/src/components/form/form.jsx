import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import Card from "../cards/cards";
import { PostDog, getTemperament, } from '../../actions';
import style from './form.module.css'

function validate(dog){

    const errors = {};
    if(!dog.name){
        errors.name = 'Name is required'
    }
    if(dog.name.charAt(0) === ' '){
        errors.name = 'Name cant start with space'
    }
    if(dog.name.includes('~')){
        errors.name = 'Name must be valid'
    }
    if(dog.name.includes('0') || dog.name.includes("1") || dog.name.includes("2") 
    || dog.name.includes("3") || dog.name.includes("4") || dog.name.includes("5") 
    || dog.name.includes("6") || dog.name.includes("7") || dog.name.includes("8") 
    || dog.name.includes("9")){
        errors.name = 'Name cant contain numbers'
    }
    if(dog.origin.includes('0') || dog.origin.includes("1") || dog.origin.includes("2") 
    || dog.origin.includes("3") || dog.origin.includes("4") || dog.origin.includes("5") 
    || dog.origin.includes("6") || dog.origin.includes("7") || dog.origin.includes("8") 
    || dog.origin.includes("9")){
        errors.origin = 'Origin cant contain numbers'
    }
    if(!dog.weightMax || !dog.weightMin){
        errors.weightMax = "Weight is required";
    }
    if(!dog.heightMax || !dog.heightMin){
        errors.heightMax = "Height is required";
    }
    if(!dog.life_ageMax || !dog.life_ageMin){
        errors.lifespan = "Life span is required";
    }
    if(Number(dog.weightMax) < Number(dog.weightMin)){
        errors.weightMax = "Weight max must be greater than weight min";
    }
    if(Number(dog.heightMax) < Number(dog.heightMin)){
        errors.heightMax = "Height max must be greater than height min";
    }
    if(Number(dog.life_ageMax) < Number(dog.life_ageMin)){
        errors.lifespan = "Life span max must be greater than life span min";
    }
    if(dog.heightMax === "0" || dog.heightMin === "0"){
        errors.heightMax = "Height max and min must be greater than 0";
    }
    if(dog.weightMax === "0" || dog.weightMin === "0"){
        errors.weightMax = "Weight max and min must be greater than 0";
    }
    if(dog.life_ageMax === "0" || dog.life_ageMin === "0"){
        errors.weightMax = "Life span max and min must be greater than 0";
    }
    if(Number(dog.weightMin) < 0 || Number(dog.weightMax) < 0){
        errors.weightMax = "Weight max and min must be positive numbers";
    }
    if(Number(dog.heightMin) < 0 || Number(dog.heightMax) < 0){
        errors.heightMax = "Height max and min must be positive numbers";
    }
    if(Number(dog.life_ageMin) < 0 || Number(dog.life_ageMax) < 0){
        errors.lifespan = "Life span max and min must be positive numbers";
    }

    return errors;
}

export default function DogsCreate(){
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.Tempers);
    const history = useHistory();
    const [dog, setDog] = useState({
        name: "",
        origin:"",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_ageMax: "",
        life_ageMin: "",
        image: "",
        Tempers:[],
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        dispatch(getTemperament());
    }, [dispatch]);

    function handleChange (e){
        setDog({
            ...dog,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...dog,
            [e.target.name]: e.target.value
        }))
    }
    function handleSelect(e){
        const temperament = e.target.value;
        if(!dog.Tempers.includes(temperament)){
            setDog({
                ...dog,
                Tempers: [...dog.Tempers, temperament]
            })
        }
    }
    function handleSubmit (e){
        e.preventDefault();
        dispatch(PostDog(dog));
        alert('Dog created successfully')
        history.push('/home');
    }
    function handleDelete(el) {
        setDog({
            ...dog,
            Tempers: dog.Tempers.filter(t => t !== el)
        })
    }
    return (
        <div className= {style.parent}>
            <div className= {style.boton}>
            <Link to="/home" className= {style.link}><button className= {style.myButton}>Go back</button></Link>
            </div>
            <div className= {style.form}>
                <div className= {style.tittle}>
                    <h1>Create your dog</h1>
                </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <h3 className= {style.tittle2}>Name</h3>
                    <input type="text" required value= {dog.name} name= "name" placeholder="Insert Name" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.name && <p className= {style.errors}>{errors.name}</p>}
                </div>
                <div>
                    <h3 className= {style.tittle2}>Origin</h3>
                    <input type="text" value= {dog.origin} name= "origin" placeholder="Where is from..." onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.origin && <p className= {style.errors}>{errors.origin}</p>}
                </div>
                <div>
                    <h3 className= {style.tittle2}>Height</h3>
                    <input type="number" min='1' max='999' value= {dog.heightMin} name= "heightMin" placeholder="Min" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.heightMin && <p className= {style.errors}>{errors.heightMin}</p>}
                    <input type="number" min='1' max='999' value= {dog.heightMax} name= "heightMax" placeholder="Max" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.heightMax && <p className= {style.errors}>{errors.heightMax}</p>}
                </div>
                <div>
                    <h3 className= {style.tittle2}>Weight</h3>
                    <input type="number" min='1' max='999' value= {dog.weightMin} name= "weightMin" placeholder="Min" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.weightMin && <p className= {style.errors}>{errors.weightMin}</p>}
                    <input type="number" min='1' max='999' value= {dog.weightMax} name= "weightMax" placeholder="Max" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.weightMax && <p className= {style.errors}>{errors.weightMax}</p>}
                </div>
                <div>
                <h3 className= {style.tittle2}>Life Span</h3>
                    <input type="number" min='1' max='999' value= {dog.life_ageMin} name= "life_ageMin" placeholder="Min" onChange={(e) => handleChange(e)} className= {style.input}/>
                    <input type="number" min='1' max='999' value= {dog.life_ageMax} name= "life_ageMax" placeholder="Max" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.lifespan && <p className= {style.errors}>{errors.lifespan}</p>}
                </div>
                <div>
                    <h3 className= {style.tittle2}>Image</h3>
                    <input type="text" value= {dog.image} name= "image" placeholder="Insert Image" onChange={(e) => handleChange(e)} className= {style.input}/>
                </div>
                <select onChange={(e) => handleSelect(e)} className= {style.select}>
                    <option value= "Select" hidden>Select Temperament</option>

                    {
                        temperaments.map(t => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                        ))
                    }
                </select>
                {Object.keys(errors).length === 0 ? (<div><button type="submit" className= {style.buttonCreate2}>Create Dog</button></div>) : (<div><button type="submit" disabled = {true} className= {style.buttonCreate}>Create Dog </button></div>)}
            </form>
        </div>
        <div className= {style.card}>
            <Card
                name={dog.name}
                heightMin={dog.heightMin}
                heightMax={dog.heightMax}
                weightMin={dog.weightMin}
                weightMax={dog.weightMax}
                life_spanMax={dog.life_spanMax}
                life_spanMin={dog.life_spanMin}
                image={dog.image ? dog.image : "https://icon-library.com/images/insert-image-icon/insert-image-icon-14.jpg"}
                Tempers={dog.Tempers}
            />
        </div>
        <div className= {style.tempers}>
                {dog.Tempers.map(el => <div key= {el+Math.random()} className= {style.divtempers}><p>{el}</p><button onClick={() => handleDelete(el)} className= {style.buttonDelete}>Delete</button></div>)}
            </div>

        </div>
    )
}
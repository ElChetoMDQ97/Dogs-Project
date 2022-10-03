import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, clearDetail, removeDog } from '../../actions';
import { Link, useHistory } from 'react-router-dom';
import './dog.css'

export default function Detail(props){
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
        return () => {
            dispatch(clearDetail());
        }
    } , [ dispatch, props.match.params.id]);

    const dog = useSelector(state => state.Details);

    const handleDelete = () => {
        dispatch(removeDog(dog[0].id));
        alert('Dog deleted successfully');
        history.push("/home");
    };

    return (
        <div className='container'>
            <Link to="/home"><button className='bt'>Back to home</button></Link>
            <br/>
            {
                dog.length > 0 ?
                    <div className='inner'>
                        <h1>{dog[0].name}</h1>
                        <img src={dog[0].image} alt={dog[0].name} width="200px" height="250px"/>
                        <h4> Temperaments: {dog[0].fan ? dog[0].Tempers?.map(d => d.name + (" | "))  : dog[0].Tempers.map(d => d + (" | "))} </h4>
                        <p className='p'><b>Origin:</b> {dog[0].origin}</p>
                        <p className='p'><b>Height:</b> from: {dog[0].heightMin}cm <br/> to: {dog[0].heightMax}cm</p>
                        <p className='p'><b>Weight:</b> from: {dog[0].weightMin}Kg <br/> to: {dog[0].weightMax}Kg</p>
                        <p className='p'><b>Life Span:</b> from: {dog[0].life_ageMin} years <br/> to: {dog[0].life_ageMax} years</p> 
                        {
                        dog[0].fan ? <button onClick= {handleDelete} className='bt'>Remove dog</button> : null
                        }
                    </div>
                :
                    <div>
                        <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0182.gif" alt="loading"/>
                    </div>
            }
        </div>
    )
}
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './search.css'
import { getName } from '../../../actions';

export default function SearchBar({currentPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getName(name));
        setName('');
        setTimeout(() => {currentPage(1)},100);
    }



    return (
        <div className='sb'>
            <input type='text' placeholder='Search...' onChange={(e) => handleChange(e)} value= {name} />
            &nbsp;
            <button type= "submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}
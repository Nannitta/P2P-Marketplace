import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GeneralInput from '../../components/generalInput/GeneralInput';
import SearchCategoryItem from './SearchCategoryItem';
import searchIcon from '../../assets/search.svg';

function SearchBar () {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        productName: '',
        minPrice: '',
        maxPrice: '',
        productLocation: ''
    });

    const [category, setCategory] = useState('');

    const handleChange = (event) => {
        const newFormValue = event.target.value;

        setFormValues({
            ...formValues,
            [event.target.name]: newFormValue
        });
    };

    const params = [];

    const handleSubmit = (event) => {
        event.preventDefault();

        const queryParams = new URLSearchParams();

        if (formValues.productName !== '') {
            queryParams.set('name', formValues.productName);
        }

        if (formValues.productLocation !== '') {
            queryParams.set('city', formValues.productLocation);
        }

        if (formValues.minPrice !== '' & formValues.maxPrice !== '') {
            queryParams.set('price', `${formValues.minPrice}-${formValues.maxPrice}`);
        }

        if (category !== '') {
            queryParams.set('category', category);
        }

        if (queryParams.toString() !== '') {
            params.push(`/?${queryParams.toString()}`);
            navigate(`/search${params.toString()}`);
            window.location.reload();
        } else {
            toast.error('Debes completar algún campo antes de buscar');
        }
    };
    return (
        <div className='search-bar-complete'>
            <nav className='search-bar'>
                <ul>
                    <SearchCategoryItem categoryText={'Consolas'} onClick={setCategory}/>
                    <SearchCategoryItem categoryText={'VideoJuegos'} onClick={setCategory}/>
                    <SearchCategoryItem categoryText={'Accesorios'} onClick={setCategory}/>
                    <SearchCategoryItem categoryText={'Retro'} onClick={setCategory}/>
                    <SearchCategoryItem categoryText={'Ordenadores'} onClick={setCategory}/>
                </ul>
            </nav>
            <form onSubmit={handleSubmit} className='search-bar-form'>
                <GeneralInput placeholder={'¿Qué es lo que buscas?'} type={'text'} value={'productName'} handleChange={handleChange}/>
                <div className='input-price'>
                    <p>Entre</p>
                    <GeneralInput placeholder={'0'} type={'number'} value={'minPrice'} handleChange={handleChange} min={1}/>
                    <p>y</p>
                    <GeneralInput placeholder={'1000'} type={'number'} value={'maxPrice'} handleChange={handleChange} min={1}/>
                    <p>€</p>
                </div>
                <GeneralInput placeholder={'¿Dónde lo buscas?'} type={'text'} value={'productLocation'} handleChange={handleChange} />
                <button type='submit'>
                    <img src={searchIcon} alt='Lupita buscar' />
                </button>
            </form>
        </div>
    );
}

export default SearchBar;

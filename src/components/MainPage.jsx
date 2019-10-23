import React, {useState, useEffect} from 'react'
import CardBuilder from "./CardBuilder";
import {getAll, getByCountryName} from "../utils/apiCalls";

function MainPage(){
    const [cardsData, setCardsData] = useState([]);
    const [countryName, setCountryName] = useState('');

    useEffect( () => {
        fetchApiData();
    }, []);

    const fetchApiData = async () => {
        if(countryName === '') {
            const result = await getAll();
            setCardsData(result.data);
        }
        else{
            const result = await getByCountryName(countryName);
            setCardsData(result.data);
        }
    };

    const handleSearch = (e) => {
        console.log('mudou');
        console.log(e.target.value);
        setCountryName(e.target.value);
        if(e.target.value.length > 3) {
            fetchApiData()
        }
    };

    return(
        <div>
            <div className='box'>
                <input type='search' className='search-bar' placeholder='Search by country name' value={countryName} onChange={handleSearch}/>
            </div>
            <div>
                {cardsData.map((data, index) => {
                    return  <CardBuilder key={index} cardData={data}/>
                })}
            </div>
        </div>
    )
}

export default MainPage
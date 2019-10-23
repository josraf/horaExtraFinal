import React from 'react';
import {withRouter} from 'react-router-dom'

function CardBuilder(props){
    const {cardData} = props;
    const imgSrc = `https://www.countryflags.io/${cardData.alpha2Code}/flat/64.png`;
    if(cardData.capital === ''){
        cardData.capital = 'Not available';
    }

    const handleRedirect = () => {
        props.history.push(`country/${cardData.name}`)
    };

    return(
        <div className='card' onClick={() => {handleRedirect()}}>
            <div className='container'>
                <div className='left-half'>
                    <h4>{cardData.name}</h4>
                    <p>Capital: {cardData.capital}</p>
                </div>
                <div className='right-half'>
                    <img src={imgSrc}/>
                </div>
            </div>
        </div>
    )
}

export default withRouter(CardBuilder);
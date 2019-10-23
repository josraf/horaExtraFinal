import React, {useEffect, useState} from 'react'
import {getImagesByCountry} from "../utils/apiCalls";
import {isEven, isOdd} from "../utils/numberUtils";

function CountryPage(props){
    const [arrayImages, setArrayImages] = useState([]);

    let teste = process.env.REACT_APP_API_ACCESS_KEY;

    useEffect(() => {
        fetchImages();
    }, []);


    const fetchImages = async() => {
        await getImagesByCountry(props.match.params.name).then(result => {
            setArrayImages(result);
        })

    };

    useEffect(() => {
        console.log(arrayImages);
    });



    return(
        <div className='country_images'>
            <div className='row'>
                <div className='column'>
                    {arrayImages.map((data, index) => {
                        if(isOdd(index+1)) {
                            return <img src={data}/>
                        }
                    })}
                </div>
                <div className='column'>
                    {arrayImages.map((data, index) => {
                        if(isEven(index+1)) {
                            return <img src={data}/>
                        }
                    })}
                </div>
            </div>
        </div>
    )

}

export default CountryPage
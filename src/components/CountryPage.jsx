import React, {useEffect, useState} from 'react'
import {getByCountryName, getImagesByCountry} from "../utils/apiCalls";
import {isEven, isOdd} from "../utils/numberUtils";
import {withRouter} from 'react-router-dom'

function CountryPage(props){
    const [arrayImages, setArrayImages] = useState([]);

    let teste = process.env.REACT_APP_API_ACCESS_KEY;

    useEffect(() => {
        fetchApi();
    }, []);


    const fetchApi = async() => {
        await getByCountryName(props.match.params.name).then(response => {
            console.log(response)
        }).then(async () => {
            await getImagesByCountry(props.match.params.name).then(response => {
                setArrayImages(response);
            })
        }).catch(err => {
            props.history.push('/');
        })


    };


    return(
        <div className='country_images'>
            <h2 className="no-span">Line-behind title <b>(no span/no bg)</b></h2>
            <div className='row'>
                <div className='column'>
                    {arrayImages.map((data, index) => {
                        if(isEven(index) || index === 0) {
                            return <img src={data}/>
                        }
                    })}
                </div>
                <div className='column'>
                    {arrayImages.map((data, index) => {
                        if(isOdd(index)) {
                            return <img src={data}/>
                        }
                    })}
                </div>
            </div>
            }
        </div>
    )

}

export default withRouter(CountryPage);
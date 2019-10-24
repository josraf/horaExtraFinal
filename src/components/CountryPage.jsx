import React, {useEffect, useState} from 'react'
import {getByCountryName, getImagesByCountry} from "../utils/apiCalls";
import {isEven, isOdd} from "../utils/numberUtils";
import {withRouter} from 'react-router-dom'
import Portal from "../utils/Portal";
import BuildModal from "./BuildModal";

function CountryPage(props){
    const [arrayImages, setArrayImages] = useState([]);
    const [portalOpen, setPortalOpen] = useState(false);
    const [portalImage, setPortalImage] = useState('');
    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        fetchApi();
    }, []);

    useEffect(() => {
        console.log(countryData);
    });

    const fetchApi = async() => {
        await getByCountryName(props.match.params.name).then(response => {
            setCountryData(response.data[0]);
        }).then(async () => {
            await getImagesByCountry(props.match.params.name).then(response => {
                setArrayImages(response);
            })
        }).catch(() => {
            props.history.push('/');
        })
    };

    const openPortal = () => {
        setPortalOpen(!portalOpen);
    };

    const handleImage = (image) => {
        setPortalImage(image);
        openPortal();
    };


    return(
        <div>
            {countryData.length !== 0 &&
            <div className='content'>
                <div className='container'>
                    <div className='country_information'>
                        <h2 className="no-span">About {countryData.name}</h2>
                        <h4>Capital: <span className='sub-font'> {countryData.capital} </span> </h4>
                        <h4>Also know as: {countryData.altSpellings.map((data, index) => {
                            if(index === countryData.altSpellings.length -1){
                                return <span className='sub-font' >{data}</span>
                            }
                            else {
                                return <span className='sub-font' >{data}, </span>
                            }
                        })}</h4>
                        <h4>Sub-region: <span className='sub-font'>{countryData.subregion}</span></h4>
                    </div>
                </div>
                <div className='container'>
                    <div className='country_images'>
                        <h2 className="no-span">Images</h2>
                        <div className='row'>
                            <div className='column'>
                                {arrayImages.map((data, index) => {
                                    if (isEven(index) || index === 0) {
                                        return <img className='images' key={index} onClick={() => {
                                            handleImage(data)
                                        }} alt='' src={data}/>
                                    }
                                })}
                            </div>
                            <div className='column'>
                                {arrayImages.map((data, index) => {
                                    if (isOdd(index)) {
                                        return <img className='images' key={index} onClick={() => {
                                            handleImage(data)
                                        }} alt='' src={data}/>
                                    }
                                })}
                            </div>
                        </div>
                        {portalOpen &&
                        <Portal id='modal-root'>
                            <BuildModal openPortal={openPortal} image={portalImage}/>
                        </Portal>
                        }
                    </div>
                </div>
            </div>
            }
        </div>
    )

}

export default withRouter(CountryPage);
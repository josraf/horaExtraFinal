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
    const [countryName, setCountryName] = useState('');

    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = async() => {
        await getByCountryName(props.match.params.name).then(response => {
            setCountryName(response.data[0].name);
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
            {countryName !== '' &&
            <div className='content'>
                <div className='container'>
                    <div className='country_nfo'>
                        <h2 className="no-span">About {countryName}</h2>
                    </div>
                </div>
                <div className='container'>
                    <div className='country_info'>
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
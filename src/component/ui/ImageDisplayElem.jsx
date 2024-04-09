import React, {useState, useEffect} from "react";

import {axiosErrorHandling, imageDisplayAxios} from "../../modules/customAxios";

function ImageDisplayElem(props) {
    const { imageClassName, imageName } = props;
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        getImageDisplayData(imageName);
    }, [imageName])

    const getImageDisplayData = async (imageName) => {
        await imageDisplayAxios.get(`display/${imageName}`)
            .then(res => {
                const url = window
                                .URL
                                .createObjectURL(
                                    new Blob([res.data], { type: res.headers['content-type']})
                                );
                setImageSrc(url);
            })
            .catch(err => {
                axiosErrorHandling(err);
            })
    };


    return (
        <>
            <img alt={''} className={imageClassName} src={imageSrc} style={{width: 300 + 'px', height: 300 + 'px'}}/>
        </>
    )
}

export default ImageDisplayElem;
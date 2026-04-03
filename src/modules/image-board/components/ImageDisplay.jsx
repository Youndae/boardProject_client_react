import React, { useState, useEffect } from 'react';

import { getImageData } from '../../../common/service/commentService';

import {IMAGE_SIZE_BREAKPOINTS, IMAGE_SIZE_STYLE} from "../constants/imageSizeConstants";

function getBreakpointSize(windowWidth, maxSize) {
    const breakpoint = IMAGE_SIZE_BREAKPOINTS.find(bp => windowWidth < bp.maxWidth);
    const resolved = breakpoint?.size ?? IMAGE_SIZE_BREAKPOINTS.at(-1).size;

    return resolved <= maxSize ? resolved : maxSize;
}

function resolveImageName(imageName, size) {
    const dotIndex = imageName.lastIndexOf('.');
    if(dotIndex === -1)
        return `${imageName}_${size}`;
    const name = imageName.slice(0, dotIndex);
    const ext = imageName.slice(dotIndex);

    return `${name}_${size}${ext}`;
}

function ImageDisplay(props) {
    const { imageClassName, imageName, type, size } = props;
    const [imageSrc, setImageSrc] = useState('');
    const [displaySize, setDisplaySize] = useState(() => getBreakpointSize(window.innerWidth, size));

    useEffect(() => {
        const handleResize = () => {
            const next = getBreakpointSize(window.innerWidth, size);
            setDisplaySize(prev => prev !== next ? next : prev);
        };

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, []);

    useEffect(() => {
        const getImage = async () => {
            try {
                const resolvedName = resolveImageName(imageName, size);

                const url = await getImageData(type, resolvedName);

                setImageSrc(url)
            }catch(err) {
                console.error('Failed getImageData: ', err);
            }
        }

        getImage(imageName)
    }, [imageName, type, size]);

    return (
        <>
            <img
                alt={''}
                className={imageClassName}
                src={imageSrc}
                style={IMAGE_SIZE_STYLE[displaySize]}
            />
        </>
    )
}

export default ImageDisplay;
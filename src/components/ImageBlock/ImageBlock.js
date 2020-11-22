import React from 'react';
import style from './style.module.css';



const ImageBlock = ({ id, url, alt = 'image', openModal }) => {

    const handleClick = (id) => {
        openModal(id);
    }


    return (
        <img className={style.img} src={url} alt={alt} onClick={() => handleClick(id)} />
    )
}

export default ImageBlock;
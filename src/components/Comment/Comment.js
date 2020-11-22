import React from 'react'
import style from './style.module.css'

const Comment = ({ text, date }) => {

    const comDate = new Date(date);

    function getZero(n) {
        return n < 10 ? `0${n}` : n;
    }

    const day = getZero(comDate.getDate());
    const month = getZero(comDate.getMonth() + 1);
    const year = comDate.getFullYear();

    return (
        <>
            <div className={style.date} >{`${day}.${month}.${year}`}</div>
            <div>{text}</div>
        </>
    )
}
export default Comment;


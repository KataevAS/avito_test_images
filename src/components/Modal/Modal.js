import React from 'react'
import Comment from '../Comment/Comment';
import style from './style.module.css'



const Modal = ({ comments, url, alt = 'image', closeModal }) => {

    return (
        <div className={style.wrapper}>
            <div className={style.modal}>
                <button className={style.closeBtn} onClick={closeModal}>X</button>
                <img src={url} alt={alt} />
                <div className={style.comments}>
                    {comments && comments.map(({ text, date, id }) => (
                        <Comment text={text} date={date} key={id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Modal;
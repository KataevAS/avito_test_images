import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { getBigImg, getImages, setComment } from './api';
import style from './App.module.css';


const modalRoot = document.getElementById('modal-root');

function getZero(n) {
  return n < 10 ? `0${n}` : n;
}


function App() {
  const [images, setImages] = useState([]);
  const [currentImg, setCurrentImg] = useState(null);
  const [bigImg, setBigImg] = useState(null);
  const [isLabel, setIsLabel] = useState({});
  const [inputsValue, setInputsValue] = useState({ name: '', comment: '' });


  const onHandleChange = e => {
    setInputsValue(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  }

  const onFocusInput = e => {
    setIsLabel(state => ({
      ...state,
      [e.target.name]: true
    }))
  }

  const onBlurInput = e => {
    setIsLabel(state => ({
      ...state,
      [e.target.name]: false
    }))
  }

  const closeModal = () => {
    setCurrentImg(null);
    setBigImg(null);
  };

  const getFormatDate = (date, type) => {
    const comDate = new Date(date);

    switch (type) {
      case 'day':
        return getZero(comDate.getDate());
      case 'month':
        return getZero(comDate.getMonth() + 1);
      case 'year':
        return comDate.getFullYear();
      default:
        return;
    }
  };

  const onHandleOverlayClick = (e) => {
    if (e.target.classList.contains(style.wrapper)) {
      closeModal();
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const response = await setComment(bigImg.id, inputsValue.name, inputsValue.comment);
    if (response) {
      setBigImg(state => ({
        ...state,
        comments: [...state.comments, {
          date: new Date(),
          // фейковый id для коммента
          id: new Date(),
          text: inputsValue.comment
        }]
      }));
      setInputsValue({ name: '', comment: '' });
    }
  }

  useEffect(() => {
    const onKeyHandle = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', onKeyHandle);
    return () => document.removeEventListener('keydown', onKeyHandle);
  }, []);

  useEffect(() => {
    const fetchBigImg = async () => {
      const data = await getBigImg(currentImg);
      setBigImg({ ...data });
    };

    if (currentImg) {
      fetchBigImg();
    }
  }, [currentImg]);


  useEffect(() => {
    const fetchImages = async () => {
      const data = await getImages();
      setImages([...data]);
    };

    fetchImages();
  }, []);



  return (
    <div className={style.container}>

      <header className={style.header}>
        <h1 className={style.title}>TEST APP</h1>
      </header>
      <ul className={style.imgBox}>
        {
          images && images.map(image => (
            <li className={style.img} key={image.id}>
              <img
                src={image.url}
                alt={image.alt || 'image'}
                onClick={() => setCurrentImg(image.id)} />
            </li>
          ))
        }
      </ul>

      {
        bigImg &&
        createPortal((
          <div className={style.wrapper} onClick={(e) => onHandleOverlayClick(e)}>
            <div className={style.modal}>
              <button className={style.closeBtn} onClick={closeModal}>X</button>

              <div className={style.bigImgBox}>

                <img className={style.bigImg} src={bigImg.url} alt={bigImg.alt || 'big-image'} />

                <form className={style.form} onSubmit={e => onHandleSubmit(e)}>
                  <ul>
                    <li className={style.inputBox}>
                      {!isLabel.name && inputsValue.name === '' &&
                        <label htmlFor='name' className={style.labelInput}>
                          <div>
                            Ваше имя
                          </div>
                        </label>
                      }
                      <input
                        type='text'
                        name='name'
                        className={style.input}
                        value={inputsValue.name}
                        onChange={e => onHandleChange(e)}
                        onFocus={e => onFocusInput(e)}
                        onBlur={e => onBlurInput(e)} />
                    </li>
                    <li className={style.inputBox}>
                      {!isLabel.comment && inputsValue.comment === '' &&
                        <label htmlFor='comment' className={style.labelInput} >
                          Ваш комментарий
                        </label>
                      }
                      <input
                        type='text'
                        name='comment'
                        required
                        className={style.input}
                        value={inputsValue.comment}
                        onChange={e => onHandleChange(e)}
                        onFocus={e => onFocusInput(e)}
                        onBlur={e => onBlurInput(e)} />
                    </li>
                    <li className={style.btnSubmitBox}>
                      <input type="submit" value="Оставить комментарий" className={style.btnSubmit} />
                    </li>
                  </ul>
                </form>

              </div>

              <ul className={style.comments}>
                {
                  bigImg.comments && bigImg.comments.length > 0 && bigImg.comments.map(({ text, id, date }) => (
                    <li key={id} className={style.commentBox} >
                      <div className={style.date} >
                        {`${getFormatDate(date, 'day')}.${getFormatDate(date, 'month')}.${getFormatDate(date, 'year')}`}
                      </div>
                      <div className={style.commentText}>{text}</div>
                    </li>
                  ))
                }
              </ul>

            </div>
          </div>
        ), modalRoot)
      }


      <footer className={style.footer}>
        <span>&#169; 2018-2019</span>
      </footer>
    </div>
  );
};

export default App;
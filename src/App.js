import React, { useEffect, useState } from 'react';
import { getBigImg, getImages } from './api';
import ImageBlock from './components/ImageBlock/ImageBlock';
import Modal from './components/Modal/Modal';
import astyle from './utils/styles/astyle.module.css';
import style from './App.module.css';




function App() {
  const [img, setImages] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);
  const [bigImg, setBigImg] = useState(null)

  const fetchImages = async () => {
    const data = await getImages();
    setImages([...data]);
  };

  const fetchBigImg = async () => {
    const data = await getBigImg(currentImg);
    setBigImg({ ...data });
  };


  const openModal = (id) => {
    setCurrentImg(id);
  };

  const closeModal = () => {
    setCurrentImg(null);
    setBigImg(null);
  };


  useEffect(() => {
    if (currentImg) {
      fetchBigImg();
    }
  }, [currentImg]);


  useEffect(() => {
    fetchImages();
  }, []);



  return (
    <div className={astyle.container}>
      <h1 className={style.title}>TEST APP</h1>
      <div className={style.imgBox}>
        {img && img.map(image =>
          <img className={style.img} src={image.url} alt={image.alt} onClick={() => openModal(image.id)} key={image.id} />
        )}
      </div>
      {currentImg && <Modal {...bigImg} closeModal={closeModal} />}
    </div>
  );
}

export default App;
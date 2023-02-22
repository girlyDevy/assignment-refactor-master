

import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "../../components/Button/Button";
import ProductList from "../../components/ProductList/ProductList";
import { Form } from "../../components/Form/Form";
import logo from "../../images/droppe-logo.png";
import img1 from "../../images/img1.png";
import img2 from "../../images/img2.png";
import styles from "./shopApp.module.css";
type ShopAppProps = {
  title: string;
  description: string;
  price: string;

}
export const ShopApp = () => {
  const [products, setProducts] = useState([] as any[]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [numFavorites, setNumFavorites] = useState(0);
  const [prodCount, setProdCount] = useState(0);

  useEffect(() => {
    setIsLoading(true)
    // added base url to env
    fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
      method: 'GET',

    })
      .then(response => response.json())
      .then(rawData => {
        let data = [];

        for (let i = 0; i < rawData.length; i++) {
          let updatedProd = rawData[i];
          data.push(updatedProd);
        }
        setProducts(data);
        setProdCount(data.length);
        
      }).finally(()=>{
        setIsLoading(false)
      })
  }, []);

  const favClick = (title: string) => {
    const prods = products;
    // ES6 
    const idx = prods?.findIndex(prod => prod.title === title);
    // const idx = lodash.findIndex(prods, { title: title });
    let currentFavs = numFavorites;
    let totalFavs;

    if (prods[idx].isFavorite) {
      prods[idx].isFavorite = false;
      totalFavs = --currentFavs;
    } else {
      totalFavs = ++currentFavs;
      prods[idx].isFavorite = true;
    }

    setProducts([...prods]);
    setNumFavorites(totalFavs);
  }

  const onSubmit = (payload: ShopAppProps) => {
    // alert(1)

    // const updated = lodash.clone(products);
    // In ES6, you can create a shallow copy of an array using the spread operator (...), like this:
    const updated = [...products];
    updated.push({
      title: payload.title,
      description: payload.description,
      price: payload.price
    });

    setProducts([...updated]);
    // setProdCount(lodash.size(products) + 1);
    // In ES6, you can get the length of an array using the length
    setProdCount(products.length + 1);
    setIsOpen(false);
    setIsShowingMessage(true);
    setMessage('Adding product...');

    fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
      method: "POST",
      body: JSON.stringify(
        {
          title: payload.title,
          price: payload.price,
          description: payload.description,
        }
      )
    })
      .then(res => res.json())
      .then(json => {
        setTimeout(() => {
          setIsShowingMessage(false);
          setMessage('');
        }, 2000)
      });
  }
  // moved to public index file since no routing is there
  // useEffect(() => {
  //   document.title = "Droppe refactor app";
  // }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={['container', styles.headerImageWrapper].join(' ')}>
          <img src={logo} className={styles.headerImage} />
        </div>
      </div>

      <>
        <span
          className={['container', styles.main].join(' ')}
          style={{ margin: '50px inherit', display: 'flex', justifyContent: 'space-evenly' }}
        >
          <img src={img1} style={{ maxHeight: "15em", display: 'block' }} />
          <img src={img2} style={{ maxHeight: "15rem", display: 'block' }} />
        </span>
      </>


      <div className={['container', styles.main].join(' ')} style={{ paddingTop: 0 }}>
        <div className={styles.buttonWrapper}>
          <span role="button">
            <Button

              onClick={() => setIsOpen(true)}
            >Send product proposal</Button>
          </span>
          {isShowingMessage && <div className={styles.messageContainer}>
            <i>{message}</i>
          </div>}
        </div>
        {isLoading?<h3 >Loading.....</h3>:null}

        <div className={styles.statsContainer}>
          <span>Total products: {prodCount}</span>
          {' - '}
          <span>Number of favorites: {numFavorites}</span>
        </div>

        {products && !!products.length ? <ProductList products={products} onFav={favClick} /> : <div></div>}
      </div>

      <>
        <Modal
          isOpen={isOpen}
          className={styles.reactModalContent}
          overlayClassName={styles.reactModalOverlay}
        >
          <div className={styles.modalContentHelper}>
            <div
              className={styles.modalClose}
              onClick={() => setIsOpen(false)}
            ><FaTimes /></div>

            <Form
              on-submit={onSubmit}
            />
          </div>
        </Modal>
      </>
    </>
  );
}




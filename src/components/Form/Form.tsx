

import React, { useState } from 'react';
import styles from "./Form.module.css";
import { Button } from '../Button/Button';
type IFormProps = {
  "on-submit": (payload: { title: string; description: string; price: string }) => void;
}
export const Form: React.FC<IFormProps> = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: any) => {

    e.preventDefault();

    if (!title) {
      alert("Your product needs a title");
      return;
    }

    if (!description || !price) {
      alert("Your product needs some content");
      return;
    }

    props["on-submit"]({
      title: title,
      description: description,
      price: price,
    });

    setTitle('');
    setDescription('');
    setPrice('');
    // formRef.current.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="title" className={styles.label}>Title</label>
      <input
        type="text"
        id="title"
        value={title}
        className={styles.input}
        // ref={titleRef}
        onChange={(e) => setTitle(e.target.value)}
      />



      <label htmlFor="price" className={styles.label}>Price</label>
      <input
        type="text"
        id="price"
        value={price}
        className={styles.input}
        // ref={priceRef}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label htmlFor="description" className={styles.label}>Description</label>
      <textarea
        id="description"
        value={description}
        className={styles.textarea}
        // ref={descriptionRef}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button>Add a product</Button>
    </form>
  );
}



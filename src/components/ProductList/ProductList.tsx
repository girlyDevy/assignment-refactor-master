// 
import React from "react";
import { FaStar } from "react-icons/fa";
import styles from "./ProductList.module.css"

interface IPostsProps {
  products: any;
  onFav: (title: string) => void;
}

const Posts: React.FC<IPostsProps> = ({ products, onFav }) => {
  const productsarr = products.map((p: any, i: number) => (
    <Product key={i} index={i} product={p} onFav={onFav} />
  )).reverse();

  return <div>{productsarr}</div>;
};

const Product: React.FC<{
  index: number;
  product: {
    title: string;
    description: string;
    price: number;
    isFavorite: boolean;
    rating: { rate: number; count: number };
  };
  onFav: (title: string) => void;
}> = ({ product, onFav }) => {
  const { product: productClass, productBody, actionBarItem, actionBarItemLabel } = styles;

  return (
    <span className={productClass} style={{ display: "inline-block", overflowX: "scroll", float: "none", clear: "both" }}>
      <span className={styles["product-title"]} style={{ overflowX: "hidden" }}>{product.title}</span>

      <p><strong>Rating: {product.rating ? `${product.rating.rate}/5` : ""}</strong></p>

      <p><b>Price: ${+product.price}</b></p>

      <p className={productBody}>
        <span><b>Description:</b></span>
        <br />
        {product.description}
      </p>

      <span className={styles["action_bar"]} style={{ display: "table", width: "100%" }}>
        <span className={`${actionBarItem} ${product.isFavorite ? "active" : ""}`} role="button" onClick={() => onFav(product.title)}>
          <FaStar /> <span className={actionBarItemLabel}>{product.isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </span>
      </span>
    </span>
  );
};

export default Posts;
export { Product };

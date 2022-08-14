import React from "react";
import "./checkoutProduct.css";
import { useStateValue } from "../stateProvider/stateProvider";

function CheckoutProd({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  console.log({ price });
  return (
    <div className="checkoutProduct">
      <img className="checkoutProductImage" src={image} />
      <div className="checkoutProductInfo">
        <p className="chackoutProductTitle">{title}</p>
        <p className="chackoutProductPrice">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProductRating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        <button className="removeButton" onClick={removeFromBasket}>
          Remove form cart
        </button>
      </div>
    </div>
  );
}

export default CheckoutProd;

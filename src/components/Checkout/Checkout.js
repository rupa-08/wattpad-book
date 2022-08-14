import React from "react";
import "./Checkout.css";
import { useStateValue } from "../stateProvider/stateProvider";
import Subtotal from "../Subtotal/Subtotal";
import CheckoutProd from "../checkoutProduct/CheckoutProd";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://www.digitalphotosoncanvas.com/catalog/view/theme/default/image/Save-15.png"
          alt=""
        />
        <div>
          <h2 className="checkout_title">
            <h3>Hello, {user?.email}</h3>
            Your Shopping Basket
          </h2>

          {basket.map((item) => (
            <CheckoutProd
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}

          {/* {
            basket.map(item => (
            <checkoutProduct 
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            
            />
             
            ))
           } */}
        </div>
      </div>
      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;

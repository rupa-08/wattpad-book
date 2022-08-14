import React, { useEffect, useState } from "react";
import CheckoutProd from "../checkoutProduct/CheckoutProd";
import "./Payment.css";
import { useStateValue } from "../stateProvider/stateProvider";
import { Link, Navigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotalAmout } from "../Reducer/reducer";
import axios from "../Axios/axios";
import { db } from "../Firebase/Firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [clientSecret, setClientSecret] = useState(true);

  // useEffect works when payment component load or when variabl inside the  [] cahnges i,e. basket
  // useEffect(() =>
  // {
  //         //generate special stripe secret when which allows us to charge a customer

  //         const getClientSecret = async () => {
  //             const response = await axios({
  //                 method: 'post',
  //                 //stripe expects the total in a currency subunit
  //                 url: `/payments/create?total=${getBasketTotalAmout(basket) * 100}`
  //             });
  //             setClientSecret(response.data.clientSecret)
  //         }
  //         getClientSecret();
  //     },[basket])

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotalAmout(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
      console.log("The secret is:", clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("The secret is:", clientSecret);

  const handleSubmit = async (event) => {
    //fancy stripe
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        //payment intent = payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        Navigate("/orders", { replace: true });
      });
  };

  const handleChange = (event) => {
    //listen the change inside the card element
    //and display any errors as the customer types their card details

    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="paymentContainer">
        <h1 className="heading1">
          Checkout (<Link to="/checkout">{basket?.length} Items</Link>)
        </h1>
        {/* Payment section - delivery address */}
        <div className="paymentSection">
          <div className="paymentTitle">
            <h3>Delivery Address</h3>
          </div>
          <div className="paymentAddress">
            <p>{user?.email}</p>
            <p>Kathmandu, Nepal</p>
            <p>Asia</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="paymentSection">
          <div className="paymentTitle">
            <h3>Review Items</h3>
          </div>
          <div className="paymentItems">
            {/* ALL PRODUCTS IN BASKET */}
            {basket.map((item) => (
              <CheckoutProd
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className="paymentSection">
          <div className="paymentTitle">
            <h3>Payment Method</h3>
          </div>
          <div className="paymentDetails">
            {/* STRIPE MAGIC WILL BE HERE */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="paymentPirceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total:{value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotalAmout(basket)}
                  displayType={"text"}
                  thousandSeparator="true"
                  prefix="$"
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* ERROR */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

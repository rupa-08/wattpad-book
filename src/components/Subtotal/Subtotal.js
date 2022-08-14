import React from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import { getBasketTotalAmout } from "../Reducer/reducer";
import { useStateValue } from "../stateProvider/stateProvider";
import "./Subtotal.css";

function Subtotal() {
  const navigate = useNavigate(); //browser history

  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items) : <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input className="inputField" type="checkbox" />
              This order contains gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotalAmout(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button className="button" onClick={(e) => navigate("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;

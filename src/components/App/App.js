//personal import
import "./App.css";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Checkout from "../Checkout/Checkout";
import Payment from "../Payment/Payment";
import Login from "../Login/Login";
import Orders from "../Order/Orders";
import { auth } from "../Firebase/Firebase";
import { useStateValue } from "../stateProvider/stateProvider";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";

//stripe import
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51LNa5QGvMqrTJofEK6zVMVraAhnytI8tfgLvH2y1xp6W17BdlHL6xsVIlsCtoQ2mlsc00ZqgWHYBc6o6P46CLDWU00EDZmB88I"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //this method will run one when the app components loads
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS:", authUser);

      if (authUser) {
        //the user just logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          ></Route>

          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          ></Route>

          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          ></Route>

          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          ></Route>

          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

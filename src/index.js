import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import App from "./components/App/App";
import { StateProvider } from "./components/stateProvider/stateProvider";
import reducer, { initialState } from "./components/Reducer/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider
      initialState={initialState}
      /* data at the begining */ reducer={reducer} /* data after manipulation*/
    >
      {/* here App is inside stateProvider so that every component can get access to the data layer */}
      <App />
    </StateProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

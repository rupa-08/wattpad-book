//button click -> data is pushed into data layer(redux) -> data is pulled from data layer when reuqired

import React, { useReducer, createContext, useContext } from "react";

//Prepares data layer
export const StateContext = createContext();


//Wrap our app and provide to data layer
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//Pull information form the data layer
export const useStateValue =() =>useContext(StateContext);
import React, { createContext, useReducer } from "react";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import HomeComp from "./Component/HomeComp";
import LoginComp from "./Component/LoginComp";
import MenuComp from "./Component/MenuComp";
import RegisterComp from "./Component/RegisterComp";

//Context
export const AuthContext = createContext();

//inisiasi state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BrowserRouter>
      <Switch>
        <AuthContext.Provider value={{ state, dispatch }}>
          <MenuComp />
          
          {!state.isAuthenticated ? (
            <Redirect to={{ pathname: "/" }} />
          ) : (
            <Redirect to={{ pathname: "homepage" }} />
          )}
          <Route exact path="/" component={LoginComp}/>
          <Route exact path="/homepage" component={HomeComp} />
          <Route exact path="/register" component={RegisterComp} />
        </AuthContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

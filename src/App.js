import React from "react";
import { createGlobalStyle } from "styled-components";
import Main from "./container/index";

const GlobalStyled = createGlobalStyle`
  *{ box-sizing: border-box;}
`;

function App() {
  return (
    <div className="App">
      <GlobalStyled />
      <Main />
    </div>
  );
}

export default App;

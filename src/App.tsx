import React from "react";

import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Converter from "./components/Converter";

function getLibrary(provider: any) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="page-wrapper">
        <Converter />
      </div>
    </Web3ReactProvider>
  );
}

export default App;

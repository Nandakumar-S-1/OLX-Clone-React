import React from "react";
import Home from "./Components/Pages/Home";
import { Route, Routes } from "react-router-dom";
import Details from "./Components/Details/Details";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<Home/>} />
        <Route path='/details' element={<Details />}/>
      </Routes>
    </>
  )
};

export default App;

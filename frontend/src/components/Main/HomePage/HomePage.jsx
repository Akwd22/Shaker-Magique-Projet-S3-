import React from "react";

import CocktailBox from "./CocktailBox_GRID/CocktailBox";
import CocktailList from "./CocktailList/CocktailList";
import "./HomePage.css";


function HomePage() {
  return (
    <div className="page homepage">
      <CocktailList>
      </CocktailList>
    </div>
  );
}

export default HomePage;

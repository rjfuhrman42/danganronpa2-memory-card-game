import React from 'react';
import crt_green_mask from "./assets/crt_green_mask.png"
import './index.css';

import Cards from "./components/Cards"

function App() {
  return (
    <div className="App crt">
       <img class="screen-frame" src={crt_green_mask}></img>
      <Cards />
    </div>
  );
}

export default App;

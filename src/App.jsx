import React from 'react'
import './App.css'
import CreateAccount from './scenes/Account/CreateAccount';
import AACreateAccount from './scenes/Account/AACreateAccount';
import ETHTaipeiLogo from './assets/ETHTaipei.jpg';
import aLogo from './assets/150162.jpg';

function App() {

  return (
    <div className="App">
      <div>
        <img src={ETHTaipeiLogo} width="300" height="150" />
        {/* <img src={aLogo} width="300" height="150" /> */}
      </div>
      {/* <div id="MainPage"> */}
        {/* <div id="div1">
          <div className="TopTitle">HD Wallet</div>
          <div><CreateAccount /></div>
        </div> */}
        <div id="div2" class="aa">
          <div className="TopTitle">CA Wallet</div>
          <div><AACreateAccount /></div>
        </div>
      {/* </div> */}
    </div>
  )
}

export default App

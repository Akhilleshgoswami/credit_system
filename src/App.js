
import { useState } from 'react';
import './App.css';
import Navbar from './components/header/header';
import { setstate } from './components/header/context/contextapi';
function App() {
  const [contract, setcontract] = useState();
  const [account, setaccount] = useState()
  return (
    <setstate.Provider value={{ contract,account,setaccount,setcontract }}>  
    <div className="App">
      <Navbar/>
    </div></setstate.Provider>
  );
}

export default App;

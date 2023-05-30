
import { useState,useEffect } from 'react';
import './App.css';
import Navbar from './components/header/header';
import { setstate } from './components/context/contextapi';
import {loadContracts} from "./components/contracts/loadContract"
import MainPage from './components/MainPage/Page';
import {getChainId} from "./utils/utils.js"
import { CHAIN_ID } from './utils/constant';
function App() {
  const [contractInstance, setcontract] = useState();
  const [account, setaccount] = useState()
  const [isMetamaskInstalled, setMetamaskInstalled] = useState(true)
  const [chainId, setchainId] = useState()
  const loadContract = async()=>{
      const contract = await loadContracts();
       setcontract(contract);
  }
  const setChianID = async()=>{
    setchainId(await getChainId())
  }
  const checkMetaMaskInstalled = () => {
    if (typeof window.ethereum !== 'undefined') {
      setChianID()
      console.log('MetaMask is installed!');
    } else {
      setMetamaskInstalled(false)
      console.log('MetaMask is not installed.');
    }
  }
  

  
  useEffect(() => {
    loadContract()
    checkMetaMaskInstalled()
  }, [])
  window.ethereum.on('chainChanged', ()=>{
    window.location.reload();
  });
  if(chainId !== CHAIN_ID){
    return (<div> 
    <h4>Your are on wrong network please switch to polygon mumbai</h4>
  </div>)
  }

  return (
    <setstate.Provider value={{ contractInstance,account,setaccount,setcontract }}>  
    {
      isMetamaskInstalled ?   <div className="App">
      <Navbar/>
      <MainPage/>
    </div> : 
    (  <div> 

      <h4>please install metamask</h4>
      <a href="https://metamask.io/download.html" target="_blank">Install MetaMask</a>
    </div> )
    }
  </setstate.Provider>
  );
}

export default App;

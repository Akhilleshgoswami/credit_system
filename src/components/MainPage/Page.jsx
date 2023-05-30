import React from 'react'
import { setstate } from '../context/contextapi';
import { useContext,useState,useEffect } from 'react';
import {loadContracts,loadErc20} from "../contracts/loadContract.js"
import {getAccount} from "../../utils/utils.js"
// import { ethers } from "ethers";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Web3 from "web3";
import { Link } from 'react-router-dom';
function MainPage() {
    const { contractInstance, account,setaccount,setcontract } = React.useContext(setstate);
    const [balance, setbalance] = useState(0)
    const [address, setAddress] = useState()
    const [amount, setAmount] = useState(0)
    const [erc20, seterc20] = useState()
    const [allowance, setallowance] = useState(0)
    const [ExplorerURL, setExplorerURL] = useState()

    const getuserBalance = async ()=>{
   
      if (!contractInstance) {
        const contract = await loadContracts();
        setcontract(contract);
        seterc20(await loadErc20());
        setaccount(await getAccount())
      }
      if(account != undefined){
  		const fakeDelay = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      };
  
      await fakeDelay();
        const balance = await contractInstance?.methods.balance(account).call();
        console.log(balance);
        setbalance(balance)  }
    }
   
    const approve = async () =>{
      console.log("data");
      try {
        // const infiniteApprovalValue = Web3.utils.toBN(2).pow(Web3.utils.toBN(256)).sub(Web3.utils.toBN(1));
       const result =  await erc20?.methods.approve("0xf5B4F8d58Cc3Af2e36B016b49ec45A328A5618c4",2^256-1).send({from:account});
       const ethersacnExplorerURL = "https://mumbai.polygonscan.com/tx/";
      setExplorerURL(ethersacnExplorerURL + result?.transactionHash);
      } catch (error) {
        console.log(error)
      }
    }
    const transfer = async () =>{

      try {
     const result =   await contractInstance?.methods.transferCredits(address,Web3.utils.toWei(amount)).send({from:account});
        await  getuserBalance()
        const ethersacnExplorerURL = "https://mumbai.polygonscan.com/tx/";
       setExplorerURL(ethersacnExplorerURL + result?.transactionHash);
      } catch (error) {
        console.log(error)
      }

    }
    const mint = async () =>{

      try {
      const result =   await contractInstance?.methods.mint(address,Web3.utils.toWei(amount)).send({from:account});
      await  getuserBalance()
      const ethersacnExplorerURL = "https://mumbai.polygonscan.com/tx/";
       setExplorerURL(ethersacnExplorerURL + result?.transactionHash);
      } catch (error) {
        console.log(error)
      }

    }

    const getAllowance = async()=>{
      try {
      const allowance =   await erc20?.methods.allowance(account,"0xf5B4F8d58Cc3Af2e36B016b49ec45A328A5618c4").call();
      setallowance(allowance)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
      getuserBalance()
      getAllowance()
    }, [account])




  return (
<div>
    <h1>User Credit {balance / 1e18}</h1>


      
          <TextField
          required
          id="outlined-required"
          label="token amount"
       
          type="number"
          onChange={e=>setAmount(e.target.value)}
        />
        {
          allowance > 0 ? <Button variant="contained" onClick={transfer}>Transfer Credit</Button> : <Button variant="contained" onClick={approve}>Approve</Button>
        }

     
  
        {
          account === "0xE0E24a32A7e50Ea1c7881c54bfC1934e9b50B520"? (<div>
              <TextField
          required
          id="outlined-required"
          label="reciver address"
          onChange={e=>setAddress(e.target.value)}
        />
          <TextField
          required
          id="outlined-required"
          label="token amount"
       
          type="number"
          onChange={e=>setAmount(e.target.value)}
        />
        <Button variant="contained" onClick={mint}>Mintcredit</Button>
            </div>):""
        }
       
        {ExplorerURL !== undefined ?  (<div>
      <a href = {ExplorerURL} target="_blank">transactionHash</a>

    </div>) : "" } 
  </div>
  )
}

export default MainPage
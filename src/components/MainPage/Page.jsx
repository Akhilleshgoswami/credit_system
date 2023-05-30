import React, { useState } from 'react'
import { setstate } from '../context/contextapi';
import { useEffect } from 'react';
import {loadContracts,loadErc20} from "../contracts/loadContract.js"
import {getAccount} from "../../utils/utils.js"

// import { ethers } from "ethers";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./Page.css"
import Web3 from "web3";
import { CONTRACT_ADDRESS } from '../../utils/constant';
function MainPage() {
    const { contractInstance, account,setaccount,setcontract } = React.useContext(setstate);
    const [balance, setbalance] = useState(0)
    const [address, setAddress] = useState()
    const [amount, setAmount] = useState(0)
    const [erc20, seterc20] = useState()
    const [allowance, setallowance] = useState(0)
    const [ExplorerURL, setExplorerURL] = useState()
    function showAlert(value) {
      window.alert(value);
    }
    
    const getuserBalance = async ()=>{
   
      if (!contractInstance) {
        setaccount(await getAccount())
        const contract = await loadContracts();
        setcontract(contract);

      }
      const erc20add = await loadErc20()
   
      seterc20(erc20add);
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
    if(account === undefined) {showAlert("Please connect to matamask");
       return}
      if( address == undefined ||  amount === undefined) {showAlert("please feel the input filed"); return;};
      try {
        const infiniteApprovalValue = Web3.utils.toBN(2).pow(Web3.utils.toBN(256)).sub(Web3.utils.toBN(1));
       const result =  await erc20?.methods.approve(CONTRACT_ADDRESS,infiniteApprovalValue).send({from:account});
       const ethersacnExplorerURL = "https://mumbai.polygonscan.com/tx/";
       await getAllowance()
      setExplorerURL(ethersacnExplorerURL + result?.transactionHash);
      setAmount(0)
      setAddress("")
      } catch (error) {
        console.log(error)
      }
    }
    const transfer = async () =>{

      if(account === undefined) {showAlert("Please connect to matamask");
        return}
        if( address == undefined ||  amount === undefined) {showAlert("please feel the input filed"); return;};
      try {
     const result =   await contractInstance?.methods.transferCredits(address,Web3.utils.toWei(amount)).send({from:account});
        await  getuserBalance()
        const ethersacnExplorerURL = "https://mumbai.polygonscan.com/tx/";
       setExplorerURL(ethersacnExplorerURL + result?.transactionHash);
       setAmount(0)
       setAddress("")
      } catch (error) {
        console.log(error)
      }

    }
    const mint = async () =>{
      if(account === undefined) {showAlert("Please connect to matamask");
        return}
        if( address == undefined) {showAlert("please feel the input filed"); return;};
      try {
      const result =   await contractInstance?.methods.mint(address).send({from:account});
      await  getuserBalance()
      const ethersacnExplorerURL = "https://mumbai.polygonscan.com/tx/";
       setExplorerURL(ethersacnExplorerURL + result?.transactionHash);
       setAmount(0)
       setAddress("")
      } catch (error) {
        console.log(error)
      }

    }

    const getAllowance = async()=>{
      try {
      const allowance =   await erc20?.methods.allowance(account,CONTRACT_ADDRESS).call();
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

<div className='flex'>

<TextField
          className='inputs'
          required
          InputProps={{ required: true }}
          id="outlined-required"
          value={address}
          label="reciver address"
          onChange={e=>setAddress(e.target.value)}
        />

<TextField
               className='inputs'
          required
          InputProps={{ required: true }}
          id="outlined-required"
          label="token amount"
          value={amount}
          type="number"
          onChange={e=>setAmount(e.target.value)}
        />
        {
          allowance > 0 ? <Button variant="contained" onClick={transfer}>Transfer Credit</Button> : <Button variant="contained" onClick={approve}>Approve</Button>
        }

  </div>

     
  
        {
          account === "0xE0E24a32A7e50Ea1c7881c54bfC1934e9b50B520"? (<div className="flex">
              <TextField
                   className='inputs'
                   value={address}
          required
          id="outlined-required"
          label="reciver address"
          onChange={e=>setAddress(e.target.value)}
        />
        <Button variant="contained" onClick={mint}>Mintcredit</Button>
            </div>):""
        }
       
        {ExplorerURL !== undefined ?  (<div>
     <h3>
     {  <a href = {ExplorerURL} target="_blank">transactionHash</a> }
      </h3> 

    </div>) : "" } 
  </div>
  )
}

export default MainPage
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// import { getProvider } from './contracts/loadContract';
// import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { setstate } from '../context/contextapi';
import Web3 from 'web3';
export default function Navbar() {
  const { contract, account,setaccount } = React.useContext(setstate);
 
  const connectToMetaMask = async () => {
    // Modern dapp browsers like MetaMask inject their own web3 instance
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create a new Web3 instance
        const web3 = new Web3(window.ethereum);
        
        // Do something with the web3 instance, such as fetching the user's account address
        const accounts = await web3.eth.getAccounts();
        console.log('Connected to MetaMask. Account:', accounts[0]);
        setaccount(accounts[0]);
        
        // Add additional logic here, such as interacting with smart contracts
        
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('Please install MetaMask to use this feature.');
    }
  };
    if(window.ethereum){
      window.ethereum.on("accountsChanged", function (accounts) {
        // Time to reload your interface with accounts[0]!
        window.location.reload();
      })
    }





  const disconnectToMetaMask = ()=>{
    setaccount(undefined);
  }
  console.log(account)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Chain Credit System 
          </Typography>
          {
            account !== undefined  ?   <Button color="inherit" onClick={disconnectToMetaMask}> {account.slice(1,10)}... disConnect</Button> : <Button color="inherit" onClick={connectToMetaMask}>Connect</Button>
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import abi from "./contract_abi";
import ercabi from "./erc20_abi";
import Web3 from "web3";
import {CONTRACT_ADDRESS, CREDIT_TOKEN} from '../../utils/constant'
const getProvider = async () => {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      try {

        return ethereum;
      } catch (error) {
        console.log(error);
      }
    }
  };


const loadContracts = async () => {
    const web3 = new Web3(await getProvider());
    const contractInstance =  new web3.eth.Contract(
        abi.abi,
        CONTRACT_ADDRESS
    );
    console.log(contractInstance);
    return contractInstance

};
const loadErc20 = async()=>{
  const web3 = new Web3(await getProvider());
  const contractInstance =  new web3.eth.Contract(
    ercabi.abi,
    CREDIT_TOKEN
  );
  console.log("my contract",contractInstance)
  return contractInstance

}
export {  getProvider,loadContracts,loadErc20};
import abi from "./contract_abi";
import ercabi from "./erc20_abi";
import Web3 from "web3";

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
    const contractInstance = await new web3.eth.Contract(
        abi.abi,
        "0xf5B4F8d58Cc3Af2e36B016b49ec45A328A5618c4"
    );
    console.log(contractInstance);
    return contractInstance

};
const loadErc20 = async()=>{
  const web3 = new Web3(await getProvider());
  const contractInstance = await new web3.eth.Contract(
    ercabi.abi,
      "0xd6900Eb414A51Cec95b42D09f84Cf8799C3D5A26"
  );
  console.log(contractInstance);
  return contractInstance

}
export {  getProvider,loadContracts,loadErc20};
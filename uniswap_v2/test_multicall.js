// Install Multicall
// yarn add eth-multicall

// Imports
import { MultiCall } from 'eth-multicall'
const Web3 = require("web3");
// RPC 
const URL = 'http://oasis-ssvm-demo.secondstate.io:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(URL));

// Live data
function get_data() {
    return new Promise(function(resolve, reject) {
        fs.readFile('../installation_data.json', (err, data) => {
            if (err) throw err;
            resolve(data);
        });
    });
}

// Execute multi call 
(async () => {
    await web3.eth.net.isListening();
    console.log('Web3 is connected.');


    var data = await get_data();
    var data_object = JSON.parse(data);
	const multiCallContract = data_object.contract_address.multicall;
	const multicall = new MultiCall(web3, multiCallContract);

	 const addresses = [
	   data_object.contract_address.alice_erc20_token,
	   data_object.contract_address.bob_erc20_token
	 ];

	 const tokens = addresses.map((address) => {
	   const token = new web3.eth.Contract(data_object.abi.erc20, address);
	   return {
	     symbol: token.methods.symbol(),
	     decimals: token.methods.decimals(),
	   };
	 });

})();
const fs = require('fs');
const Web3 = require("web3");
const URL = 'https://mainnet.infura.io/v3/0920fdea265848a9b49dd72674c088a7';
const web3 = new Web3(new Web3.providers.HttpProvider(URL));

function get_data(_message) {
    return new Promise(function(resolve, reject) {
        fs.readFile('../installation_data.json', (err, data) => {
            if (err) throw err;
            resolve(data);
        });
    });
}

(async () => {
    await web3.eth.net.isListening();
    console.log('Web3 is connected.');

    var data = await get_data();
    var data_object = JSON.parse(data);

// Factory
    var uniswapV2Abi = data_object.abi.uniswap_v2;
    var uniswapFactoryContract = new web3.eth.Contract(uniswapV2Abi, "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f");
    console.log("Checking feeTo ...");
    var feeTo = uniswapFactoryContract.methods.feeTo().call()
        feeTo.then(function(resultFeeTo) {
        console.log("V2 Factory feeTo is currently set to: " + resultFeeTo);
    })
    var feeToSetter = uniswapFactoryContract.methods.feeToSetter().call()
        feeToSetter.then(function(resultFeeToSetter) {
        console.log("v2 Factory feeToSetter is currently set to: " + resultFeeToSetter);
    })

// WETH
    var uniswapWETHAbi = data_object.abi.weth;
    var uniswapWethContract = new web3.eth.Contract(uniswapWETHAbi, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
    console.log("Checking feeTo ...");
    var feeTo = uniswapWethContract.methods.totalSupply().call()
        feeTo.then(function(resultTotalSupply) {
        console.log("WETH totalSupply is set to: " + resultTotalSupply);
    })
/*
// These (factoryV1 and router) are not public vars they are declared as immutable vars so we were unable to access them
// Migrator
    var uniswapMigratorAbi = data_object.abi.migrator;
    var uniswapMigratorContract = new web3.eth.Contract(uniswapMigratorAbi, "0x16D4F26C15f3658ec65B1126ff27DD3dF2a2996b");
    console.log("Checking feeTo ...");
    var factoryV1 = uniswapMigratorContract.methods.factoryV1().call()
        factoryV1.then(function(resultFactoryV1) {
        console.log("Migrator's factory V1 is set to: " + resultFactoryV1);
    })
    var routerVar = uniswapMigratorContract.methods.router().call()
        routerVar.then(function(resultRouter) {
        console.log("Migrator's router is set to: " + resultRouter);
    })
*/

// end await
})();
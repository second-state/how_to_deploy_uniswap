const fs = require('fs');
const Web3 = require("web3");
//const URL = 'https://mainnet.infura.io/v3/0920fdea265848a9b49dd72674c088a7';
const URL = 'http://oasis-ssvm-amber.secondstate.io:8545';
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

// uniswap_factory
    var uniswapV1Contract = new web3.eth.Contract(data_object.abi.uniswap_factory, data_object.contract_address.uniswap_factory);
    var feeTo = uniswapV1Contract.methods.exchangeTemplate().call()
        feeTo.then(function(resultexchangeTemplate) {
        console.log("V1 exchangeTemplate is set to: " + resultexchangeTemplate);
    })

// Factory
    var uniswapFactoryContract = new web3.eth.Contract(data_object.abi.uniswap_v2, data_object.contract_address.uniswap_v2);
    var feeTo = uniswapFactoryContract.methods.feeTo().call()
        feeTo.then(function(resultFeeTo) {
        console.log("V2 Factory feeTo is currently set to: " + resultFeeTo);
    })
    var feeToSetter = uniswapFactoryContract.methods.feeToSetter().call()
        feeToSetter.then(function(resultFeeToSetter) {
        console.log("v2 Factory feeToSetter is currently set to: " + resultFeeToSetter);
    })
    var allPairsLength = uniswapFactoryContract.methods.allPairsLength().call()
        allPairsLength.then(function(resultallPairsLength) {
        console.log("v2 Factory allPairsLength is currently set to: " + resultallPairsLength);
    })

// Router
    var uniswapRouterContract = new web3.eth.Contract(data_object.abi.router, data_object.contract_address.router);
    var factory = uniswapRouterContract.methods.factory().call()
        factory.then(function(resultfactory) {
        console.log("V2 Router02 factory is currently set to: " + resultfactory);
    })
    var factory = uniswapRouterContract.methods.WETH().call()
        factory.then(function(resultWETH) {
        console.log("V2 Router02 WETH is currently set to: " + resultWETH);
    })

// WETH
    var uniswapWethContract = new web3.eth.Contract(data_object.abi.weth, data_object.contract_address.weth);
    var feeTo = uniswapWethContract.methods.totalSupply().call()
        feeTo.then(function(resultTotalSupply) {
        console.log("WETH totalSupply is set to: " + resultTotalSupply);
    })

// Multicall
    var uniswapMilticallContract = new web3.eth.Contract(data_object.abi.multicall, data_object.contract_address.multicall);
    var getLastBlockHash = uniswapMilticallContract.methods.getLastBlockHash().call()
        getLastBlockHash.then(function(resultgetLastBlockHash) {
        console.log("Multicall getLastBlockHash is set to: " + resultgetLastBlockHash);
    })
    var getCurrentBlockTimestamp = uniswapMilticallContract.methods.getCurrentBlockTimestamp().call()
        getCurrentBlockTimestamp.then(function(resultgetCurrentBlockTimestamp) {
        console.log("Multicall getCurrentBlockTimestamp is set to: " + resultgetCurrentBlockTimestamp);
    })
    var getCurrentBlockDifficulty = uniswapMilticallContract.methods.getCurrentBlockDifficulty().call()
        getCurrentBlockDifficulty.then(function(resultgetCurrentBlockDifficulty) {
        console.log("Multicall getCurrentBlockDifficulty is set to: " + resultgetCurrentBlockDifficulty);
    })
    var getCurrentBlockGasLimit = uniswapMilticallContract.methods.getCurrentBlockGasLimit().call()
        getCurrentBlockGasLimit.then(function(resultgetCurrentBlockGasLimit) {
        console.log("Multicall getCurrentBlockGasLimit is set to: " + resultgetCurrentBlockGasLimit);
    })
    var getCurrentBlockCoinbase = uniswapMilticallContract.methods.getCurrentBlockCoinbase().call()
        getCurrentBlockCoinbase.then(function(resultgetCurrentBlockCoinbase) {
        console.log("Multicall getCurrentBlockCoinbase is set to: " + resultgetCurrentBlockCoinbase);
    })

// Migrator
    var uniswapMigratorContract = new web3.eth.Contract(data_object.abi.migrator, data_object.contract_address.migrator);
    console.log("Migrator: " + JSON.stringify(uniswapMigratorContract.methods));

// end await
})();
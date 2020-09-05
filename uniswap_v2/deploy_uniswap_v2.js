'use strict';
const fs = require('fs');
const HDWalletProvider = require('truffle-hdwallet-provider');

function get_data(_message) {
    return new Promise(function(resolve, reject) {
        fs.readFile('../installation_data.json', (err, data) => {
            if (err) throw err;
            resolve(data);
        });
    });
}

function write_data(_message) {
    return new Promise(function(resolve, reject) {
        fs.writeFile('../installation_data.json', _message, (err) => {
            if (err) throw err;
            console.log('Data written to file');
            resolve();
        });
    });
}

var privateKeys = [];
var URL = "";


(async () => {
    // Read in the configuration information
    var data = await get_data();
    var data_object = JSON.parse(data);
    // Add keys
    console.log("Adding Alice, Bob and Charlie keys ...");
    privateKeys.push(data_object.private_key.alice, data_object.private_key.bob, data_object.private_key.charlie);
    // RPC
    URL = data_object.provider.rpc_endpoint;

    // Web3 - keys and accounts
    const Web3 = require("web3");
    const provider = new HDWalletProvider(privateKeys, URL, 0, 3);
    const web3 = new Web3(provider);
    await web3.eth.net.isListening();
    console.log('Web3 is connected.');
    let accounts = await web3.eth.getAccounts();
    console.log(`accounts: ${JSON.stringify(accounts)}`);

    // -- Uniswap V2
    var uniswapV2Bytecode = data_object.bytecode.uniswap_v2;
    var uniswapV2Abi = data_object.abi.uniswap_v2;
    var uniswapMulticallBytecode = data_object.bytecode.multicall;
    var uniswapMulticallAbi = data_object.abi.multicall;
    var uniswapMigratorBytecode = data_object.bytecode.migrator;
    var uniswapMigratorAbi = data_object.abi.migrator;
    var uniswapRouterBytecode = data_object.bytecode.router;
    var uniswapRouterAbi = data_object.abi.router;
    var uniswapEnsRegistryBytecode = data_object.bytecode.ens_registry;
    var uniswapEnsRegistryAbi = data_object.abi.ens_registry;
    var uniswapUnisocksBytecode = data_object.bytecode.unisocks;
    var uniswapUnisocksAbi = data_object.abi.unisocks;

    // Uniswap V2
    // V2 Factory Deployment
    console.log("Deploying Uniswap V2 now, please wait ...");
    let uniswapV2;
    uniswapV2 = await web3.eth.sendTransaction({
        from: accounts[2],
        data: uniswapV2Bytecode
    }); // Charlie accounts[2] is the owner
    let uniswapV2Instance = new web3.eth.Contract(uniswapV2Abi, uniswapV2.contractAddress);
    console.log(`\nUniswap V2 deployed at ${uniswapV2.contractAddress}`);
    console.log(`\n${uniswapV2}`);
    console.log(`\n${uniswapV2Instance}`);
    console.log(`Please store these details for future use ^^^\n`);
    data_object.contract_address.uniswap_v2 = uniswapV2.contractAddress;

    // V2 Multicall Deployment
    console.log("Deploying multicall now, please wait ...");
    let multicall;
    multicall = await web3.eth.sendTransaction({
        from: accounts[2],
        data: uniswapMulticallBytecode
    }); // Charlie accounts[2] is the owner
    let uniswapMulticallInstance = new web3.eth.Contract(uniswapMulticallAbi, multicall.contractAddress);
    console.log(`\nUniswap V2 deployed at ${multicall.contractAddress}`);
    console.log(`\n${multicall}`);
    console.log(`\n${uniswapMulticallInstance}`);
    console.log(`Please store these details for future use ^^^\n`);
    data_object.contract_address.multicall = multicall.contractAddress;

    // V2 Migrator Deployment
    console.log("Deploying migrator now, please wait ...");
    let migrator;
    migrator = await web3.eth.sendTransaction({
        from: accounts[2],
        data: uniswapMigratorBytecode
    }); // Charlie accounts[2] is the owner
    let uniswapMigratorInstance = new web3.eth.Contract(uniswapMigratorAbi, migrator.contractAddress);
    console.log(`\nUniswap V2 deployed at ${migrator.contractAddress}`);
    console.log(`\n${migrator}`);
    console.log(`\n${uniswapMigratorInstance}`);
    console.log(`Please store these details for future use ^^^\n`);
    data_object.contract_address.migrator = migrator.contractAddress;

    // V2 Router Deployment
    console.log("Deploying router now, please wait ...");
    let router;
    router = await web3.eth.sendTransaction({
        from: accounts[2],
        data: uniswapRouterBytecode
    }); // Charlie accounts[2] is the owner
    let uniswapRouterInstance = new web3.eth.Contract(uniswapRouterAbi, router.contractAddress);
    console.log(`\nUniswap V2 deployed at ${router.contractAddress}`);
    console.log(`\n${router}`);
    console.log(`\n${uniswapRouterInstance}`);
    console.log(`Please store these details for future use ^^^\n`);
    data_object.contract_address.router = router.contractAddress;


    // V2 ENS registry Deployment
    console.log("Deploying ENS registry now, please wait ...");
    let ens_registry;
    ens_registry = await web3.eth.sendTransaction({
        from: accounts[2],
        data: uniswapEnsRegistryBytecode
    }); // Charlie accounts[2] is the owner
    let uniswapEnsRegistryInstance = new web3.eth.Contract(uniswapEnsRegistryAbi, ens_registry.contractAddress);
    console.log(`\nUniswap V2 deployed at ${ens_registry.contractAddress}`);
    console.log(`\n${ens_registry}`);
    console.log(`\n${uniswapEnsRegistryInstance}`);
    console.log(`Please store these details for future use ^^^\n`);
    data_object.contract_address.ens_registry = ens_registry.contractAddress;
    let data_to_write = JSON.stringify(data_object, null, 2);
    await write_data(data_to_write);

    // V2 Unisocks Deployment
    console.log("Deploying Unisocks now, please wait ...");
    let unisocks;
    unisocks = await web3.eth.sendTransaction({
        from: accounts[2],
        data: uniswapUnisocksBytecode
    }); // Charlie accounts[2] is the owner
    let uniswapUnisocksInstance = new web3.eth.Contract(uniswapUnisocksAbi, unisocks.contractAddress);
    console.log(`\nUniswap V2 deployed at ${unisocks.contractAddress}`);
    console.log(`\n${unisocks}`);
    console.log(`\n${uniswapUnisocksInstance}`);
    console.log(`Please store these details for future use ^^^\n`);
    data_object.contract_address.unisocks = unisocks.contractAddress;
    let data_to_write = JSON.stringify(data_object, null, 2);
    await write_data(data_to_write);



    await provider.engine.stop();
})();

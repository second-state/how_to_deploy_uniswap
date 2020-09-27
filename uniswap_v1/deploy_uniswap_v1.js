// ** Please note this is a draft and this code is under heavy development. Not to be used in production **

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
    //console.log("Private keys: " + privateKeys);
    let accounts = await web3.eth.getAccounts();
    console.log(`accounts: ${JSON.stringify(accounts)}`);

    // Add ABIs
    // -- ERC20
    var erc20Abi = data_object.abi.erc20;
    // -- Uniswap
    var uniswapFactoryAbi = data_object.abi.uniswap_factory;
    var uniswapExchangeAbi = data_object.abi.uniswap_exchange;
    // -- Uniswap V2
    var uniswapV2Abi = data_object.abi.uniswap_v2;
    // Add bytecode
    // -- ERC20
    var bytecode_alice = data_object.bytecode.alice_erc_20;
    var bytecode_bob = data_object.bytecode.bob_erc20;
    // -- Uniswap
    var uniswapFactoryBytecode = data_object.bytecode.uniswap_factory;
    var uniswapExchangeBytecode = data_object.bytecode.uniswap_exchange;
    // -- Uniswap V2
    var uniswapV2Bytecode = data_object.bytecode.uniswap_v2;
    // ERC20 deployment
    let aliceToken;
    aliceToken = await web3.eth.sendTransaction({
        from: accounts[0],
        data: bytecode_alice
    });
    let aliceTokenInstance = new web3.eth.Contract(erc20Abi, aliceToken.contractAddress);
    console.log(`\nAlice contract created at ${aliceToken.contractAddress}\nPlease store this address for future use ^^^\n`);
    data_object.contract_address.alice_erc20_token = aliceToken.contractAddress;

    let aliceBalance;
    aliceBalance = await aliceTokenInstance.methods.balanceOf(accounts[0]).call();
    console.log(`aliceTokenInstance.balanceOf(${accounts[0]}) = ${aliceBalance}`);

    let bobToken;
    bobToken = await web3.eth.sendTransaction({
        from: accounts[1],
        data: bytecode_bob
    });
    let bobTokenInstance = new web3.eth.Contract(erc20Abi, bobToken.contractAddress);
    console.log(`\nBob contract created at ${bobToken.contractAddress}\nPlease store this address for future use ^^^\n`);
    data_object.contract_address.bob_erc20_token = bobToken.contractAddress;

    let bobBalance;
    bobBalance = await bobTokenInstance.methods.balanceOf(accounts[1]).call();
    console.log(`bobTokenInstance.balanceOf(${accounts[1]}) = ${bobBalance}`);

    // Factory deployment
    let uniswapFactory;
    uniswapFactory = await web3.eth.sendTransaction({
        from: accounts[2],
        data: uniswapFactoryBytecode
    }); // Charlie accounts[2] is the owner
    let uniswapFactoryInstance = new web3.eth.Contract(uniswapFactoryAbi, uniswapFactory.contractAddress);
    console.log(`\nFactory contract deployed at ${uniswapFactory.contractAddress}`);
    console.log(`Please store this factory address for future use ^^^`);
    data_object.contract_address.uniswap_factory = uniswapFactory.contractAddress;

    // Exchange template deployment
    let uniswapExchangeTemplate;
    uniswapExchangeTemplate = await web3.eth.sendTransaction({
        from: accounts[2],
        data: uniswapExchangeBytecode
    }); // Charlie accounts[2] is the owner
    let uniswapExchangeTemplateInstance = new web3.eth.Contract(uniswapExchangeAbi, uniswapExchangeTemplate.contractAddress);
    console.log(`\nUniswap Exchange TEMPLATE contract deployed at ${uniswapExchangeTemplate.contractAddress}`);
    console.log(`Please store this exchange template address for future use ^^^\n`);
    data_object.contract_address.uniswap_exchange_template = uniswapExchangeTemplate.contractAddress;

    // Factory and exchange template linking
    var link = await uniswapFactoryInstance.methods.initializeFactory(uniswapExchangeTemplate.contractAddress).send({
        from: accounts[2]
    }); // Charlie accounts[2] is the owner
    console.log(`\nFactory and exchange templates successfully linked at transaction: ${link}`);

    // ERC20 exchange creation
    console.log("Creating the exchange for Alice's " + aliceToken.contractAddress + " token. \nPlease wait ...");
    let aliceExchange = await uniswapFactoryInstance.methods.createExchange(aliceToken.contractAddress).send({
        from: accounts[2]
    }); // Charlie accounts[2] is the owner

    let aliceExchangeAddress;
    aliceExchangeAddress = await uniswapFactoryInstance.methods.getExchange(aliceToken.contractAddress).call();
    console.log("Alice's Uniswap exchange is now live at: " + aliceExchangeAddress);
    console.log(`Please store this factory address for future use ^^^\n`);
    data_object.contract_address.alice_exchange = aliceExchangeAddress;

    console.log("Creating the exchange for Bob's " + bobToken.contractAddress + " token. \nPlease wait ...");
    let bobExchange = await uniswapFactoryInstance.methods.createExchange(bobToken.contractAddress).send({
        from: accounts[2]
    }); // Charlie accounts[2] is the owner

    let bobExchangeAddress;
    bobExchangeAddress = await uniswapFactoryInstance.methods.getExchange(bobToken.contractAddress).call();
    console.log("Bob's Uniswap exchange is now live at: " + bobExchangeAddress);
    console.log(`Please store this factory address for future use ^^^\n`);
    data_object.contract_address.bob_exchange = bobExchangeAddress;
    
/* We can approve via the button in the interface
    // Approve user accounts to spend
    let approvalForAlice;
    approvalForAlice = await aliceTokenInstance.methods.approve(aliceExchangeAddress, web3.utils.toWei('100', 'ether')).send({
        "from": accounts[0]
    });
    console.log(approvalForAlice);

    let approvalForBob;
    approvalForBob = await bobTokenInstance.methods.approve(bobExchangeAddress, web3.utils.toWei('100', 'ether')).send({
        from: accounts[1]
    });
    console.log(approvalForBob);
*/   
/* We can add liquidity manually in the interface
    // Adding liquidity
    var amountOfAliceTokensToDeposit = web3.utils.toWei('100', 'ether');
    var amountOfBobTokensToDeposit = web3.utils.toWei('100', 'ether');
    // The amount of Ether tokens to deposit when adding liquidity - currently set to five thousand 
    var amountOfEthToDeposit = web3.utils.toWei('10', 'ether');

    // Create exchange instances
    let aliceExchangeTemplateInstance = new web3.eth.Contract(uniswapExchangeAbi, aliceExchangeAddress);
    let bobExchangeTemplateInstance = new web3.eth.Contract(uniswapExchangeAbi, bobExchangeAddress);
    // Add the liquidity
    let aliceLiquidity;
    aliceLiquidity = await aliceExchangeTemplateInstance.methods.addLiquidity(0, amountOfAliceTokensToDeposit, 1661840591).send({
        "from": accounts[0],
        value: amountOfEthToDeposit,
        gas: "400000"
    });
    console.log(aliceLiquidity);
    let bobLiquidity;
    bobLiquidity = await bobExchangeTemplateInstance.methods.addLiquidity(0, amountOfBobTokensToDeposit, 1661840591).send({
        "from": accounts[1],
        value: amountOfEthToDeposit,
        gas: "400000"
    });
    console.log(bobLiquidity);
*/
    let data_to_write = JSON.stringify(data_object, null, 2);
    await write_data(data_to_write);


    await provider.engine.stop();
})();

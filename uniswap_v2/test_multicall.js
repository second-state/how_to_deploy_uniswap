// cd ~
// yarn add @makerdao/multicall
// git clone https://github.com/makerdao/multicall.js.git
// cd multicall.js
// vi the package.json file in the multicall.js directory
// change the test "examples/es-example.js" to the location of this file i.e. /home/me/how_to.../uni.../test_multicall.js
// yarn
// yarn example 
import { createWatcher } from '@makerdao/multicall';
const fs = require('fs');
function get_data() {
    return new Promise(function(resolve, reject) {
        fs.readFile('../installation_data.json', (err, data) => {
            if (err) throw err;
            resolve(data);
        });
    });
}

(async () => {
    // Read in the configuration information
    var data = await get_data();
    var data_object = JSON.parse(data);
    // 
    const config = {
        rpcUrl: data_object.provider.rpc_endpoint,
        multicallAddress: data_object.contract_address.multicall
    };

    const watcher = createWatcher(
        [{
                call: [
                    'getEthBalance(address)(uint256)',
                    data_object.public_key.alice
                ],
                returns: [
                    ['ETH_BALANCE', val => val / 10 ** 18]
                ]
            },
            {
                call: ['getBlockHash(uint256)(bytes32)', 11482494],
                returns: [
                    ['SPECIFIC_BLOCK_HASH_0xFF4DB']
                ]
            },
            {
                call: ['getLastBlockHash()(bytes32)'],
                returns: [
                    ['LAST_BLOCK_HASH']
                ]
            },
            {
                call: ['getCurrentBlockTimestamp()(uint256)'],
                returns: [
                    ['CURRENT_BLOCK_TIMESTAMP']
                ]
            },
            {
                call: ['getCurrentBlockDifficulty()(uint256)'],
                returns: [
                    ['CURRENT_BLOCK_DIFFICULTY']
                ]
            },
            {
                call: ['getCurrentBlockGasLimit()(uint256)'],
                returns: [
                    ['CURRENT_BLOCK_GASLIMIT']
                ]
            },
            {
                call: ['getCurrentBlockCoinbase()(address)'],
                returns: [
                    ['CURRENT_BLOCK_COINBASE']
                ]
            }
        ],
        config
    );


    // Subscribe to state updates
    watcher.subscribe(update => {
        console.log(`Update: ${update.type} = ${update.value}`);

        // Subscribe to new block number updates
        watcher.onNewBlock(blockNumber => {
            console.log('New block:', blockNumber);
        });

        // Start the watcher polling
        watcher.start();
    });

})();
//** Please note this is a draft and this code is under heavy development. Not to be used in production **

# How to deploy Uniswap

## Housekeeping

```
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get install npm
npm install fs
npm install truffle-hdwallet-provider
```

Clone the Uniswap Interface code using Git.
```
cd ~
git clone https://github.com/Uniswap/uniswap-interface.git
```
Change into the Uniswap Interface directory.
```
cd ~
cd uniswap-interface
```
Now, whilst in the `~/uniswap-interface directory`, clone the "How To Install Uniswap" code using Git.
```
git clone https://github.com/second-state/how_to_deploy_uniswap.git
```
Change into the `how_to_deploy_uniswap/` directory.
```
cd how_to_deploy_uniswap/
```
Create 3 Ethereum compatible addresses using any method that you are comfortable with i.e. [web3js](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-accounts.html) etc.
Now paste the **private** and **public** keys of those addresses into the installation_data.json file as shown below.
```
vi installation_data.json
```
Here is an example of the `private_key` and `public_key` sections of that file.
```
  "private_key": {
    "alice": "your_new_key_here",
    "bob": "your_new_key_here",
    "charlie": "your_new_key_here"
  },
  "public_key": {
    "alice": "your_new_key_here",
    "bob": "your_new_key_here",
    "charlie": "your_new_key_here"
  }
```
You will need to fund these accounts with network tokens. So depending on your network, please go ahead and send at least 20 network tokens (from a Faucet etc.) to all three of these accounts.

Now place the RPC URL to your Ethereum compatible network in that same `installation_data.json` file.
```
vi installation_data.json
```
Here is an example of the `rpc_endpoint` section of that file.
```
"provider": {
	"rpc_endpoint": "http://rpc_url:port"
}
```
Now run the Uniswap V1 smart contract installer.
```
cd uniswap_v1
```
```
node deploy_uniswap_v1.js
```
If you open the `../installation_data.json` file, you will see that the Uniswap V1 contract addresses and the Alice and Bob (ERC20 and ERC20 Exchange) addresses have been automatically filled in.
```
"contract_address": {
    "uniswap_factory": "0x2DF5e651be537bB564005340EA5D8f6fA763b530",
    "weth": "",
    "uniswap_exchange_template": "0x68Fc886B0ca3D65AE8Ad21Fde01d8C4E2AD9d86c",
    "alice_exchange": "0x4A8f21726434951f5C1baA0F067d50fdA2a297e2",
    "bob_exchange": "0x61d82A90455EC7cDEdF7cF7F5267c0aF6657c626",
    "alice_erc20_token": "0x240Fc9370709bad1F4402186701C76e36a20848b",
    "bob_erc20_token": "0x09cB0AE6dddF68Aaad81b8f6B83c30dfdaA65b48",
    "uniswap_v2": "",
    "multicall": "",
    "migrator": "",
    "router": "",
    "ens_registry": "",
    "unisocks": ""
}
```
Now run the Uniswap V2 smart contract installation script.
```
cd ../uniswap_v2
```

**Important Warning**
The `feeToSetter` has been hard-coded to the `Charlie` account inside the `deploy_uniswap_v2.js` script (that you are about to run). The `feeToSetter` is the account that is responsible for future profit that result from trades. This account is set to `Charlie` for demonstration purposes only. **If you are running this script, you are responsible for correctly setting the `feeToSetter` account up and managing its private keys.**

```
node deploy_uniswap_v2.js
```
Congratulations, the smart contracts are all deployed. You will see that all of the contract addresses in the `installation_data.json` file have been filled out.
```
"contract_address": {
	"uniswap_factory": "0x2DF5e651be537bB564005340EA5D8f6fA763b530",
	"weth": "0x043c7D26e381CB1bb025b4CE0A6E0C63D7767866",
	"uniswap_exchange_template": "0x68Fc886B0ca3D65AE8Ad21Fde01d8C4E2AD9d86c",
	"alice_exchange": "0x4A8f21726434951f5C1baA0F067d50fdA2a297e2",
	"bob_exchange": "0x61d82A90455EC7cDEdF7cF7F5267c0aF6657c626",
	"alice_erc20_token": "0x240Fc9370709bad1F4402186701C76e36a20848b",
	"bob_erc20_token": "0x09cB0AE6dddF68Aaad81b8f6B83c30dfdaA65b48",
	"uniswap_v2": "0x0fA47ae2b7Dee29571678580BBe9A8A88436E393",
	"multicall": "0x50F0463B01119Aa954ce40a7f21ecf4573E7605a",
	"migrator": "0x3cBe562Fd434aF61601937895000A91D014a49e7",
	"router": "0x5c192a0155D504772F3bc2689aF69116E098ECAa",
	"ens_registry": "0xA07e2676495eEDEdb5A50b9ba020Ba3A98f87D4E"
}
```

Now change into the `uniswap_interface` directory.
```
cd ../uniswap_interface
```
Now run the `deploy_interface.py` script and pass in the argument `../../src` like this.
```
python3 deploy_interface.py '../../src/'
```
Change back to the Uniswap directory so we can build the application.
```
cd ../../
```
An `ls` should look like this (no build folder yet)
```
LICENSE  README.md  cypress  cypress.json  how_to_deploy_uniswap  node_modules  package.json  public  src  tsconfig.json  yarn.lock
```
Build the application's dependencies using the following command.
```
npm install
```


---

### Chain id changes (optional)

**ChainID**
Please note: the chainId for each network is actuall set [inside the Uniswap SDK's code](https://github.com/Uniswap/uniswap-sdk/blob/v2/src/constants.ts#L7)
You may not need/want to change this enum. But if you do, let's take a look at how to update the MAINNET's chainId in the Uniswap Interface.
The following grep command will find where this ChainId enum is set.
```
grep -Rle "export enum ChainId" .
```
For example, the following is returned.
```
./node_modules/@uniswap/sdk/dist/sdk.cjs.development.js.map
./node_modules/@uniswap/sdk/dist/sdk.esm.js.map
./node_modules/@uniswap/sdk/dist/sdk.cjs.production.min.js.map
```
You can go ahead and update these files i.e. change `MAINNET = 1` to `MAINNET = 2` if required.

In addition to the above change, another file in the Uniswap Interface source code specifies `supportedChainIds`. If your chainId is not in the list then add it like this `vi src/connectors/index.ts`

```
export const injected = new InjectedConnector({
  supportedChainIds: [1, 2, 3, 4, 5, 42]
})
```
In that same file, also change the `1` to your chainId in line 14 i.e.
```
export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1')
```
Optional: Anywhere else in that file where you see `//mainnet only` be sure to change the static `1`s to your chainId instead.

---

Hopefully you did not have to change the `chainId`. If you are all set then go ahead and build the Uniswap Interface application
```
npm run build
```
This will generate a new `build` directory as well as some new files, as shown below.
```
  450.29 KB  build/static/js/4.047da443.chunk.js
  276.48 KB  build/static/js/5.5c7ecd7f.chunk.js
  155.14 KB  build/static/js/9.1f17fe1e.chunk.js
  95.38 KB   build/static/js/main.38d70569.chunk.js
  67.14 KB   build/static/js/0.1e3e94eb.chunk.js
  66.33 KB   build/static/js/6.e890ef53.chunk.js
  6.56 KB    build/static/js/1.5f3a35e8.chunk.js
  1.24 KB    build/static/js/runtime-main.c8bb7174.js
  907 B      build/static/css/4.996ad921.chunk.css
  165 B      build/static/js/8.81f9e545.chunk.js
  164 B      build/static/js/7.494e051e.chunk.js
```
You will remember that we just ran the `deploy_interface.py` script. We are now going to run that **again** (but this time, over the build folder, which the above build command just created). This is just to make sure that there are no addresses which relate to the original Uniswap source code (but rather our newly created contract addresses).
```
cd how_to_deploy_uniswap/uniswap_interface/
python3 deploy_interface.py '../../build/'
```
Now, we return to the Uniswap directory to copy the modified `build` files over to our Apache2 server, where they will be deployed for the end users.
```
cd ../../
cp -rp build/* /var/www/html/
```
![Uniswap](./images/toggle.png)


# More

**v1**
For official information, please see the [official documentation of Uniswap V1](https://uniswap.org/docs/v1/)

**V2**
For official information, please see the [official documentation of Uniswap V2](https://uniswap.org/docs/v2/)
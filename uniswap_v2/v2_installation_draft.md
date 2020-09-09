** Please note this is a draft and this code is under heavy development. Not to be used in production **

# Draft only

## Contracts

The Uniswap v2 factory contract has a constructor which takes an address for the `feeToSetter` account.
The address which is passed into the v2 factory constructor, can update both the public v2 Factory variables `feeTo` and `setFeeTo`. 
At present, the mainnet ETH `feeTo` is set to `0x0000000000000000000000000000000000000000`.
The `feeToSetter` however is set to `0xc0a4272bb5df52134178Df25d77561CfB17ce407`; an unused account (potentially generated completely off-line for safety reasons).

The account address which is passed into the V2 factory constructor is of paramount importance. It controls who can be the next fee setter and ultimately is responsible for who receives fees in the future.

## Draft outline of the V2 interface setup

Add the rpc endpoint to .env and .env.production files

```
/home/ubuntu/uniswap-interface/.env
```
```
/home/ubuntu/uniswap-interface/.env.production
```

Ensure that the network id is listed in the `index.ts` file located at `src/connectors/index.ts` for examle ...

```
export const injected = new InjectedConnector({
  supportedChainIds: [1, 2, 3, 4, 5, 42]
})

```


See Appendix A at the end of this file for current contract addresses which are in use on Oasis demo network.

* Update factory address

```
/home/ubuntu/uniswap-interface/src/constants/v1/index.ts
```

* Update the multicall address at 
```
/home/ubuntu/uniswap-interface/src/constants/multicall/index.ts
```

* Update the migrator address at 
```
/home/ubuntu/uniswap-interface/src/constants/abis/migrator.ts
```

* Update the router address 
```
/home/ubuntu/uniswap-interface/src/constants/index.ts 
```

* Update the registrar address in two files ... both

```
/home/ubuntu/uniswap-interface/src/utils/resolveENSContentHash.ts
```
and
```
/home/ubuntu/uniswap-interface/src/hooks/useContract.ts
```

* Update the Unisocks address in 
```
/home/ubuntu/uniswap-interface/src/hooks/useContract.ts
```

* Ad-hoc repairs
I had to update the src/hooks/useContracts.ts file like this (remove the `WETH` from this line)
```
import { ChainId } from '@uniswap/sdk'
```
Then also update the useWETHContract to look like this (where we remove the chainid section and also use the actual address where weth is deployed)
```
export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  return useContract('0x203162AA8b8e6b33c2c3c57246EC05bb46750287', WETH_ABI, withSignerIfPossible)
}

```
* Build

```
npm install
```

```
npm run build
```

* Move to Apache environment

```
cp -rp build/* /var/www/html/
```
* Create a token list file 

```
{
  "name": "My Token List",
  "logoURI": "ipfs://QmUSNbwUxUYNMvMksKypkgWs8unSm8dX2GjCPBVGZ7GGMr",
  "keywords": [
    "audited",
    "verified",
    "special tokens"
  ],
  "tags": {
    "Alice": {
      "name": "Testcoin for Alice",
      "description": "Tokens that are for testing"
    },
    "Bob": {
      "name": "Testcoin for Bob",
      "description": "Tokens that are for testing"
    }
  },
  "timestamp": "2020-06-12T00:00:00+00:00",
  "tokens": [
    {
      "chainId": 1,
      "address": "0xeb2eF6b55f603B858cA30ea9bDeaA0Ef37C4625d",
      "symbol": "ALICE",
      "name": "ALICE Coin",
      "decimals": 18,
      "logoURI": "ipfs://QmXfzKRvjZz3u5JRgC4v5mGVbm9ahrUiB4DgzHBsnWbTMM",
      "tags": [
        "Alice"
      ]
    },
    {
      "chainId": 1,
      "address": "0xEbd5F1cd48b786c27B8E9afa83771E9251cd0A00",
      "symbol": "BOB",
      "name": "Bob Coin",
      "decimals": 18,
      "logoURI": "ipfs://QmUSNbwUxUYNMvMksKypkgWs8unSm8dX2GjCPBVGZ7GGMr",
      "tags": [
        "Bob"
      ]
    }
  ],
  "version": {
    "major": 1,
    "minor": 0,
    "patch": 2
  }
}
```

* Upload that to ipfs via a service like pinata which will give you a hash like this

```
QmSqsPSB1YT9vzxQ4gf5hb4jeMRuEfPwSbqidDqgJ32mT4
```

* Paste into uniswap to include the tokens in the interface

```
"ipfs://your_hash_goes_here"
```

In the new interface, the pool and migrate pages are only compatible with uniswap v2 (the interface for these pages requires access to the v2 contracts and the v1 contract) and therefore v2 must be installed to access any v1 liquidity via the interface.
you should only deploy the precompiled Uniswap contracts in the build directories 

## Pre-compiled contracts are all available here

https://unpkg.com/@uniswap/v2-core@1.0.1/build/UniswapV2Factory.json


# Appendix A
Contract addresses in use on Oasis demo

```
    "uniswap_factory": "0xeE127eE65a6C65E4399b455B72Da9C415a2bDD64",
    "uniswap_exchange_template": "0x571275cB3a0381d503F323372beC15b0D495cf00",
    "alice_exchange": "0xb0A10012784678fB1275a22e7B0A5A13EF5a729d",
    "bob_exchange": "0x5BcE3F59Ee9713671ebd9950E7812495a32F8612",
    "alice_erc20_token": "0x5077026AC93F00a68C1E7d3e5962CE73609fB496",
    "bob_erc20_token": "0x3fbB07Bd58DEE4DfbB2D99540106869409F85aA1",
    "uniswap_v2": "0x84D9BE87b13811BF4ad79E92DEe2460f3213437E",
    "multicall": "0xa63FEfe5f5D26003f4EBE1521f6BAfE9A19cF5A9",    
    "migrator": "0x9770f7EbBA356E86CD40d45A85653fE4Ed4865A5",
    "router": "0x4224d915F29b8a27c29847962025D70180a72C94",
    "ens_registry": "0xd31cd822EFF0E9bC664Ab16ee67F26eB09B46537",    
    "unisocks": "0x174ab7360394aB91B73Ff4CA77f011119960C441"
```
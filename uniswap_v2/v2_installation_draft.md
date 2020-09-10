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
"uniswap_factory": "0x30902E942a4b908Abb36dB4b2FA15BB120Ec14Ac",
    "weth": "0x9F4fD40aC132bAc35a0cacBB60Dd3d46C3281ed9",
    "uniswap_exchange_template": "0x81fD58bD093DDbc4cbEB2f730834c208776b32C1",
    "alice_exchange": "0x1B7396cF2710BC65410299CeE2A2D1113DeDaa11",
    "bob_exchange": "0xB0F2D86db0DF00Bf1FE173dD06EBcA5DCb76aF2f",
    "alice_erc20_token": "0x9Fdf98Ee1b5A2Bd8932a8F8c1f0CF51ac294e583",
    "bob_erc20_token": "0x7b5B7E4095D533b25248667213E6c84289D115bf",
    "uniswap_v2": "0x713fA50D1533DA0922B5381f5dd9eFb88f59dc31",
    "multicall": "0x675BB47BF34C209e3Eb8B82ABd39dB2623A5E8fD",
    "migrator": "0x528adF9F52e3a3Baf7906e53618787702Ad6Aa4B",
    "router": "0x81c62c801f222bC7433AA449C3F891cead41B0e8",
    "ens_registry": "0xDC59c61281A6c16ebb4854b0c6599567830fda19",
    "unisocks": ""
```
# Draft only

## Draft outline of the V2 interface setup

Add the rpc endpoint to .env and .env.production files

```
/home/ubuntu/uniswap-interface/.env
```
```
/home/ubuntu/uniswap-interface/.env.production
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

* Build

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
      "address": "0x5077026AC93F00a68C1E7d3e5962CE73609fB496",
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
      "address": "0x3fbB07Bd58DEE4DfbB2D99540106869409F85aA1",
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
    "patch": 0
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
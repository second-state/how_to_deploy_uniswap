** Please note this is a draft and this code is under heavy development. Not to be used in production **

```
cd ~
```

```
git clone https://github.com/Uniswap/uniswap-interface.git
```

```
cd uniswap-interface
```


```
npm install
```
# Modify - scrape

```
git clone https://github.com/second-state/how_to_deploy_uniswap.git
```

```
cd how_to_deploy_uniswap/uniswap_interface
```
Scrape all hex values from the source code to find where transactionIds, contract addresses, accounts and content hashes have been hard coded into the source code.

```
python3 scrape_hex_digests.py '../../src'
```
Returns
```
Total hex values found: 56
```
```
python3 scrape_hex_digests.py '../../node_modules'
```
Returns
```
Total hex values found: 22, 929
```
```
python3 scrape_hex_digests.py '../../cypress'
```
Returns
```
Total hex values found: 39
```
The above script creates a `hex_values.json` file which shows the filenames and hex values that are present throughout the source code

# Modify - update


# Build 
```
npm run build
```

# Deploy
* Move to Apache environment

```
cd ~/uniswap-interface
cp -rp build/* /var/www/html/
```
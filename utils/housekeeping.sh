#!/bin/bash
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get -y install npm
npm -y install fs
npm install web3
npm install truffle-hdwallet-provider
sudo apt-get -y install apache2
# install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt -y install yarn
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt autoremove
cd ~
git clone https://github.com/Uniswap/uniswap-interface.git
cd ~
cd uniswap-interface
git clone https://github.com/second-state/how_to_deploy_uniswap.git
cd how_to_deploy_uniswap/
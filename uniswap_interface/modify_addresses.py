# ** Please note this is a draft and this code is under heavy development. Not to be used in production **


# This file will update the chainid and contract addresses that are hard coded into npm dependencies which Uniswap Interface uses
# We have non control over the npm libraries that the Uniswap Interface developers created and we are not wanting to fork this code because we will loose ability to update
# Instead we just target const/concrete details like chainid and factory address etc. as a final step before hosting our interface implementation

# Change to the uniswap-interface directory where you just ran `npm run build`
# Execute this file at that location i.e. `python deploy_interface.py`

import os
import json
import subprocess

f = open("../installation_data.json", "r")
raw_data = f.read()
json_data = json.loads(raw_data)

# Use this API to get ABI and Bytecode
# http://api.etherscan.io/api?module=contract&action=getabi&address=0xTODO&format=raw
v1_mainnet_factory_address = "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95"
v2_mainnet_factory_address = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
v2_mainnet_router_address = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
v2_mainnet_multicall_address = "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441"
v2_mainnet_migrator_address = "0x16D4F26C15f3658ec65B1126ff27DD3dF2a2996b"
v2_mainnet_weth_address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
v2_mainnet_registry_address = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"

# Factory
sed_command_v1_fac = 's/' + v1_mainnet_factory_address + '/' + json_data["contract_address"]["uniswap_factory"] + '/g'
sed_command_v2_fac = 's/' + v2_mainnet_factory_address + '/' + json_data["contract_address"]["uniswap_v2"] + '/g'
sed_command_v2_rou = 's/' + v2_mainnet_router_address + '/' + json_data["contract_address"]["router"] + '/g'
sed_command_v2_mul = 's/' + v2_mainnet_multicall_address + '/' + json_data["contract_address"]["multicall"] + '/g'
sed_command_v2_mig = 's/' + v2_mainnet_migrator_address + '/' + json_data["contract_address"]["migrator"] + '/g'
sed_command_v2_wet = 's/' + v2_mainnet_weth_address + '/' + json_data["contract_address"]["weth"] + '/g'
sed_command_v2_reg = 's/' + v2_mainnet_registry_address + '/' + json_data["contract_address"]["ens_registry"] + '/g'

# # Update files
dirs_to_process = ['../../src/', '../../build/', '../../node_modules/@uniswap/']
for individual_dir in dirs_to_process:
    for (root, dirs, files) in os.walk(individual_dir):
        for name in files:
            print("Processing: " + os.path.join(root, name))
            subprocess.call(['sed', '-ir', sed_command_v1_fac, os.path.join(root, name)])
            subprocess.call(['sed', '-ir', sed_command_v2_fac, os.path.join(root, name)])
            subprocess.call(['sed', '-ir', sed_command_v2_rou, os.path.join(root, name)])
            subprocess.call(['sed', '-ir', sed_command_v2_mul, os.path.join(root, name)])
            subprocess.call(['sed', '-ir', sed_command_v2_mig, os.path.join(root, name)])
            subprocess.call(['sed', '-ir', sed_command_v2_wet, os.path.join(root, name)])
            subprocess.call(['sed', '-ir', sed_command_v2_reg, os.path.join(root, name)])
# # Clean up r files
the_dict = {}       
for individual_dir in dirs_to_process:
    for (root, dirs, files) in os.walk(individual_dir):
        for name in files:
            diff_file = os.path.join(root, name) + "r"
            temp = subprocess.call(['diff', '-c', os.path.join(root, name), diff_file])
            the_dict[str(os.path.join(root, name))] = temp
            if name.endswith("r"):
                print("Cleaning up old files")
                os.remove(os.path.join(root, name))
print("Files changed ...")
print(the_dict)
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

# v1_mainnet_factory_address = "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95"
# v2_mainnet_factory_address = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"

# Factory
sed_command_v1_fac = 's/' + v1_mainnet_factory_address + '/' + json_data["contract_address"]["uniswap_factory"] + '/g'
sed_command_v2_fac = 's/' + v2_mainnet_factory_address + '/' + json_data["contract_address"]["uniswap_v2"] + '/g'


# # Update files
dirs_to_process = ['../../src/', '../../build/']
for individual_dir in dirs_to_process:
    for (root, dirs, files) in os.walk(individual_dir):
        for name in files:
            print("Processing: " + os.path.join(root, name))
            subprocess.call(['sed', '-ir', sed_command_v1_fac, os.path.join(root, name)])
            subprocess.call(['sed', '-ir', sed_command_v2_fac, os.path.join(root, name)])

# sudo apt-get -y install python3-pip
# python3.6 -m pip install Web3
# wget https://unpkg.com/@uniswap/v2-core@1.0.0/build/Combined-Json.json
# python3 find_init_code.py

import json
from web3 import Web3

f = open("combined_json.json", "r")
raw_data = f.read()
json_data = json.loads(raw_data)

string_hex = "0x" + json_data["contracts"]["contracts/UniswapV2Pair.sol:UniswapV2Pair"]["bytecode"]
temp_hex = Web3.keccak(hexstr=string_hex).hex()
print(temp_hex)

# The code below is what helped find the hash that is hard coded into Solidity because it was able to iterate through all of the JSON and hash automatically
# print(json_data);

# def iterate_multidimensional(my_dict):
#     for k,v in my_dict.items():
#         if(isinstance(v,dict)):
#             print("Key:" + k)
#             iterate_multidimensional(v)
#             continue
#         if "bytecode" in k:
#             if str(v).startswith("0x"):
#                 temp_hex = Web3.keccak(hexstr=str(v)).hex()
#                 if "96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f" in temp_hex:
#                     print("Key: " + k)
#                     print("Success ... 0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f")
#             else:
#                 temp_hex = Web3.keccak(hexstr="0x" + str(v)).hex()
#                 if "96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f" in temp_hex:
#                     print("Key: " + k)
#                     print("Success ... 96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f")

# iterate_multidimensional(json_data)

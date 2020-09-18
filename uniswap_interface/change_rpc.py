import os
import subprocess

f = open("../installation_data.json", "r")
raw_data = f.read()
json_data = json.loads(raw_data)

infura = "https\:\/\/mainnet\.infura\.io\/v3\/faa4639b090f46499f29d894da0551a0"
oasis = "http\:\/\/oasis-ssvm-demo\.secondstate\.io\:8545"
sed_command_i_o = 's/' + infura + '/' + oasis + '/g'

# # Update files
dirs_to_process = ['../../src/', '../../build/', '../../node_modules/@uniswap/']
for individual_dir in dirs_to_process:
    for (root, dirs, files) in os.walk(individual_dir):
        for name in files:
            print("Processing: " + os.path.join(root, name))
            subprocess.call(['sed', '-ir', sed_command_i_o, os.path.join(root, name)])

for individual_dir in dirs_to_process:
    for (root, dirs, files) in os.walk(individual_dir):
        for name in files:
            if name.endswith("r"):
                print("Cleaning up old files")
                os.remove(os.path.join(root, name))
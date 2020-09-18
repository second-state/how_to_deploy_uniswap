import os
import subprocess

one_to_two = "MAINNET = 1"
one_to_two_II = "chainId\:\"1\""

new_value = "MAINNET = 2"
new_value_II = "chainId\:\"2\""

sed_command_v2_12 = 's/' + one_to_two + '/' + new_value + '/g'
sed_command_chain = 's/' + one_to_two_II + '/' + new_value_II + '/g'
# # Update files
dirs_to_process = ['../../src/', '../../build/', '../../node_modules/@uniswap/']
for individual_dir in dirs_to_process:
    for (root, dirs, files) in os.walk(individual_dir):
        for name in files:
            print("Processing: " + os.path.join(root, name))
            subprocess.call(['sed', '-ir', sed_command_v2_12, os.path.join(root, name)])
# Clean up old files
for individual_dir in dirs_to_process:
    for (root, dirs, files) in os.walk(individual_dir):
        for name in files:
            if name.endswith("r"):
                print("Cleaning up old files")
                os.remove(os.path.join(root, name))
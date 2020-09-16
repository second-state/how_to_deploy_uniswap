import os
import subprocess

one_to_two = "MAINNET = 1"
sed_command_v2_12 = 's/' + one_to_two + '/' + "MAINNET = 2" + '/g'

# # Update files
dirs_to_process = ['../../src/', '../../build/', '../../node_modules/@uniswap/']
for individual_dir in dirs_to_process:
    for (root, dirs, files) in os.walk(individual_dir):
        for name in files:
            if name.endswith("rr"):
                print("Cleaning up old files")
                os.remove(os.path.join(root, name))
            else:
                print("Processing: " + os.path.join(root, name))
                subprocess.call(['sed', '-ir', sed_command_v2_12, os.path.join(root, name)])
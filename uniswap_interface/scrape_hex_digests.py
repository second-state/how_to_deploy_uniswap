import os
import re
import json
temp_output = {}

print("Starting ...")
hash_40 = re.compile('0x[a-fA-F0-9]{40}')
hash_64 = re.compile('0x[a-fA-F0-9]{64}')
# # Update files
dirs_to_process = ['../../public/', '../../build/', '../../node_modules', '../../src']
for individual_dir in dirs_to_process:
    for (root, dirs, files) in os.walk(individual_dir):
        for name in files:
            file_path = os.path.join(root, name)
            print("Processing: " + file_path)
            try:
                fr = open(file_path)
                fd = fr.read()
                print("Reading: " + file_path)
                temp_inner_object = {}
                hash_40_results = hash_40.findall(fd)
                hash_64_results = hash_64.findall(fd)
                if len(hash_40_results) > 0 or len(hash_64_results) > 0:
                    temp_inner_object["hash_40"] = hash_40_results
                    temp_inner_object["hash_64"] = hash_64_results
                    temp_output[file_path] = temp_inner_object
            except:
                print("Skipping: " + file_path)
json_formatted_str = json.dumps(temp_output, indent=2)
print("Results\n" + json_formatted_str)
print("Finished!")

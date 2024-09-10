import json
import random

# Load the JSON data from the file
with open('TextMRI-Mini\public\data\debate_analysis.json', 'r') as file:
    data = json.load(file)

# Add a "score" key with a random value between 0-100 for each entry in the "Data" list
for entry in data["Data"]:
    entry["score"] = random.randint(0, 100)

# Save the modified JSON back to the file
with open('TextMRI-Mini\public\data\debate_analysis1.json', 'w') as file:
    json.dump(data, file, indent=4)

print("Scores added successfully and saved to 'debate_analysis_with_scores.json'.")

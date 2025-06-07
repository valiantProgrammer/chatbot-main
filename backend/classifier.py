import sys
from transformers import pipeline

categories = ["Theft", "Murder", "Assault", "Rape", "Cheating", "Kidnapping", "Cybercrime", "Drug Possession", "Domestic Violence", "Dowry Harassment"]
input_text = sys.stdin.read().strip()

classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

result = classifier(input_text, candidate_labels=categories)

top_category = result['labels'][0]

print(top_category)

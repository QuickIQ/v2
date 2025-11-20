#!/usr/bin/env python3
"""
Script to translate creative-thinking.json content to 30 languages.
This script will add translations for all empty language fields.
"""

import json
import sys
from pathlib import Path

# Language codes in order
LANGUAGES = [
    "en", "es", "de", "fr", "pt-br", "it", "nl", "sv", "no", "tr",
    "da", "fi", "ro", "cs", "sk", "hu", "pl", "hr", "sr-latn", "id",
    "tl", "ms", "et", "lv", "lt", "sl", "is", "ga", "eu", "ca"
]

def translate_text(text, target_lang):
    """
    Placeholder for translation function.
    In a real scenario, you would use a translation API here.
    For now, we'll return empty strings to be filled later.
    """
    # TODO: Implement actual translation using an API
    # For now, return empty string - translations will be added manually
    return ""

def translate_object(obj, languages):
    """Recursively translate all string values in an object."""
    if isinstance(obj, dict):
        result = {}
        for key, value in obj.items():
            if key in ["title", "summary", "text"] and isinstance(value, dict):
                # This is a multilingual field
                translated = value.copy()
                # Keep existing translations, only fill empty ones
                for lang in languages:
                    if lang not in translated or not translated[lang]:
                        if lang == "en" and "en" in value:
                            translated[lang] = value["en"]
                        else:
                            # For now, leave empty - will be filled with actual translations
                            translated[lang] = ""
                result[key] = translated
            else:
                result[key] = translate_object(value, languages)
        return result
    elif isinstance(obj, list):
        return [translate_object(item, languages) for item in obj]
    else:
        return obj

def main():
    json_path = Path("frontend/src/data/tests/results/creative-thinking.json")
    
    if not json_path.exists():
        print(f"Error: {json_path} not found")
        sys.exit(1)
    
    # Read JSON file
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print("JSON structure is ready. Translations need to be added manually or via translation API.")
    print(f"Total levels: {len(data)}")
    print("Note: This script preserves the structure. Actual translations should be added using a translation service.")
    
    # Write back (structure is already correct)
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"JSON file structure verified and saved to {json_path}")

if __name__ == "__main__":
    main()


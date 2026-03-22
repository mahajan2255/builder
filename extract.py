import os
import re
import glob

log_dir = r"C:\Users\parvm\.gemini\antigravity\brain\9e5d7c90-9fb7-451d-911e-b52c3ee5dc72\.system_generated\logs"
out_file = r"e:\abc\school-builder\src\App.jsx"

for file in glob.glob(os.path.join(log_dir, "*.txt")) + glob.glob(os.path.join(log_dir, "*.json")):
    try:
        with open(file, "r", encoding="utf-8") as f:
            content = f.read()
            if "import { useState, useRef, useEffect } from" in content:
                print(f"Found code in {file}")
                # Extract everything from the first import to the end of the SchoolBuilder component block
                # Looking for the pattern from 'import { useState' up to 'export default function SchoolBuilder' and its closing brace.
                match = re.search(r'(import { useState.*^export default function SchoolBuilder.*?\n})', content, re.MULTILINE | re.DOTALL)
                if match:
                    code = match.group(1)
                    with open(out_file, "w", encoding="utf-8") as out:
                        out.write(code + "\n")
                    print("Extracted Code successfully")
                    break
    except Exception as e:
        print(f"Error reading {file}: {e}")

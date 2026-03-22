import os

filepath = r'e:\abc\school-builder\src\App.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('\\`', '`')
content = content.replace('\\$', '$')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed escape characters in App.jsx')

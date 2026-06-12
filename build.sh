#!/usr/bin/env bash
# Compila o app React (src/) e gera o index.html único com tudo embutido.
# Uso: npm install react react-dom esbuild && bash build.sh
set -e
cd "$(dirname "$0")"
npx esbuild src/app.jsx --bundle --minify --jsx=automatic --outfile=/tmp/app.js
python3 - <<'EOF'
js = open('/tmp/app.js').read().replace('</script>', '<\\/script>')
css = open('src/styles.css').read()
html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Angelytta & Murilo — Crepúsculo encontra Konoha</title>
<style>
{css}
</style>
</head>
<body>
<div id="root"></div>
<script>
{js}
</script>
</body>
</html>
"""
open('index.html','w').write(html)
print("index.html gerado com sucesso!")
EOF

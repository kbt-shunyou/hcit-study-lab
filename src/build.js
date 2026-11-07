// 使い方: node src/build.js  → リポジトリ直下に index.html と data.js を生成（GitHub Pagesで公開）
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..');
require('child_process').execSync('node '+JSON.stringify(path.join(__dirname,'build_data.js')),{stdio:'inherit',cwd:__dirname});
const app=fs.readFileSync(path.join(__dirname,'app.html'),'utf8');
const head=`<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="医療情報技師能力検定試験の合格テキスト・問題演習・自己分析ができる学習アプリ">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);color-scheme:light}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
`;
const i=app.indexOf('<script>');
fs.writeFileSync(path.join(root,'index.html'),head+app.slice(0,i)+'<script src="data.js"></script>\n'+app.slice(i)+'\n</body>\n</html>\n');
if(process.argv[2]==='--artifact'){const data=fs.readFileSync(path.join(root,'data.js'),'utf8');fs.writeFileSync(process.argv[3],app.slice(0,i)+'<script>'+data+'</script>\n'+app.slice(i));}
console.log('built index.html / data.js');

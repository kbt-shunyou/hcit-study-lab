// 教材データ（../hcit/data_*.js）からアプリ用 data.js を生成する
const path='./content/';
const past=require(path+'data_past.js'), orig=require(path+'data_orig.js');
const chaps=[...require(path+'data_text1.js'),...require(path+'data_text2.js'),...require(path+'data_text3.js')];
const X=require(path+'data_text4.js');
const KW={
 1:['進数','2進','16進','ビット','バイト','画素','データ量','文字コード','UTF','圧縮','MB'],
 2:['RAID','HDD','SSD','メモリ','CPU','UPS','記憶'],
 3:['アルゴリズム','探索','ソート','計算量','アジャイル','ウォーターフォール','開発','OS'],
 4:['データベース','SQL','正規','トランザクション','ACID','主キー','HAVING','原子性'],
 5:['IPv','IPアドレス','ネットワーク','TCP','UDP','ポート','DNS','スイッチ','無線LAN','サブネット','OSI','/2'],
 6:['暗号','署名','鍵','認証','ランサム','ハッシュ','EDR','ソーシャル','ログ','機密性','可用性'],
 7:['稼働率','MTBF','クラウド','IaaS','PaaS','SaaS','生成AI','RAG','プロンプト','SBOM','ハルシネーション'],
 8:['部門','RIS','PACS','LIS','看護管理','看護必要度','ME機器','オーダ','パス','医事'],
 9:['HL7','DICOM','IHE','SS-MIX','MWM','MPPS','リソース'],
 10:['移行','RFP','BCP','安全管理責任者','障害','初動','攻撃を受け'],
 11:['ガイドライン','個人情報','要配慮','次世代医療基盤','仮名加工','真正性','倫理指針','EDC','臨床研究','オプトアウト','委託','3省','チェックリスト'],
 12:['医療DX','電子カルテ情報共有','オンライン資格','マイナ','電子処方箋','標準型','PHR','オンライン診療','救急時','地域医療連携'],
 13:['NDB','RWD','リアルワールド','検定','DWH','統計','介護DB'],
 14:['医療法','病床','医療計画','医療圏','地域包括','働き方','特定機能','地域医療構想','A水準'],
 15:['保険','診療報酬','DPC','介護保険','ベースアップ','混合診療','レセプト','改定'],
 16:['特定行為','医療安全','インシデント','タイムアウト','感染','職種','事故調査','救急救命士','医師事務'],
 17:['後発','造影','MRI','バイタル','血圧','基準範囲','特異度','感度','診療録','死亡診断書','ICD','疫学','症例対照','薬','投与','マンモ','画像検査']
};
const RANGE={'情報処理技術系':[1,7],'医療情報システム系':[8,13],'医学・医療系':[13,17]};
const A_KW=['IPv6','サブネット','/26','/20','ガイドライン第7.0','第7.0版','第6.0版','保守委託','電子カルテ情報共有','標準型電子カルテ','医療DX','電子的診療情報連携','ベースアップ','特定行為','NDB','生成AI','RAG','ハルシネーション','プロンプトインジェクション','マイナ','救急時','仮名加工','ゼロトラスト','EDR','SBOM','2つ選べ','リアルワールド','キーボード'];
const C_CH=[1,2,3,4,17];
function chapterOf(q,sys){const [a,b]=RANGE[sys];const txt=q.q+q.c.join('')+q.e+q.p;let best=a,bs=-1;
 for(let i=a;i<=b;i++){const s=KW[i].reduce((n,k)=>n+(txt.includes(k)?1:0),0);if(s>bs){bs=s;best=i;}}return best;}
function imp(q,ch,src){const txt=q.q+q.c.join('')+q.e;if(A_KW.some(k=>txt.includes(k)))return 'A';if(C_CH.includes(ch))return 'C';return 'B';}
const SYS={'情報処理技術系':'i','医療情報システム系':'s','医学・医療系':'m'};
const questions=[];
past.forEach(y=>{const yr=y.key.slice(1);y.sets.forEach(s=>s.qs.forEach((q,i)=>{const ch=chapterOf(q,s.name);
 questions.push({id:`p${yr.slice(2)}-${SYS[s.name]}-${String(i+1).padStart(2,'0')}`,src:yr,srcLabel:`過去問再現 ${y.year}`,sys:s.name,no:i+1,ch,imp:imp(q,ch,yr),...q});}));});
orig.sets.forEach(s=>s.qs.forEach((q,i)=>{const ch=chapterOf(q,s.name);
 questions.push({id:`o-${SYS[s.name]}-${String(i+1).padStart(2,'0')}`,src:'orig',srcLabel:'オリジナル予想',sys:s.name,no:i+1,ch,imp:imp(q,ch,'orig'),...q});}));
const chapters=chaps.map((c,i)=>({id:i+1,...c}));
const trends=past.map(y=>({year:y.year,trend:y.trend}));
const out={built:new Date().toISOString().slice(0,10),chapters,questions,trends,origTrends:orig.trends,jiji:X.jiji,nums:X.nums,abbr:X.abbr};
require('fs').writeFileSync(__dirname+'/../data.js','window.HCIT='+JSON.stringify(out)+';\n');
const cnt={};questions.forEach(q=>{cnt[q.imp]=(cnt[q.imp]||0)+1;});
const chc={};questions.forEach(q=>{chc[q.ch]=(chc[q.ch]||0)+1;});
console.log(questions.length,cnt,JSON.stringify(chc));

const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const os=require('os');
// Paths: built files, libraries from node_modules (served to the page instead of the CDN), a temp folder for files the tests write.
const ROOT=path.resolve(__dirname,'..','..');const NM=path.join(ROOT,'node_modules');const OUT=path.join(os.tmpdir(),'partpark-tests');fs.mkdirSync(OUT,{recursive:true});
exports.FRAGMENT=path.join(ROOT,'prototype','dist','partpark.html');exports.STANDALONE=path.join(ROOT,'prototype','partpark-prototyp.html');
exports.THREE=path.join(NM,'three')+path.sep;exports.out=n=>path.join(OUT,n);
exports.launch=()=>chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
exports.VP={pc:{viewport:{width:1366,height:650}},pcL:{viewport:{width:1680,height:900}},phone:{viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:2},
  phoneS:{viewport:{width:360,height:640},hasTouch:true,isMobile:true,deviceScaleFactor:2},tablet:{viewport:{width:820,height:1100},hasTouch:true,isMobile:true}};
exports.open=async(b,file,vp,opt={})=>{
  const ctx=await b.newContext({...exports.VP[vp],acceptDownloads:true});const p=await ctx.newPage();
  await p.route('**/three@0.128.0/**',r=>{const u=r.request().url().split('three@0.128.0/')[1];r.fulfill({body:fs.readFileSync(exports.THREE+u,'utf8'),contentType:'application/javascript'})});
  await p.route('**/jspdf/2.5.1/**',r=>r.fulfill({body:fs.readFileSync(path.join(NM,'jspdf','dist','jspdf.umd.min.js'),'utf8'),contentType:'application/javascript'}));
  await p.route('**/jszip/3.10.1/**',r=>r.fulfill({body:fs.readFileSync(path.join(NM,'jszip','dist','jszip.min.js'),'utf8'),contentType:'application/javascript'}));
  await p.route('**fonts.g**',r=>r.abort());
  p.on('pageerror',e=>console.log('PAGEERR',e.message,(e.stack||'').split('\n')[1]||''));
  const html=fs.readFileSync(file,'utf8');
  const MOCK=opt.hosted?'<script>window.__saved=[];window.claude={use:async n=>n==="downloads"?{save:async o=>{const buf=o.data instanceof Blob?new Uint8Array(await o.data.arrayBuffer()):new TextEncoder().encode(String(o.data));window.__saved.push({name:o.filename,size:buf.length});return{status:"saved"}}}:null}</scr'+'ipt>':'';
  const full=/^<!doctype/i.test(html)?html:'<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>*{box-sizing:border-box}body{margin:0}</style></head><body>'+MOCK+html+'</body></html>';
  await p.setContent(full);await p.waitForTimeout(2500);
  const cdp=await ctx.newCDPSession(p);
  const touch=async(x,y,dx=0,dy=0,ms=80)=>{await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
    if(dx||dy){const n=4;for(let i=1;i<=n;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*i/n,y:y+dy*i/n}]});await p.waitForTimeout(ms/n)}}else await p.waitForTimeout(ms);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(350)};
  const click=async sel=>{await p.evaluate(s=>{const e=document.querySelector(s);if(!e)throw new Error('missing '+s);e.click()},sel);await p.waitForTimeout(350)};
  const go=async id=>click(`#stepper [data-go="${id}"]`);
  const pane=async(scr,k)=>{await p.evaluate(([s,k])=>{const b=document.querySelector(`.subtabs[data-for="${s}"] [data-pane="${k}"]`);if(b&&b.getBoundingClientRect().width)b.click()},[scr,k]);await p.waitForTimeout(300)};
  // layout facts for "fits the window": page scroll, horizontal overflow, bars inside the viewport
  const fit=()=>p.evaluate(()=>{const de=document.documentElement,r=s=>{const e=document.querySelector(s);if(!e)return null;const b=e.getBoundingClientRect();return[Math.round(b.top),Math.round(b.bottom)]};
    const scr=[...document.querySelectorAll('.scr')].find(e=>!e.hidden&&e.getBoundingClientRect().height>0);
    const wide=[...document.querySelectorAll('.app,.app *')].filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&b.right>innerWidth+1&&!e.closest('.scroll,.tablewrap,#cats,.seg,.pgrid,.tabpanel,.slist,canvas,.sheet,pre,.shead .btnrow')}).slice(0,3).map(e=>e.tagName+'.'+String(e.className).slice(0,30));
    return{scr:scr&&scr.id,pageScrollY:de.scrollHeight-innerHeight,pageScrollX:de.scrollWidth-innerWidth,vh:innerHeight,vw:innerWidth,appW:Math.round(document.querySelector('.app').getBoundingClientRect().width),wide,hdr:r('.hdr'),stepper:r('#stepper'),stage:r('.stage'),act:r('#actbar'),
      cur:(document.querySelector('#stepper [aria-current="step"]')||{}).getAttribute?.('data-go')||null,now:document.querySelector('.st-now').textContent,
      info:document.querySelector('.act-info').innerText.replace(/\s+/g,' '),next:(document.querySelector('#actNext')||{}).textContent||null,nextOff:(document.querySelector('#actNext')||{}).disabled||false,back:(document.querySelector('#actBack')||{}).textContent||null}});
  const vrect=()=>p.$eval('#viewer',e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}});
  const state=()=>p.evaluate(()=>({cart:document.querySelector('#cartCount').textContent,sel:document.querySelector('#selCount').textContent}));
  return{p,ctx,cdp,touch,click,go,pane,fit,vrect,state};
};

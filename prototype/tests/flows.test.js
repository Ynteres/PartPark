// Deeper functional checks on the new layout (desktop), the standalone file opened from disk, and the hosted download path.
const L=require('./lib.js');const fs=require('fs');const path=require('path');const {chromium}=require('playwright');
const F=process.argv[2]||L.FRAGMENT,SA=process.argv[3]||L.STANDALONE;let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log('   FAIL:',m)}};
(async()=>{const b=await L.launch();
 { // ---- sBoM Studio details, hosted downloads (capability mock)
  const {p,click,go,fit}=await L.open(b,F,'pc',{hosted:true});
  await click('#mStudio');await click('[data-open="pump"]');await p.waitForTimeout(1400);
  await click('.srow[data-pid="shaft"]');await p.waitForTimeout(400);
  await p.fill('#se-price','555');await click('[data-sa="approve"]');
  ok(await p.$eval('.srow[data-pid="shaft"] .pill',e=>e.textContent)==='część zamienna','approve');
  await p.evaluate(()=>document.querySelector('details.help summary').click());await p.fill('#se-mcode','SRV-TEST-01');await p.fill('#se-mname','Tuleja dystansowa testowa');await p.fill('#se-mprice','12.5');await click('[data-sa="kman"]');
  ok(await p.$$eval('.krow',e=>e.length)===4,'manual index in kit');
  let f=await fit();ok(/zmiany robocze: [1-9]/.test(f.info),'dirty counter in action bar: '+f.info);
  await click('#actNext');f=await fit();ok(f.scr==='publish'&&/Opublikuj sBoM v5/.test(f.next)&&!f.nextOff,'publish screen '+f.next);
  const ch=await p.$eval('.publist',e=>e.innerText.replace(/\s+/g,' '));ok(/HT-50-06/.test(ch)&&/555/.test(ch),'price changes listed: '+ch);
  await click('#actNext');await p.waitForTimeout(500);ok(await p.$('#pubOk')!==null,'published');
  console.log('studio | price changes:',ch.slice(0,90),'| now:',(await fit()).now);
  await go('prices');ok(/Cennik v13/.test(await p.$eval('#plVer',e=>e.textContent)),'price list bumped by sBoM publication');
  await p.fill('#plQ','HT-50-06');await p.waitForTimeout(200);await click('#plBody [data-ph]');
  const h=await p.$eval('.phist li',e=>e.innerText.replace(/\s+/g,' '));ok(/edytor części/.test(h),'history source: '+h);
  await click('#plAll');
  // CSV: template through the capability, then a real file through the file input
  await click('#bCsvTpl');await p.waitForTimeout(400);
  fs.writeFileSync(L.out('comma.csv'),'index,name,price\nHT-50-02,"Wirnik, braz",700.50\nSRV-SM-LT2-400,Smar,35\nXX-1,obcy,5\n');await p.setInputFiles('#fCsv',L.out('comma.csv'));await p.waitForTimeout(500);
  f=await fit();ok(/wzrost 1 · spadek 1/.test(f.info)&&/Opublikuj cennik v14/.test(f.next),'csv preview in action bar: '+f.info);
  await click('#actBack');ok(await p.$eval('#plImport',e=>e.hidden)&&!(await p.$eval('#plMain',e=>e.hidden)),'cancel import');
  fs.writeFileSync(L.out('bad.csv'),'a;b\nHT-50-02;700\n');await p.setInputFiles('#fCsv',L.out('bad.csv'));await p.waitForTimeout(400);f=await fit();ok(f.next===null&&/Zamknij/.test(f.back),'bad file: no publish, close only');await click('#actBack');
  // PNG model: demo drawing, explode, draw a region
  await go('studio');await click('#demoPng');await p.waitForTimeout(2600);await click('#impLog [data-open]');await p.waitForTimeout(1500);
  const before=await p.$$eval('.srow',e=>e.length);await click('[data-sa="tool"]');
  const vb=await p.$eval('#viewer canvas',e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}});
  await p.mouse.move(vb.x+vb.w*.30,vb.y+vb.h*.25);await p.mouse.down();await p.mouse.move(vb.x+vb.w*.42,vb.y+vb.h*.42,{steps:6});await p.mouse.up();await p.waitForTimeout(600);
  ok(await p.$$eval('.srow',e=>e.length)===before+1,'region added on the PNG model');console.log('studio | PNG regions',before,'->',await p.$$eval('.srow',e=>e.length));
  // client: request, files through the capability
  await click('#mClient');await go('products');await click('[data-prod="pump"]');await p.waitForTimeout(1200);await click('.prow[data-pid="shaft"]');await p.waitForTimeout(900);
  await click('#actNext');await click('#actNext');await p.waitForTimeout(600);await click('#mPdf');await p.waitForTimeout(700);await click('#mZip');await p.waitForTimeout(1200);
  const saved=await p.evaluate(()=>window.__saved.map(s=>s.name.replace(/RFQ-[0-9-]+/,'RFQ')+':'+s.size));ok(saved.length===3&&saved.some(s=>s.startsWith('partpark-cennik-wzor.csv'))&&saved.some(s=>/\.pdf/.test(s))&&saved.some(s=>/\.zip/.test(s)),'hosted saves: '+saved);
  console.log('hosted | saved through the capability:',saved.join(', '));
  // empty request screen
  await click('#actNext');f=await fit();ok(f.scr==='products'&&(await p.$eval('#cartCount',e=>e.textContent))==='0','new request resets');
  await click('.cartbtn');f=await fit();ok(f.scr==='order'&&f.nextOff&&/puste/.test(f.info),'empty request state: '+f.info);
  await p.context().close()}
 { // ---- dark theme renders, no errors
  const ctx=await b.newContext({viewport:{width:1366,height:650},colorScheme:'dark'});const p=await ctx.newPage();
  await p.route('**/three@0.128.0/**',r=>{const u=r.request().url().split('three@0.128.0/')[1];r.fulfill({body:fs.readFileSync(L.THREE+u,'utf8'),contentType:'application/javascript'})});await p.route('**cdnjs**',r=>r.abort());await p.route('**fonts.g**',r=>r.abort());
  let errs=0;p.on('pageerror',e=>{errs++;console.log('PAGEERR',e.message)});
  await p.setContent('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}</style></head><body>'+fs.readFileSync(F,'utf8')+'</body></html>');await p.waitForTimeout(2200);
  await p.evaluate(()=>document.querySelector('[data-prod="pump"]').click());await p.waitForTimeout(1300);await p.screenshot({path:L.out('dark.png')});
  ok(!errs&&await p.evaluate(()=>getComputedStyle(document.querySelector('.stepper')).backgroundColor!=='rgb(255, 255, 255)'),'dark theme');await ctx.close()}
 for(const vp of ['pc','phone']){ // ---- standalone file from disk, network off
  const ctx=await b.newContext({...L.VP[vp],acceptDownloads:true,offline:true});const p=await ctx.newPage();const net=[];
  p.on('request',r=>{if(!/^(file|blob|data):/.test(r.url()))net.push(r.url())});p.on('pageerror',e=>console.log('PAGEERR',e.message));
  await p.goto('file://'+path.resolve(SA));await p.waitForTimeout(3000);
  const c=async s=>{await p.evaluate(s=>document.querySelector(s).click(),s);await p.waitForTimeout(400)};
  const q=await p.evaluate(()=>({mode:document.compatMode,three:typeof THREE,scrollY:document.documentElement.scrollHeight-innerHeight,appH:Math.round(document.querySelector('.app').getBoundingClientRect().height),vh:innerHeight,thumbs:document.querySelectorAll('#pgrid img').length}));
  ok(q.mode==='CSS1Compat'&&q.three==='object'&&q.scrollY<=0&&q.appH===q.vh&&q.thumbs===5,'standalone frame '+JSON.stringify(q));
  await c('[data-prod="pump"]');await p.waitForTimeout(1200);await p.evaluate(()=>{const b=document.querySelector('.subtabs[data-for="configurator"] [data-pane="list"]');if(b.getBoundingClientRect().width)b.click()});
  await c('.prow[data-pid="imp"]');await p.waitForTimeout(1200);await c('#actNext');await c('#actNext');await p.waitForTimeout(600);
  const t=await p.$eval('#mTitle',e=>e.textContent);const [dl]=await Promise.all([p.waitForEvent('download'),p.evaluate(()=>document.querySelector('#mZip').click())]);const zp=L.out('rfq-'+vp+'.zip');await dl.saveAs(zp);
  await c('#mStudio');await c('#stepper [data-go="prices"]');const [d2]=await Promise.all([p.waitForEvent('download'),p.evaluate(()=>document.querySelector('#bCsvTpl').click())]);
  ok(/RFQ-/.test(t)&&fs.statSync(zp).size>30000&&net.length===0,'standalone path');console.log('standalone',vp,'|',t,'| zip',fs.statSync(zp).size,'| csv',d2.suggestedFilename(),'| network requests',net.length,'| frame',q.appH+'/'+q.vh);
  await ctx.close()}
 await b.close();console.log(bad?`FAILED: ${bad}`:'ALL OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});

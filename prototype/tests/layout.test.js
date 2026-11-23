// Regression for the app-shell layout: every screen fits the window, the stepper and action bar always say where you are,
// and the earlier behaviours (empty start + hint, labelled explode + auto reveal, tap tolerance + selection bar, two perspectives, price list) still work.
const L=require('./lib.js');const fs=require('fs');
const F=process.argv[2]||L.FRAGMENT,ONLY=process.argv[3];let bad=0;
const ok=(c,m)=>{if(!c){bad++;console.log('   FAIL:',m)}};
(async()=>{const b=await L.launch();
for(const vp of ['pc','pcL','phone','phoneS','tablet']){if(ONLY&&ONLY!==vp)continue;
 const {p,click,go,pane,fit,touch,vrect,state}=await L.open(b,F,vp);const W=L.VP[vp].viewport,ph=W.width<=1020,T=vp.padEnd(6);
 const chk=async(name,expCur)=>{const f=await fit();
   ok(f.pageScrollY<=0&&f.pageScrollX<=0,`${name}: page scrolls (${f.pageScrollY},${f.pageScrollX})`);ok(f.vh===W.height&&f.appW===W.width,`${name}: frame ${f.appW}x${f.vh}`);
   ok(!f.wide.length,`${name}: wider than window: ${f.wide}`);ok(f.act&&f.act[1]<=W.height+1&&f.hdr[0]>=0,`${name}: bars outside window`);
   if(expCur!==undefined)ok(f.cur===expCur,`${name}: stepper current=${f.cur}, expected ${expCur}`);return f};
 // --- client path
 let f=await chk('K1','products');
 ok((await state()).cart==='0','start: request not empty');ok(f.next.startsWith('Dalej: części'),'K1 next');
 console.log(T,'K1 |',f.now,'| cards in view:',await p.$$eval('#pgrid .pcard',(e)=>e.filter(x=>{const r=x.getBoundingClientRect();return r.bottom<=innerHeight&&r.top>=0}).length+'/'+e.length));
 await click('[data-prod="pump"]');await p.waitForTimeout(1300);
 f=await chk('K2','configurator');ok(f.nextOff,'K2 next should be disabled with no selection');
 if(ph)await pane('configurator','model');
 const hint=await p.$eval('#selBar',e=>e.innerText.trim());ok(/Kliknij lub dotknij/.test(hint),'K2 hint missing');
 const ex=await p.$eval('#tExplode',e=>e.innerText.trim());ok(ex==='Rozsuń części','explode label: '+ex);
 const vr=await vrect();ok(vr.h>=250&&vr.y+vr.h<=W.height,'viewer does not fit: '+JSON.stringify(vr));
 console.log(T,'K2 | viewer',Math.round(vr.w)+'x'+Math.round(vr.h),'| hint:',hint.slice(0,40),'| next disabled',f.nextOff);
 // selection by tap/click on the model (pump casing/motor are visible)
 let pt=null;   // find a spot that really has a part under it: hover until the tooltip names one
 for(const fy of [.5,.42,.58,.35,.65]){for(const fx of [.5,.4,.6,.3,.7]){await p.mouse.move(vr.x+vr.w*fx,vr.y+vr.h*fy);await p.waitForTimeout(120);
   if(await p.$eval('#tip',e=>!e.hidden)){pt={x:vr.x+vr.w*fx,y:vr.y+vr.h*fy};break}}if(pt)break}
 ok(pt,'no pickable part found on the model');pt=pt||{x:vr.x+vr.w*.5,y:vr.y+vr.h*.5};await p.mouse.move(vr.x+4,vr.y+4);
 if(W.width<700){await touch(pt.x,pt.y,9,6,120)}else{await p.mouse.click(pt.x,pt.y);await p.waitForTimeout(350)}
 let st=await state();const picked=st.sel;
 if(W.width<700&&picked==='1'){await touch(pt.x,pt.y,6,9,120);ok((await state()).sel==='0','second tap with drift should unselect');await touch(pt.x,pt.y,14,9,120);ok((await state()).sel==='0','17 px drift must not select');await touch(pt.x,pt.y,70,10,250);ok((await state()).sel==='0','a drag must not select')}
 else if(picked==='1'){await p.mouse.click(pt.x,pt.y);await p.waitForTimeout(300)}
 ok(picked==='1','picking on the model failed');console.log(T,'K2 | pick on model ->',picked==='1'?'selected, then cleared':'NOT selected');
 // selection from the list reveals the hidden impeller
 if(ph)await pane('configurator','list');
 await click('.prow[data-pid="imp"]');await p.waitForTimeout(1600);
 const toast=await p.$eval('#toast',e=>e.classList.contains('show')?e.innerText.replace(/\s+/g,' '):'');ok(/wewnątrz/.test(toast),'reveal toast: '+toast);
 if(ph){await click('#toastBtn');await p.waitForTimeout(500);ok(await p.$eval('#viewer',e=>e.getBoundingClientRect().height>0),'toast action should show the model')}
 const bar=await p.$eval('#selBar',e=>e.innerText.replace(/\s+/g,' '));ok(/Wirnik/.test(bar)&&/Cofnij/.test(bar)&&/Komplet/.test(bar),'selection bar: '+bar);
 ok(await p.$eval('#tExplode',e=>e.innerText.trim())==='Złóż model','model should be exploded');
 await click('#selBar [data-sb="kit"]');ok(await p.$$eval('#selBar .sb-list li',e=>e.length)===4,'kit list in bar');
 f=await chk('K2 selected','configurator');ok(!f.nextOff,'K2 next enabled');
 console.log(T,'K2 | bar:',bar.slice(0,70),'| info:',f.info.slice(0,70));
 await click('#selBar [data-go="order"]');
 f=await chk('K3','order');
 if(ph)await pane('order','items');
 const rows=await p.$$eval('#orderBody tbody tr',e=>e.length);ok(rows===7,'order rows '+rows);
 const disc=await p.evaluate(()=>{const n=document.querySelector('.ordfoot .notice');const r=n.getBoundingClientRect();return{t:n.innerText.slice(0,40),vis:r.height>0}});
 console.log(T,'K3 | rows',rows,'| info:',f.info,'| next:',f.next);ok(/poglądowe/.test(f.info),'K3 info must carry the price disclaimer');
 await click('#actNext');await p.waitForTimeout(700);
 f=await chk('K4','done');
 const title=await p.$eval('#mTitle',e=>e.textContent);ok(/RFQ-/.test(title),'K4 title '+title);
 const xmlOk=await p.evaluate(()=>{document.querySelector('#mvXml').click();return /<TaxId>1234567890<\/TaxId>/.test(document.querySelector('#mXml').textContent)&&/Producent D/.test(document.querySelector('#mXml').textContent)});ok(xmlOk,'XML content');
 const [dl]=await Promise.all([p.waitForEvent('download'),p.evaluate(()=>document.querySelector('#mZip').click())]);
 console.log(T,'K4 |',title,'| zip',dl.suggestedFilename(),'| steps done:',await p.$$eval('#stepper .st.done',e=>e.length));
 await click('#stepper [data-go="docs"]');f=await chk('Instrukcje',null);ok(await p.$$eval('#docsList details',e=>e.length)===1,'docs list');
 await click('#actBack');f=await chk('back from docs','done');
 // changing the list invalidates the confirmation
 await go('configurator');if(ph)await pane('configurator','list');await click('.prow[data-pid="bear"]');await p.waitForTimeout(900);
 ok(await p.$eval('#stepper [data-go="done"]',e=>e.disabled),'confirmation step should close after the list changed');
 await click('.prow[data-pid="bear"]');
 // --- producer path
 await click('#mStudio');f=await chk('S1','studio');
 ok(!(await p.$eval('.cartbtn',e=>e.getBoundingClientRect().width>0)),'request button must be hidden for the producer');
 if(ph)await pane('studio','import');
 await click('#demoStep');await p.waitForTimeout(3200);ok(await p.$$eval('#impLog li',e=>e.length)===6,'import log');
 await click('#impLog [data-open]');await p.waitForTimeout(1500);
 f=await chk('S2','configurator');if(ph)await pane('configurator','list');
 const pid=await p.evaluate(()=>{const r=[...document.querySelectorAll('.srow')].find(x=>x.querySelector('.pill.p'));r.click();return r.dataset.pid});await p.waitForTimeout(400);
 await p.evaluate(()=>[...document.querySelectorAll('#drawerStudio button')].find(x=>/Zatwierdź jako/.test(x.textContent)).click());await p.waitForTimeout(400);
 await chk('S2 editor','configurator');
 await click('#actNext');f=await chk('S3','publish');ok(/Opublikuj sBoM v1/.test(f.next)&&!f.nextOff,'S3 next: '+f.next);
 const tiles=await p.$$eval('.pubtile b',e=>e.map(x=>x.textContent).join('/'));
 await click('#actNext');await p.waitForTimeout(600);f=await chk('S3 published','publish');
 ok(await p.$('#pubOk')!==null,'publish confirmation');ok(/Zobacz jako klient/.test(f.next),'S3 next after publish: '+f.next);
 console.log(T,'S3 | tiles',tiles,'|',f.now,'| next:',f.next);
 await go('prices');f=await chk('S4','prices');
 await click('#demoCsv');f=await chk('S4 preview','prices');ok(/Opublikuj cennik v/.test(f.next)&&/Anuluj import/.test(f.back),'S4 preview bar: '+f.next+' / '+f.back);
 ok(await p.$eval('#plMain',e=>e.hidden),'table should give way to the preview');
 await click('#actNext');await p.waitForTimeout(500);f=await chk('S4 published','prices');
 const tl=await p.$$eval('#plTrend .ttile b',e=>e.map(x=>x.textContent).join('/'));ok(/^Cennik v1[34]/.test(await p.$eval('#plVer',e=>e.textContent)),'price list version');
 const hist=await p.evaluate(()=>{const b=document.querySelector('#plBody .t-up').closest('tr').querySelector('[data-ph]');b.click();return document.querySelector('.phist li').innerText.replace(/\s+/g,' ')});
 console.log(T,'S4 | trend tiles',tl,'|',await p.$eval('#plVer',e=>e.textContent),'| history:',hist.slice(0,70));
 await chk('S4 history','prices');
 // back to the client: selections kept, new product in the catalog, prices dated today
 await click('#mClient');f=await chk('client again');st=await state();ok(st.sel==='1','selection kept: '+st.sel);
 await go('products');ok(await p.$$eval('#pgrid .pcard',e=>e.length)===6,'published product in the catalog');
 console.log(T,'back as client | sel',st.sel,'|',f.now);
 await p.context().close()}
// low window (phone held sideways): the frame gives way to normal page scrolling
if(!ONLY){const ctx=await b.newContext({viewport:{width:844,height:390},hasTouch:true,isMobile:true});const p=await ctx.newPage();
 await p.route('**/three@0.128.0/**',r=>{const u=r.request().url().split('three@0.128.0/')[1];r.fulfill({body:fs.readFileSync(L.THREE+u,'utf8'),contentType:'application/javascript'})});await p.route('**cdnjs**',r=>r.abort());await p.route('**fonts.g**',r=>r.abort());
 p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.setContent('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}</style></head><body>'+fs.readFileSync(F,'utf8')+'</body></html>');await p.waitForTimeout(2200);
 await p.evaluate(()=>document.querySelector('[data-prod="pump"]').click());await p.waitForTimeout(1200);
 const r=await p.evaluate(()=>({scroll:document.documentElement.scrollHeight-innerHeight,viewer:Math.round(document.querySelector('#viewer').getBoundingClientRect().height),overflowX:document.documentElement.scrollWidth-innerWidth,act:getComputedStyle(document.querySelector('#actbar')).position}));
 ok(r.scroll>0&&r.viewer>=300&&r.overflowX<=0,'landscape fallback '+JSON.stringify(r));console.log('lowwin | page scroll',r.scroll,'| viewer h',r.viewer,'| action bar',r.act);await p.screenshot({path:L.out('low-window.png')});await ctx.close()}
await b.close();console.log(bad?`FAILED: ${bad}`:'ALL OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});

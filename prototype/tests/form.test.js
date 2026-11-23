// request form: fits the window, urgency segment, optional block, validation
const L=require('./lib.js');const file=process.argv[2]||L.FRAGMENT;let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
(async()=>{const b=await L.launch();
 for(const vp of ['pc','pcL','tablet','phone','phoneS']){
  const narrow=!vp.startsWith('pc');
  const {p,click,go,pane,fit}=await L.open(b,file,vp);
  await click('.pcard:nth-child(5)');await p.waitForTimeout(1500);
  if(narrow)await pane('configurator','list');
  await click('.prow[data-pid="imp"]');await p.waitForTimeout(1000);
  await go('order');if(narrow)await pane('order','form');
  const m=()=>p.evaluate(()=>{const f=document.querySelector('#orderForm'),n=f.querySelector('.demonote'),fr=f.getBoundingClientRect();
    const req=[...f.querySelectorAll('[required]')].map(e=>e.getBoundingClientRect()).every(r=>r.height>0&&r.bottom<=fr.bottom+1&&r.top>=fr.top-1);
    const sum=f.querySelector('#formMore summary').getBoundingClientRect();
    return{over:f.scrollHeight-f.clientHeight,noteCut:n.scrollWidth-n.clientWidth,note:n.innerText,req,sumIn:sum.bottom<=fr.bottom+1,useg:Math.round(f.querySelector('.useg').getBoundingClientRect().width),fw:Math.round(fr.width),scrollTop:Math.round(f.scrollTop)}});
  const a=await m();const F=await fit();
  ok(F.pageScrollY<=0&&F.pageScrollX<=0,vp+' page scroll');
  if(vp!=='phoneS'){ok(a.over<=0,vp+' form overflows by '+a.over);ok(a.req,vp+' required fields not all in view');ok(a.sumIn,vp+' optional summary not in view')}
  ok(a.noteCut<=0,vp+' note cut by '+a.noteCut);ok(a.useg<=a.fw-32+1,vp+' urgency segment too wide');
  // urgency + optional data go into the request
  await click('.useg input[value="exp"]');
  await click('#formMore summary');await p.waitForTimeout(250);
  const open=await m();
  await p.evaluate(()=>{document.querySelector('#fSerial').value='SN-TEST-01';document.querySelector('#fNotes').value='uwaga testowa';document.querySelector('#fTech').checked=true});
  // invalid first
  await p.evaluate(()=>{document.querySelector('#fNip').value='12'});
  await click('#actNext');
  const e1=await p.evaluate(()=>({err:!document.querySelector('#formErr').hidden,txt:document.querySelector('#formErr').textContent,cur:document.querySelector('#stepper [aria-current="step"]').dataset.go,formShown:document.querySelector('#orderForm').getBoundingClientRect().height>0}));
  ok(e1.err&&e1.cur==='order'&&e1.formShown,vp+' invalid NIP must keep step 3 with error');
  await p.evaluate(()=>{document.querySelector('#fNip').value='1234567890'});
  if(narrow)await pane('order','items');
  await click('#actNext');await p.waitForTimeout(700);
  const d=await p.evaluate(()=>{document.querySelector('#mvXml').click();return new Promise(r=>setTimeout(()=>r({cur:document.querySelector('#stepper [aria-current="step"]').dataset.go,xml:document.querySelector('#mView').innerText}),300))});
  ok(d.cur==='done',vp+' not on confirmation: '+d.cur);
  ok(/<Urgency>urgent<\/Urgency>/.test(d.xml),vp+' urgency missing in XML');ok(d.xml.includes('SN-TEST-01')&&d.xml.includes('uwaga testowa'),vp+' optional data missing in XML');
  console.log(vp.padEnd(6),`form over ${a.over} | note "${a.note}" cut ${a.noteCut} | required in view ${a.req} | opened: scrollTop ${open.scrollTop}, over ${open.over} | invalid -> "${e1.txt.slice(0,28)}…" | sent -> ${d.cur}`);
  await p.context().close();
 }
 await b.close();console.log(bad?'FAILED '+bad:'ALL OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});

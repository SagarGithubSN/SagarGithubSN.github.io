const fs=require('fs'), path=require('path');
/* Replace em dashes in what a visitor reads: string literals and JSX text.
   Code comments are documentation, not website copy, so they are left alone.
   Scans with a small state machine rather than a blind regex, because a blind
   replace would rewrite ~150 comment lines that nobody ever sees. */
const files=[];
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);
  if(e.isDirectory()){ if(!['node_modules','.next','.next-build','.git'].includes(e.name)) walk(p); }
  else if(/\.(ts|tsx)$/.test(e.name)) files.push(p);}})('src');

let changed=0, replaced=0, skipped=0;
for(const f of files){
  const src=fs.readFileSync(f,'utf8');
  let out='', i=0, n=src.length;
  let state='code'; // code | line | block | sq | dq | tpl
  while(i<n){
    const c=src[i], c2=src[i+1];
    if(state==='code'){
      if(c==='/'&&c2==='/'){state='line'; out+=c+c2; i+=2; continue;}
      if(c==='/'&&c2==='*'){state='block'; out+=c+c2; i+=2; continue;}
      if(c==="'"){state='sq';}
      else if(c==='"'){state='dq';}
      else if(c==='`'){state='tpl';}
      if(c==='\u2014'){out+='-'; replaced++; i++; continue;}
      out+=c; i++; continue;
    }
    if(state==='line'){ if(c==='\n') state='code'; if(c==='\u2014') skipped++; out+=c; i++; continue; }
    if(state==='block'){ if(c==='*'&&c2==='/'){state='code'; out+=c+c2; i+=2; continue;} if(c==='\u2014') skipped++; out+=c; i++; continue; }
    // inside a string literal: this IS website copy
    if(c==='\'){ out+=c+(c2??''); i+=2; continue; }
    if((state==='sq'&&c==="'")||(state==='dq'&&c==='"')||(state==='tpl'&&c==='`')) state='code';
    if(c==='\u2014'){ out+='-'; replaced++; i++; continue; }
    out+=c; i++;
  }
  if(out!==src){ fs.writeFileSync(f,out,'utf8'); changed++; }
}
console.log('files changed:', changed);
console.log('em dashes replaced in copy:', replaced);
console.log('em dashes left in code comments:', skipped);

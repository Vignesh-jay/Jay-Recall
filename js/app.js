
function showView(view){
 const app=document.getElementById('app');

 if(view==='dashboard'){
   const entries=getEntries();
   app.innerHTML=`
   <h1>Dashboard</h1>
   <div class="card">Entries: ${entries.length}</div>
   `;
 }

 if(view==='add'){
   app.innerHTML=`
   <h1>Add Entry</h1>
   <input id="title" placeholder="Title">
   <input id="category" placeholder="Category">
   <input id="tags" placeholder="Tags">
   <textarea id="content" rows="8" placeholder="Content"></textarea>
   <button onclick="saveEntry()">Save Entry</button>
   `;
 }

 if(view==='search'){
   app.innerHTML=`
   <h1>Search</h1>
   <input id="searchBox" placeholder="What are you trying to remember?" oninput="performSearch()">
   <div id="results"></div>
   `;
 }

 if(view==='favorites'){
   const favs=getEntries().filter(x=>x.favorite);
   app.innerHTML='<h1>Favorites</h1>' + favs.map(e=>`<div class="card">${e.title}</div>`).join('');
 }
}

function saveEntry(){
 const entries=getEntries();

 entries.push({
   id:Date.now(),
   title:document.getElementById('title').value,
   category:document.getElementById('category').value,
   tags:document.getElementById('tags').value,
   content:document.getElementById('content').value,
   favorite:false,
   createdAt:new Date().toISOString()
 });

 saveEntries(entries);
 alert('Entry Saved');
 showView('dashboard');
}

function performSearch(){
 const q=document.getElementById('searchBox').value.toLowerCase();
 const results=getEntries().filter(e=>
  JSON.stringify(e).toLowerCase().includes(q)
 );

 document.getElementById('results').innerHTML=results.map(e=>
 `<div class="card"><h3>${e.title}</h3><p>${e.category}</p></div>`
 ).join('');
}

function exportData(){
 const data=JSON.stringify(getEntries(),null,2);
 const blob=new Blob([data],{type:'application/json'});
 const a=document.createElement('a');
 a.href=URL.createObjectURL(blob);
 a.download='jay-recall-backup.json';
 a.click();
}

showView('dashboard');

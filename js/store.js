
const STORAGE_KEY='jay_recall_entries';

function getEntries(){
 return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
}

function saveEntries(entries){
 localStorage.setItem(STORAGE_KEY,JSON.stringify(entries));
}

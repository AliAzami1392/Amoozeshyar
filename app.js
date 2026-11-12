const ADMIN_PASSWORD ="Ali13921405110";

function adminLogin() {
  const password = prompt("رمز ورود مدیر آموزشیار را وارد کنید:");

  if (password === null) return;

  if (password === ADMIN_PASSWORD) {
    alert("خوش آمدید، علی اعظمی اردکانی");
    show("admin");
  } else {
    alert("رمز عبور اشتباه است!");
  }
}const sections=['intro','auth','home','free','purchase','admin'];
function show(id){sections.forEach(s=>document.getElementById(s).classList.toggle('hidden',s!==id));if(id==='free')renderItems();}
function enterApp(){const name=document.getElementById('displayName').value.trim()||'دانش‌آموز';const code=document.getElementById('demoCode').value.trim();if(!code){alert('برای ورود آزمایشی یک نام کاربری وارد کنید.');return;}document.getElementById('welcomeTitle').textContent='خوش آمدی، '+name;show('home');}
function getItems(){try{return JSON.parse(localStorage.getItem('demoItems')||'[]')}catch(e){return[]}}
function addItem(){const title=document.getElementById('itemTitle').value.trim(),desc=document.getElementById('itemDesc').value.trim(),type=document.getElementById('itemType').value;if(!title){alert('عنوان را وارد کنید.');return;}const items=getItems();items.push({title,desc,type});localStorage.setItem('demoItems',JSON.stringify(items));document.getElementById('itemTitle').value='';document.getElementById('itemDesc').value='';alert('به فهرست آزمایشی اضافه شد.');}
function renderItems(){const box=document.getElementById('freeList'),items=getItems().filter(x=>x.type==='free');box.innerHTML=items.length?items.map(x=>`<article><strong>${escapeHtml(x.title)}</strong><div>${escapeHtml(x.desc)}</div></article>`).join(''):'<p class="muted">هنوز آموزشی اضافه نشده است.</p>';}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function savePackage(){const desc=document.getElementById('pkgDesc').value.trim(),price=document.getElementById('pkgPrice').value.trim();localStorage.setItem('demoPackage',JSON.stringify({desc,price}));document.getElementById('packageInfo').innerHTML=`<p>${escapeHtml(desc||'توضیحات هنوز ثبت نشده است.')}</p><strong>قیمت: ${escapeHtml(price||'تعیین نشده')} تومان</strong>`;alert('اطلاعات بسته در همین دستگاه ذخیره شد.');}
try{const p=JSON.parse(localStorage.getItem('demoPackage')||'null');if(p)document.getElementById('packageInfo').innerHTML=`<p>${escapeHtml(p.desc)}</p><strong>قیمت: ${escapeHtml(p.price||'تعیین نشده')} تومان</strong>`;}catch(e){}
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}

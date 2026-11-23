(function(){
var KEY='rz-consent',SUBKEY='rz-sub',b=document.body,pixel=b.getAttribute('data-pixel');
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function sget(k){try{return sessionStorage.getItem(k)}catch(e){return null}}
function sset(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}
var q=new URLSearchParams(location.search),sub=q.get('sub')||q.get('subid')||q.get('utm_content');
if(sub&&/^[A-Za-z0-9_\-]{1,80}$/.test(sub)){sset(SUBKEY,sub)}sub=sget(SUBKEY);
function loadPixel(){if(!pixel||window.fbq)return;!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',pixel);fbq('track','PageView')}
function banner(){var d=document.getElementById('consent');if(!d)return;d.hidden=false;
d.querySelector('.yes').onclick=function(){set(KEY,'yes');d.hidden=true;loadPixel()};
d.querySelector('.no').onclick=function(){set(KEY,'no');d.hidden=true}}
if(pixel){var c=get(KEY);if(c==='yes')loadPixel();else if(c!=='no')banner()}
var s=document.getElementById('cookieSettings');if(s){s.onclick=function(){set(KEY,'');banner()}}
document.querySelectorAll('a[data-offer]').forEach(function(a){
var p=a.getAttribute('data-sub-param')||'subid',v=sub||a.getAttribute('data-default-sub');
try{var u=new URL(a.href);u.searchParams.set(p,v);a.href=u.toString()}catch(e){}
a.addEventListener('click',function(){if(window.fbq&&get(KEY)==='yes'){fbq('trackCustom','OfferClick',{offer:a.getAttribute('data-offer'),sub:v})}})});
})();
import{a as L,i as f,S as b}from"./assets/vendor-DtRopbQG.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();async function g(r){var e,o;try{const i=await L.get("https://pixabay.com/api/?",r);if(!((o=(e=i.data)==null?void 0:e.hits)!=null&&o.length))throw new Error("Sorry, there are no images matching your search query. Please try again!");return i.data.hits}catch(i){return f.error({message:`${i.message}`,messageColor:"white",position:"topRight",color:"#ef4040"}),[]}}function h(r){return r.map(e=>`<li class="gallery-item">
    <a class="gallery-link" href="${e.largeImageURL}">
    <img
    class="gallery-image"
    src="${e.webformatURL}"
    alt="${e.tags.slice(0,120)}"
    />
    </a>
    <div class="item-subtitle">
    <p class="item-text"><b>Likes</b> ${e.likes}</p>
    <p class="item-text"><b>Views</b> ${e.views}</p>
    <p class="item-text"><b>Comments</b> ${e.comments}</p>
    <p class="item-text"><b>Downloads</b> ${e.downloads}</p>
    </div>
    </li>`).join("")}let y=new b(".gallery a",{captionsData:"alt",captionDelay:250}),d="",a=1,u=1;const n={params:{key:"49358798-a0fde913d86352b572e9384bf",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:a}},w=document.querySelector(".form"),v=document.querySelector("input"),p=document.querySelector(".gallery"),c=document.querySelector(".loader"),l=document.querySelector(".btn");w.addEventListener("submit",q);v.addEventListener("input",S);l.addEventListener("click",$);function S(r){d=r.target.value.trim()}async function q(r){r.preventDefault();const e=r.currentTarget;if(l.classList.add("hidden"),a=1,n.params.page=a,d===""){f.error({message:"Fill in the search field!",messageColor:"white",position:"topRight",color:"#ef4040"}),e.reset();return}n.params.q=d,p.innerHTML="",c.classList.remove("hidden");try{const o=await g(n);if(o.length===0){l.classList.add("hidden");return}u=Math.ceil(500/n.params.per_page),p.insertAdjacentHTML("beforeend",h(o)),l.classList.remove("hidden"),y.refresh(),a<u&&l.classList.remove("hidden")}finally{c.classList.add("hidden")}e.reset(),d=""}async function $(){if(a+=1,n.params.page=a,c.classList.remove("hidden"),a>u){f.error({position:"topRight",message:"We're sorry, but you've reached the end of search results.",messageColor:"white",color:"#ef4040"}),c.classList.add("hidden"),l.classList.add("hidden");return}try{const r=await g(n);p.insertAdjacentHTML("beforeend",h(r)),y.refresh();const e=document.querySelector(".gallery-item");if(e){const o=e.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}catch(r){console.log(r)}finally{c.classList.add("hidden")}}
//# sourceMappingURL=index.js.map

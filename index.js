import{a as f,i as m,S as p}from"./assets/vendor-DU6yh4ar.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();function d(o){return f.get("https://pixabay.com/api/?",o).then(e=>{var s,i;if(!((i=(s=e.data)==null?void 0:s.hits)!=null&&i.length))throw new Error("Sorry, there are no images matching your search query. Please try again!");return e.data.hits}).catch(e=>(m.show({message:`${e.message}`,messageColor:"white",iconUrl:"../public/blocked.svg",position:"topRight",color:"#ef4040"}),[]))}function g(o){return o.map(e=>`<li class="gallery-item">
    <a class="gallery-link" href="${e.largeImageURL}">
    <img
    class="gallery-image"
    src="${e.webformatURL}"
    alt="${e.tags}"
    />
    </a>
    <div class="item-subtitle">
    <p class="item-text"><b>Likes</b> ${e.likes}</p>
    <p class="item-text"><b>Views</b> ${e.views}</p>
    <p class="item-text"><b>Comments</b> ${e.comments}</p>
    <p class="item-text"><b>Downloads</b> ${e.downloads}</p>
    </div>
    </li>`).join("")}let h=new p(".gallery a",{captionsData:"alt",captionDelay:250}),a="";const l={params:{key:"49358798-a0fde913d86352b572e9384bf",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0}},y=document.querySelector(".form"),b=document.querySelector("input"),c=document.querySelector(".gallery"),u=document.querySelector(".loader");y.addEventListener("submit",w);b.addEventListener("input",L);function L(o){a=o.target.value.trim()}function w(o){o.preventDefault();const e=o.currentTarget;if(a===""){m.show({message:"Fill in the search field!",messageColor:"white",iconUrl:"./public/blocked.svg",position:"topRight",color:"#ef4040"}),e.reset();return}l.params.q=a,c.innerHTML="",u.classList.remove("hidden"),d(l).then(s=>{c.insertAdjacentHTML("beforeend",g(s)),h.refresh()}).finally(()=>{u.classList.add("hidden")}),e.reset(),a=""}
//# sourceMappingURL=index.js.map

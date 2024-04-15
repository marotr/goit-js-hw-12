import{a as L,i,S}from"./assets/vendor-6e0bf343.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();function g(e){return e.map(({webformatURL:r,tags:a,largeImageURL:o,likes:t,views:s,comments:l,downloads:C})=>` <li class="gallery-item">
        <a class="gallery-link" href="${o}" >
          <img class="gallery-image"
           src="${r}" 
           alt="${a}" 
           width = "360"/>
          <ul class="card-descr">
           <li class="card-element"><span class="label">Likes</span> <p class ="value">${t}</p></li>
            <li class="card-element"><span class="label">Views</span> <p class ="value">${s}</p></li>
            <li class="card-element"><span class="label">Comments</span> <p class ="value">${l}</p></li>
            <li class="card-element"><span class="label">Downloads</span><p class ="value">${C}</p></li></ul>
        </a>
      </li>`).join("")}const v="43193709-9f2e77a8cd9049868dd3fabee";async function m(e,r="1"){const a={key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:15};try{const o=await L.get("https://pixabay.com/api/",{params:a});if(o.status!==200)throw new Error(o.statusText);return o.data}catch(o){throw o}}const f=document.querySelector(".search-form"),u=document.querySelector(".gallery"),q=document.querySelector(".search-btn"),y=document.querySelector(".loader"),n=document.querySelector(".load-more"),d=document.querySelector(".end-message");n.addEventListener("click",H);q.addEventListener("click",w);const x=document.querySelector(".search-form input");x.addEventListener("input",()=>{c=1,u.innerHTML=""});f.addEventListener("submit",w);let c=1,p="";d.style.display="none";function h(){y.style.display="block"}function b(){y.style.display="none"}function w(e){if(e.preventDefault(),p=document.querySelector(".search-form input").value.trim(),p===""){i.show({message:"Please enter a search query",messageColor:"#fff",backgroundColor:"#ef4040",position:"topCenter",messageSize:"16px",messageLineHeight:"150%",iconColor:"white"});return}h(),u.innerHTML="",n.style.display="none",console.log(n.style.display),m(p).then(a=>{if(a.hits.length===0)i.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#ef4040",position:"topCenter",messageSize:"16px",messageLineHeight:"150%",iconColor:"white"});else{u.innerHTML=g(a.hits);const o={captionDelay:250,captionsData:"alt",captionPosition:"bottom"};new S(".gallery a",o).refresh();const s=15,l=Math.ceil(a.total/s);c<l&&(n.style.display="block",d.style.display="none")}}).catch(a=>{u.innerHTML="",i.show({message:"An error occurred while fetching images. Please try again later.",messageColor:"#fff",backgroundColor:"#ef4040",position:"topCenter",messageSize:"16px",messageLineHeight:"150%",iconColor:"white"})}).finally(()=>{b(),f.reset()})}async function H(){h(),n.disabled=!0;try{c++;const e=await m(p,c);e&&e.hits&&e.hits.length>0?(u.insertAdjacentHTML("beforeend",g(e.hits)),P(e.totalHits),k()):(n.style.display="none",c===1?i.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#ef4040",position:"topCenter",messageSize:"16px",messageLineHeight:"150%",iconColor:"white"}):(d.style.display="block",i.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#fff",backgroundColor:"#ef4040",position:"topCenter",messageSize:"16px",messageLineHeight:"150%",iconColor:"white"})))}catch{n.style.display="none",i.show({message:"An error occurred while fetching images. Please try again later.",messageColor:"#fff",backgroundColor:"#ef4040",position:"topCenter",messageSize:"16px",messageLineHeight:"150%",iconColor:"white"})}finally{n.disabled=!1,b()}}function P(e){c*15>=e?(n.style.display="none",d.style.display="block"):(n.style.display="block",d.style.display="none")}function k(){const e=document.querySelector(".gallery a");if(e){const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
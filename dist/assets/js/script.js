document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector("#show"),o=document.querySelector("#password"),n=document.querySelector("#login"),r=document.querySelector("#signup");var e;t.addEventListener("click",e=>{e.preventDefault(),"text"===o.type?(o.type="password",t.textContent="show"):(o.type="text",t.textContent="hide")}),e="a",document.querySelectorAll(e).forEach(t=>{t.addEventListener("click",e=>{t!==n&&t!==r&&e.preventDefault()})});const c=document.querySelector("#form"),l=document.querySelector("#name"),s=document.querySelector("#email"),u=document.querySelector("#password"),d=document.querySelector(".content__success");function a(e,t){const o=e.closest(".content__field");o.classList.add("content__field_error"),o.querySelector(".content__error").textContent=t}function i(e){const t=e.closest(".content__field");t.classList.remove("content__field_error"),t.querySelector(".content__error").textContent=""}c.addEventListener("submit",e=>{e.preventDefault(),function(){var e=s.value.trim(),t=u.value.trim();l&&(""===l.value.trim()?a(l,"Name field shouldn't be empty"):i(l));""!==e&&/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)?i(s):a(s,"The email is not valid!");""===t?a(u,"Password field shouldn't be empty"):/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(t)?i(u):a(u,"Your password should contain at least 8 letters, one number, one upper and lower case letters.");const o=document.querySelector(".content__field_error input");o?(o.focus(),d.style.display="none"):(c.querySelectorAll("input").forEach(e=>e.value=""),d.style.display="flex",setTimeout(()=>{d.style.display="none"},3e3))}()})});
const postsContainer = document.querySelector(".posts-container");
const loading = document.querySelector(".loader");
const inputFilter = document.querySelector("#filter");

let limite = 20;
let pagina = 1;

//hacemos el Fetch
const getPosts = async () => {
    const resp = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pagina}&_limit=${limite}`
    );
    const data = await resp.json();
    return data;
};

// pintar posts
const pintarPosts = (posts) => {
    const postsHTML = posts
    .map((valor) => {
        return `<div class="post">
        <div class="numerito">${valor.id}</div>
        <div class="post-info">
            <h2 class="post-title">${valor.title}</h2>
            <p class="post-body">
                ${valor.body}
            </p>
        </div>
      </div>`;
    })
    .join("");

   postsContainer.innerHTML += postsHTML;
};

//mostrar loading

// la funcion INICIAR

function iniciarPerri() {
    window.addEventListener("DOMContentLoaded", async () => {
        let posts = await getPosts();
        pintarPosts(posts)
        });

    window.addEventListener("scroll", async () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight) {
            //console.log("estoy en el final?");
            pagina++;
            
            //en la variable nuevos posts guardamos los proximos 5
            let nuevosPosts = await getPosts();
            
            //Y ahora queremos pintar esos nuevos posts
            mostrarLoader(nuevosPosts);
        }
    });
    //otro escuchador
    inputFilter.addEventListener("input", (e) => {
        const loQueEscribo = e.target.value.toUpperCase();
        const todosLosPosts = document.querySelectorAll(".post");

        for (const post of todosLosPosts) {
            const title = post.querySelector(".post-title").innerText.toUpperCase();
            const cuerpo = post.querySelector(".post-body").innerText.toUpperCase();
            
            if(title.includes(loQueEscribo) || cuerpo.includes(loQueEscribo)) {
                post.style.display = "flex";
            } else {
                post.style.display = "none";
            }
        }
    });
}

//creamos la funcion para filtrar en el input

// const filtrarPosts = () => {

// }

// Creamos la funcion para mostrar Loader
// que muestre el loader
// espere 3 segundos y lo saque
// y que pinte los posts.

const mostrarLoader = (algoNuevo) => {
    loading.classList.add("show");
    
    setTimeout(() => {
        loading.classList.remove("show");
        
        setTimeout(() => {
            pintarPosts(algoNuevo);
        }, 1000);
        
    }, 3000);
};

// llamar iniciar
iniciarPerri();


//cuando llegoa bajo de todo quiero que cargue otros 5 y 
//desaparezca el loading.


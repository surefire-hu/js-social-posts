const posts = [
{
    "id": 1,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/300?image=171",
    "author": {
        "name": "Phil Mangione",
        "image": "https://unsplash.it/300/300?image=15"
    },
    "likes": 80,
    "created": "2021-06-25"
},
{
    "id": 2,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=112",
    "author": {
        "name": "Sofia Perlari",
        "image": "https://unsplash.it/300/300?image=10"
    },
    "likes": 120,
    "created": "2021-09-03"
},
{
    "id": 3,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=234",
    "author": {
        "name": "Chiara Passaro",
        "image": "https://unsplash.it/300/300?image=20"
    },
    "likes": 78,
    "created": "2021-05-15"
},
{
    "id": 4,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=24",
    "author": {
        "name": "Luca Formicola",
        "image": null
    },
    "likes": 56,
    "created": "2021-04-03"
},
{
    "id": 5,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=534",
    "author": {
        "name": "Alessandro Sainato",
        "image": "https://unsplash.it/300/300?image=29"
    },
    "likes": 95,
    "created": "2021-03-05"
}
];

const likedPosts = [];

// Funzione per generare le iniziali dell'utente
function getInitials(name) {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
}

// Funzione per creare il HTML di un singolo post
function createPostHTML(post) {
    const { id, content, media, author, likes, created } = post;
    
    const authorImage = author.image 
        ? `<img class="profile-pic" src="${author.image}" alt="${author.name}">`
        : `<div class="profile-pic-default"><span>${getInitials(author.name)}</span></div>`;
    
    const mediaHTML = media 
        ? `<div class="post__image"><img src="${media}" alt=""></div>`
        : '';

    return `
        <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        ${authorImage}                 
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${author.name}</div>
                        <div class="post-meta__time">${post.created}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${content}</div>
            ${mediaHTML}
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button js-like-button" href="#" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
    `;
}

// Funzione per renderizzare tutti i post
function renderPosts() {
    const container = document.getElementById('container');
    container.innerHTML = posts.map(createPostHTML).join('');
}

// Funzione per gestire il click sul pulsante mi piace
function handleLikeClick(event) {
    event.preventDefault();
    const likeButton = event.currentTarget;
    const postId = parseInt(likeButton.dataset.postid);
    const likeCounter = document.getElementById(`like-counter-${postId}`);
    const post = posts.find(p => p.id === postId);
// capire i like
    if (likedPosts.includes(postId)) {
        likedPosts.splice(likedPosts.indexOf(postId), 1);
        post.likes--;
        likeButton.classList.remove('like-button--liked');
    } else {
        likedPosts.push(postId);
        post.likes++;
        likeButton.classList.add('like-button--liked');
    }

    likeCounter.textContent = post.likes;
}
// funzione per il click sul mi piace
function init() {
    renderPosts();
    document.querySelectorAll('.js-like-button').forEach(button => {
        button.addEventListener('click', handleLikeClick);
    });
}

document.addEventListener('DOMContentLoaded', init);
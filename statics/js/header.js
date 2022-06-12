// header
const header = document.createElement('header');
header.innerHTML = `
<img id="header_icon" src="./img/icon_dark.svg" alt="Home">
    <nav>
        <a href="/"><img src="./img/home2.svg" alt="홈"></a>
        <form id="search-form"><input type="search" id="search-input" placeholder="검색"></form>
        <a href="/write"><img src="./img/write2.svg" alt="글쓰기"></a>
        <a href="/login"><img src="./img/signin2.svg" alt="로그인"></a>
    </nav>
`;
document.body.prepend(header);
header.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const search = header.querySelector('#search-input');
    if (!search.value) return;
    console.log(search.value);
    search.value = '';
});
document.querySelector('header img#header_icon').addEventListener('click', () => {
    location.href = '/';
});

// footer
const footer = document.createElement('footer');
footer.innerHTML = `안녕난푸터다`;
if (document.querySelector('main').offsetHeight < window.innerHeight - 100) footer.classList.add('bottom');
document.body.appendChild(footer);



// head
const head = document.head;
const favicon = document.createElement('link');
favicon.rel = 'shortcut icon';
favicon.href = './favicon.svg';
head.appendChild(favicon);
const ogImg = document.createElement('meta');
ogImg.property = 'og:image';
ogImg.content = './img/ogimage.png';
head.appendChild(ogImg);
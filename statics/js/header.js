// header
const header = document.createElement('header');
header.innerHTML = `
    <h1>Lanovel</h1>
    <nav>
        <ul>
            <li><a href="/"><img src="./img/home1.svg" alt="홈"></a></li>
            <li id="search"><form id="search-form"><input type="search" id="search-input" placeholder="검색"></form></li>
            <li><a href="/write"><img src="./img/write1.svg" alt="글쓰기"></a></li>
            <li><a href="/login"><img src="./img/signin1.svg" alt="로그인"></a></li>
        </ul>
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
document.querySelector('header h1').addEventListener('click', () => {
    location.href = '/';
});

// footer
const footer = document.createElement('footer');
footer.innerHTML = `안녕난푸터다`;
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
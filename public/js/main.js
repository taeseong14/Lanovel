const novelList = document.querySelector('#novel-list');

get('/novels').then(novels => {
    novels = Array(10).fill().map((_, i) => {
        return {
            id: ++i,
            title: `Novel ${i}`,
            content: `Novel ${i} content`,
            author: 'babpool',
            cover: '/imgs/default-bookcover.png',
        }
    });
    if (!novels.length) return novelList.innerHTML = '<span>No novels found</sp>';
    novels.forEach(novel => {
        const { id, title, author, cover } = novel;
        const div = document.createElement('div');
        div.classList.add('novel');
        div.innerHTML = `
        <img class="cover" src="${cover}" alt="${title}">
        <div class="info">
        <div class="title">
        <a href="/viewer/${id}">${title}</a>
        </div>
        <div class="author">
        <a href="/user/${author}">${author}</a>
        </div>
        </div>
        `;
        novelList.appendChild(div);
    });
});
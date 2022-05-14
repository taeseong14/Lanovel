// 제목 엔터시 콘텐트로 이동
const titleInputForm = document.querySelector('#title form');
const contentInput = document.querySelector('#content-input');
titleInputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contentInput.focus();
});

// 글 제출
const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', () => {
    const title = document.querySelector('#title-input').value;
    const content = contentInput.innerText;
    if (title.length === 0) return alert('제목을 입력해주세요.');
    if (title.length > 30) return alert('제목은 30자 이내로 입력해주세요.');
    if (content.length === 0) return alert('내용을 입력해주세요.');
    // if (contentLength > 1000) return alert('내용은 1000자 이내로 입력해주세요.');
    // 한 회차당 글자수 몇?

    console.log('제출:', title, content);
});
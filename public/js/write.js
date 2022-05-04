const title = document.querySelector('#title-input');
const content = document.querySelector('#content-input');
const submitBtn = document.querySelector('#submit');
submitBtn.addEventListener('click', () => {
    const text = content.value;
    if (!text) return;
    post('/write', {
        title: title.value,
        content: text
    })
    .then(res => {
        if (res.result === 'success') {
            console.log('성공이내요??');
            console.log(res.novels);
        } else {
            console.log('실패이내요??');
        }
    })
});
const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static(__dirname + '/public'));

const novels = [];

app.get('/', (req, res) => res.sendFile(__dirname + '/public/view/main.html'));

app.get('/write', (req, res) => res.sendFile(__dirname + '/public/view/write.html'));

app.post('/write', (req, res) => {
    const { title, content } = req.body;
    console.log(title, content);
    novels.push({
        id: novels.length + 1,
        title,
        content
    });
    res.send({
        result: 'success',
        novels
    });
});

app.get('/novels', (req, res) => res.send(novels));

app.get('/novel/:id', (req, res) => {
    const { id } = req.params;
    const novel = novels.find(novel => novel.id === Number(id));
    res.send(novel);
});

const PORT = 6460;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

console.log('██╗░░░░░░█████╗░███╗░░██╗░█████╗░██╗░░░██╗███████╗██╗░░░░░');
console.log('██║░░░░░██╔══██╗████╗░██║██╔══██╗██║░░░██║██╔════╝██║░░░░░');
console.log('██║░░░░░███████║██╔██╗██║██║░░██║╚██╗░██╔╝█████╗░░██║░░░░░');
console.log('██║░░░░░██╔══██║██║╚████║██║░░██║░╚████╔╝░██╔══╝░░██║░░░░░');
console.log('███████╗██║░░██║██║░╚███║╚█████╔╝░░╚██╔╝░░███████╗███████╗');
console.log('╚══════╝╚═╝░░╚═╝╚═╝░░╚══╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝');

require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('statics', {
    extensions: [ 'html', 'htm' ]
}));

const Database = require('./src/Database');

// router to prevent overlap of ids
app.post('/api/overlap', (req, res) => {

    Database.GetUserById(req.body.id)

    .then((error, row) => {
        if (error) return res.json({  code: 500 });
        return res.json({ code: 200, result: !row });
    })
    
    .catch(() => res.json({ err: 500 }));
});


app.listen(process.env.PORT = process.env.PORT || 6460, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
module.exports = async function(req, res, next) {

    if (!req.id) return res.json({ status: 500, message: 'id not found' });

    Database.GetUserById(req.id)

    .then((user, error) => {
        if (!error) return res.json({ status: 200, user });
        res.json({ status: 500, message: 'unexpected error occured' });
    });

};
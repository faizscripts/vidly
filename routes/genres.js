const express = require('express');
const router = express.Router();


const genres = [
    {id: 1, name:'sci-fi'},
    {id: 2, name:'action'},
    {id: 3, name:'drama'},
    {id: 4, name:'documentary'},
];


router.get('/', (req, res) => {
    res.send(genres);
});


router.get('/:id', (req, res) => {
    const genre = genres.find(value => value.id === parseInt(req.params.id) );
    if (!genre) return res.status(404).send('Genre with that ID not found');
    res.send(genre);
});


router.post('/', (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {id: genres.length+1, name: req.body.name};
    genres.push(genre);
    res.send(genre);
});


router.put('/:id', (req, res) => {
    const genre = genres.find(value => value.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with that id was not found');

    const {error} = validateGenre(req.body);
    if (error) return res.send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});


router.delete('/:id',(req, res) => {
    const genre = genres.find(value => value.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with that ID was not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});


function validateGenre(genre) {
    const schema = Joi.object({name: Joi.string().min(3).required()});
    return schema.validate(genre);
}

module.exports = router;
const mongoose = require('mongoose');
const express = require('express');
const home = require('./routes/home')
const genres = require('./routes/genres');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('Connected to Vidly successfully...'))
    .catch(reason => console.log(`Unable to connect to Vidly!!! ${reason}`));


const app = express();

app.use(express.json());
app.use('/', home);
app.use('/genres', genres);
app.use('/customers', customers);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at port ${port}.....`);
});
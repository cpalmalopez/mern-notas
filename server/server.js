const express = require('express');
const mongoose = require('mongoose');
const note = require('./models/note');
const auth = require('./middlewares/auth');
const app = express();

const API_PORT = process.env.PORT || 8080;

app.use(express.json());

const dbPath = 'mongodb+srv://root:root@cluster0.ov8x0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbPath, {
    dbName: 'mern_notes',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB");
}).catch((err) => console.log("Error to connect db, " + err));

app.all('/api/*', auth);

app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));

app.listen(API_PORT, () => console.log(`Listening on Port ${API_PORT}`));
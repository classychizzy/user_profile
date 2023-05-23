import express from 'express';
//import router from './routes'
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(3000, () => {
    console.log(`Server running on port ${port}`);
    });
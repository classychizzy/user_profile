import express from 'express';
import bodyParser from 'body-parser';
import {Authrouter} from './Routes/auth';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(Authrouter);



app.use('/api/v1', Authrouter);
app.use('api/v1/register', Authrouter);
app.use('api/v1/login', Authrouter);
app.listen(3000, () => {
    console.log(`Server running on port ${port}`);
    });
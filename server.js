import express from 'express';
import bodyParser from 'body-parser';
import {connectDatabase} from './database/mongodb';
import config from './config';

import indexRoute from './routes/index.route';

const app = express();

app.use('/', indexRoute);

// CONNECTING TO THE DATABASE AND STARTING THE SERVER
// --------------------------------------------------
connectDatabase()
    .then((res) => {
        console.log(res);
        app.listen(config.port, (error) => {
            if(error) throw error;
            console.log(`Server running on http://localhost:${config.port}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to database');
    });
// --------------------------------------------------

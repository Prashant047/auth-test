import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import {connectDatabase} from './database/mongodb';
import config from './config';
import ejs from 'ejs';
import expressLayouts from 'express-ejs-layouts';

import routes from './routes/index.route';

const app = express();

// SEETING UP BODYPARSER
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// SEETING THE VIEW ENGINE TO EJS
app.use(expressLayouts);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', routes);

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

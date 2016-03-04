import express from 'express';
import bodyParser from 'body-parser'

import logger from './middleware/logger';
import urls from './urls';

let app = express();

app.use( logger() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.use('/', urls);


export default app;
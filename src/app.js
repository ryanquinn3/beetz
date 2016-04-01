import express from 'express';
import bodyParser from 'body-parser'
import path from 'path';

import logger from './middleware/logger';
import urls from './urls';

let app = express();

app.use( logger() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static(path.join(__dirname, 'public')) );

app.use('/api', urls);
app.use('/', (req, res) => {
   res.sendFile('index.html', {
       root: path.join(__dirname, 'public')
   });
});


export default app;
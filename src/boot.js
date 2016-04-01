import app from './app';
import './services/soundcloud';

const server = app.listen(3000, function(){
    let port = server.address().port;

    console.log( 'Listening on %s', port );
});
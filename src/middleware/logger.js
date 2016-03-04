import morgan from 'morgan';


export default function(){
    let logger = morgan('dev');
    return logger;
}
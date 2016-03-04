import {Router} from 'express';


let router = Router();
router.get('/', function(req, res){
    console.log('woah');
    res.send({
        message: 'success'
    });
});



export default router;
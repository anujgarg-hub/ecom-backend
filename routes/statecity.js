var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.get('/displayall',function(req,res,next){
    pool.query('select * from state',function(err,result){
        if(err)
        {
            return res.status(500).json([])
        }

        else{
            return res.status(200).json(result)
        }
    })
})


router.post('/displayallcities',function(req,res,next){
    pool.query('select * from city where stateid=?',[req.body.stateid],function(err,result){
        if(err)
        {
            return res.status(500).json([])
        }

        else{
            return res.status(200).json(result)
        }
    })
})






module.exports = router ;
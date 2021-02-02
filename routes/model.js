var express = require('express')
var router = express.Router()
var pool = require('./pool')


router.get('/displayall',function(req,res,next){
    pool.query('select m.*,(select b.brandname from brands b where b.brandid=m.brandid) as brandname from models m',function(err,result){
        if(err)
        {
            return res.status(500).json([])
        }

        else
        {
            return res.status(200).json(result)
        }
    })
})



router.post('/addrecord',function(req,res,next){
    pool.query('insert into models(brandid , modelname, description) values(?,?,?)',[req.body.brandid , req.body.modelname , req.body.description],function(err,result){
        if(err)
        {
            console.log(err)
            return res.status(500).json({'RESULT':false})
        }

        else
        {
            if(result.affectedRows>=1)
            {
              return res.status(200).json({'RESULT':true})
            }
 
            else
            {
                return res.status(500).json({'RESULT':false})

            }
        }
    })
})

router.post('/editrecord',function(req,res,next){
    pool.query('update models set brandid=? , modelname=? , description=? where modelid=?',[req.body.brandid , req.body.modelname , req.body.description , req.body.modelid],function(err,result){
        if(err)
        {
            return res.status(500).json({'RESULT':false})
        }

        else
        {
            return res.status(200).json({'RESULT':true})
        }
    })
})






router.post('/delete',function(req,res,next){
    pool.query('delete from models where modelid=?',[req.body.modelid],function(err,result){
        if(err)
        {
            return res.status(500).json([])
        }

        else
        {
            return res.status(200).json(result)

        }
    })
})


router.post('/displaymodels',function(req,res,next){
    pool.query('select * from models where brandid=?',[req.body.brandid],function(err,result){
        if(err)
        {
            return res.status(500).json([])
        }
        else
        {
            return res.status(500).json(result)

        }
    })
}) 

module.exports = router
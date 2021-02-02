var express = require('express')
var router = express.Router()
var pool = require('./pool')
var multer = require('./multer')


router.post('/addnewbrands',multer.any(),function(req,res,next){
    pool.query('insert into brands(categoryid,brandname,description,picture,ad,adstatus,topbrands,newbrands) values(?,?,?,?,?,?,?,?)',[req.body.categoryid , req.body.brandname, req.body.description , req.files[0].filename , req.files[1].filename ,  req.body.adstatus , req.body.topbrand , req.body.newbrand ],function(err , result){
        if(err)
        {
            console.log(err)
            return res.status(500).json({'RESULT':false});
        }

        else{
            // console.log(result)
            if( result.affectedRows>=1)
            {
               return res.status(200).json({'RESULT':true});
            }

            else
            {
               return res.status(500).json({'RESULT':false});

            }
        }


    })
})

router.get('/displayall',function(req,res,next){
    pool.query('select b.*,(select c.categoryname from categories c where c.categoryid=b.categoryid) as categoryname from brands b order by brandid desc',function(err,result){
        if(err)
        {
            console.log(err)
            return res.status(500).json([])
        }

        else
        {
            return res.status(200).json(result)
        }
    })
})


router.post('/deleterecord',function(req,res,next){
    pool.query('delete from brands where brandid=?',[req.body.brandid],function(err,result){
        if(err)
        {
            console.log(err);
            return res.status(500).json([])
        }

        else
        {
            return res.status(200).json(result)
        }
    })
})


router.post('/editRecord',multer.any(),function(req,res,next){
    var q = '';

    if(req.body.pic!=='' && req.body.ad!=='')
    {
        q = 'update brands set categoryid=? ,brandname=? , description=? , picture=? , ad=? , adstatus=? ,topbrands=? , newbrands=? where brandid=?'
        para =[req.body.categoryid , req.body.brandname, req.body.description , req.files[0].filename , req.files[1].filename , req.body.adstatus , req.body.topbrand , req.body.newbrand, req.body.brandid]
    }

    else if(req.body.pic!=='')
    {
        q = 'update brands set categoryid=? ,brandname=? , description=? , picture=? , adstatus=? ,topbrands=? , newbrands=? where brandid=?'
        para =[req.body.categoryid , req.body.brandname, req.body.description , req.files[0].filename  ,  req.body.adstatus , req.body.topbrand , req.body.newbrand, req.body.brandid]

    }

    else if(req.body.ad!=='')
    {
        q = 'update brands set categoryid=? ,brandname=? , description=? , ad=? , adstatus=? ,topbrands=? , newbrands=? where brandid=?'
        para =[req.body.categoryid , req.body.brandname, req.body.description , req.files[1].filename , req.body.adstatus , req.body.topbrand , req.body.newbrand, req.body.brandid]

    }

    else
    {
        q = 'update brands set categoryid=? ,brandname=? , description=? , adstatus=? ,topbrands=? , newbrands=? where brandid=?'
        para =[req.body.categoryid , req.body.brandname, req.body.description , req.body.adstatus , req.body.topbrand , req.body.newbrand, req.body.brandid]
  
    }
    pool.query(q,para,function(err,result){
        if(err)
        {
            console.log(err)
            return res.status(500).json({'RESULT':false})
        }

        else
        {
            return res.status(200).json({'RESULT':true})
        }
    })


})



router.post('/displayallbrands',function(req,res,next){
    pool.query('select * from brands where categoryid=?',[req.body.categoryid],function(err,result){
        if(err)
        {
            return res.status(500).json([])
        }

        else{
            return res.status(200).json(result)
        }
    })
})



router.post('/fetchBrandsforMainMenu',function(req,res,next){
    pool.query('select * from brands where categoryid=?',[req.body.categoryid],function(err,result){
        if(err)
        {
            return res.status(500).json([])
        }

        else{
            return res.status(200).json(result)
        }
    })
})


router.get('/displayallbrandsAd',function(req,res,next){
    pool.query("select * from brands where adstatus='Yes'",function(err,result){
        if(err)
        {
            return res.status(500).json([])
        }

        else{
            return res.status(200).json(result)
        }
    })
})

router.get('/displaytopbrands',function(req,res,next){
    pool.query("select * from brands where topbrands='Yes'",function(err,result){
        if(err)
        {
            return res.status(500).json([])
        }

        else{
            return res.status(200).json(result)
        }
    })
})


router.get('/displaynewbrands',function(req,res,next){
    pool.query("select * from brands where newbrands='Yes'",function(err,result){
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

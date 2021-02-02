const express   =require('express')
const router    =express.Router();
const pool      =require('./pool')
const multer    =require('./multer')


router.post('/addproduct',multer.any(),function(req,res,next){
    pool.query('insert into productitems(vendorid,categoryid,brandid,modelid,productname,price,offerprice,delievery,ratings,description,color,offertype,stock,vendorstatus,picture,ad,adstatus) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.vendorid,req.body.categoryid,req.body.brandid,req.body.modelid,req.body.productname,req.body.price,req.body.offerprice,req.body.delievery,req.body.ratings,req.body.description,req.body.color,req.body.offertype,req.body.stock,req.body.vendorstatus,req.files[0].filename,req.files[1].filename , req.body.adstatus] , function(err,result){
        console.log(err)
        if(err)
        {   console.log(err)
            return res.status(500).json({'RESULT':false})
        }
        else
        {
            // console.log(result)
            if(result.affectedRows>=1)
            {
                return res.status(200).json({'RESULT':true})
            }
            else
            {
                return res.status(200).json({'RESULT':false})
            }
        }
    })
})



router.post('/addpicinfo',multer.any(),function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    
    console.log("Length"+req.files.length)
    console.log("DATA"+req.files)
    
    let q=`insert into productpictures(productid ,pictures)values ?`;
    //'insert into productpictures(productid ,ppdescription,pppicture)values(?,?,?) '
    pool.query(q, [req.files.map(item=>[req.body.productid,item.originalname])],function(error,result)
    { if(error) 
       {
          console.log(error)
          return res.status(500).json({'RESULT':false})
         
         }
        else
        { 
          console.log(result);
          
          return res.status(200).json({'RESULT':true})
        
        }
      
      })
  

   })
router.post('/addpic',multer.any(),function(req, res, next) {
   // console.log(req.body)
  //  console.log(req.files)
    
   return res.status(200).json('Session Expired Pls Login Again')
   })
    

   
router.get('/displayalltopproducts',function(req,res,next){

    pool.query("select P.*,false as cartstatus from productitems P where offertype='Discounted' and vendorstatus='Verify' " ,function(err,result){

        if(err)
        {
            return res.status(500).json([])
        }

        else
        { console.log(result)
            return res.status(200).json(result)
        }
    })
})


///// for User InterFace/////


router.post('/productslistbycategory',function(req,res,next){
    pool.query('select P.*,false as cartstatus from productitems P where P.categoryid=?',[req.body.categoryid],function(err,result){
        
        if(err)
        {
            return res.status(200).json([])
        }
        else
        {
            return res.status(200).json(result)
   
        }
    })
})



router.post('/fetchproduct',function(req,res,next){
    pool.query('select P.*,false as cartstatus from productitems P where P.productid=?',[req.body.productid],function(err,result){
        
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


router.post('/displaybyid',function(req,res,next){
    console.log(req.body)
    pool.query('select P.*,(select B.brandname from brands B where B.brandid=P.brandid) as brandname,(select M.modelname from models M where M.modelid=P.modelid) as modelname, false as cartstatus from productitems P where P.productid=?',[req.body.productid],function(err,result){
        
        if(err)
        {
            return res.status(500).json([])
        }
        else
        {
            console.log(result)
            return res.status(200).json(result)
   
        }
    })
 })


router.post('/displayproduct',function(req,res,next){
    pool.query('select * from productitems where modelid=?',[req.body.modelid],function(err,result){
        
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

/// for native just


router.get('/displayAll',function(req,res,next){
    pool.query('select * from productitems',function(err,result){
        
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


   


module.exports = router
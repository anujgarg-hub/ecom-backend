var express = require('express');
var router = express.Router();
var pool= require('./pool')
var multer= require('./multer'); 
const upload = require('./multer');


router.post('/addpicinfo',multer.any(),function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    
    console.log("Length"+req.files.length)
    console.log("DATA"+req.files)
    
    let q=`insert into productpictures(productid ,productpicture)values ?`;
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

router.post('/pictureupdate',upload.single('productpicture'),function(req,res){
   console.log(req.file)
   console.log(req.body)
   pool.query('update productpictures set productpicture=? where pictureid=?',[req.file.originalname,req.body.pictureid],function(err,result){
      if(err){
         console.log(err)
         res.status(500).json([]);
      }
      else{
         res.status(200).json({'RESULT':result})
      }
   })
})

router.post('/addpic',multer.any(),function(req, res, next) {
   // console.log(req.body)
  //  console.log(req.files)
    
   return res.status(200).json('Session Expired Pls Login Again')
   })
    
router.post('/displaybyid',function(req,res,next){
console.log(req.body)
   pool.query('select * from productpictures where productid=?',[req.body.productid],function(err,result){
if(err){
   console.log(err) 
   return res.status(500).json([])
}
else{
   console.log(result)
   return res.status(200).json(result)
}
   })
})

router.post('/displaybyidprops',function(req,res,next){
   console.log(req.body)
      pool.query('select * from productpictures where productid=?',[req.body.productid],function(err,result){
   if(err){
      console.log(err) 
      return res.status(500).json([])
   }
   else{
      console.log(result)
      return res.status(200).json(result)
   }
      })
   })
   
   router.post('/deleteRecord',function(req,res){
      // if(!localStorage.getItem('token')){
    
      //   return res.status(200).json('Session Expired Plz Login Again')
        
      //   }
      pool.query('delete from productpictures where pictureid=?',[req.body.pictureid],function(err,result){
      
      if(err){
        console.log(err)
        return res.status(500).json([])
      }
      else{
        return res.status(200).json(result)
      }
      
      })
      
      })

      ////// For User-Interface///

      router.post('/displaybyproductid',function(req,res){
       pool.query('select * from productpictures where productid=?',[req.body.productid],function(err,result){
         
         if(err){
           console.log(err)
           return res.status(500).json([])
         }
         else{
           return res.status(200).json(result)
         }
         
         })
         
         })


  module.exports=router 


  
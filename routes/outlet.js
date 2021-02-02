var express = require('express');
var router = express.Router();
var pool = require('./pool');
var multer = require('./multer');

var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('/scratch')


router.post('/addRecord',multer.any(),function(req,res,next){
    if(!localStorage.getItem('token'))
    {
        return res.status(200).json('Session Expired Pls Login Again')
    }
    pool.query("insert into outlets(firmname,ownername,mobile,phone,registrationno,gstno,address,state,city,location,photograph,emailid,description,averageprice,ratings,status,password,lat,lng) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.firmname, req.body.ownername , req.body.mobile, req.body.phone , req.body.registrationno, req.body.gstno, req.body.address, req.body.state , req.body.city, req.body.location, req.files[0].filename, req.body.emailid, req.body.description, req.body.averageprice, req.body.ratings, req.body.status , req.body.password, req.body.lat, req.body.lng],function(err,result){
            console.log(req.body)
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

/// changes in this query bcoz of manage State and City names in dispayAll 
router.get('/displayall',function(req,res,next){         
    if(!localStorage.getItem('token'))
    {
        return res.status(200).json('Session Expired Pls Login Again')
    }                                                       
    pool.query('select o.*,(select S.statename from state S where S.stateid=o.state) as statename,(select C.cityname from city C where C.cityid = o.city) as cityname from outlets o ',function(err,result){                  

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


router.post('/deleteRecord',function(req,res)
{

    if(!localStorage.getItem('token'))
    {
        return res.status(200).json('Session Expired Pls Login Again')
    }

pool.query("delete from outlets where outletid=?",[req.body.outletid],function(err,result){
if(err){
 return res.status(500).json([])
}
else
{
  return res.status(200).json(result)

}

})
})


router.post('/editRecord',function(req,res,next){

    if(!localStorage.getItem('token'))
    {
        return res.status(200).json('Session Expired Pls Login Again')
    }


    var q = '';

    if(req.body.photograph!='')
    {
         q = 'update outlets set firmname=?,ownername=?,mobile=?,phone=?,registrationno=?,gstno=?,address=?,state=?,city=?,location=?,photograph=?,emailid=?,description=?,averageprice=?,ratings=?,status=?,password=?,lat=?,lng=? where outletid=?'
         para=[req.body.firmname, req.body.ownername , req.body.mobile, req.body.phone , req.body.registrationno, req.body.gstno, req.body.address, req.body.statename , req.body.cityname, req.body.location, req.files[0].filename, req.body.emailid, req.body.description, req.body.averageprice, req.body.ratings, req.body.status , req.body.password, req.body.lat, req.body.lng , req.body.outletid]
    }

    else
    {
        q = 'update outlets set firmname=?,ownername=?,mobile=?,phone=?,registrationno=?,gstno=?,address=?,state=?,city=?,location=?,emailid=?,description=?,averageprice=?,ratings=?,status=?,password=?,lat=?,lng=? where outletid=?'
        para=[req.body.firmname, req.body.ownername , req.body.mobile, req.body.phone , req.body.registrationno, req.body.gstno, req.body.address, req.body.statename , req.body.cityname, req.body.location, req.body.emailid, req.body.description, req.body.averageprice, req.body.ratings, req.body.status , req.body.password, req.body.lat, req.body.lng ,  req.body.outletid]

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


router.post('/fetchOutlets',function(req,res,next){
    pool.query('select * from outlets where emailid=? and password=?',[req.body.outletid,req.body.password],function(err,result){
        
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






module.exports = router;
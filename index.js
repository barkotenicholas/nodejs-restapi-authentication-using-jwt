const express = require('express');
const jwt     = require('jsonwebtoken');

const app = express();

app.get('/api',function(req,res){

    res.status(200).json({
        message:'Welcome'
    });
});

app.post('/api/post',verifyToken,function(req,res){
    jwt.verify(req.token,'secretkey',(err,Authdata)=>{

        if(err){
            res.sendStatus(403);
        }
        else{
            res.status(200).json({
                message:'this is a post requests',
                authdata:Authdata
            });
        }
    });
   
});
app.post('/api/login',function(req,res){

    //mock user
    const user = {
        id:1,
        username:'brad',
        email:'brad@gmail.com'
    }
    jwt.sign({user},'secretkey',(err,token)=>{

        res.json({
            token
        });
    });
});

//verify token

function verifyToken(req,res,next){
    // get auth header value
    const beatheader = req.headers['authorization'];

    if(typeof beatheader !== 'undefined'){

        const bearer = beatheader.split(' ');

        const token = bearer[1];

        req.token = token

        next();
    }
    else{
        res.sendStatus(403);
    }
}

app.listen(8080,()=>{
    console.log('Server started');
});

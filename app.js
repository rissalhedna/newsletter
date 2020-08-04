const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html')
})

app.post('/',function(req,res){
    const firstname = req.body.fname
    const lastname = req.body.lname
    const email = req.body.email
    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)
    const url = "https://us19.api.mailchimp.com/3.0/lists/4fbb258f43"
    const options = {
        method:"POST",
        auth:"rissal:7b47a6386002a7e7c3ba6b122f36bd45-us19"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData)
    request.end()
})

app.post('/failure',function(req,res){
    res.redirect('/')
})

app.listen(process.env.PORT || 3000,function(){
    console.log('server on port 3000')
})


//API KEY:  7b47a6386002a7e7c3ba6b122f36bd45-us19

//AUDIENCE:  4fbb258f43
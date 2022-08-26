const User = require('../models/user')

//FOR IMAGE URL
const request = require('request');
const fs = require('fs');



async function index(req, res, next) {
    try{
        res.render('users/index',{
            name: req.query.name, 
            user:req.user})
    }catch(error){
        res.render('user/index',{userError:error})
    }
}



////////////////////////////////////IMAGE UPLOAD///////////////////////////////////////////

  function base64Encode(image) {
    // read binary data
    var bitmap = fs.readFileSync(image);
    // convert binary data to base64 encoded string
    return bitmap.toString('base64');
  }


  async function upload(req,res,next){

        let image = base64Encode(req.file.path)

        const options = {
            method: 'POST',
            url: 'https://api.imgur.com/3/image',
            headers: {
              Authorization: `Client-ID ${process.env.CLIENT_ID}`,
            },
            formData: {
              image,
              type: 'base64'
            },
          };
          request(options, function(err, response) {
            if (err) return console.log(err);
            let body = JSON.parse(response.body)
            console.log(body)
            res.send('done')
   
          })
    
         
        

  }

  



  module.exports = {index,upload}
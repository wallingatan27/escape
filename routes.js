const routes = require('express').Router();
const dbQueries = require('./database');
const bcrypt = require('./bcrypt');
const saltRounds = 10;


const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
routes.use(cookieParser())

const products = [
    { name: 'prod1', id: '1' },
    { name: 'prod2', id: '2' }
];

//djur
routes.get('/products', async (Request, Response) => {
    try {
        const prod = await dbQueries.getProd();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
});      

//natur
routes.get('/productsnatur', async (Request, Response) => {
    try {
        const prod = await dbQueries.getProdNatur();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
}); 

//urban
routes.get('/productsurban', async (Request, Response) => {
    try {
        const prod = await dbQueries.getProdUrban();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
}); 
//sale
routes.get('/productssale', async (Request, Response) => {
    try {
        const prod = await dbQueries.getProdSale();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
}); 
//berg
routes.get('/productsberg', async (Request, Response) => {
    try {
        const prod = await dbQueries.getProdBerg();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
}); 

//GET

routes.get('/productid/:id', async (Request, Response) => {
    try {
        const prod = await dbQueries.getPro(Request.params.id);
        Response.json(prod);
    }
    catch (error) {
        Response.send(error);
    }
});
//Post

routes.post('/productss/', (req, res) => {
    const data = req.body;

    const found = products.find((p) => {
        return p.id === data.id;
    });
    if (!found) {
        products.push(data);
        res.json({ status: 'ok' });
    }
    else {
        res.status(400)
            .send(`Dublicate id for products whit id: ${data.id}`);

    }
});


//get all products
routes.get('/allproducts', async (Request, Response) => {
    try {
        const prod = await dbQueries.getAllProd();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
}); 

routes.get('/users', async (Request, Response) =>{
    try {
        const users = await dbQueries.getUsers();
        Response.json(users);
    }
    catch(error){
        Response.send(error);
    }
});      
// TA BORT PRODUKT
routes.delete('/products/:id', async (Request, Response) =>{
    try {
        const delprod = await dbQueries.deleteProd(Request.params.id);
        Response.json(delprod);
    }
    catch(error){
        Response.send(error);
    }
});   

//UPDATERA PRODUKT
routes.patch('/productz/:id', async (Request, Response) =>{
    try {
        const data = Request.body;
        if (data.name &&
            data.price &&
            data.info &&
            data.made &&
            data.pic &&
            data.sale &&
            data.art &&
            data.id &&
            data.price.match(/^[0-9]+$/) &&
            data.name.match(/^\w+$/) &&
            data.name.length < 50 &&
            data.id.match(/^[0-9]+$/) &&
            isNaN(data.name)
        ) {
           await dbQueries.updateProd(data.name, data.price, data.info,data.made,data.pic,data.sale,data.art,  data.id);
            Response.json("Ändring har hänt i produkten");
        } else {
            Response.send('Ange rätt värden');
        }
    }
    catch{
        res.send(error);
        console.log("Något gick snett");

    }

}); 
   
//LÄGG TILL Produkt
routes.post('/db/products/post', async (Request, Response) => {
   
    try {
        const data = Request.body;
        const found = await dbQueries.getProdd(Request.body.name);
//valideringen 
        if (found.length === 0) {
            if (data.name &&
                data.price &&
                data.info &&
                data.made &&
                data.pic &&
                data.sale &&
                data.art &&
                !isNaN(parseFloat(data.price, 10))&&
            data.name.match(/^\w+$/) && 
            data.name.length < 50 &&   
            data.price.match(/^[0-9]+$/) &&


            isNaN(data.name)
            ) {
                await dbQueries.addProduct(data.name, data.price, data.info, data.made, data.pic,data.sale,data.art);
                Response.json("Produkten finns i tabellen");
            }
            else {
                Response.json("Ange rätt värden");
            }
        } else {
            Response.json('Produkten finns redan i tabellen');
        }
    }
    catch (error) {
        Response.send(error);
    }
});
//LÄGG TILL USER
routes.post('/db/user/post', async (Request, Response) => {
  
    try {
        const found = await dbQueries.getUser(Request.body.firstname);
        if (found.length === 0) {
            const data = Request.body;
            crypPass = await bcrypt.genPass(Request.body.password);
            if (data.email.match(/\.com$/) &&
            data.firstname.match(/^\w+$/))  {
              // console.log(data.email,data.firstname,data.lastname, crypPass);
                await dbQueries.addUser(data.email,data.firstname,data.lastname, crypPass);
                Response.redirect('/login.html');
             
            }
            else {
                Response.json("Ange rätt värden");

            }
        } else {
            Response.json("Användaren finns redan i tabellen");
        }
    }
    catch (error) {
        Response.json("FEL!");
    }
});

CLIENT_ID= "66074815010-p90ousr5u6d51vu651o0hvj3m9mce2p2.apps.googleusercontent.com";

// Hämtar en user baserat på förnamn
routes.get('/database/user/:firstname', async (Request, Response) => {
    try {
      const users = await dbQueries.getUser(Request.params.firstname);
      Response.json(users);
  }
  catch(error){
      Response.send(error);
  }
  });

  routes.get('/database/products/:name', async (Request, Response) => {
    try {
      const prod = await dbQueries.getPro(Request.params.name);
      Response.json(prod);
  }
  catch(error){
      Response.send(error);
  }
  });

  routes.post('/users/login', async (Request, Response) => {
    try {
        const data = Request.body;
        const users = await dbQueries.getPassword(data.email);
        if (users.length == 0) {
           throw 'Fel mail';
        }
        const result = await bcrypt.compPass(data.password, users[0].password);
        if (result == true) {
            
            const token = jwt.sign({email: data.email},'secret_key')
            //this.email = jwt.sign({_email: data.email },config.get('secret_key') ); 
           //save token in cookie
           Response.cookie('authcookie',token,{maxAge:9000000,httpOnly:true}) 
           Response.redirect('/index2.html');
          
        } else {
            Response.redirect('/login.html');
        }
    } catch (error) {
        Response.send(error);
    }
});
/*generateAuthToken = function() { 
    const token = jwt.sign({_email:this.email }, 
     config.get('secret_key') ); 
     return token; 
    };*/
//updatera lösenord 
routes.patch('/users/:email', async (Request, Response) => {
    
    try {
        const data = Request.body;
        crypPass = await bcrypt.genPass(Request.body.password);
        if (
            data.email.match(/\.com$/)
               
        ) {
           await dbQueries.updatePass(crypPass, data.email);
            Allert("lösenordet ändrades");
        } else {
            Response.send('fel värden fördes in');
        }
    }
    catch{
        
      

    }

});

  



//LÄGG TILL Kommentar
routes.post('/db/comment/post', async (Request, Response) => {
   
    try {
        const data = Request.body;
        const found = await dbQueries.getkommm(Request.body.comment);
//valideringen 
        if (found.length === 0) {
            if (data.tavla &&
                data.art &&
                data.name &&
                data.comment &&
                data.rating &&
              
             
            data.name.match(/^\w+$/) && 
            data.name.length < 50 &&   
            


            isNaN(data.name)
            ) {
                await dbQueries.addKomentar(data.tavla, data.art, data.name, data.comment, data.rating);
                Response.redirect('/urban.html');
            }
            else {
                Response.json("Ange rätt värden");
            }
        } else {
            Response.json('kommentaren finns redan i tabellen');
        }
    }
    catch (error) {
        Response.send(error);
    }
});

routes.post('/db/comment/berg', async (Request, Response) => {
   
    try {
        const data = Request.body;
        const found = await dbQueries.getkommm(Request.body.comment);
//valideringen 
        if (found.length === 0) {
            if (data.tavla &&
                data.art &&
                data.name &&
                data.comment &&
                data.rating &&
              
             
            data.name.match(/^\w+$/) && 
            data.name.length < 50 &&   
            


            isNaN(data.name)
            ) {
                await dbQueries.addKomentar(data.tavla, data.art, data.name, data.comment, data.rating);
                Response.redirect('/berg.html');
            }
            else {
                Response.json("Ange rätt värden");
            }
        } else {
            Response.json('kommentaren finns redan i tabellen');
        }
    }
    catch (error) {
        Response.send(error);
    }
});

routes.post('/db/comment/animal', async (Request, Response) => {
   
    try {
        const data = Request.body;
        const found = await dbQueries.getkommm(Request.body.comment);
//valideringen 
        if (found.length === 0) {
            if (data.tavla &&
                data.art &&
                data.name &&
                data.comment &&
                data.rating &&
              
             
            data.name.match(/^\w+$/) && 
            data.name.length < 50 &&   
            


            isNaN(data.name)
            ) {
                await dbQueries.addKomentar(data.tavla, data.art, data.name, data.comment, data.rating);
                Response.redirect('/website.html');
            }
            else {
                Response.json("Ange rätt värden");
            }
        } else {
            Response.json('kommentaren finns redan i tabellen');
        }
    }
    catch (error) {
        Response.send(error);
    }
});
routes.post('/db/comment/nature', async (Request, Response) => {
   
    try {
        const data = Request.body;
        const found = await dbQueries.getkommm(Request.body.comment);
//valideringen 
        if (found.length === 0) {
            if (data.tavla &&
                data.art &&
                data.name &&
                data.comment &&
                data.rating &&
              
             
            data.name.match(/^\w+$/) && 
            data.name.length < 50 &&   
            


            isNaN(data.name)
            ) {
                await dbQueries.addKomentar(data.tavla, data.art, data.name, data.comment, data.rating);
                Response.redirect('/natur.html');
            }
            else {
                Response.json("Ange rätt värden");
            }
        } else {
            Response.json('kommentaren finns redan i tabellen');
        }
    }
    catch (error) {
        Response.send(error);
    }
});
routes.post('/db/comment/sale', async (Request, Response) => {
   
    try {
        const data = Request.body;
        const found = await dbQueries.getkommm(Request.body.comment);
//valideringen 
        if (found.length === 0) {
            if (data.tavla &&
                data.art &&
                data.name &&
                data.comment &&
                data.rating &&
              
             
            data.name.match(/^\w+$/) && 
            data.name.length < 50 &&   
            


            isNaN(data.name)
            ) {
                await dbQueries.addKomentar(data.tavla, data.art, data.name, data.comment, data.rating);
                Response.redirect('/sale.html');
            }
            else {
                Response.json("Ange rätt värden");
            }
        } else {
            Response.json('kommentaren finns redan i tabellen');
        }
    }
    catch (error) {
        Response.send(error);
    }
});

  //urban kommentarer
routes.get('/kommentarurban', async (Request, Response) => {
    try {
        const prod = await dbQueries.getKomUrban();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
}); 
routes.get('/kommentarnatur', async (Request, Response) => {
    try {
        const prod = await dbQueries.getKomNatur();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
}); 

routes.get('/kommentardjur', async (Request, Response) => {
    try {
        const prod = await dbQueries.getKomDjur();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
}); 

routes.get('/kommentarberg', async (Request, Response) => {
    try {
        const prod = await dbQueries.getKomBerg();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
}); 

routes.get('/kommentarsale', async (Request, Response) => {
    try {
        const prod = await dbQueries.getKomSale();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
}); 


//get all products
routes.get('/allComments', async (Request, Response) => {
    try {
        const prod = await dbQueries.getAllKomm();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
}); 






//hämtar post 
routes.get('/post/hamtar', async (Request, Response) => {
    try {
        const post = await dbQueries.getPost();
        Response.json(post);
    }
    catch (error) {
        Response.send(error);
    }
});

// Hämtar en prod baserat på name
routes.get('/post/hamta/:id', async (Request, Response) => {
    try {
        const post = await dbQueries.getPosss2(Request.params.id);
        Response.json(post);
    }
    catch (error) {
        Response.send(error);
    }
});

//Delete post
routes.delete('/post/del/:id', async (Request, Response) => {
    try {
        // const data = Request.body;
        const delPost = await dbQueries.deletePost(Request.params.id);
        Response.json(delPost);
        Response.send('Product deleted');
    }
    catch (error) {
        Response.send(error);
    }
});

routes.patch('/post/:id', async (Request, Response) => {
    try {
        const data = Request.body;
        if (data.name &&
            data.comment &&
            data.rating &&
            data.id &&
            
            data.name.match(/^\w+$/) &&
            data.name.length < 50 &&
            data.id.match(/^[0-9]+$/) &&
            isNaN(data.name)
        ) {
           await dbQueries.updatePost(data.name, data.comment, data.rating,  data.id);
            Response.json("product blev ändrad");
        } else {
            Response.send('fel värden fördes in');
        }
    }
    catch{
        res.send(error);
        console.log("Hoppsan något gick fel");

    }

});



routes.post('/gmaillogin', async(Request, Response) =>{
    //(CLIENT_ID="66074815010-p90ousr5u6d51vu651o0hvj3m9mce2p2.apps.googleusercontent.com"
    
    const id_token = Request.body.id_token;
   /*
    const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
verify().catch(console.error);*/

token1= jwt.sign(id_token,'secret_key')


   Response.cookie('emailcookie',token1,{maxAge:900000,httpOnly:true}) 
   Response.redirect('/index2.html');
 });
    routes.get('/Comm/commentUrban.html' ,(Request,Response, next)=>{
        /*if checkToken function succeed, api reach this block
        you can do whatever you want, also you can access to req.user      which sent from checkToken function
        */
        
        const authcookie = Request.cookies.authcookie;
        //res.redirect("/login.html");
        jwt.verify(authcookie,"secret_key",(err,data)=>{
         if(err){
            Response.redirect('/login.html')
         } 
        
          next();
     
        });
        
        //res.send('shopping');
       // next();
         });

       

        routes.get('/Comm/commentBerg.html' ,(Request,Response, next)=>{
            /*if checkToken function succeed, api reach this block
            you can do whatever you want, also you can access to req.user      which sent from checkToken function
            */
           
            const authcookie = Request.cookies.authcookie;
           //res.redirect("/login.html");
           jwt.verify(authcookie,"secret_key",(err,data)=>{
            if(err){
               Response.redirect('/login.html')
            } 
           
             next();
        
           });
           
           //res.send('shopping');
          // next();
            });
            routes.get('/admin.html' ,(Request,Response, next)=>{
                /*if checkToken function succeed, api reach this block
                you can do whatever you want, also you can access to req.user      which sent from checkToken function
                */
               
                const authcookie = Request.cookies.authcookie;
               //res.redirect("/login.html");
               jwt.verify(authcookie,"secret_key",(err,data)=>{
                if(err){
                   Response.redirect('/login.html')
                } 
               
                 next();
            
               });
               
               //res.send('shopping');
              // next();
                });
            routes.get('/Comm/commentAnimal.html' ,(Request,Response, next)=>{
                /*if checkToken function succeed, api reach this block
                you can do whatever you want, also you can access to req.user      which sent from checkToken function
                */
               
                const authcookie = Request.cookies.authcookie;
               //res.redirect("/login.html");
               jwt.verify(authcookie,"secret_key",(err,data)=>{
                if(err){
                   Response.redirect('/login.html')
                } 
               
                 next();
            
               });
               
               //res.send('shopping');
              // next();
                }); 

                routes.get('/Comm/commentNature.html' ,(Request,Response, next)=>{
                    /*if checkToken function succeed, api reach this block
                    you can do whatever you want, also you can access to req.user      which sent from checkToken function
                    */
                   
                    const authcookie = Request.cookies.authcookie;
                   //res.redirect("/login.html");
                   jwt.verify(authcookie,"secret_key",(err,data)=>{
                    if(err){
                       Response.redirect('/login.html')
                    } 
                   
                     next();
                
                   });
                   
                   //res.send('shopping');
                  // next();
                    });
                    routes.get('/Comm/commentSale.html' ,(Request,Response, next)=>{
                        /*if checkToken function succeed, api reach this block
                        you can do whatever you want, also you can access to req.user      which sent from checkToken function
                        */
                       
                        const authcookie = Request.cookies.authcookie;
                       //res.redirect("/login.html");
                       jwt.verify(authcookie,"secret_key",(err,data)=>{
                        if(err){
                           Response.redirect('/login.html')
                        } 
                       
                         next();
                    
                       });
                       
                       //res.send('shopping');
                      // next();
                        });

                    routes.get('/profil.html' ,(Request,Response, next)=>{
                        /*if checkToken function succeed, api reach this block
                        you can do whatever you want, also you can access to req.user      which sent from checkToken function
                        */
                       
                        const authcookie = Request.cookies.authcookie;
                       //res.redirect("/login.html");
                       jwt.verify(authcookie,"secret_key",(err,data)=>{
                        if(err){
                           Response.redirect('/login.html')
                        } 
                       
                         next();
                    
                       });
                       
                       //res.send('shopping');
                      // next();
                        });
    
    routes.get('/index2.html' ,(Request,Response, next)=>{
        /*if checkToken function succeed, api reach this block
        you can do whatever you want, also you can access to req.user      which sent from checkToken function
        */

     

    
       
       //res.send('shopping');
      next();
        });
  
    routes.post('/confir', function (req,res){
        
        var fs = require('fs');
var path = require('path');
email = req.body.email;
var filePath = path.join(__dirname, '/confirmation.html');





fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data) {
    if ( ! err ) {
      var helper = require('sendgrid').mail;
      from_email = new helper.Email("antonjanzzon39@gmail.com");
      to_email = new helper.Email(req.body.email);
      subject = "Escape Order confirmation";
      content = new helper.Content("text/html", data);
      mail = new helper.Mail(from_email, subject, to_email, content);

      var sg = require('sendgrid')('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');
      var requestBody = mail.toJSON();
      var request = sg.emptyRequest();
      request.method = 'POST';
      request.path = '/v3/mail/send';
      request.body = requestBody;
      sg.API(request, function (error, response) {
          res.redirect('index2.html');
        if ( ! error ) {
          console.log(response.statusCode);
          console.log(response.body);
          console.log(response.headers);
        } else {
          console.log(error);
        }
      });
    } else {
        console.log(err);
    }
});
        
});


routes.post('/paypal-transaction-complete', async (req, res) => {
    // 1. Get the order ID from the request body
    const orderID = req.body.orderID
    const create_time = req.body.create_time
    const status = req.body.status
    const given_name = req.body.given_name
    // 2. Call PayPal to get the transaction details
   
    // 4. Save the transaction in your database
     await dbQueries.addOrder(orderID, create_time,status,given_name);
    // 5. Return a successful response to the client
    return res.status(200).json({
      status: 'success',
      message: 'The transaction been verified'
    })
  })


//get all products
routes.get('/allOrder', async (Request, Response) => {
    try {
        const prod = await dbQueries.getAllOrd();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
}); 


routes.get('/order/hamtar/profil', async (Request, Response) => {
    try {
        const post = await dbQueries.getOrderProfil();
        Response.json(post);
    }
    catch (error) {
        Response.send(error);
    }
});



//hämtar post 
routes.get('/order/hamtar', async (Request, Response) => {
    try {
        const post = await dbQueries.getOrder();
        Response.json(post);
    }
    catch (error) {
        Response.send(error);
    }
});

// Hämtar en prod baserat på name
routes.get('/order/hamta/:id', async (Request, Response) => {
    try {
        const post = await dbQueries.getOrddd2(Request.params.id);
        Response.json(post);
    }
    catch (error) {
        Response.send(error);
    }
});

//Delete post
routes.delete('/order/del/:id', async (Request, Response) => {
    try {
        // const data = Request.body;
        const delPost = await dbQueries.deleteOrder(Request.params.id);
        Response.json(delPost);
        Response.send('Product deleted');
    }
    catch (error) {
        Response.send(error);
    }
});

routes.patch('/order/:id', async (Request, Response) => {
    try {
        const data = Request.body;
        if (data.orderID &&
            data.create_time &&
            data.status &&
            data.id &&
            
          
            data.id.match(/^[0-9]+$/) 
           
        ) {
           await dbQueries.updateOrder(data.orderID, data.create_time, data.status,  data.id);
            Response.json("Ordern blev ändrad");
        } else {
            Response.send('fel värden fördes in');
        }
    }
    catch{
        res.send(error);
        console.log("Hoppsan något gick fel");

    }

});

//module.exports = {onSignIn};
module.exports = routes
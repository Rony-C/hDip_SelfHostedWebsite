# hDip_SelfHostedWebsite
Mock e-commerce website built using Node.js and Bootstrap that connects to a products database. 
Boostrap framework was used to serve CSS content. I implented Boostrap with the CDN version.

Once the server has been started by running node index.js the website can be accessed at http://localhost:3000/ 

The user can log in with "user" and "pass" to be redirected to the Shop tab. Login validation is done with JavaScript. The authentication details can be changed in the auth.js file. 

The index.js file has examples of GET and POST requests.
Get requests to the /shop endpoint will direct the user to the shop page app.get(“/shop", function (req, res) {
res.render("shop.ejs"); })
Post requests to /shop endpoint are used to authenticate the users login form input. If successful the user is directed to the shop, other wise they are directed to the failed.ejs page pp.post("/shop", function (req, res) {
[...]}
Error logging for connecting to the database is included for visibilty for the user.
mySQl is used to connnect to a local database to access the product information. The username and password are "user"

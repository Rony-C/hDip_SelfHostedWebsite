const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Set view engine
app.set("view engine", "ejs");

//Defined port number here
const port = 3000;

//Import authentication module
const auth = require('./auth.js');

//Access createUser function
auth.createUser("user", "pass");

//Create a connection to the MySQL database
const mysql = require('mysql');
const {authUser} = require("./auth");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'g00296371'
});

// Testing connection to the database
// Error message included
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
    } else {
        //Successfully connected to the database
        console.log('Connected to database!');
    }
});

//Serving static files from public directory
app.use(express.static("pages"));
app.use(express.static("images"));

//Route back to main Shop page
app.get("/shop", function (req, res) {
    res.render("shop.ejs");
})

//Route to handle the login
app.post("/shop", function (req, res) {
   const username = req.body.username;
   const password = req.body.password;

    const authenticated = auth.authUser(username, password);
    console.log(authenticated);

    if(authenticated){
        //Direct to page on successful login
        console.log("Authentication was successful");
        res.render("shop");
    } else{
        //Direct to failed login page
        console.log("Authentication failed");
        res.render("failed");
    }
});

//Accessing the product information from the database
app.get("/product", function (req, res) {
    const ID = req.query.id;
    connection.query("select * from products where ID = ?", [ID], function (err, rows, fields)
    {
        if(err){
            //Error to console and error to user
            console.error("Error retrieving data from database: ", err);
            res.status(500).send("Error retrieving data from database");
        }
        else if(rows.length === 0){
            console.error("No rows found for ID $[ID]");
        }
        else {
            console.log("Data retrieved from database");
            console.log("Title:" + rows[0].title, "Price: " + rows[0].price,
                "Image: " + rows[0].image, "Description: " + rows[0].description);

            //Serve Dynamic content
            const prodName = rows[0].title;
            const prodPrice = rows[0].price;
            const image = rows[0].image;
            const description = rows[0].description;
            res.render("productView.ejs", {
                productName: prodName,
                price: prodPrice,
                description: description,
                imageURL: image
            });
        }
    });
});

//Start the server
app.listen(port, () => {
    console.log('Server has started on port ' + port);
})
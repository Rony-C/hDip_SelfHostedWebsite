//Create an array to store credentials
const users = [];

//Create and stores user information in users array
function createUser(username, password) {
    users.push({username, password});
    console.log("Use the credentials below to log in:")
    console.log(users);
}

//Verifies if the username and password entered are in the users array
function authUser(username, password) {
    //Find the user by username in the array
    const user = users.find(user => user.username === username);

    //simplified if statement
    return !(!user || user.password !== password);
}

//Exporting modules to be used
module.exports = {createUser, authUser};
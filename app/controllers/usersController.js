const fs = require('fs');
const path = require('path');

const {readJSON,writeJSON} = require('../data')

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const writeJson = (users) => {
	fs.writeFileSync(usersFilePath, JSON.stringify(users), 'utf-8')
};

const controller = {

     login:(req, res)=>{
          res.render('users/login')
      },
      register:(req, res)=>{
          res.render('users/register')
        },
        crear: (req, res) => {
            let newUser = {
                id: req.body.id,
                email: req.body.email,
                password: req.body.password,
                password2: req.body.password2,
                cel: req.body.cel
            }
            users.push(newUser);
            writeJson(users);
            res.redirect("/users/login");
        },
  
    pAdmit:(req,res)=>{
        res.render("users/admitProducts")
    }
/* create: (req, res) => {
    let lastId = users[user.length - 1].id

    let newUsers = {
       "id":lastId + 1,
       "name": req.body.name,
       "email": req.body.email,
       "password": req.body.password  
}
     users.push(newUsers);
     writeJson(users);
     res.redirect('/')
}  */
       
  
	}


module.exports = controller;
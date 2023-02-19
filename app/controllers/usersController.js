const fs = require('fs');
const path = require('path');

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
  
      pAdmit:(req,res)=>{
          res.render("users/admitProducts")
      }
  
	}


module.exports = controller;
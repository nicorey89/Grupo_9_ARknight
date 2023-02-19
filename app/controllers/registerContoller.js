const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const writejson = (users) => {
	fs.writeFileSync(usersFilePath, JSON.stringify(users), 'utf-8')
};

""

const controller = {
  index: (req, res) => {
    res.render('users/users', {
      users,
      toThousand
    })
},
create: (req, res) => {
res.render("users/user-create-form")
},
store: (req, res) => {
    let lastId = users[user.length - 1].id

    let newUsers = {
       "id":lastId + 1,
       "nombre": req.body.nombre,
      "email": req.body.email,
       "contraseña": req.body.contraseña,
       
     }
     users.push(newUsers);
     writejson(users);
     res.redirect('/users/')
},
        writejson(users){}
	   	// res.send('Usuario agregado correctamente');
	   }


module.exports = controller;
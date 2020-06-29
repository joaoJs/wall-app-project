const db = require("../models")
const decryptPassword = require('../utils/password')
const User = db.users;
const Op = db.Sequelize.Op;
const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken');
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.create = (req, res) => {
    console.log('inside method')
    console.log(req.body)
    if (!req.body.name) {
        res.status(400).send({
          message: "Name can not be empty!"
        });
        return;
      }
    
      const decryptedPass = decryptPassword(req.body.password, req.body.email)
      console.log(decryptedPass)
      // Create a User
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: decryptedPass
      };

      const msg = {
        to: user.email,
        from: 'j.campos4g@gmail.com',
        subject: 'Welcome',
        text: 'Welcome to the Wall!',
        html: '<strong>Welcome to the Wall!</strong>',
      };

      sgMail.send(msg).then(() => {
          console.log('Message sent')
      }).catch((error) => {
          console.log(error.response.body)
          // console.log(error.response.body.errors[0].message)
      })
    
      // Save User in the database
      User.create(user)
        .then(data => {
          // console.log('SEEENT')
          // sgMail.send(msg);
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};

exports.findOne = (req, res) => {
    const userEmail = req.body.email;
    const decryptedPass = decryptPassword(req.body.password, req.body.email)
    User.findOne({where: {email: userEmail}})
      .then(user => {
        // if login succeeds, we start a new session and user can post on the wall
        if(user !== null) {
          req.session.isLoggedIn = true
          res.json({msg: 'ok'})
        } else {
          res.status(500).send({
            message: "Error retrieving User with email=" + userEmail
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with email=" + userEmail
        });
      });
};

exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Users."
          });
        });
};
const db = require("../models");
const Message = db.messages;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.content) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a Message
      const message = {
        content: req.body.content,
      };
    
      // Save Message in the database
      Message.create(message)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Message."
          });
        });
};

exports.findAll = (req, res) => {
    const content = req.query.content;
    var condition = content ? { content: { [Op.like]: `%${content}%` } } : null;
  
    Message.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Messages."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Message.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Message with id=" + id
        });
      });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Message.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Message was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Message with id=${id}. Maybe Message was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Message with id=" + id
        });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Message.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Message was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Message with id=${id}. Maybe Message was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Message with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Message.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Messages were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Messages."
          });
        });
};

exports.findAllPublished = (req, res) => {
    Message.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Messages."
      });
    });
};
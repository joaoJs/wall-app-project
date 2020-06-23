module.exports = app => {
    const messages = require("../controllers/message.js");
  
    var router = require("express").Router();
  
    router.post("/", messages.create);
  
    router.get("/", messages.findAll);
  
    router.get("/published", messages.findAllPublished);
  
    router.get("/:id", messages.findOne);
  
    router.put("/:id", messages.update);
  
    router.delete("/:id", messages.delete);
  
    router.delete("/", messages.deleteAll);
  
    app.use('/api/messages', router);
};
module.exports = app => {
    const users = require("../controllers/user.js");
  
    var router = require("express").Router();
  
    router.post("/", users.create);
  
    router.get("/", users.findAll);

    router.get("/auth", users.findAll);
  
    router.post("/login", users.findOne);
  
    router.put("/:id", users.update);
  
    router.delete("/:id", users.delete);
  
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
};
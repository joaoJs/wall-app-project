const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  withCredentials: true
};

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

const sessionOptions = {
  secret: 'secret token',
  name: 'wall app session',
}

app.use(session(sessionOptions))

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
  res.json({ message: "This is wall app. Post your messages in here." })
});

require("./app/routes/user")(app)
require("./app/routes/message")(app)

app.get("/is_logged_in", (req, res) => {
  const answer = {}
  if (req.session.isLoggedIn) {
    answer.isLoggedIn = true
  } else {
    answer.isLoggedIn = false
  }
  res.send(answer)
});

app.get("/logout", (req, res) => {
  req.session.destroy()
  console.log(req.session)
  res.json({ message: "Logged out successfully." })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
});
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();
const logger = require("./middlewares/logger");
const members = require("./Members");

// app.get("/", (request, response) => {
//   //   response.send("<h1>Hello World!</h1>");
//   response.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Set static folder

// init middleware
app.use(logger);

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Homepage Route
app.get("/", (request, response) =>
  response.render("index", {
    title: "Member App",
    members
  })
);
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//members API route
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

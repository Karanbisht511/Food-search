const express = require("express");
const ejs = require("ejs");
const axios = require("axios");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

const api = "4eddc47120c241f8a6dc8b1b5e387afb";
const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api}`;

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  let data = await axios
    .get(`${url}&query=pasta`)
    .then((response) => {
      // console.log(response.data.results);

      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });

  let arr = data.results.map((element) => {
    return element;
  });

  res.render("main", { list: arr });
});

app.post("/*", async (req, res) => {
  let sss = req.body.dish;
  console.log(sss);
  let data = await axios
    .get(`${url}&query=${sss}`)
    .then((response) => {
      // console.log(response.data.results);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  let arr = data.results.map((element) => {
    return element;
  });

  res.render("main", { list: arr });
});

app.listen(port, () => {
  console.log("server is running on ", port);
});

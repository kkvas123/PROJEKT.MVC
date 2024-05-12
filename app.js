const express = require('express');

const bodyParser = require("body-parser");

const path = require("path");

//const rootDir = require("../utils/path.js")

const homeworkRouter = require("./routes/homework.js")


const PORT = 3000;
const app = express();


app.set("view engine", "ejs");
app.engine('ejs', require('ejs').__express);
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));



app.use(homeworkRouter);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost${PORT}`);
});

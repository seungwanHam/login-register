const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const static = require("./routes/static");

const PORT = 3003;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/post/:id", static.getPostPage);
app.use(express.static("./public"));
app.use("/api", routes);

app.get("*", (req, res) => {
  res.status(404).json();
});

app.listen(PORT, () => {
  console.log(`listen : ${PORT}`);
});

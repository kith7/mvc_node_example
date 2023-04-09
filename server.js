const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const { logEvents, logger } = require("./middleware/logEvents");
const PORT = process.env.PORT || 3500;
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/subdir", require("./routes/subdir"));

app.use("/employees", require("./routes/subdir/employees"));
app.use("/", request("./routes/root"));

app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "new-page.html"));
  }
  if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  }
  if (req.accepts("txt")) {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const router = express.Router();
const path = require("path");

router.get(`^/$|/index(.html)?`, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"), {
    root: __dirname,
  });
});

router.get(`/new-page(.html)?`, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"), {
    root: __dirname,
  });
});
//redirect:
router.get(`/old-page(.html)?`, (req, res) => {
  res.redirect(301, `/new-page.html`);
});

module.exports = root;

var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "../folder");

router.get("/", function (req, res) {
  const currentDate = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const fileName = `${currentDate
    .toLocaleString("en-IN", options)
    .replace(/\//g, "-")
    .replace(/, /g, " ")
    .replace(/:/g, "-")}.txt`;

  const filePath = path.join(folderPath, fileName);

  fs.appendFile(filePath, fileName, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating file");
    } else {
      console.log(`File ${fileName} created successfully`);
      res.send("File created successfully");
    }
  });
});

router.get("/view", function (req, res) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving files");
    } else {
      const textFiles = files.filter((file) => file.endsWith(".txt"));
      res.json(textFiles);
    }
  });
});

router.get("/delete", function (req, res) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving files");
    } else {
      files.forEach((file) => {
        if (file.endsWith(".txt")) {
          const filePath = path.join(folderPath, file);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`File ${file} deleted successfully`);
            }
          });
        }
      });

      res.send("Files deleted successfully");
    }
  });

});

module.exports = router;

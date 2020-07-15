var express = require("express");
var router = express.Router();
var emailModel = require("../Models/emailData");
router.post("/", function (req, res) {
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var message = req.body.message;
    var newData = { name: name, phone: phone, email: email, message: message }
    emailModel.create(newData, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //console.log(newData);
            //res.redirect("/");
            res.json(newlyCreated);
        }
    });

});

module.exports = router;
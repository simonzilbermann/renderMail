const router = require('express').Router();
const { AddProfile }=require('../controller/cv');


router.post("/contact",AddProfile);

module.exports=router;
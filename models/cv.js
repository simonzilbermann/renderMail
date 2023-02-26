const mongoose = require('mongoose');
mongoose.pluralize(null);
const ProfileSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Name:String,
    Email:String,
    Tel:String
    });
    //בצוא מודל עם שם האוסף בבסיס הנתונים והסכימה הכלולים בו
    module.exports = mongoose.model("ProfileCv",ProfileSchema)
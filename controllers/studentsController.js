var StudentModel = require('../models/studentModel'); //import studentmodel
var myDatabase = require('./sqlDatabase'); //import database , so can have sequelize instance , to query objects
var sequelizeInstance = myDatabase.sequelizeInstance;

//Add a new student record to database
exports.insert = function(req,res) { //assume user making http post
    var studentData = {
        studentId: req.body.studentId, //student id when user post in req.body
        name: req.body.studentName, //case senstiive variables 
        group: req.body.group,
        hobby: req.body.hobby
    }
    // .then is callback , run the insertion statement if it is done then
    // im  gonna look at the result , the result is flash newRecord, if is sucecssfully then is true, else return server 400 error
    StudentModel.create(studentData).then((newRecord,created) => {
        if (!newRecord) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect('/'); // if insert , go back to / page , index html
    })
};


//List all the stuednts records in database
exports.list = function (req,res) { //get method , query without writing sequelize statement
    StudentModel.findAll({ //model , findAll to retrieve all the records in the table 
        attributes: ['id','studentId','name','group','hobby'] // specify , select which row 
    }).then(function (students) { //when query is successful then render , is like try then catch
        res.render('index', { //callback function , parameter or input of the callback is students , index is the ejs
            title: "Practical 5 Database Node JS - Student Records",
            itemList: students,
            urlPath: req.protocol + "://" + req.get("host") + req.url
        });
    }).catch((err) => {
        return res.status(400).send({
            message:err
        })
    })
}

exports.editRecord = function (req,res) {
    var record_num = req.params.id;
    StudentModel.findById(record_num).then(function (studentRecord) {  // render when studentrecord is found into item
        res.render('editRecord', {
            title: "Practical 5 Database Node JS - Edit Student Record",
            item: studentRecord,
            hostPath: req.protocol + "://" + req.get("host")
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};

exports.update = function(req,res) { // method called only when user click save button
    var record_num = req.params.id; //parameter id
    var updateData = {
        studentId : req.body.studentId,
        name: req.body.name, //name because ejs file is name in the var newValues
        group: req.body.group,
        hobby: req.body.hobby
    }
    StudentModel.update(updateData, { where: { id: record_num } }).then((updatedRecord) => {
        if (!updatedRecord || updatedRecord == 0) {
            return res.send(400, {
                message:"error"
            });
        }
        res.status(200).send({message: "updated student record:" + record_num});
    })
}


exports.delete = function(req,res) {
    var record_num = req.params.id;
    console.log("deleting: " + record_num);
    StudentModel.destroy({ where: { id: record_num } }).then((deletedRecord) => {
        if (!deletedRecord) {
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({message : "deleted student record:" + record_num});
    });
}



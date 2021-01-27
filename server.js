const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
let userModel = require('./db/user')
let instructorModel = require('./db/instructor')
let taskModel = require('./db/task')

const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const MONGO_URL = "mongodb://localhost/trueimgu"
const MONGODB_URL = "mongodb://127.0.0.1:27017/r"
const PORT = process.env.PORT || 9000
var fs = require('fs')
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

let dir = "./upload"

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir)
    }, filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})
let storageuserres = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./userresponses")
    }, filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})
let uploa = multer({ storage: storage }).single('attach')
let uploauserres = multer({ storage: storageuserres }).single('attach')

app.use(express.static(__dirname + '/upload'))
app.use(express.static(__dirname + '/userresponses'))

app.listen(PORT, () => {
    console.log(`working on ${PORT}`)

})





app.post("/login", (req, res) => {
    console.log(req.body.logas);
    if (req.body.logas == "user") {
        userModel.findOne({ "email": req.body.email, "password": req.body.password }, (err, data) => {



            if (err) {
                res.json({ "err": 1, "mssg": "something went wrong" })

            }
            else if (data == null) {
                res.json({ "err": 1, "mssg": "email or password not correct" })

            }
            else {
                res.json({ "err": 0, "mssg": "", "uid": { name: data.name, email: req.body.email, logas: req.body.logas } })


            }
        }
        )
    }
    else {
        instructorModel.findOne({ "email": req.body.email, "password": req.body.password }, (err, data) => {

            if (err) {
                res.json({ "err": 1, "mssg": "something went wrong" })

            }
            else if (data == null) {
                res.json({ "err": 1, "mssg": "email or password not correct" })

            }
            else {
                res.json({ "err": 0, "mssg": "", "uid": { name: data.name, email: req.body.email, logas: req.body.logas } })


            }
        }
        )
    }
})



app.post("/registerasuser", (req, res) => {

    let ins = new userModel({ email: req.body.email, password: req.body.password, name: req.body.name, track: req.body.track })
    ins.save((err, data) => {

        if (err) {
            res.json({ "err": 1, "mssg": "user with this id already exists " })

        }

        else {
            res.json({ "err": 0, "mssg": "welcome! you are registerd succesfully " })

        }
    }
    )



})



app.post("/registerasinstructor", (req, res) => {
    let ins = new instructorModel({ email: req.body.email, password: req.body.password, name: req.body.name })
    ins.save((err, data) => {

        if (err) {
            console.log(err);
            res.json({ "err": 1, "mssg": "instructor with this id already exists " })

        }

        else {
            res.json({ "err": 0, "mssg": "welcome! you are registerd succesfully " })

        }
    }
    )



})


app.get("/taskforuser/:id", async (req, res) => {
    let id = req.params.id
    userModel.findOne({ "email": id }, (err, data) => {

console.log(err);
console.log(data);

        if (err || data == null) {
            res.json({ "err": 1, "mssg": "something went wrong" })

        }

        else {
            let track = data.track
            taskModel.find({ "track": track }, (err, data) => {
                res.json({ "err": 0, "tasks": data })

            })


        }
    }
    )
})

app.get("/taskresponses/:tname", async (req, res) => {
    let tname = req.params.tname
    taskModel.findOne({ "tname": tname }, (err, data) => {



        if (err || data == null) {
            res.json({ "err": 1, "mssg": "something went wrong" })

        }

        else {

            res.json({ "err": 0, "sres": data.sres })



        }
    }
    )
})


app.post("/addtask/:id", async (req, res) => {
    let id = req.params.id




    uploa(req, res, err => {

        let tname = JSON.parse(req.body.pro).tname
        let addDet = JSON.parse(req.body.pro).addDet
        let track = JSON.parse(req.body.pro).track
        let fname = req.file.filename
        if (err) {
            res.json({ "err": 1, "mssg": "image not uploaded" })
        }
        else {
            let ins = new taskModel({ tname: tname, "timg": fname, addDet: addDet, track: track, instructor: id })
            ins.save((err, data) => {

                if (err) {

                    fs.unlink(`upload/${fname}`, err => {
                        if (err) {
                            res.json({ "err": 1, "mssg": "Something went wrong" })

                        }
                        else {
                            res.json({ "err": 1, "mssg": "This taskname/id is already used. Try with different task name/id!" })
                        }
                    })
                }
                else {
                    instructorModel.updateOne({ "email": id }, { $push: { tasks: tname } }, (err, data) => {

                        res.json({ "err": 0, "mssg": "task is added successfully" })


                    })
                }
            })
        }


    })
})


app.post("/submittask/:id", (req, res) => {
    let id = req.params.id


    uploauserres(req, res, err => {

        let tname = req.body.tname
     
        let fname = req.file.filename


        userModel.findOne({ "email": id }, (err, data) => {
            if (data.tasks.indexOf(tname) != -1) {
                fs.unlink(`./userresponses/${fname}`, err => {
                    if (err) {
                        res.json({ "err": 1, "mssg": "Something went wrong" })

                    }
                    else {
                        res.json({ "err": 2, "mssg": "already submitted" })
                    }
                })

            }
            else {
                console.log(req.file);
                if (err) {
                    res.json({ "err": 1, "mssg": "image not uploaded" })
                }
                else {
                    taskModel.updateOne({ "tname": tname }, { $push: { sres: { "email": id, "timg": fname, "score": "" } } }, (err, data) => {


                        if (err || data.nModified == 0) {

                            fs.unlink(`userresponses/${fname}`, err => {
                                if (err) {
                                    res.json({ "err": 1, "mssg": "Something went wrong" })

                                }
                                else {
                                    res.json({ "err": 1, "mssg": "This taskname/id is already used. Try with different task name/id!" })
                                }
                            })
                        }
                        else {
                            userModel.updateOne({ "email": id }, { $push: { tasks: tname } }, (err, data) => {

                                res.json({ "err": 0, "mssg": "task is submitted successfully" })


                            })
                        }
                    })
                }
            }
        })


     })
})



app.post("/scoretask", (req, res) => {
    let tname = req.body.tname
    let uemail = req.body.uemail
    let score = req.body.score

    taskModel.findOne({ "tname": tname, "sres.email": uemail, "sres.score": "" }, (err, data) => {

        if (err) {
            res.json({ err: 1, mssg: "something went wrong" })
        }
        else if (data == null) {
            res.json({ "err": 2, "mssg": "This response has already been scores" })

        }

        else {
            taskModel.updateOne({ "tname": tname, "sres.email": uemail }, { $set: { "sres.$.score": score } }, (err, data) => {

                if (err || data.nModified == 0) {

                    res.json({ err: 1, mssg: "something went wrong" })
                }

                else {

                    res.json({ err: 0, mssg: "response is scored successfully" })


                }


            })
        }
    })


})





app.get("/tasks/:id", (req, res) => {

    let id = req.params.id


    instructorModel.findOne({ "email": id }, (err, data) => {

        res.json(data.tasks)

    })





})

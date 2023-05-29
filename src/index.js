const express = require('express');
const fs = require('fs');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const port = 8080
let initialData = require('./InitialData');
let len = initialData.length;
console.log(initialData)
app.use(express.urlencoded());
const studentsDetails = require('./model/StudentsData');
const studentArray = require('./InitialData');
// const studentArray = require('./InitialData');
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

dotenv.config({path: '../.env'})

// console.log(process.env.DB_Url)


// mongoose.connect(process.env.DB_Url
//     // useUnifiedTopology:true,
//     // useNewUrlParser:true
//     // useCreateIndex : true
// ).then(
//     ()=> console.log('db connected')
// )

app.get('/api/student', (req,res)=>{
    // studentsDetails.insertMany(initialData)
    // console.log(initialData)
    res.status(200).json(initialData)
})

app.get("/api/student/:id", (req, res) => {
    let id = Number(req.params.id);
    let student = initialData.find(item => item.id === id);

    if (student) {
        res.status(200).json(student)
    } else {
        res.status(404).json({
            message: "Page not found"
        })
    }
})

app.post("/api/student", (req, res) => {
    // const len = initialData.length
    let newId = len + 1;
    len = newId
    const { name, currentClass, division } = req.body
    if (name, currentClass, division) {
         
        const newData = new studentsDetails({
            id: Number(newId),
            name: name,
            currentClass: currentClass,
            division : division
        })
        const updatedData = [...initialData, newData];
        
        newData.save().then(savedStudent =>{
            // initialData.push(newData)
            fs.writeFile('./initialData.js', `const studentArray = ${JSON.stringify(updatedData)}\nmodule.exports= studentArray`, function (err) {
                // console.log('writefile')
                if (err) {
                  console.error('Error writing to initialData file:', err);
                } else {
                  console.log('initialData file updated successfully.');
                }
              })
            // console.log(initialData)
            res.status(200).send({id : savedStudent.id})
        }).catch(error =>{
            res.status(500).send({error : error.message})
        })
        // res.status(200).json(newData)
    } 
    else {
        res.status(400).json({
            message: "required details are incomplete"
        })
    }
})

app.put('/api/student/:id', (req,res)=>{
    let {id}= req.params
    // let studentUpdate = initialData.find(item => item.id == id)
    // id = Number(id)
    // console.log(typeof(id))
    // const studentUpdate = initialData.find(item => item.id === id)
    // console.log(studentUpdate)
    // fs.writeFile('./initialData.js', `const studentArray = ${JSON.stringify(updatedData)}\n module.exports= studentArray`, function (err) {
    //     console.log('writefile')
    //     if (err) {
    //       console.error('Error writing to initialData file:', err);
    //     } else {
    //       console.log('initialData file updated successfully.');
    //     }
    //   })
    studentsDetails.findOneAndUpdate({id: id},{$set : req.body},{new: true, useFindAndModify:false}).then(data=>{
        // console.log(data)
        if (data) {
            // console.log(initialData);
            // console.log(studentUpdate)
            // studentUpdate = data
            let update = initialData.filter(item =>{
                return item.id !== id
            })
            update = [...update, data]

            // console.log(update)
            // console.log(initialData)
            fs.writeFile('./initialData.js', `const studentArray = ${JSON.stringify(update)}\n module.exports= studentArray`, function (err) {
                console.log('writefile')
                if (err) {
                  console.error('Error writing to initialData file:', err);
                } else {
                  console.log('initialData file updated successfully.');
                }
              })
            res.status(200).send({updatedRecord : data});
          } else {
            res.status(404).json({ message: 'Data not found' });
          }
    }).catch(err=>{
        res.status(400).send({message: 'invalid id', error : err})
    })
    
})

app.delete('/api/student/:id', (req,res)=>{
    let {id} = req.params
    studentsDetails.findOneAndRemove({id: id},{useFindAndModify:false}).then(data=>{
        const updateAfterDeletion = initialData.filter(item =>{
            return item.id !== id
        })
        console.log(updateAfterDeletion)
        fs.writeFile('./initialData.js', `const studentArray = ${JSON.stringify(updateAfterDeletion)}\n module.exports= studentArray`, function (err) {
            if (err) {
              console.error('Error writing to initialData file:', err);
            } else {
              console.log('initialData file updated successfully.');
            }
          })
        // console.log(data)
        res.status(200).send({deletedItem : data})
    }).catch(err=> {
        res.status(400).send({message: 'invalid id', error : err})
    })
})

mongoose.connect(process.env.DB_Url,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('connected to DB')
}).catch(err=>{
    console.log(err)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
app.get('/', (req,res)=>{
    res.send('<h1>Hello world!</h1>')
})

function calculate(opType, num1, num2){
    if(num1<-1000000 || num2<-1000000){
        // res.status(400).send('Underflow')
        return {
            status: 400,
            message: 'Underflow'
        }
    }
    else if(num1>1000000 || num2>1000000){
        console.log("Overflow")
        return {
            status: 400,
            message: 'Overflow'
        }
    }
    else if(typeof(num1)==='string' || typeof(num2)==='string'){
        console.log("Invalid data types")
        return {
            status: 400,
            message: 'Invalid data types'
        }
    }if(opType==='/add'){
        const sum = num1 + num2
        if(sum<-1000000){
            return{
                status: 400,
                message: 'Underflow'
            }
        }
        else if(sum>1000000){
            return{
                status: 400,
                message: 'Overflow'
            }
        }else{
            return{
                status: 200,
                message: `the sum of given two numbers”, 
                sum: ${sum}`
            }
        }
    }
    if(opType==='/sub'){
        const subtraction = num1 - num2
        if(subtraction<-1000000){
            return{
                status: 400,
                message: 'Underflow'
            }
        }
        else if(subtraction>1000000){
            return{
                status: 400,
                message: 'Overflow'
            }
        }else{
            return{
                status: 200,
                message: `the difference of given two numbers”,difference:${subtraction}`
            }
        }
    }if(opType==='/multiply'){
        const multiply = num1 * num2
        if(multiply<-1000000){
            return{
                status: 400,
                message: 'Underflow'
            }
        }
        else if(multiply>1000000){
            return{
                status: 400,
                message: 'Overflow'
            }
        }else{
            return{
                status: 200,
                message: `The product of given two numbers”, result: ${multiply}`
            }
        }
    }
    if(opType==='/divide'){
        if(num2 === 0){
            return{
                status : 400,
                message: 'Cannot divide by zero'
            }
        }
        const divide = num1 / num2
        if(divide<-1000000){
            return{
                status: 400,
                message: 'Underflow'
            }
        }
        else if(divide>1000000){
            return{
                status: 400,
                message: 'Overflow'
            }
        }else{
            return{
                status: 200,
                message: `the division of given two numbers”, result: ${divide}`
            }
        }
    }
    // else{
    //     return{
    //         status: 400,
    //         message: 
    //     }
    // }
}

app.post('/add',(req,res)=>{
    // num1=req.body.num1;
    // num2= req.body.num2;
    const {num1, num2} =req.body
    console.log(req.body)
    const calculation = calculate(req.url , num1, num2);
    // res.status(calculation.status).send(calculation.message)
    res.send(calculation)
    // console.log(num1 , num2)
    // res.send(`sum is :${num1+num2} `)
})

app.post('/sub',(req,res)=>{
    // num1=req.body.num1;
    // num2= req.body.num2;
    const {num1, num2} =req.body
    const calculation = calculate(req.url , num1, num2);
    res.send(calculation)
})

app.post('/multiply',(req,res)=>{
    // num1=req.body.num1;
    // num2= req.body.num2;
    const {num1, num2} =req.body
    const calculation = calculate(req.url , num1, num2);
    res.send(calculation)
})

app.post('/divide',(req,res)=>{
    // num1=req.body.num1;
    // num2= req.body.num2;
    const {num1, num2} =req.body
    const calculation = calculate(req.url , num1, num2);
    res.send(calculation)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;

const readLine=require('readline');
const query=readLine.createInterface({
    input:process.stdin,
    output:process.stdout
});

// readLine.on('line',(line)=>{
//     console.log('Hello'+line)
// })

query.question('Please enter your name:',(name)=>{
    console.log('Hello '+name);
    query.close()
})
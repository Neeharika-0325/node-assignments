const fs = require('fs/promises');

const myFileWriter = async (fileName, fileContent) => {
	// write code here
	// dont chnage function name
	try{
		await fs.writeFile(fileName, fileContent, 'utf-8')
	}catch(err){
		console.log(err)
	}
}

myFileWriter('createdFile', 'Hello 10x')

const myFileReader = async (fileName) => {
	// write code here
	// dont chnage function name
	try{
		let data=await fs.readFile(fileName, 'utf-8')
		console.log(data)
	}catch(err){
		console.log(err)
	}
}

myFileReader('text')

const myFileUpdater = async (fileName, fileContent) => {
	// write code here
	// dont chnage function name
	try{
		await fs.appendFile(fileName, fileContent, 'utf-8')
	}catch(err){
		console.log(err)
	}
}

myFileUpdater('text', ' World')

const myFileDeleter = async (fileName) => {
	// write code here
	// dont chnage function name
	try{
		await fs.unlink(fileName)
	}catch(err){
		console.log(err)
	}
}

// myFileDeleter('deleteFile')

module.exports = { myFileWriter, myFileUpdater, myFileReader, myFileDeleter }
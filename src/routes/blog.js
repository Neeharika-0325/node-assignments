const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here


// router.get('/blog',(req,res)=>{
//     res.json({ok:'blog'})
// })

router.get('/blog',async (req,res)=>{
    const page=req.query.page || 1;
    const search=req.query.search || '';
    // console.log(search, page)
    // "/blog?page=&search="
    // const condition=topic : {$reqex: new RegExp(search),$options: 'i'};
    // .skip((page-1)*5).limit(5)
    try{
        await Blog.find({topic : {$regex: new RegExp(search),$options: 'i'}}).skip((page-1)*5).limit(5).then(data=>{
            res.status(200).send({
                status:'success',
                result: data
            });
        }).catch(err=>{
            console.log(err)
            res.status(400).send('unable to fetch query')
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send('Some error occured while retrieving blogs')
    }
})

router.post('/blog', async (req,res)=>{
    try{
        const {topic, description, posted_at, posted_by} =req.body;
        let newBlog = new Blog({
            topic,
            description,
            posted_at,
            posted_by
        })
        let result = await newBlog.save()
        // console.log(result)
        res.status(200).send({
            // 'Blog posted successfully'
            status : 'success',
            result : result
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal server error')
    }
})

router.put('/blog/:id', async (req,res)=>{
    const {id}= req.params
    // console.log(id)
    try{
        await Blog.findByIdAndUpdate({_id : id},{$set : req.body},{useFindAndModify:false}).then(data=>{
            res.status(200).send({
                status : "success",
                result : data
            })})
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal server error')
    }
})

router.delete('/blog/:id', async (req,res)=>{
    const {id}= req.params
    // console.log(id)
    try{
        let deletedItem = await Blog.findByIdAndRemove({_id : id},{useFindAndModify:false})
        // await Blog.deleteOne({_id : id}).then(data=>{
        //     res.status(200).send({
        //         status : "success",
        //         result : data
        //     })
        // })
        res.status(200).send({
            status : "success",
            result : deletedItem
        })
        
    }catch(err){
        console.log(err)
        res.status(500).send('Server error')
    }
    
})

module.exports = router;

//debounce
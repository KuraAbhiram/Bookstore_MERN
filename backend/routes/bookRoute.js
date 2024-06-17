import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// route for storing books
router.post('/', async (req,res) => {
  try{
    if(
      !req.body.title ||
      !req.body.author || 
      !req.body.publishnumber
    ){
      return res.status(400).send({
        message:'send all required fields'
      })
    }
    const newbook = {
      title:req.body.title,
      author:req.body.author,
      publishnumber:req.body.publishnumber
    }

    const book = await Book.create(newbook);

    return res.status(201).send(book);
  }catch(error){
    console.log(error);
    res.status(500).send({message:error.message})
  }
})


//route for getting books
router.get('/', async(req,res)=>{
  try{

    const books = await Book.find({})
    return res.status(201).send({
      count:books.length,
      data:books
    });
  }catch(error){
    console.log(error);
    res.status(500).send({message:error.message})
  }
})


//route for getting books by id
router.get('/:id', async(req,res)=>{
  try{

    const {id} = req.params;
    const book = await Book.findById(id)
    return res.status(201).send(book);
  }catch(error){
    console.log(error);
    res.status(500).send({message:error.message})
  }
})


//route for update a book
router.put('/:id', async(req,res)=>{
  try{
    if(
      !req.body.title ||
      !req.body.author || 
      !req.body.publishnumber
    ){
      return res.status(400).send({
        message:'send all required fields'
      })
    }
    const {id} = req.params;

    const result = await Book.findByIdAndUpdate(id,req.body);

    if(!res){
      return res.status(404).json({message:'id not found'})
    }

    return res.status(200).send({message:'data updated succesfully'})

  }catch(error){
    console.log(error);
    res.status(500).send({message:error.message})
  }
})

//route for delete a book

router.delete('/:id', async(req,res)=>{
  try{
    const {id} = req.params;

    const result = await Book.findByIdAndDelete(id);

    if(!result){
      return res.status(404).json({message:'id not found'})
    }

    return res.status(200).send({message:'data deleted succesfully'})

  }catch(error){
    console.log(error);
    res.status(500).send({message:error.message})
  }
})

export default router;
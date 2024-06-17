import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

export default function ShowBook() {

  const [books,SetBooks] = useState([]);
  const [loading,Setloading] = useState(false)
  const {id} = useParams()

  useEffect(()=>{
    Setloading(true); 
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response)=>{
      SetBooks(response.data)
      Setloading(false)
    })
    .catch((error)=>{
      console.log(error)
      Setloading(false)
    })

  },[])


  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4'>Show Book</h1>
        {loading ? (<Spinner/>) : (
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{books._id}</span>
              </div> 

              <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Title</span>
              <span>{books.title}</span>
              </div> 

              <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Author</span>
              <span>{books.author}</span>
              </div> 

              <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
              <span>{books.publishnumber}</span>
              </div> 

              <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Create Time</span>
              <span>{new Date(books.createdAt).toString()}</span>
              </div> 

              <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Last Updated Time</span>
              <span>{new Date(books.updatedAt).toString()}</span>
              </div> 
              
          </div>
        )}
    </div>
  )
}

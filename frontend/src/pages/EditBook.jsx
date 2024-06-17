import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export default function EditBook() {

  const [title,SetTitle] = useState('')
  const [author,SetAuthor] = useState('')
  const [publishnumber,SetPublishyear] = useState('')
  const [loading,SetLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  const {enqueueSnackbar} = useSnackbar()

  useEffect(()=>{
    SetLoading(true)
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response)=>{
      SetTitle(response.data.title)
      SetAuthor(response.data.author)
      SetPublishyear(response.data.publishnumber)
      SetLoading(false)
    })
    .catch((error)=>{
      SetLoading(false)
      alert('an error  happened')
      console.log(error)
    })
  },[])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishnumber
    };
    SetLoading(true);
    axios.put(`http://localhost:5555/books/${id}`,data)
    .then(()=>{
      SetLoading(false)
      enqueueSnackbar('book edited successfully',{variant :'success'})
      navigate('/')
    })
    .catch((error)=>{
      SetLoading(false)
      // alert('an error  happened')
      enqueueSnackbar('Error',{variant:'error'})
      console.log(error)
    })
  }


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input type="text" value={title} onChange={(e) => SetTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>

        <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input type="text" value={author} onChange={(e) => SetAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>

        <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input type="text" value={publishnumber} onChange={(e) => SetPublishyear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
      </div>
    </div>
  )
}

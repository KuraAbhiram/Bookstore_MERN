import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md'
import Spinner from '../components/Spinner'
import Bookscard from '../components/home/Bookscard'
import Bookstable from '../components/home/Bookstable'

export default function Home() {

  const [books,SetBooks] = useState([]);
  const [loading,Setloading] = useState(false)
  const [showtype,Setshowtype] = useState('table')

  useEffect(()=>{
    Setloading(true)
    axios.get('http://localhost:5555/books')
    .then((response)=>{
      // console.log(response.data.data)
      SetBooks(response.data.data)
      Setloading(false)
    })
    .catch((error)=>{
      console.log(error)
      Setloading(false)
    })
  },[])

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
          <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={()=>Setshowtype('table')}>Table</button>
          <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={()=>Setshowtype('card')}>Card</button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
          <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-200 text-4xl' />
          </Link>
      </div>
      {/* {loading ? (<Spinner/>) : (
        <table className='w-full border-seperate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-md-hidden'>Author</th>
              <th className='border border-slate-600 rounded-md max-md-hidden'>Publish Year</th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book,index)=>{
              return(
              <tr key={book._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>{index+1}</td>
                <td className='border border-slate-700 rounded-md text-center'>{book.title}</td>
                <td className='border border-slate-700 rounded-md max-md-hidden'>{book.author}</td>
                <td className='border border-slate-700 rounded-md max-md-hidden'>{book.publishnumber}</td>
                <td className='border border-slate-700 rounded-md'>
                    <div className='flex justify-center gap-x-4'>
                        <Link to={`/books/details/${book._id}`}>
                          <BsInfoCircle className='text-2xl text-green-800' />
                        </Link>

                        <Link to={`/books/edit/${book._id}`}>
                          <AiOutlineEdit className='text-2xl text-yellow-800' />
                        </Link>

                        <Link to={`/books/delete/${book._id}`}>
                          <MdOutlineDelete className='text-2xl text-red-800' />
                        </Link>
                    </div>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
        <Bookstable books={books}/>
      )} */}

      {loading ?( <Spinner/>) : showtype === 'table' ? (<Bookstable books={books} />) : (<Bookscard books={books} />)}
    </div>
  )
}

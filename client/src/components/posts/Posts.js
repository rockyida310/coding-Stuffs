import React from 'react'
import Post from '../post/Post'
import './posts.css'

const Posts = ({posts}) => {
  return (
    <div className='posts'>
        {posts.map((post,index)=>(
          <Post key={index} post={post}/>
        ))}
    </div>
  )
}

export default Posts
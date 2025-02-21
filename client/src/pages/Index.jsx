import { useEffect, useState } from 'react'
import Post from '../Post'
export default function index(){
    const [posts, setPosts]=useState([]);
    const BASE_URL = import.meta.env.VITE_API_URL;
    useEffect(()=>{
        fetch(`${BASE_URL}/post`).then(response=>{
            response.json().then(posts=>{
                setPosts(posts);
            })
        })
    },[])
    return (
        <div>
           {/* {posts.length>0 && posts.map(post=>{
            <Post key={post._id} {...post}/>
           })} */
           
            <div>
      {posts.length > 0 ? (
        posts.map(post => (
          <Post key={post._id} {...post} />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
    }
        </div>
    )
}

import { formatISO9075 } from 'date-fns'
import { Link } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_URL;
export default function Post({ _id,title, summary, cover, content, createdAt, author }) {
  return (
    <div className='posts'>
      <div className='img'>
        <Link to={`/post/${_id}`}>
          <img src={`${BASE_URL}/` + cover}></img>
        </Link>
      </div>
      <div className='texts'>
      <Link to={`/post/${_id}`}>
      <h2>{title}</h2>
      </Link>
       
        <p className='info'>
          <a className='author'>{author.Username}</a>
          <time>{createdAt ? formatISO9075(new Date(createdAt)) : 'No date available'}</time>
        </p>
        <p className='summury'>{summary}</p>
        <Link to={`/post/${_id}`}>
          <button >Read More</button>
        </Link>
      </div>
    </div>
  )
}
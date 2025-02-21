import { useParams,Navigate } from "react-router-dom";
import Editor from "../Editor";
import { useEffect, useState } from "react";

export default EditPost => {
    const {id}=useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_URL;
    useEffect(()=>{
        fetch(`${BASE_URL}/post/`+id).then(response=>{
            response.json().then(postInfo=>{
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            })
        })
    },[]);

    async function updatePost(e) {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
         data.set('summary', summary);
         data.set('content', content); 
         data.set('id', id);
         if(files?.[0]){
            data.set('file', files[0]);
         }
         
        await fetch(`${BASE_URL}/post/`,{
            method:'PUT',
            body:data,
            credentials:'include'
        })
        setRedirect(true);
        

    }


    if (redirect) {
        return <Navigate to={'/post/'+id} />
    }
    return (
        <form onSubmit={updatePost}>
            <input type="title" placeholder={'Title'} value={title} onChange={e => setTitle(e.target.value)} />
            <input type="summary" placeholder={'Summary'} value={summary} onChange={e => setSummary(e.target.value)} />
            <input type="file" onChange={e => setFiles(e.target.files)} />
            <Editor onChange={setContent} value={content} />
            <button style={{ marginTop: '5px' }}>Update post</button>
        </form>
    )
}
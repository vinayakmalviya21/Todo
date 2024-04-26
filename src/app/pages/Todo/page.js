'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Todo() {

    const [Uid,setUid] = useState(()=>localStorage.getItem("Uid")||null);
    const [todo,setTodo] = useState([]);
    const router = useRouter();

    const getTodo = async ()=> {
        const res = await axios.get("/api/todo/get/"+Uid);
        console.log(res.data);
        setTodo(res.data.data);
    }

    useEffect(()=>{

        if(!Uid){ return router.push("/pages/Login");}

        getTodo();

    },[Uid])

    return(
        <>
        
        </>
    )
}


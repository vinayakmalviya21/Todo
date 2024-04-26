"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from '../../components/Navbar';


export default function Todo() {
  const [Uid, setUid] = useState(() => window.localStorage.getItem("Uid") || null);
  const [todo, setTodo] = useState([]);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  const [selectedTodo,setSelectedTodo] = useState();

  const getTodo = async () => {
    const res = await axios.get("/api/todo/get/" + Uid);
    console.log(res.data);
    setTodo(res.data.data);
  };

  useEffect(() => {
    if (!Uid) {
      return router.push("/pages/Login");
    }

    getTodo();

  }, [Uid]);


  const createTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/todo/create', {
        Uid,
        title,
        description,
        status,
      });
      console.log(response.data);
    const newArray = [...todo, response.data.data];
    setTodo(newArray);
      setTitle('');
      setDescription('');
      setStatus('pending');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const selectTodo = async(todo) => {

    setSelectedTodo(todo._id);
    setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
  }

  const updateTodo = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`/api/todo/update/${selectedTodo}`, {
            status:status
        })
        const newArray3 = todo.map(t=>{
            if(t._id == selectedTodo){
                console.log(t);
                return {
                    ...t,
                    status:status
                }
            }
            return t;
        })
        setTodo(newArray3);
    } catch (error) {
        console.log(error);
    }
    finally{
        setTitle("")
        setDescription("")
        setStatus("pending")
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todo/delete/${id}`);
    
      const newArray2 = todo.filter(t=>{
        return t._id != id;
      })
      setTodo(newArray2);
        
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

    const handleLogout = () => {
        localStorage.removeItem(Uid);
        console.log("Logout");
        router.push("/");
    };

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">ToDo App</h1>
      <form>
      <div className="flex justify-center flex-wrap mb-4">
        <input
          className="w-full sm:w-1/2 px-2 py-1 border rounded mr-2 mb-2"
          type="text"
          placeholder="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full sm:w-1/2 px-2 py-1 border rounded mr-2 mb-2"
          placeholder="Todo Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select
          className="w-full sm:w-1/2 px-2 py-1 border rounded mr-2 mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="started">Started</option>
          <option value="pending">Pending</option>
          <option value="delayed">Delayed</option>
        </select>
        </div>
        <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={createTodo}
        >
          Add Todo
        </button>
        <button
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={updateTodo}
        >
          Update Todo
        </button>
        </div>
        </form>
      <div>
        <h2 className="text-2xl font-bold mb-2 mt-4">Todo List</h2>
        {todo.map((todo) => (
          <div key={todo._id} className="border rounded p-4 mb-4">
            <h3 className="text-lg font-semibold">{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
            <button
              className="px-4 mx-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
              onClick={()=> selectTodo(todo)}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../App';
import { toast } from 'react-toastify';
import { FaUserEdit } from 'react-icons/fa';
import axios from 'axios';
import { FaTrashCan } from 'react-icons/fa6';
import { Button, Form } from 'react-bootstrap';

const Edit = () => {
    const navigate = useNavigate();
   const params=useParams();
    const [name, setName]=useState("");
    const [batch,setBatch]=useState([]);
    const [email,setEmail]=useState("");
    const [students,setStudents]=useState([]);
    const [newBatch, setNewBatch]=useState('');

    const handleEdit = async ()=>{
        try{
           const data = {name,batch,email,students}
           const res = await axios.put(`${API_URL}/mentors/${params.id}`,data)
           if(res.status === 200){
            navigate('/')
           }
        }catch(error){
           toast.error("Internal Servor Error")
        }
    }

    const getDetails = async ()=>{
        const res= await axios.get(`${API_URL}/mentors/${params.id}`);
        const res2=await axios.get(`${API_URL}/mentors/students/${params.id}`);
        try{
          if(res.status === 200){
            setName(res.data.mentor.name)
            setBatch(res.data.mentor.batch)
            setEmail(res.data.mentor.email)
            setStudents(res2.data.students)
          }
        }catch(error){
            toast.error("Internal Servor Error")
        }
    }
    const handleAddBatch=()=>{
       let newArray=[...batch]
       if(newBatch===""){
        alert("Input is empty")
       }else{
        let trime = newBatch.trim();
        newArray.push(trime)
       }
       setBatch(newArray)
       setNewBatch("")
    }

    const handleBatchDelete = (index) =>{
        let newArray = [...batch]
        newArray.splice(index,1)
        setBatch(newArray)
    }

    useEffect(()=>{
        getDetails()
    },[])


  return (
    <div>
        <div className='edit-form'>
            <div className='Title'>
                <h1 className='text-center'>Edit Mentor
                   <FaUserEdit style={{paddingBottom:"5px", fontSize:"60px", filter:"drop-shadow(1px 1px 20px blue)" }}/>
                </h1>
            </div>
            <Form>
                <div className='formGroup'>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" value={name} onchange={(e)=>{setName(e.target.value)}} placeholder="Enter your name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" value={email} onchange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Batchs:</Form.Label>
                        <Form.Control type="text" value={newBatch} onchange={(e)=>{setNewBatch(e.target.value)}} placeholder="Add New Batch" />
                        <Button onClick={()=>handleAddBatch()} variant="Success">Add</Button>
                    </Form.Group>
                </div>
                <div className='formGroup'>
                    <div className='batch m-2'>
                        <h5 className='text-center tex-light'>Batchs</h5>
                         {
                            batch.map((e,i)=><div key={i} className='d-flex justify-content-around'><span>{e}</span><span onClick={()=>handleBatchDelete(i)} className='trash_can'><FaTrashCan/></span></div>)
                         }
                    </div>
                    <div className='student m-2'>
                        <h5 className='text-center tex-light'>Students</h5>
                         {
                            students.map((e,i)=><div key={i} className='d-flex justify-content-around'><span>{e.name}</span><span className='trash_can'><FaTrashCan/></span></div>)
                         }
                    </div>
                </div>
                <div className='buttonGroup'>
                    <Button onClick={()=>handleEdit()} variant="primary">
                      Submit
                    </Button>
                    &nbsp; &nbsp;
                    <Button onClick={()=>navigate("/dashboard")} variant="warning">
                    Cancel    
                    </Button> 
                </div>
            </Form>
        </div>
    </div>
  )
}

export default Edit
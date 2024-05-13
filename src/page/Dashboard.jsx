import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../App';
import { Button, Form, Table } from 'react-bootstrap';
import { LiaUserEditSolid } from 'react-icons/lia';
import { FaTrashCan } from 'react-icons/fa6';

const Dashboard = () => {
    const navigate=useNavigate();
    const [mentor,setMentor]=useState([]);
    const getDetails = async () =>{
       let res=await axios.get(`${API_URL}/mentors`); 
       try{
         if(res.status === 200){
            setMentor(res.data.mentor);
            console.log(res.data.mentor)
         }
       }catch(error){

       }
    };
    const handleDelete = async (id) =>{
       if(confirm("Are you sure to delete the Mentor?")) {
        try{
          let res =await axios.delete(`${API_URL}/mentors/${id}`);
           if(res.status === 200){
            toast.success("Blog Deleted Successfully!");
            getDetails();
           }
        }catch(error){
          toast.error("Internal Servor Error");
        }
       }
    };

    useEffect(()=>{
        getDetails();
    },[]);
  return (
    <div className='Table-container'>
        <Table striped bordered hover>
            <thead>
                <tr className='text-center'>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>E-Mail Id</th>
                    <th>Batches</th>
                    <th>Students </th>
                    <th>Action</th> 
                </tr>
            </thead>
            <tbody className='tableBody'>
                {mentor.map((e,i)=>{
                    return(
                        <tr className='text-center'>
                            <td>{i+1}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>
                                <Form.Select aria-label='Default select example'>
                                    {e.batch.map((o,index)=><option value={o} key={index}>{o}</option>)}
                                </Form.Select>
                            </td>
                            <td>
                                <Button onClick={()=>navigate(`/student-list/${e._id}`)} variant='info'>View</Button>
                            </td>
                            <td>
                                <Button onClick={()=>navigate(`/edit/${e._id}`)} variant='warning'>{<LiaUserEditSolid/>}</Button>{" "}
                                &nbsp;
                                <Button onClick={()=>handleDelete(e._id)} variant="danger"><FaTrashCan/></Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>

    </div>
  );
};

export default Dashboard;
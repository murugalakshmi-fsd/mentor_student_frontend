import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../App';
import { Button, Table } from 'react-bootstrap';
import { LiaUserEditSolid } from 'react-icons/lia';
import { FaTrashCan } from 'react-icons/fa6';

const Allstudent = () => {
    const navigate = useNavigate();
    const [student, setStudent]=useState([]);

    const findIndex = (array,id)=>{
        for(let i=0;i<array.length;i++){
            if(array[i]._id===id){
                return i
            }
        }
    };

    const getDetails = async ()=>{
        let res=await axios.get(`${API_URL}/students`);
        
        try{
            if(res.status === 200){
                setStudent(res.data.student);
                console.log(res.data.student);
            }
        }catch(error){
            toast.error("Internal Server Error");
        }
    };

    const handleDelete = async(id,batch)=>{
        if(confirm("Are You sure to delete the student?")){
           try{
             const index = findIndex(student,id)
             let newArray = [...student]
             newArray.splice(index,1)
             setStudent(newArray)
             toast.success("Student Deleted Successfully!");
             let res = await axios.delete(`${API_URL}/students/${id}`);
             if(res.status===200){
                getDetails();
             }
           }catch(error){
            toast.error("Internal Server Error");
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
                   <th>E-MailId</th>
                   <th>Batch</th>
                   <th>Action</th>
                </tr>
            </thead>
            <tbody className='tablebody'>
                {student.map((e,i)=>{
                    return(
                        <tr className='text-center' key={e._id}>
                          <td>{i+1}</td>
                          <td>{e.name}</td>
                          <td>{e.email}</td>
                          <td>{e.batch}</td>
                          <td>
                            <Button onClick={()=>navigate(`/student-edit/${e._id}`)} variant='warning'>
                               <LiaUserEditSolid/>
                            </Button>{" "}
                            &nbsp;
                            <Button onClick={()=>handleDelete(e._id,e.batch)} variant='danger'>
                              <FaTrashCan/>  
                            </Button>
                          </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>

    </div>
  )
}

export default Allstudent;
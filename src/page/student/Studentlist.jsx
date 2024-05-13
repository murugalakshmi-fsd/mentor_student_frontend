import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../../App';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

const Studentlist = () => {
  let params = useParams();
  let id = params.id
  let navigate = useNavigate();
  let [student,setStudent] = useState([]);

  const findIndex = (array,id) =>{
    for(let i=0;i<array.length;i++){
      if(array[i]._id===id){
        return i;
      }
    }
  }

  const getDetails=async()=>{
    let res = await axios.get(`${API_URL}/mentors/student/${id}`);
    console.log("res:",res);
    try{
      if(res.status === 200){
        setStudent(res.data.students);
        console.log(student);
      }
    }catch(error){
      toast.error("Internal Servor Error")
    }
  };

  const handleDelete = async(id,batch) =>{
    if(confirm("Are you sure to delete the Student?")){
      try{
       const index = findIndex(student,id)
       let newArray=[...student]
       newArray.splice(index,1)
       setStudent(newArray)
       toast.success("Students Deleted Successfully!");
       let res = await axios.delete(`${API_URL}/students/${id}`);
       if(res.status === 200){
        getDetails();
       }
      }catch(error){
        toast.error("Internal Servor Error");
      }
    }
  };

  useEffect(()=>{
    getDetails();
  },[])

  return (
    <div className='Table-container'>
     <Table striped bordered hover>
      <thead>
        <tr className='text-center'>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Batch</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className='tableBody'>
        {student.map((e,i)=>{
          return(
            <tr className='text-center' key={e._id}>
              <td>{i+1}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.batch}</td>
              <td>
                <Button onClick={()=> navigate(``)} variant="info">
                  Edit
                </Button>{" "}
                &nbsp;
                <Button onClick={()=>handleDelete(e._id,e.batch)} variant="danger">
                  Delete
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

export default Studentlist;
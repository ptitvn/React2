import React from 'react'
import axios from "axios";
export default function Bai5() {
    async function getStudentById(id: number){
        await axios.get(`http://localhost:8080/student/${id}`)
        .then(res => console.log(res.data))
        .catch(()=>console.log("Khong co ban ghi"))
    }
    getStudentById(1);
    getStudentById(6);
  return (
    <div>
      
    </div>
  )
}

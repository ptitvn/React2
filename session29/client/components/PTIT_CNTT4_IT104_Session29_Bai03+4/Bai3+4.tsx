import React from 'react'
import axios from "axios";
export default function Bai3() {
    async function getAllStudents(){
        const res=await axios.get("http://localhost:8080/student");
        console.log("Thong tin sinh vien");
        console.log(res.data);
    }
    getAllStudents();
  return (
    <div>
      
    </div>
  )
}

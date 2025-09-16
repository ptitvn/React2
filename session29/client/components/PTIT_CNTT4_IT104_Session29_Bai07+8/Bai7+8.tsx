/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Bai7() {
const [studentList, setStudentList]=useState<any[]>([]);
    async function getData() {
        const res = await axios.get("http://localhost:8080/student");
        setStudentList(res.data);
    }
    useEffect(()=>{
        getData();
    }, []);
    async function deleteStudent(id: number){
        if(confirm("Xoa sinh vien nay?")){
            await axios.delete(`http://localhost:8080/student/${id}`);
            getData();
        }
    }
  return (
    <>
        <h1 style={{textAlign: "center"}}>Quan li sinh vien</h1>
        <table style={{width: "1000px", margin: "auto"}}>
            <thead>
                <tr>
                    <th><input type="checkbox"/></th>
                    <th>Ten sinh vien</th>
                    <th>Email</th>
                    <th>Dia chi</th>
                    <th>So dien thoai</th>
                    <th>Lua chon</th>
                </tr>
            </thead>
            <tbody style={{textAlign: "center"}}>
                {
                    studentList.map((student, index) =>{
                        return <tr key={index}>
                            <td><input type="checkbox"/></td>
                            <td>{student.studentName}</td>
                            <td>{student.email}</td>
                            <td>{student.address}</td>
                            <td>{student.phone}</td>
                            <td>
                                <button style={{backgroundColor: "orange", border: 'none', color: "white", marginRight: '10px', borderRadius: "4px"}}>sua</button>
                                <button style={{backgroundColor: "red", border: 'none', color: "white", borderRadius: "4px"}} onClick={()=>deleteStudent(student.id)}>xoa</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>
  )
}

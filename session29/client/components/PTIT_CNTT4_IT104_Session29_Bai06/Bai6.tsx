/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
type Student={
    studentName: string,
    email: string,
    address: string,
    phone: string,
    status: boolean | "",
    createdAt: string
}
export default function Bai6() {
    const [studentList, setStudentList]=useState<any[]>([]);
    const [newStudent, setNewStudent]=useState<Student>({studentName: "", email: "", address: "", phone: "", status: "", createdAt: ""});
    const handleChange=(e: (React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>))=>{
        const {value, name}=e.target;
        if(name=="status"){
            setNewStudent({...newStudent,status: value=="true" ? true : false});
        }else{
            setNewStudent({...newStudent, [name]: value});
        }
    }
    async function addStudent(){
        const res = await axios.post("http://localhost:8080/student", newStudent);
        setStudentList(res.data)
    }
    async function getData() {
        const res = await axios.get("http://localhost:8080/student");
        setStudentList(res.data);
    }
    useEffect(()=>{
        getData();
    }, []);
    useEffect(()=>{
        console.log(studentList);
    }, [studentList]);
  return (
    <div>
      <form action="">
        <h2>Them sinh vien</h2>
        <input type="text" name='studentName' value={newStudent.studentName} placeholder='Nhap ten' onChange={handleChange}/> <br />
        <input type="text" name='email' value={newStudent.email} placeholder='Nhap email' onChange={handleChange}/> <br />
        <input type="text" name='address' value={newStudent.address} placeholder='Nhap dia chi' onChange={handleChange}/> <br />
        <input type="text" name='phone' value={newStudent.phone} placeholder='Nhap so dien thoai' onChange={handleChange}/> <br />
        <input type="text" name='createdAt' value={newStudent.createdAt} placeholder='Nhap thoi gian tao' onChange={handleChange}/> <br />
        <select name="status" value={String(newStudent.status)}  onChange={handleChange}>
            <option value="" hidden disabled>Nhap trang thai</option>
            <option value={"true"}>Hoat dong</option>
            <option value={"false"}>Ngung hoat dong</option>
        </select> <br />
        <button onClick={addStudent}>Them</button>
      </form>
    </div>
  )
}

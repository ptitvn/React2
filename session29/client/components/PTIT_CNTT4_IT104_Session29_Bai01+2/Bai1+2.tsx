import React from 'react'

export default function Bai1() {
  const getAllProduct=()=>{
  fetch("http://localhost:8080/product")
  .then(res => res.json())
  .then(data =>{
    console.log("Danh sach san pham");
    console.log(data);
  })
}
getAllProduct();
  return (
    <div>

    </div>
  )
}

import React from "react";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import './App.css'
export default function App() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="row">
        <ProductList></ProductList>
        <Cart></Cart>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductList() {
  const products = useSelector((data: any) => {
    return data.products;
  });
  const cart = useSelector((data: any) => {
    return data.cart;
  });
  const dispatch = useDispatch();
  const addToCart=(id: number)=>{
    const target = products.find((product: any) => product.id==id);
    if(!target){
        alert("San pham khong ton tai");
        return
    }
    if(target.quantity==0){
        alert("San pham da het hang");
        return;
    }
    if(!cart.find((cart: any) => cart.id==id)){
        dispatch({type: "addToCart", payload: target});
    }else{
        dispatch({type: "increaseCart", payload: id});
    }
  }
  return (
    <div>
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h1 className="panel-title">List Products</h1>
          </div>
          <div className="panel-body" id="list-product">
            {products.map((product: any, index: number) => {
              return (
                <div key={index}>
                  <div className="media product">
                    <div className="media-left">
                      <a href="#">
                        <img
                          className="media-object"
                          src={product.image}
                          alt="pizza"
                          width={"120px"}
                          height={"80px"}
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">{product.name}</h4>
                      <p>
                        {product.content}
                      </p>
                      <input
                        name="quantity-product-1"
                        type="number"
                        disabled
                        value={product.quantity}
                      />
                      <a data-product={1} className="price" onClick={()=>addToCart(product.id)}>
                        {product.price} USD{" "}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

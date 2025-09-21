/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
type Product={
    id: number,
    name: string,
    quantity: number,
    price: number,
    image: string,
    content: string
}
export default function Cart() {
  const cart: Product[] = useSelector((data: any) => {
    return data.cart;
  });
  const dispatch=useDispatch();
  return (
    <div>
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div className="panel panel-danger">
          <div className="panel-heading">
            <h1 className="panel-title">Your Cart</h1>
          </div>
          <div className="panel-body">
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="my-cart-body">
                {cart.map((cart: any, index: number) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index+1}</th>
                      <td>{cart.name}</td>
                      <td>{cart.price} USD</td>
                      <td>
                        <input
                          name="cart-item-quantity-1"
                          type="number"
                          value={cart.quantity}
                          disabled
                        />
                      </td>
                      <td>
                        <a
                          className="label label-info update-cart-item"
                          data-product=""
                        >
                          Update
                        </a>
                        <a
                          className="label label-danger delete-cart-item"
                          data-product=""
                          onClick={()=>confirm("Xoa san pham khoi gio hang?") ? dispatch({type: "deleteCart", payload: cart.id}) : ""}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot id="my-cart-footer">
                <tr>
                  <td colSpan={4}>
                    There are <b>{cart.length}</b> items in your shopping cart.
                  </td>
                  <td colSpan={2} className="total-price text-left">
                    {cart.reduce((sum, current) => current.price*current.quantity+sum, 0)} USD
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="alert alert-success" role="alert" id="mnotification">
          Add to cart successfully
        </div>
      </div>
    </div>
  );
}

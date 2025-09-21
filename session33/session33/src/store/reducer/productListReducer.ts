/* eslint-disable @typescript-eslint/no-explicit-any */
import pizza from '../../images/pizza.jpg'
import hamburger from '../../images/Hamburger.jpg'
import bread from '../../images/bread.jpg'
import cake from '../../images/Cake.jpg'

type Product={
    id: number,
    name: string,
    quantity: number,
    price: number,
    image: string,
    content: string
}
const initialState: Product[]=[
    {
        id: 1,
        name: "pizza",
        quantity: 5,
        price: 30,
        content: "pizza",
        image: pizza
    },
    {
        id: 2,
        name: "hamburger",
        quantity: 5,
        price: 15,
        content: "hamburger",
        image: hamburger
    },
    {
        id: 3,
        name: "bread",
        quantity: 5,
        price: 20,
        content: "bread",
        image: bread
    },
    {
        id: 4,
        name: "cake",
        quantity: 5,
        price: 10,
        content: "cake",
        image: cake
    }
]
export const productListReducer=(state: Product[]=initialState, action: {type: string, payload: any})=>{
    if(action.type=="addToCart"){
        return state.map((product) => { return product.id==action.payload.id ? {...product, quantity: product.quantity-1}: product});
    }else if(action.type=="increaseCart"){
        return state.map((product) => { return product.id==action.payload ? {...product, quantity: product.quantity-1}: product});
    }else if(action.type=="deleteCart"){
        return state.map((product) => { return product.id==action.payload ? {...product, quantity: 5}: product});
    }
 return state;
}
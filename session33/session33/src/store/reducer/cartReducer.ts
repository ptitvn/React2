/* eslint-disable @typescript-eslint/no-explicit-any */
type Product={
    id: number,
    name: string,
    quantity: number,
    price: number,
    image: string,
    content: string
}
export const cartReducer=(state: Product[]=[], action: {type: string, payload: any})=>{
    if(action.type=="addToCart"){
        return [...state, {...action.payload, quantity: 1}];
    }else if(action.type=="increaseCart"){
        return state.map((cart) => { return cart.id==action.payload ? {...cart, quantity: cart.quantity+1}: cart});
    }else if(action.type=="deleteCart"){
        return state.filter((cart) => cart.id!=action.payload);
    }
    return state;
}
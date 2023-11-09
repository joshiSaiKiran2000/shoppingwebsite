import React from "react";
import './Cart.css'
import './mediaQuery.css'
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrement, deleteFromCart, calculatePrice,increment} from '../../store/reducers'
const Cart = () => {
  const {cartItems,subTotal, tax, shipping, total }=useSelector((state)=>state.cart);
  console.log("carts items are :"+cartItems.length);
  
  const dispatch=useDispatch();
  const incrementHandler = (id) => {
    dispatch(increment(id));
    dispatch(calculatePrice())
  };
  const decrementHandler = (id) => {
    dispatch(decrement(id))
    dispatch(calculatePrice())
  };
  const deleteHandler = (id) => {
    dispatch(deleteFromCart(id))
    dispatch(calculatePrice())
  };
  return (
    <div className="cart_page">
      <main>
        {
          cartItems.length>0 ? cartItems.map((i)=>{
            return <CartItem
            imgsrc={i.imgSrc}
            name={i.title}
            price={i.price}
            qunty={i.quantity}
            id={i.id}
            key={i.id}
            increment={incrementHandler}
            decrement={decrementHandler}
            deleteHandler={deleteHandler}
          />
        }):<h1>No Items Yet</h1>
        }
      </main>
      <aside>
        <h2>SubTotal :${subTotal}</h2>
        <h2>Shipping :${shipping}</h2>
        <h2>Tax :${tax}</h2>
        <h2>Total :${total}</h2>
      </aside>
    </div>
  );
};
export const CartItem = ({ imgsrc, name, price, qunty, id ,increment,decrement,deleteHandler}) => (
  <div className="cart_item">
    <img src={imgsrc} alt={'img'} />
    <article>
      <h3>{name}</h3>
      <p>$ {price}</p>
    </article>
    <div className="quantity">
      <button className="btn" onClick={() => increment(id)}>
        +
      </button>
      <p>{qunty}</p>
      <button className="btn" onClick={() => decrement(id)}>
        -
      </button>
    </div>
    <AiFillDelete className="icon" onClick={() => deleteHandler(id)} />
  </div>
);
export default Cart;

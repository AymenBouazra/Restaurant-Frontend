import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    clearCart,
    decreaseCart,
    getTotals,
    removeFromCart,
} from "./features/CartSlice";
import './cart.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    console.log(cart);

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleAddToCart = (food) => {
        dispatch(addToCart(food));
    };
    const handleDecreaseCart = (food) => {
        dispatch(decreaseCart(food));
    };
    const handleRemoveFromCart = (food) => {
        dispatch(removeFromCart(food));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };
    return (
        <div className="cart-container">
            {cart.cartItems.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty</p>
                    <div className="start-shopping">
                        <span>Start Shopping</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" className="border-0 bg-light">
                                            <div className="p-2 px-3 text-uppercase">Food Name</div>
                                        </th>
                                        <th scope="col" className="border-0 bg-light">
                                            <div className="py-2 text-uppercase">Price</div>
                                        </th>
                                        <th scope="col" className="border-0 bg-light">
                                            <div className="py-2 text-uppercase">Quantity</div>
                                        </th>
                                        <th scope="col" className="border-0 bg-light">
                                            <div className="py-2 text-uppercase">Remove</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.cartItems.map((item, index) => {
                                            return (
                                                <tr key={index} className='text-center'>
                                                    <th scope="row" className="border-0">
                                                        <div className="p-2 d-flex">
                                                            <img src={item.photo} alt="" width="150" className="img-fluid rounded-2" />
                                                            <div className="d-flex flex-column justify-content-center px-3">
                                                                <span className="text-dark d-inline-block align-middle" style={{ fontSize: '20px' }}>{item.foodName}</span>
                                                                <span className="text-muted">{item.description}</span>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <td className="border-0 ">
                                                        <div className="py-auto">
                                                            <strong> {item.priceMega * item.cartQuantity}Dt </strong>
                                                        </div>
                                                    </td>
                                                    <td className="border-0 align-middle">
                                                        <button className="btn btn-dark"><FontAwesomeIcon icon={faMinus} /></button>
                                                        <strong>{item.cartQuantity}</strong>
                                                        <button className="btn btn-dark"><FontAwesomeIcon icon={faPlus} /></button>
                                                    </td>
                                                    <td className="border-0 align-middle"><button className="btn btn-danger" onClick={() => handleRemoveFromCart(item)}><FontAwesomeIcon icon={faTrashAlt} size='xl' color="white" /></button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr >
                                        <td colSpan={4}>
                                            <div className="float-end">
                                                <h3>Total:  {cart.cartTotalAmount}Dt</h3>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="d-flex justify-content-end">
                                <button className="btn btn-success rounded-4" style={{ width: '150px', fontSize: '14px', fontWeight: 'bold' }} >CONFIRM ORDER</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
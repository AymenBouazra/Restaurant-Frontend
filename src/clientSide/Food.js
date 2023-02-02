import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Card.css'
import { addToCart } from './features/CartSlice'
import { useGetAllFoodQuery } from './features/foodApi'
const Food = () => {

    const { items: food, status } = useSelector((state) => state.food);
    const dispatch = useDispatch();

    const { data, error, isLoading } = useGetAllFoodQuery();
    console.log("Api", isLoading);
    console.log({ food, error });

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        // navigate('/cart')
    };

    return (
        <div className='py-4 row'>
            {status === 'success' ? (
                <>
                    {
                        data ? data?.map((food, index) => {
                            return (
                                <div key={index} className="col-sm-6 col-md-6 col-lg-4">
                                    <div className="food-card">
                                        <div className="food-card_img">
                                            <img src={food.photo} alt="" />
                                        </div>
                                        <div className="food-card_content">
                                            <div className="food-card_title-section">
                                                <Link to='' className="food-card_title">{food.foodName}</Link>
                                                <Link to='' className="food-card_author">Pizza</Link>
                                            </div>
                                            <div className="food-card_bottom-section">
                                                <div className='text-muted'>
                                                    {food.description}
                                                </div>
                                                <hr />
                                                <div className="space-between">
                                                    <div className="food-card_price">
                                                        <span>{food.priceMega}Dt</span>
                                                    </div>
                                                    <div className="food-card_order-count">
                                                        <div className="input-group mb-3">
                                                            <button className='btn btn-primary px-2' onClick={() => handleAddToCart(food)} >ADD TO CART</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : null
                    }
                </>
            ) : status === 'pending' ? (
                <div> Loading...</div>
            ) : <p> Unexpected erroroccured... </p>
            }
        </div>
    )
}

export default Food
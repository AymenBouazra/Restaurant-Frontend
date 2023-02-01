import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FoodService from '../services/foodServices'
import './Card.css'
const Food = () => {
    const [foodList, setFoodList] = useState([])
    console.log(foodList);
    const getFood = async () => {
        const response = await FoodService.getAllFoodClientSide()
        setFoodList(response.data)
    }
    useEffect(() => {
        const controller = new AbortController();
        getFood()
        return controller.abort()
    }, [])
    return (
        <div className='py-4 row'>
            {
                foodList.length !== 0 ? foodList.map((food, index) => {
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
                                                    <div className="input-group-prepend">
                                                        <button className="btn btn-outline-secondary minus-btn" type="button" id="button-addon1"><FontAwesomeIcon icon={faMinus} /></button>
                                                    </div>
                                                    <input type="text" className="form-control input-manulator" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-outline-secondary add-btn" type="button" id="button-addon1"><FontAwesomeIcon icon={faPlus} /></button>
                                                    </div>
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
        </div>
    )
}

export default Food
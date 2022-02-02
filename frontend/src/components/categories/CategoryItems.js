import React from "react";
import { useDispatch } from "react-redux";

import { addUserCategories, removeUserCategories, removeAllUserCategories } from '../../reducers/categoryReducer'
import { setNotification } from '../../reducers/notifReducer'
import { initializeGifDuo } from '../../reducers/gifDuoReducer'
import { initializeGif } from '../../reducers/gifCompareReducer'

const CategoryItems = ({categories}) => {

    const dispatch = useDispatch()

    const handleCategory = (e, category, inUserCat) => {
        e.preventDefault()
        if (inUserCat) {
            dispatch(setNotification({message:`${category} removed`, style:'success'}))
            dispatch(removeUserCategories(category))
        } else {
            dispatch(setNotification({message:`${category} added`, style:'success'}))
            dispatch(addUserCategories(category))
        }
        dispatch(initializeGifDuo())
        dispatch(initializeGif())

    }

    const handleRemove = (e) => {
        e.preventDefault()
        dispatch(removeAllUserCategories())
        dispatch(setNotification({message:`all categories removed! Select one to continue`, style:'error'}))
    }

    return (
        <div>
            <div className="categoryItemsGlobal">
                {categories.categories.map(category => categories.userCategories.includes(category)? <button key={category} onClick={(e) => handleCategory(e,category, true)} className="categoryItemsButton categoryItemsButtonSelected">{category}</button> : <button key={category} onClick={(e) => handleCategory(e,category, false)} className="categoryItemsButton categoryItemsButtonNotSelected">{category}</button> )}
            </div>
            {categories.userCategories.length > 0 && <button onClick={(e) => handleRemove(e)} className="removeCatButton">unselect all categories</button>}
        </div>
    )
}

export default CategoryItems
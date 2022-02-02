import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { changeCategory } from "../../reducers/categoryReducer";
import { initializeGif } from '../../reducers/gifCompareReducer'


const CategoriesSelect = ({categories}) => {

    const dispatch = useDispatch()

    const [currentCategory, setCurrentCategory] = useState(categories.userCategory)

    const handleCategory = (e) => {
        let newCat = e.target.value
        setCurrentCategory(newCat)
        dispatch(changeCategory(newCat))
        dispatch(initializeGif(newCat))
    }

    return (
        <div className="categoryDiv">
            <p>change challenger gif's category</p>
            <select name="category" id="category" onChange={handleCategory} value={currentCategory}>
                {/* <option value='random'>Random</option> */}
                { categories.categories.map(category => <option key={category} value={category}>{category}</option> )}
            </select>        
        </div> 
    )
}

export default CategoriesSelect
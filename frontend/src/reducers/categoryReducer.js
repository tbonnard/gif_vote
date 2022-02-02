const categories = [
    "The Office",
    "brooklyn nine nine",
    "Superstore",
    "Ted Lasso",
    "Family Guy",
    "Parks and Recreation",
    "Community",
    "New Girl", 
    "Friends",
    "30 Rock",
    "Unbreakable Kimmy Schmidt",
    "Scrubs"
]

const randomCategoryNumber = Math.floor(Math.random()*categories.length)

export const changeCategory = (category) => {
    return {
        type: 'CHANGE_CAT',
        data: category
      }
}

export const addUserCategories = (category) => {
        return {
            type: 'ADD_USER_CATS',
            data: category
          }

}

export const removeUserCategories = (category) => {
    return {
        type: 'REMOVE_USER_CATS',
        data: category
      }
}

export const removeAllUserCategories = () => {
    return {
        type: 'REMOVE_ALL_USER_CATS',
        data: []
      }
}

const categoryReducer = (state={categories:categories, userCategory: categories[randomCategoryNumber], userCategories:categories }, action) => {
    switch(action.type) {
        case "CHANGE_CAT":
            let userCategory = action.data
            return {...state, userCategory}
        case "ADD_USER_CATS":
            let userCategoriesAdd = [...state.userCategories]
            userCategoriesAdd.push(action.data)
            return {...state, userCategories:userCategoriesAdd}
        case "REMOVE_USER_CATS":
            let userCategoriesRem = [...state.userCategories]
            const index = userCategoriesRem.indexOf(action.data)
            if (index > -1) {
                userCategoriesRem.splice(index, 1);
            }
            return {...state, userCategories:userCategoriesRem}
        case "REMOVE_ALL_USER_CATS":
            return {...state, userCategories:action.data}
        default:
            return state
    }

}

export default categoryReducer
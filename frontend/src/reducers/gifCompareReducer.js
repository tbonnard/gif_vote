import gifService from '../services/gifs'
import usersServices from '../services/users'
import votesGifService from '../services/votesGif'

import { initGetUserFame } from './fameReducer'

import store from '../store'

export const initializeGif = () => {
  const category = store.getState().category.userCategories
  const randomCategoryNumber1 = Math.floor(Math.random()*category.length)
  const randomCategoryNumber2 = Math.floor(Math.random()*category.length)
    return async dispatch => {
      let gif1;
      let gif2;
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedGifAppUser')
        if (loggedUserJSON) {
          const user = await JSON.parse(loggedUserJSON)
          const currentGifId = await usersServices.getCurrentGifId(user.token)
          if (currentGifId) {
            gif1 = await gifService.getSpecificGif(currentGifId)
            gif2 = await gifService.getRandomGif(category[randomCategoryNumber2])
          } else {
            gif1 = await gifService.getRandomGif(category[randomCategoryNumber1])
            gif2 = await gifService.getRandomGif(category[randomCategoryNumber2])
        } 
      } else {
        gif1 = await gifService.getRandomGif(category[randomCategoryNumber1])
        gif2 = await gifService.getRandomGif(category[randomCategoryNumber2])
      } 
    }
      catch(exception) {
        console.log(exception)
      }
      dispatch({
        type: 'INIT_GIF',
        data: {gif1, gif2}
      })
    }
  }

  export const voteGif= (gif) => {
    const category = store.getState().category.userCategories
    const randomCategoryNumber1 = Math.floor(Math.random()*category.length)
    return async dispatch => {
      const objectVotedDetails = {gifVotedId:gif.data.id, gifUrl:gif.data.embed_url}
      await votesGifService.voteGif(objectVotedDetails)
      const newGif = await gifService.getRandomGif(category[randomCategoryNumber1])
      dispatch(initGetUserFame())
      dispatch({
        type: 'GIF_VOTED',
        data: {gif1:gif, gif2:newGif}
      })
    }
}

const gifCompareReducer = (state=[], action) => {
 switch(action.type) {
     case "INIT_GIF":
         return action.data
      case "GIF_VOTED":
          return action.data
    default:
        return state
 }
}

export default gifCompareReducer
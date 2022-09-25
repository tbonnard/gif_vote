import gifService from '../services/gifs'
import votesGifService from '../services/votesGif'

import store from '../store'

export const initializeGifDuo = () => {
  const category = store.getState().category.userCategories
  const randomCategoryNumber1 = Math.floor(Math.random()*category.length)
  const randomCategoryNumber2 = Math.floor(Math.random()*category.length)
    return async dispatch => {
      let gif1;
      let gif2;
      try {
        gif1 = await gifService.getRandomGif(category[randomCategoryNumber1])
        gif2 = await gifService.getRandomGif(category[randomCategoryNumber2])
    }
      catch(exception) {
        console.log(exception)
      }
      dispatch({
        type: 'INIT_GIF_DUO',
        data: {gifs:{gif1, gif2}, categories1:category[randomCategoryNumber1], categories2:category[randomCategoryNumber2]}
      })
    }
  }

  export const voteGif= (gif, category) => {
    return async dispatch => {
      const loggedUserJSON = window.localStorage.getItem('loggedGifAppUser')
      let token = null
      if (loggedUserJSON) {
        const user = await JSON.parse(loggedUserJSON)
        token = user.token
      }
      const objectVotedDetails = {gifVotedId:gif.data.id, gifUrl:gif.data.embed_url, gifCategory:category}
      await votesGifService.voteDuoGif(objectVotedDetails, token)
      dispatch(initializeGifDuo())
    }
}

const gifDuoReducer = (state=null, action) => {
 switch(action.type) {
     case "INIT_GIF_DUO":
         return action.data
    default:
        return state
 }
}

export default gifDuoReducer
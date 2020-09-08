import config from '../config'
import TokenService from './token-service'

const BlackjackApiService = {
  getGames() {
    return fetch(`${config.API_ENDPOINT}/game`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        "Content-Type": "application/json"
      }
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      )
      
    },
    getGame(gameId) {
    return fetch(`${config.API_ENDPOINT}/game/${gameId}`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postGame() {
    return fetch(`${config.API_ENDPOINT}/game`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        bank:500,
        wins:0,
        losses:0,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  deleteGame(gameId) {
    return fetch(`${config.API_ENDPOINT}/game/${gameId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
    }
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      console.log({ data })
    })
    .catch(error => {
      console.log(error)
    })
  })
}
}

export default BlackjackApiService

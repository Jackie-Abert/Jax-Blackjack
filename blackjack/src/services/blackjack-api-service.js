import config from '../config'
import TokenService from './token-service'

const BlackjackApiService = {
  getGames() {
    return fetch(`${config.API_ENDPOINT}/game`, {
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
  postGame(gameId, bank, wins, losses, moneytotal) {
    return fetch(`${config.API_ENDPOINT}/game`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        game_id: gameId,
        bank:bank,
        wins:wins,
        losses:losses,
        moneytotal:moneytotal
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default BlackjackApiService

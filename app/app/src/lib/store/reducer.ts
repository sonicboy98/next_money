import { State, Action } from '../interfaces'

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return {
        ...state,
        USER_ID: action.changeState.USER_ID,
        PASSWORD:action.changeState.PASSWORD,
        EMAIL:action.changeState.EMAIL,
        CREATE_DATE:action.changeState.CREATE_DATE,
      }
    case 'GET_LOGIN':
      return state
    default:
      return state
  }
}
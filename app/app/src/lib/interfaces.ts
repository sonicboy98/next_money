export type State = {
    USER_ID: string;
    EMAIL:string;
    EXPENSES_KEY:string;
    EXPENSES_NAME:string;
  }
  export type Action = { type: 'SET_LOGIN', changeState:State } | { type: 'GET_LOGIN' }
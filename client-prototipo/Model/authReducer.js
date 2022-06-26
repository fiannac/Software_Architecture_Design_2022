import { useDispatch } from 'react-redux';
import {state} from '../App';

var INITIAL_STATE = {
  connected: false,
  logged: false,
  authError: false,
  usr: '',
  psw: ''
};

const connectionState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CONNECTION':
        return {
          ...state,
          connected: true
        }
    case 'LOGIN':
        return{
          ...state,
          logged: action.payload.logged
        }
    case 'SETCREDETIALS':
      return{
        ...state,
        usr : action.payload.usr,
        psw : action.payload.psw
      }
    default :
        return state;
  }
};


const setConnect = () => {
    state.dispatch({type: 'CONNECTION'});
};

const setLogin = (logged) => {
  state.dispatch({type: 'LOGIN', payload : {logged:logged}});
};

const setCredentials = (usr, psw) => {
  state.dispatch({type: 'SETCREDENTIALS', payload : {usr:usr, psw:psw}})
}

export{
    setConnect, connectionState, setLogin, setCredentials
}
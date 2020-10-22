import {SIGNIN, SIGNUP, SIGNOUT} from './types';

export const Signup = (payload) => ({type: SIGNUP, payload});
export const Signin = (payload) => ({type: SIGNIN, payload});
export const Signout = () => ({type: SIGNOUT});

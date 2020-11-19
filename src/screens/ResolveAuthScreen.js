import {useEffect, useContext} from 'react';
import {Context as AuthContext} from '../contexts/AuthContext';

const ResolveAuthScreen = () => {
  const {tryLocalSignin} = useContext(AuthContext);
  const {socialAuth} = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  });

  return null;
};

export default ResolveAuthScreen;

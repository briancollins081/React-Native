import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { loginUser } from '../utils/auth';

function LoginScreen() {
  const authContext = useContext(AuthContext)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const loginHandler = async ({ email, password }) => {
    try {
      setIsAuthenticating(true)
      const { token } = await loginUser(email, password)
      // console.log(token);
      authContext.authenticate(token)
    } catch (error) {
      console.log(error);
      Alert.alert("Authentication failed!", "Please confirm your email or password or try again later!")
      setIsAuthenticating(false)
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in, please wait..." />
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;

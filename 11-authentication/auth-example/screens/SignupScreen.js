import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../utils/auth';

function SignupScreen() {
  const authContext = useContext(AuthContext)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const signUpHandler = async ({ email, password }) => {
    try {
      setIsAuthenticating(true)
      const { token } = await createUser(email, password)
      // console.log(token);
      authContext.authenticate(token)
    } catch (error) {
      Alert.alert("Authentication failed!", "Please confirm your input or try again later!")
      console.log(error);
      setIsAuthenticating(false)
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Signing up, please wait..." />
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;

import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, gitProvider } from '../../config/firebase';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import { RootState } from '../../store';

export const GitSignin = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      dispatch(setUser(currentUser));
    });

    return () => unsubscribe(); // Cleanup listener
  }, [dispatch]);

  const githubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, gitProvider);
      dispatch(setUser(result.user));
    } catch (error) {
      console.log(error);
    }
  };

  const githubLogout = async () => {
    try {
      await auth.signOut();
      dispatch(setUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user ? JSON.stringify(user) : null}
      <button onClick={githubLogin}>Login with GitHub</button>
      <button onClick={githubLogout}>Logout</button>
    </>
  );
};

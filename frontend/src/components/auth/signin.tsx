import { onAuthStateChanged, signInWithPopup, User } from 'firebase/auth';
import { auth, gitProvider } from '../../config/firebase';
import { useEffect, useState } from 'react';

export const GitSignin = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log(currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const githubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, gitProvider);
      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const githubLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {JSON.stringify(user)}
      <button onClick={githubLogin}>Login with GitHub</button>
      <button onClick={githubLogout}>Logout</button>
    </>
  );
};

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const login = async (email, password, setIsLoggedIn, setIsAdmin) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    setIsLoggedIn(true);
    setIsAdmin(user?.email === 'admin@gmail.com'); // Check if user is admin

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('isAdmin'); // Clear admin status on logout
  } catch (error) {
    throw new Error(error.message);
  }
};

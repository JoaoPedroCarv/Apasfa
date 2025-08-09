
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBKawQpKl7r-LW4zCbRDnVuP9zK_46ryHM",
  authDomain: "apasfa-8f382.firebaseapp.com",
  projectId: "apasfa-8f382",
  storageBucket: "apasfa-8f382.appspot.com",
  messagingSenderId: "968759771614",
  appId: "1:968759771614:web:be3b8fd5294a9f21da5d4f"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// Configure CORS headers for storage
if (typeof window !== 'undefined') {
  // Only run in browser environment
  storage._config = {
    ...storage._config,
    customHeaders: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  };
}

export { auth, db, storage };
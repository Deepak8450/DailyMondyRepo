import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy 
} from "firebase/firestore"; 

const firebaseConfig = {
        apiKey: "AIzaSyB1O9KsHrpIrTc91B4RHzw8M2jh2RtQFvk",
        authDomain: "dailymandi-3e802.firebaseapp.com",
        projectId: "dailymandi-3e802",
        storageBucket: "dailymandi-3e802.firebasestorage.app",
        messagingSenderId: "638948866882",
        appId: "1:638948866882:web:d2cadaff14e74615e8e6db"
      
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app); // Initialize Firestore

// Export Firestore instance
export { db, collection, addDoc, getDocs, query, orderBy };
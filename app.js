// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore, addDoc, collection, serverTimestamp, getDocs } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5qCAvZjQWN0H-gsKlvwhKoCb3OzZ24NA",
  authDomain: "assignment-22-auth-firestore.firebaseapp.com",
  projectId: "assignment-22-auth-firestore",
  storageBucket: "assignment-22-auth-firestore.firebasestorage.app",
  messagingSenderId: "101072033315",
  appId: "1:101072033315:web:aa0bb501757680afb2c396"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const collectionRef = collection(db, "users")

const form = document.getElementById("signUpForm")
const email = document.getElementById("email")
const password = document.getElementById("password")
const signUpBtn = document.getElementById("signUpBtn")
const signinBtn = document.getElementById("signInBtn")
const googleBtn = document.getElementById("GoogleBtn")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let emailVal = email.value;
    let passwordVal = password.value;

    createUserWithEmailAndPassword(auth, emailVal, passwordVal).then(() =>{
        alert("Account Created");

        const obj = {
            email: emailVal,
            userId: auth.currentUser.uid,
            createdAt: serverTimestamp()
        }

        addDoc(collectionRef, obj).then(() => {
            console.log("Document added");
        })
        .catch((err) => {
            console.log(err);
        });

    }).catch((err) =>{
        console.log(err)
    })
})

signinBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let emailVal = email.value;
    let passwordVal = password.value;

    signInWithEmailAndPassword(auth, emailVal, passwordVal).then(() =>{
        alert("Sign in successfuly");

        const obj = {
            email: emailVal,
            userId: auth.currentUser.uid,
            createdAt: serverTimestamp()
        }

        addDoc(collectionRef, obj).then(() => {
            console.log("Document added");
        })
        .catch((err) => {
            console.log(err);
        });

    }).catch((err) =>{
        console.log(err)
    })
})

googleBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;

            const obj = {
                email: user.email,
                userId: user.uid,
                createdAt: serverTimestamp()
            }

            addDoc(collectionRef, obj).then(() => {
                console.log("Document added");
            }).catch((err) => {
                console.log(err);
            });

        }).catch((err) => {
            console.log(err);
        });
})

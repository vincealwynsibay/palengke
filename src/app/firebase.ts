// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDm7xZvrLcUyff8Bx1Cak8X21eP85xeaME",
	authDomain: "palengke-f8e59.firebaseapp.com",
	projectId: "palengke-f8e59",
	storageBucket: "palengke-f8e59.appspot.com",
	messagingSenderId: "445726134",
	appId: "1:445726134:web:edbf3986c7ac7fa31e9517",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

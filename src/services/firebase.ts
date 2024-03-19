import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore, query, orderBy, limit, where, DocumentData, QueryDocumentSnapshot, Query, doc, getDoc, DocumentSnapshot } from "firebase/firestore";
import { Projects } from "../models/projectInfoType";

const firebaseConfig = {
    apiKey: "AIzaSyBnusPSe0_c4212JAXPjEyIH51GyRwEf7M",
    authDomain: "hasancandev-aa791.firebaseapp.com",
    databaseURL: "https://hasancandev-aa791-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hasancandev-aa791",
    storageBucket: "hasancandev-aa791.appspot.com",
    messagingSenderId: "639302079927",
    appId: "1:639302079927:web:7311b6325ab783ac268432",
    measurementId: "G-7R2SHBH7KE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fetchData = async (type?: number, queryLimit?: number): Promise<QueryDocumentSnapshot<Projects, DocumentData>[]> => {
    let queryBuilder: Query<DocumentData> | undefined;

    if (type !== undefined) {
        if (queryLimit !== undefined) {
            queryBuilder = query(collection(db, "projects"), where("type", "==", type), orderBy("name"), limit(queryLimit));
        } else {
            queryBuilder = query(collection(db, "projects"), where("type", "==", type), orderBy("name"));
        }
    }

    if (queryBuilder) {
        const fetchQuery = query(queryBuilder);
        const querySnapshot = await getDocs(fetchQuery);
        return querySnapshot.docs as QueryDocumentSnapshot<Projects, DocumentData>[];
    } else {
        // Handle the case when queryBuilder is not defined
        return [];
    }
};

async function fetchById(id: string): Promise<Projects | null> {
    if (!id) {
        return null;
    }

    try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const projectData = docSnap.data() as Projects;
            return projectData;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching project by ID:", error);
        return null;
    }
}

async function fetchAboutData(): Promise< DocumentData | null> {
    try {
        const docRef = doc(db, "about", "KZek6J2rrpd84XDSldpy");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const aboutData = docSnap.data();
            return aboutData;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching about by ID:", error);
        return null;
    }
}

export { fetchData, fetchById, fetchAboutData };

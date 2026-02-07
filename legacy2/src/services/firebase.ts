import { initializeApp } from "firebase/app";
import { DocumentData, Query, QueryDocumentSnapshot, collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore";
import { Projects } from "../models/projectInfoType";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
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

async function fetchAboutData(): Promise<DocumentData | null> {
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

export { fetchAboutData, fetchById, fetchData };


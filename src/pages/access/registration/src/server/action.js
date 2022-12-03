import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import db from "../../../../../util/firebase";

const action = async ({ request }) => {
    // establish db connection
    // eslint-disable-next-line no-unused-vars
    const usersRef = collection(db, "users");
    const form = await request.formData();

    try {
        // check if user already exists
        const q = query(
            usersRef,
            where("email", "==", form.get("saved-email"))
        );
        const users = await getDocs(q);

        if (!users.empty) {
            return {
                formError: "An account with this email already exists.",
            };
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);

        return {
            formError: "An error occurred while registering. Please try again.",
        };
    }

    // setup hashing for password
    const salt = await bcrypt.genSalt(10);

    // get user information
    const user = {
        id: uuid(),
        fullName: form.get("fullName"),
        email: form.get("saved-email"),
        password: await bcrypt.hash(form.get("saved-password"), salt),
    };

    try {
        // add user to db
        await setDoc(doc(db, "users", user.id), user);

        // commit user to session
        sessionStorage.setItem("user", user.id);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        return {
            formError: "An error occurred while registering. Please try again.",
        };
    }

    return {
        status: 200,
    };
};

export default action;

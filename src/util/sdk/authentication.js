import {
    query,
    getDocs,
    collection,
    where,
    setDoc,
    doc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import db from "../firebase";

/**
 * Given a user object, this function will create a user in the database and
 * commit the user id to the session. This object should then return an action
 * data object.
 *
 * @param {Object} user object describing user
 * @example
 * user {
 *    email: string
 *    fullName: string
 *    password: string
 * }
 * @returns {Object} action data object
 * @example
 * actionData {
 *    status: number
 *    formError: string // optional
 * }
 */
export const register = async (user) => {
    // establish connection to user
    const usersRef = collection(db, "users");

    try {
        // check if user already exists
        const q = query(usersRef, where("email", "==", user.email));
        const users = await getDocs(q);

        if (!users.empty) {
            return {
                status: 403, // forbidden operation
                formError: "An account with this email already exists.",
            };
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);

        return {
            status: 500, // internal server error
            formError: "An error occurred while registering. Please try again.",
        };
    }

    // setup hashing for password
    const salt = await bcrypt.genSalt(10);

    // collect data to store in db
    const storedUser = {
        id: uuid(),
        fullName: user.fullName,
        email: user.email,
        password: await bcrypt.hash(user.password, salt),
    };

    try {
        // add user to db
        await setDoc(doc(db, "users", storedUser.id), storedUser);

        // commit user to session
        localStorage.setItem("user", storedUser.id);

        // success
        return {
            status: 200, // success
        };
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);

        return {
            status: 500, // internal server error
            formError: "An error occurred while registering. Please try again.",
        };
    }
};

/**
 * This function will attempt to log a user in. If successful, it will commit
 * the user id to the session. This function should then return an action data
 * object.
 *
 * @param {Object} user object describing user
 * @example
 * user {
 *    email: string
 *    password: string
 * }
 * @returns {Object} action data object
 * @example
 * actionData {
 *    status: number
 *    formError: string // optional
 * }
 */
export const login = async (user) => {
    // check if user exists
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", user.email));

    try {
        // get the user
        const users = await getDocs(q);
        let retrievedUser;

        users.forEach((userDoc) => {
            retrievedUser = userDoc.data();
        });

        // check if user exists
        if (retrievedUser) {
            // check if password is correct
            const isPasswordCorrect = await bcrypt.compare(
                user.password,
                retrievedUser.password
            );

            // commit user to session
            if (isPasswordCorrect) {
                localStorage.setItem("user", retrievedUser.id);

                return {
                    status: 200,
                };
            }
        }

        return {
            formError: "Invalid email or password.",
        };
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);

        return {
            status: 500, // internal server error
            formError: "An error occurred while logging in. Please try again.",
        };
    }
};

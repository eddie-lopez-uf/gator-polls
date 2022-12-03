import { query, collection, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import db from "../../../../../util/firebase";

const action = async ({ request }) => {
    // extract for mdata
    const form = await request.formData();
    const email = form.get("saved-email");
    const password = form.get("saved-password");

    const q = query(collection(db, "users"), where("email", "==", email));

    // check if user exists
    try {
        // get the user
        const users = await getDocs(q);
        let user;

        users.forEach((doc) => {
            user = doc.data();
        });

        // check if user exists
        if (user) {
            // check if password is correct
            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            );

            if (isPasswordCorrect) {
                // commit user to session
                sessionStorage.setItem("user", user.id);

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
            formError: "An error occurred while logging in. Please try again.",
        };
    }
};

export default action;

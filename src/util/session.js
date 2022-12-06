import { redirect } from "react-router-dom";

/**
 * Check if session exists, otherwise redirect to login page. Will
 * return user id if session exists.
 *
 * @returns {string} the user id stored in the session
 */
// eslint-disable-next-line import/prefer-default-export
export const requireSession = () => {
    // get id from user session
    const userId = localStorage.getItem("user");

    // redirect if sesion hasn't been set
    if (!userId) {
        return redirect("/access/login");
    }

    return userId;
};

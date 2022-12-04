import {
    getDoc,
    doc,
    setDoc,
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { redirect } from "react-router-dom";
import { requireSession } from "../session";
import db from "../firebase";

export default class User {
    /** User id */
    id;

    /** User full name */
    fullName;

    /** User email */
    email;

    /** Initials */
    initials;

    /** Password */
    password;

    /** User upvotes */
    upvotes;

    /** User downvotes */
    downvotes;

    constructor(userData) {
        this.fullName = userData.fullName;
        this.email = userData.email;
        this.id = userData.id;
        this.upvotes = userData.upvotes ?? [];
        this.downvotes = userData.downvotes ?? [];
        this.password = userData.password;

        // get initials from full name
        const nameParts = this.fullName.split(" ");
        this.initials = nameParts
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    }

    /**
     * This function will return a user object from the session. If the user is not
     * logged in, it will redirect to the login page. If the user does not exist in
     * the database, it will redirect to the login page.
     *
     * @returns {Promise<User>} gets user from session
     */
    static fromSession = async () => {
        const userId = requireSession();

        // get user ref
        const usersRef = doc(db, "users", userId);

        // get user doc
        const userDoc = await getDoc(usersRef);

        // if the user is deleted, redirect to login
        if (!userDoc.exists()) {
            throw redirect("/access/logout");
        }

        // return user
        return new User(userDoc.data());
    };

    /**
     * Gets all users from the database that match the given array of ids
     *
     * @param {Array} userIds an array of user ids
     * @returns User array
     */
    static getIn = async (userIds) => {
        if (!userIds.length) return [];

        // establish connection to users collection
        const usersRef = collection(db, "users");

        // get users
        try {
            const q = query(usersRef, where("id", "in", userIds));
            const usersDoc = await getDocs(q);

            const users = [];
            usersDoc.forEach((user) => users.push(new User(user.data())));

            // return users
            return users;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);

            // return empty array
            throw new Error("Failed to get users.");
        }
    };

    /**
     * Updates the user's upvotes
     *
     * @param {String} pollId id of poll to be upvoted
     * @returns {Promise<void>} upvotes a poll
     */
    updateUpvotes = async (pollId) => {
        // get user ref
        const usersRef = doc(db, "users", this.id);

        // add poll to user's upvotes
        if (!this.upvotes) this.upvotes = [];

        // check if user upvoted
        if (this.upvotes.includes(pollId)) return;

        // check if user upvoted
        if (this?.downvotes?.includes(pollId)) {
            // remove user from downvotes
            this.downvotes = this?.downvotes?.filter(
                (downvote) => downvote !== pollId
            );
        }

        this.upvotes.push(pollId);

        // set user upvotes
        try {
            await setDoc(usersRef, {
                upvotes: this.upvotes,
                downvotes: this.downvotes ?? [],
                id: this.id,
                fullName: this.fullName,
                email: this.email,
                password: this.password,
            });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);

            throw new Error("Failed to update user upvotes.");
        }
    };

    /**
     * Updates the user's downvotes
     * @param {String} pollId id of poll to be downvoted
     * @returns {Promise<void>} downvotes a poll
     */
    updateDownvotes = async (pollId) => {
        // get user ref
        const usersRef = doc(db, "users", this.id);

        // add poll to user's downvotes
        if (!this.downvotes) this.downvotes = [];

        // check if user downvoted
        if (this.downvotes.includes(pollId)) return;

        // check if user upvoted
        if (this?.upvotes?.includes(pollId)) {
            // remove user from upvotes
            this.upvotes = this?.upvotes?.filter((upvote) => upvote !== pollId);
        }

        this.downvotes.push(pollId);

        // set user downvotes
        try {
            await setDoc(usersRef, {
                upvotes: this.upvotes ?? [],
                downvotes: this.downvotes,
                id: this.id,
                fullName: this.fullName,
                email: this.email,
                password: this.password,
            });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);

            throw new Error("Failed to update user downvotes.");
        }
    };
}

import { v4 as uuid } from "uuid";
import {
    doc,
    setDoc,
    collection,
    getDocs,
    where,
    query,
    getDoc,
} from "firebase/firestore";
import db from "../firebase";
import User from "./user";

export default class Poll {
    /** Poll id */
    id;

    /** Poll title */
    title;

    /** Poll content */
    content;

    /** Poll author */
    author;

    /** Poll date */
    date;

    /** Poll upvotes */
    upvotes;

    /** Poll downvotes */
    downvotes;

    constructor(pollData) {
        this.title = pollData.title;
        this.content = pollData.content;
        this.author = pollData.author;
        this.date = pollData.date;
        this.upvotes = pollData.upvotes ?? [];
        this.downvotes = pollData.downvotes ?? [];
    }

    static create = async (poll) => {
        // validate poll content
        if (!poll?.title?.length) throw new Error("Poll must have a title.");
        if (!poll?.content?.length) throw new Error("Poll must have content.");

        // generate post id
        const pollSchema = {
            id: uuid(),
            title: poll.title,
            content: poll.content,
            author: poll.author,
            authorEmail: poll.authorEmail,
            date: new Date(),
            upvotes: [],
            downvotes: [],
        };

        // create poll
        await setDoc(doc(db, "polls", pollSchema.id), pollSchema);
    };

    /**
     * If a user ID is provided, all polls created by that user will be returned. Otherwise
     * all polls will be returned indescriminately.
     *
     * @param {String} userId optional user id
     * @returns all applicable polls
     */
    static getAll = async (userId = "") => {
        // establish the collection we are pulling from
        const pollsRef = collection(db, "polls");

        // set poll docs
        try {
            let pollDocs;
            if (userId?.length) {
                // if user id is provided, get polls by user id
                const userDoc = await getDoc(doc(db, "users", userId));
                const user = userDoc.data();

                const q = query(
                    pollsRef,
                    where("authorEmail", "==", user.email)
                );
                pollDocs = await getDocs(q);
            } else {
                // otherwise, get all polls indescriminately
                pollDocs = await getDocs(pollsRef);
            }

            const polls = [];
            pollDocs.forEach((pollDoc) => {
                polls.push(pollDoc.data());
            });

            return polls;
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);

            throw new Error("Failed to get polls.");
        }
    };

    /**
     * Get a poll by its ID.
     * @param {String} pollId poll id
     */
    static upvote = async (pollId) => {
        // get current user by id
        const user = await User.fromSession();

        // establish the poll we want to retrieve
        const pollDoc = doc(db, "polls", pollId);

        // get poll data
        try {
            const pollData = await getDoc(pollDoc);
            const poll = pollData.data();

            // check if user upvoted
            if (poll.upvotes.includes(user.id)) return;

            // check if user downvoted
            if (poll.downvotes.includes(user.id)) {
                // remove user from downvotes
                poll.downvotes = poll.downvotes.filter(
                    (downvote) => downvote !== user.id
                );
            }

            // add user to upvotes
            poll.upvotes.push(user.id);

            // update poll
            await setDoc(pollDoc, poll);
            await user.updateUpvotes(pollId);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);

            throw new Error("Failed to upvote poll.");
        }
    };

    /**
     * Downvote a poll.
     * @param {String} pollId poll id
     */
    static downvote = async (pollId) => {
        // get current user by id
        const user = await User.fromSession();

        // establish the poll we want to retrieve
        const pollDoc = doc(db, "polls", pollId);

        // get poll data
        try {
            const pollData = await getDoc(pollDoc);
            const poll = pollData.data();

            // check if user downvoted
            if (poll.downvotes.includes(user.id)) return;

            // check if user upvoted
            if (poll.upvotes.includes(user.id)) {
                // remove user from upvotes
                poll.upvotes = poll.upvotes.filter(
                    (upvote) => upvote !== user.id
                );
            }

            // add user to downvotes
            poll.downvotes.push(user.id);

            // update poll
            await setDoc(pollDoc, poll);
            await user.updateDownvotes(pollId);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);

            throw new Error("Failed to downvote poll.");
        }
    };
}

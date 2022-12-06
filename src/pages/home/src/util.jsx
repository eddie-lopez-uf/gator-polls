import React from "react";
import PollModule from "../polls/poll/src/components/PollModule";

export const applySearch = (data, polls) => {
    const search = data?.search?.toLowerCase();
    const filter = data?.filter?.toLowerCase();

    let filtered = polls;
    if (search?.length || (filter?.length && filter !== "none")) {
        filtered = polls.filter((poll) => {
            if (!search?.length && !filter?.length) return true;
            let match = false;

            // filter text
            if (search?.length) {
                const title = poll?.title?.toLowerCase();
                const description = poll?.description?.toLowerCase();
                const author = poll?.author?.toLowerCase();

                match =
                    title?.includes(search) ||
                    description?.includes(search) ||
                    author?.includes(search);
            }

            // filter by filter
            if (filter?.length || filter !== "none") {
                if (filter === "upvoted")
                    match =
                        match ||
                        (poll?.upvotes?.length ?? 0) >
                            (poll?.downvotes?.length ?? 0);
                else if (filter === "downvoted")
                    match =
                        match ||
                        (poll?.downvotes?.length ?? 0) >
                            (poll?.upvotes?.length ?? 0);
            }

            return match;
        });
    }

    // sort the filtered polls
    if (data.sortDir === "asc") {
        filtered.sort((a, b) => {
            if (data.sort === "newest") {
                const aDate = new Date(a.createdAt);
                const bDate = new Date(b.createdAt);
                return aDate.getTime() - bDate.getTime();
            }
            if (data.sort === "upvotes")
                return a.upvotes.length - b.upvotes.length;
            if (data.sort === "downvotes")
                return a.downvotes.length - b.downvotes.length;
            return (
                a.downvotes.length +
                a.upvotes.length -
                (b.downvotes.length + b.upvotes.length)
            );
        });
    } else {
        filtered.sort((a, b) => {
            if (data.sort === "newest") {
                const aDate = new Date(a.createdAt);
                const bDate = new Date(b.createdAt);
                return bDate.getTime() - aDate.getTime();
            }
            if (data.sort === "upvotes")
                return b.upvotes.length - a.upvotes.length;
            if (data.sort === "downvotes")
                return b.downvotes.length - a.downvotes.length;
            return (
                b.downvotes.length +
                b.upvotes.length -
                (a.downvotes.length + a.upvotes.length)
            );
        });
    }

    return filtered;
};

/**
 * Renders all polls into feed
 *
 * @param {Array} polls array of poll objects
 * @param {Boolean} isYours boolean determineing whether the polls are belonging to the user
 * @returns All polls
 */
export const renderAllPolls = (polls, isYours = false) => {
    // remove these lines when done implementing :)

    return polls.map((poll) => (
        <PollModule poll={poll} isYours={isYours} key={poll.id} />
    ));
};

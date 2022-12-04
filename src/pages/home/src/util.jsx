import React from "react";
import PollModule from "../polls/poll/src/components/PollModule";

export const applySearch = (data, polls) => {
    const search = data?.search?.toLowerCase();
    const filter = data?.filter?.toLowerCase();

    let filtered = polls;
    if (search?.length || filter?.length) {
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
            if (filter?.length) {
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
                else match = match || true;
            }

            return match;
        });
    }

    // sort the filtered polls
    if (data.sortDir === "asc") {
        filtered.sort((a, b) => {
            if (data.sort === "newest") return a.createdAt - b.createdAt;
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
            if (data.sort === "newest") return b.createdAt - a.createdAt;
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

export const renderAllPolls = (polls) => {
    console.log(polls);
    return polls?.map((poll) => {
        return <PollModule key={poll.id} poll={poll} />;
    });
};

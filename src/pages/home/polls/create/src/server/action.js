import { redirect } from "react-router-dom";
import Poll from "../../../../../../util/sdk/poll";

const action = async ({ request }) => {
    const form = await request.formData();

    // extract poll data from form
    const poll = {
        title: form.get("title"),
        content: form.get("content"),
        author: form.get("author"),
        authorEmail: form.get("authorEmail"),
    };

    try {
        await Poll.create(poll);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);

        const titleError = err?.message?.includes("title")
            ? err.message
            : undefined;
        const contentError = err?.message?.includes("content")
            ? err.message
            : undefined;
        const formError = titleError || contentError ? undefined : err.message;

        return {
            status: 400, // bad request
            formError,
            fieldErrors: {
                title: titleError,
                content: contentError,
            },
        };
    }

    throw redirect("/polls/your");
};

export default action;

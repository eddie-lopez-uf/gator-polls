import Poll from "../../../../../../util/sdk/poll";

const loader = async ({ params }) => {
    // extract the poll id from the params
    const { pollId } = params;

    // get the poll
    try {
        const poll = await Poll.get(pollId);
        return {
            status: 200, // success
            poll,
        };
    } catch (err) {
        const error = err?.message;
        const status = error.includes("not found") ? 404 : 500;

        return {
            status,
            formError: error,
        };
    }
};

export default loader;

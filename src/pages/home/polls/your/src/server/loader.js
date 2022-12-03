import { requireSession } from "../../../../../../util/session";
import Poll from "../../../../../../util/sdk/poll";

const loader = async ({ request }) => {
    const userId = requireSession(request);

    // get polls
    try {
        const polls = await Poll.getAll(userId);

        return {
            status: 200, // success
            polls,
        };
    } catch (error) {
        return {
            status: 500, // internal server error
            error: error.message,
        };
    }
};

export default loader;

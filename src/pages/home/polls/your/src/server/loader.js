import { requireSession } from "../../../../../../util/session";
import Poll from "../../../../../../util/sdk/poll";
import { applySearch } from "../../../../src/util";

const loader = async ({ request }) => {
    const userId = requireSession(request);
    const { searchParams } = new URL(request.url);

    // get search data if applicable
    const searchData = {
        search: searchParams.get("search"),
        filter: searchParams.get("filter"),
        sort: searchParams.get("sort"),
        sortDir: searchParams.get("sortDir"),
    };

    // get polls
    try {
        const polls = await Poll.getAll(userId);

        return {
            status: 200, // success
            polls: applySearch(searchData, polls),
        };
    } catch (error) {
        return {
            status: 500, // internal server error
            error: error.message,
        };
    }
};

export default loader;

import Poll from "../../../../../../util/sdk/poll";
import { applySearch } from "../../../../src/util";

const loader = async ({ request }) => {
    const { searchParams } = new URL(request.url);

    const searchData = {
        search: searchParams.get("search"),
        filter: searchParams.get("filter"),
        sort: searchParams.get("sort"),
        sortDir: searchParams.get("sortDir"),
    };

    const polls = await Poll.getAll();

    return {
        status: 200, // success
        polls: applySearch(searchData, polls),
    };
};

export default loader;

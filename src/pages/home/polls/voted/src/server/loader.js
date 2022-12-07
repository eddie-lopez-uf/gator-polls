import Poll from "../../../../../../util/sdk/poll";
import User from "../../../../../../util/sdk/user";
import { applySearch } from "../../../../src/util";

const loader = async ({ request }) => {
    const { searchParams } = new URL(request.url);
    const user = await User.fromSession();

    const searchData = {
        search: searchParams.get("search"),
        filter: searchParams.get("filter"),
        sort: searchParams.get("sort"),
        sortDir: searchParams.get("sortDir"),
    };

    const pollsToGet = [...user.upvotes, ...user.downvotes];

    let polls = [];
    if (pollsToGet?.length) {
        polls = await Poll.getIn([...user.upvotes, ...user.downvotes]);
    }

    return {
        status: 200, // success
        polls: applySearch(searchData, polls),
    };
};

export default loader;

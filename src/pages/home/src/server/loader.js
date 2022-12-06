import { redirect } from "react-router-dom";
import { requireSession } from "../../../../util/session";

const loader = async ({ request }) => {
    const url = new URL(request.url);

    requireSession();

    if (url.pathname === "/") {
        throw redirect("/polls/all");
    }
};

export default loader;

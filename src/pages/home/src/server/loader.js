import { redirect } from "react-router-dom";

const loader = async ({ request }) => {
    const url = new URL(request.url);
    if (url.pathname === "/") {
        throw redirect("/polls/all");
    }
};

export default loader;

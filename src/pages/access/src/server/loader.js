import { redirect } from "react-router-dom";

const accessLoader = ({ request }) => {
    const url = new URL(request.url);

    if (sessionStorage.getItem("user")) {
        throw redirect("/");
    }

    if (url.pathname === "/access") {
        throw redirect("/access/login");
    }

    return null;
};

export default accessLoader;

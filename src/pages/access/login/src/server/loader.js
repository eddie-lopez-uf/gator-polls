import { redirect } from "react-router-dom";

const loader = () => {
    if (localStorage.getItem("user")) {
        throw redirect("/");
    }

    return null;
};

export default loader;

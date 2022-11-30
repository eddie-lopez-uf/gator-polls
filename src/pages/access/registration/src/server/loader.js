import { redirect } from "react-router-dom";

const loader = () => {
    if (sessionStorage.getItem("user")) {
        throw redirect("/");
    }

    return null;
};

export default loader;

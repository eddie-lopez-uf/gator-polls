import { requireSession } from "../../../../../util/session";

const loader = () => {
    localStorage.removeItem("user");
    requireSession();
};

export default loader;

import { requireSession } from "../../../../../util/session";

const loader = () => {
    sessionStorage.removeItem("user");
    requireSession();
};

export default loader;

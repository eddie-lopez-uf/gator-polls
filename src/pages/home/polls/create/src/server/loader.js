import User from "../../../../../../util/sdk/user";

const loader = async () => {
    const user = await User.fromSession();

    return {
        user,
    };
};

export default loader;

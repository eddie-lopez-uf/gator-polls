import { register } from "../../../../../util/sdk/authentication";

const action = async ({ request }) => {
    // establish db connection
    const form = await request.formData();

    // get user information
    const user = {
        fullName: form.get("fullName"),
        email: form.get("saved-email"),
        password: form.get("saved-password"),
    };

    // attempt registration
    const actionData = register(user);

    return actionData;
};

export default action;

import { login } from "../../../../../util/sdk/authentication";

const action = async ({ request }) => {
    // extract for mdata
    const form = await request.formData();

    const user = {
        email: form.get("saved-email"),
        password: form.get("saved-password"),
    };

    // attempt login
    const actionData = await login(user);

    return actionData;
};

export default action;

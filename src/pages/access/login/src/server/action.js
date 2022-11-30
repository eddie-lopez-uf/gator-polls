const action = async ({ request }) => {
    const form = await request.formData();

    /* complete request to login on server */
    // eslint-disable-next-line no-console
    console.log(form.get("email"), form.get("password"));

    sessionStorage.setItem("user", "user-id123");

    return {
        status: 200,
    };
};

export default action;

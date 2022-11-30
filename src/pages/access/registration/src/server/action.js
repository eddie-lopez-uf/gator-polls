const action = async ({ request }) => {
    const form = await request.formData();

    /* complete request to register on server */
    // eslint-disable-next-line no-console
    console.log(form.get("email"), form.get("password"));

    // commit user to session
    sessionStorage.setItem("user", "user123");

    return {
        status: 200,
    };
};

export default action;

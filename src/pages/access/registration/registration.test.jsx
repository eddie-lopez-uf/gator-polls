import {
    getByLabelText,
    getByText,
    queryByText,
    render,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Form from "./src/components/Form";

describe("Registration Form", () => {
    it("should only accept ufl emails", () => {
        // given
        render(<Form />);
        const invalidEmail = "ejlopez00@gmail.com";
        const validEmail = "eduardo.lopez@ufl.edu";

        // when then
        const emailInput = getByLabelText(document.body, "Email");
        userEvent.type(emailInput, invalidEmail);
        expect(getByText(document.body, "Please input a valid ufl.edu email"));

        userEvent.clear(emailInput);
        userEvent.type(emailInput, validEmail);
        expect(
            queryByText(document.body, "Please input a valid ufl.edu email")
        ).not.toBeInTheDocument();
    });

    it("should only accept matching passwords", () => {
        // given
        render(<Form />);
        const mockPassword = "password";
        const confirmPassword = "password";

        // when then
        const passwordInput = getByLabelText(document.body, "Password");
        const confirmPasswordInput = getByLabelText(
            document.body,
            "Confirm Password"
        );
        userEvent.type(passwordInput, mockPassword);
        userEvent.type(confirmPasswordInput, confirmPassword);
        expect(
            queryByText(document.body, "Passwords must match")
        ).not.toBeInTheDocument();

        userEvent.clear(confirmPasswordInput);
        userEvent.type(confirmPasswordInput, "notpassword");
        expect(
            getByText(document.body, "Passwords must match")
        ).toBeInTheDocument();
    });

    it("should only accept passwords with at least 1 uppercase letter, 1 lowercase and 1 number", () => {
        // given
        render(<Form />);
        const mockPassword = "password";

        // when then
        const passwordInput = getByLabelText(document.body, "Password");
        userEvent.type(passwordInput, mockPassword);
        expect(
            getByText(
                document.body,
                "Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 number"
            )
        );

        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, "PASSWORD");
        expect(
            getByText(
                document.body,
                "Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 number"
            )
        );

        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, "Password");
        expect(
            getByText(
                document.body,
                "Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 number"
            )
        );

        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, "Password1");
        expect(
            queryByText(
                document.body,
                "Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 number"
            )
        ).not.toBeInTheDocument();
    });
});

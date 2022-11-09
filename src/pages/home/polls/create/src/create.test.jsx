import React from "react";
import {
    render,
    getByRole,
    getByText,
    getByLabelText,
    queryByText,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreatePoll from "./components/CreatePoll";

describe("Create Poll", () => {
    it("will not allow poll creation if text is empty", () => {
        // given
        render(<CreatePoll />);
        const submitButton = getByRole(document.body, "button");

        // when
        userEvent.click(submitButton);

        // then
        expect(
            getByText(document.body, "Title is required")
        ).toBeInTheDocument();
        expect(
            getByText(document.body, "Content is required")
        ).toBeInTheDocument();
    });

    it("will allow poll creation if text is not empty", () => {
        // given
        render(<CreatePoll />);
        const submitButton = getByRole(document.body, "button");
        const titleInput = getByLabelText(document.body, "Title");
        const contentInput = getByLabelText(document.body, "Description");

        // when
        userEvent.type(titleInput, "title");
        userEvent.type(contentInput, "content");
        userEvent.click(submitButton);

        // then
        expect(
            queryByText(document.body, "Title is required")
        ).not.toBeInTheDocument();
        expect(
            queryByText(document.body, "Content is required")
        ).not.toBeInTheDocument();
    });
});

import React from "react";
import { render, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Poll from "./components/PollModule";

describe("Poll", () => {
    it("should toggle onChange when vote is casted", () => {
        // given
        const onChange = jest.fn();
        render(<Poll onChange={onChange} />);

        // when
        const supportButton = getByText(document, /support/i);
        userEvent.click(supportButton);

        // then
        expect(onChange).toHaveBeenCalledWith("support");
    });

    it("should toggle onChange once when support is clicked twice", () => {
        // given
        const onChange = jest.fn();
        render(<Poll onChange={onChange} />);

        // when
        const supportButton = getByText(document, /support/i);
        userEvent.click(supportButton);
        userEvent.click(supportButton);

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("should toggle onChange once when reject is clicked twice", () => {
        // given
        const onChange = jest.fn();
        render(<Poll onChange={onChange} />);

        // when
        const rejectButton = getByText(document, /reject/i);
        userEvent.click(rejectButton);
        userEvent.click(rejectButton);

        expect(onChange).toHaveBeenCalledTimes(1);
    });
});

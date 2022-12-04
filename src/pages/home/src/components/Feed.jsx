import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import Filters from "./Filters";
import { renderAllPolls } from "../util";

export default function Feed({ title, polls }) {
    const [search, setSearch] = React.useState("");

    return (
        <div className="feed">
            <h2>{title}</h2>
            <div className="filters">
                <Form method="get" id="search-form">
                    <input
                        type="hidden"
                        aria-hidden
                        name="search"
                        value={search}
                    />
                    <TextField
                        id="search"
                        className="feed-input"
                        label="Search"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Filters />
                    <Button type="submit">Apply Search</Button>
                </Form>
            </div>
            <div className="polls">{[...renderAllPolls([...polls])]}</div>
        </div>
    );
}

Feed.propTypes = {
    title: PropTypes.string.isRequired,
    polls: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })
    ).isRequired,
};

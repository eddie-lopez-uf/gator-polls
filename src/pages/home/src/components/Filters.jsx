import React, { useState } from "react";
import {
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";

export default function Filters() {
    const [activeFilter, setActiveFilter] = useState("");
    const [sort, setSort] = useState("popularity");
    const [sortDir, setSortDir] = useState("desc");

    return (
        <>
            <input
                type="hidden"
                aria-hidden
                name="filter"
                value={activeFilter}
            />
            <FormControl fullWidth className="feed-input">
                <InputLabel id="filter-select">Filter</InputLabel>
                <Select
                    labelId="filter-select"
                    id="demo-simple-select"
                    value={activeFilter}
                    label="Age"
                    onChange={(e) => setActiveFilter(e.target.value)}
                >
                    <MenuItem value="upvoted">Mostly Upvoted</MenuItem>
                    <MenuItem value="downvoted">Mostly Downvoted</MenuItem>
                    <MenuItem value="none">None</MenuItem>
                </Select>
            </FormControl>
            <input type="hidden" aria-hidden name="sort" value={sort} />
            <input type="hidden" aria-hidden name="sortDir" value={sortDir} />
            <div className="feed-input" id="sort">
                <FormControl fullWidth>
                    <InputLabel id="sortby-select">Sort</InputLabel>
                    <Select
                        labelId="sortby-select"
                        id="demo-simple-select"
                        value={sort}
                        label="Age"
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <MenuItem value="popularity">Popular</MenuItem>
                        <MenuItem value="newest">Newest</MenuItem>
                        <MenuItem value="upvotes">Upvotes</MenuItem>
                        <MenuItem value="downvotes">Downvotes</MenuItem>
                    </Select>
                </FormControl>
                <ToggleButtonGroup
                    onChange={(e, v) => setSortDir(v ?? sortDir)}
                    exclusive
                    value={sortDir}
                >
                    <ToggleButton value="asc">Asc</ToggleButton>
                    <ToggleButton value="desc">Desc</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </>
    );
}

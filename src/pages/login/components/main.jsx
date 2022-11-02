import React from "react";
import { TextField, Button } from "@mui/material";

export default function LoginPage() {
    return (
        <div>
            <TextField id="outlined-basic" label="Outlined" variant="filled" />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <Button variant="contained">Default</Button>
        </div>
    );
}

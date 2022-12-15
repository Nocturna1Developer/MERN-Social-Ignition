// jsx files that have react components in them, syntax sugar

import { Box } from "@mui/material";
import Navbar from "scenes/navbar";

const HomePage = () => {
    return (
        <Box>
            <Navbar />
        </Box>
    );
};

export default HomePage;
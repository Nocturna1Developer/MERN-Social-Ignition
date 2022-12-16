import { Box } from "@mui/material";
import { styled } from "@mui/system";

/*
* Represents top right bottom left, every widget gets this base styling
*/
const WidgetWrapper = styled(Box)(({ theme }) => ({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem",
}));

export default WidgetWrapper;
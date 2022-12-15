import { Box } from "@mui/material";
import { styled } from "@mui/system";

/*
* Style component: Good if you are re-suing css as a component
* in different areas easily
*/
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

export default FlexBetween;
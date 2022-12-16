import { Box } from "@mui/material";

/*
* Crops the image if it doesn't match the dimensions, this is the profile picture of each user.
*/
const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                alt="user"
                src={`http://localhost:3001/assets/${image}`}
            />
        </Box>
    );
};

export default UserImage;
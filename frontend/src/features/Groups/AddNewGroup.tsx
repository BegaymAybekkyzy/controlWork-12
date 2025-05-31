import GroupFrom from "./components/GroupFrom.tsx";
import Typography from "@mui/material/Typography";

const AddNewGroup = () => {
    return (
        <div>
            <Typography
                variant="h3"
                color="textSecondary"
                textAlign="center"
                marginBottom={4}
            >
                Add new group
            </Typography>
            <GroupFrom/>
        </div>
    );
};

export default AddNewGroup;
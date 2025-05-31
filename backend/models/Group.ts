import mongoose, {Types} from "mongoose";
import User from "./User";

const GroupSchema = new mongoose.Schema({
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return !!user;
            },
            message: "User not found",
        },
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Group = mongoose.model("Group", GroupSchema);
export default Group;
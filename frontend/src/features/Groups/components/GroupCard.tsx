import React from "react";
import {
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
} from "@mui/material";
import { BASE_URL } from "../../../constants.ts";
import NoImage from "../../../assets/no_Image.jpg";
import {NavLink, useNavigate} from "react-router-dom";
import type {IGroupApi, IUser} from "../../../types";
import {useAppDispatch} from "../../../app/hooks.ts";
import {nameRetention} from "../groupsSlice.ts";

interface Props {
  group: IGroupApi;
  user?: IUser | null;
  isUser?: boolean;
  onDelete?:  (id: string) => void;
  onOpen?: (group: IGroupApi) => void;
}

const GroupCard: React.FC<Props> = ({ group, user, isUser= false, onDelete, onOpen }) => {
  let imagePath = NoImage;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickName = () => {
    dispatch(nameRetention(group.author.displayName));
    navigate(`/${group.author._id}`)
  }

  if (group.image) {
    imagePath = BASE_URL + "/" + group.image;
  }

  return (
    <Card sx={{ width: 345 }}>
      <CardMedia
          sx={{ height: 270 }}
          image={imagePath} title={group.name}
          onClick={() => onOpen?.(group)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <NavLink to={`group-detail/${group._id}`}>
            {group.name}
          </NavLink>
        </Typography>
        <Typography variant="body2">
          Author: {
          user ? <Button onClick={clickName}>{group.author.displayName}</Button>
            :group.author.displayName
        }
        </Typography>

      </CardContent>
      <CardActions>
        {isUser && (
            <Typography variant="body2" color="text.secondary">
              Status: {group.isPublished ? "Published" : "Under consideration"}
            </Typography>
        )}
        {user && user.role === "admin" && (
            <>
              <Typography>Status: {group.isPublished}</Typography>
              <Button
                  sx={{ color: "#483D8B" }}
              >
                Delete
              </Button>
              <Button
                  sx={{ color: "#483D8B" }}
              >
                Change status
              </Button>
            </>

        )}

        {isUser && (
            <Button
                sx={{ color: "#483D8B" }}
                onClick={() => onDelete(group._id)}
            >
              Delete
            </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default GroupCard;

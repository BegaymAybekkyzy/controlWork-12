import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import Typography from "@mui/material/Typography";
import Loader from "../../components/UI/Loader/Loader.tsx";
import { Grid } from "@mui/material";
import {selectAllGroups, selectFetchLoadingGroup} from "./groupsSlice.ts";
import {fetchAllGroups} from "./groupsThunks.ts";
import GroupCard from "./components/GroupCard.tsx";
import { selectUser } from "../Users/usersSlice.ts";
import GroupModal from "./components/GroupModal.tsx";
import type {IDetailGroupApi} from "../../types";

const Groups = () => {
  const dispatch = useAppDispatch();
  const user =  useAppSelector(selectUser);
  const groups = useAppSelector(selectAllGroups);
  const loading = useAppSelector(selectFetchLoadingGroup);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<IDetailGroupApi | null>(null);

  const handleOpen = (group: IDetailGroupApi) => {
    setSelectedGroup(group);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedGroup(null);
  };


  useEffect(() => {
      dispatch(fetchAllGroups());
  }, [dispatch]);

  // const delete = async (groupId: string) => {
  //   const warning = confirm("Are you sure you want to delete this group?");
  //   if (warning) {
  //
  //   }
  // }


  let content: React.ReactNode = (
    <Typography variant={"h5"}>No groups</Typography>
  );
  if (loading) {
    content = (
      <Typography
        component="div"
        sx={{ height: "80hv", display: "flex", justifyContent: "center" }}
      >
        <Loader />
      </Typography>
    );
  }

  if (groups.length > 0 && !loading) {
    content = (
      <Grid container spacing={2}>
        {groups.map((group) => (
          <Grid key={group._id}>
            <GroupCard group={group} user={user} onOpen={handleOpen}/>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <main>
      {content}
      {selectedGroup && (
          <GroupModal
              open={modalOpen}
              onClose={handleClose}
              group={selectedGroup}
              user={user}
          />
      )}
    </main>
  );
};

export default Groups;

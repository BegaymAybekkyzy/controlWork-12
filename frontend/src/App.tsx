import {useAppSelector} from "./app/hooks.ts";
import { selectUser } from "./features/Users/usersSlice.ts";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Registration from "./features/Users/Registration.tsx";
import Authentication from "./features/Users/Authentication.tsx";
import Groups from "./features/Groups/Groups.tsx";
import GroupsByUser from "./features/Groups/GroupByUser.tsx";
import ProtectedRoute from "./components/UI/ProtectedRoute/ProtectedRoute.tsx";
import AddNewGroup from "./features/Groups/AddNewGroup.tsx";
import UserGroups from "./features/Groups/UserGroups.tsx";
import UserTrainingGroups from "./features/Groups/UserTrainingGroups.tsx";
import GroupDetail from "./features/Groups/GroupDetail.tsx";

const App = () => {
    const user = useAppSelector(selectUser);

  return (
    <>
        <header>
            <AppToolbar />
        </header>

        <Container>
            <Routes>
                <Route path="/registration" element={<Registration />} />
                <Route path="/authentication" element={<Authentication />} />
                <Route path="/" element={<Groups />} />
                <Route path="/group-detail/:id" element={<GroupDetail />} />
                <Route path="/:userId" element={<GroupsByUser />} />

                <Route
                    path="/add-new-group"
                    element={
                        <ProtectedRoute isAllowed={Boolean(user)}>
                           <AddNewGroup/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-groups"
                    element={
                        <ProtectedRoute isAllowed={Boolean(user)}>
                            <UserGroups/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/user-taining-group"
                    element={
                        <ProtectedRoute isAllowed={Boolean(user)}>
                            <UserTrainingGroups/>
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
        </Container>
    </>
  )
};

export default App

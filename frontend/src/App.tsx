
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Registration from "./features/Users/Registration.tsx";
import Authentication from "./features/Users/Authentication.tsx";

const App = () => {


  return (
    <>
        <header>
            <AppToolbar />
        </header>

        <Container>
            <Routes>
                <Route path="/registration" element={<Registration />} />
                <Route path="/authentication" element={<Authentication />} />
            </Routes>
        </Container>
    </>
  )
};

export default App

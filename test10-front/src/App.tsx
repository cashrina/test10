import { Route, Routes } from 'react-router-dom';
import NewNews from "./features/news/containers/NewNews";
import {Container} from "@mui/material";

const App = () => (
    <>
        <Container>
            <Routes>
                <Route path="/" element={<NewNews/>} />
                <Route path="/news" element={<NewNews/>} />
            </Routes>
        </Container>
    </>
);

export default App

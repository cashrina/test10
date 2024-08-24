import { Route, Routes } from 'react-router-dom';
import NewNews from "./features/news/containers/NewNews";
import {Container} from "@mui/material";
import News from "./features/news/containers/News";
import OneNews from "./features/news/containers/OneNews";

const App = () => (
    <>
        <Container>
            <Routes>
                <Route path="/news" element={<News/>} />
                <Route path="/new/news" element={<NewNews/>} />
                <Route path="/news/:id" element={<OneNews/>} />
            </Routes>
        </Container>
    </>
);

export default App

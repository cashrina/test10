import { Route, Routes } from 'react-router-dom';
import NewsForm from "./features/news/components/NewsForm";

const App = () => (
    <>
     <Routes>
         <Route path="/news" element={<NewsForm/>} />
     </Routes>
    </>
);

export default App

import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MoodPage from "../pages/MoodPage";


function AppRoutes(){
return(
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="//mood/:moodType" element={<MoodPage/>}/>
    </Routes>
)
}
export default AppRoutes


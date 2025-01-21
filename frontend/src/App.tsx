import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Tasks from "./views/tasks/Index";

function App() {
  return (
    <div className="h-full overflow-y-auto scrollbar-thin dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800  scrollbar-thumb-gray-400 scrollbar-track-gray-300  dark:bg-gray-900 flex justify-center items-center">
      <div className="container h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/~" element={<Tasks />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

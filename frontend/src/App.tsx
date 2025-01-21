import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Tasks from "./views/tasks/Index";

function App() {
  return (
    <div className="h-screen sw-screen dark:bg-gray-900 flex justify-center items-center overflow-s">
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

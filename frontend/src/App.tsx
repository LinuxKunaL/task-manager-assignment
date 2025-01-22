import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Tasks from "./views/tasks/Index";
import { Toaster } from "react-hot-toast";
import ProtectRoute from "./components/others/ProtectRoute";

function App() {
  return (
    <div className="h-full overflow-y-auto scrollbar-thin dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 scrollbar-thumb-gray-400 scrollbar-track-gray-300 dark:bg-gray-900 flex justify-center items-center !font-rubik">
      <Toaster />
      <div className="container h-full">
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectRoute publicComponent>
                  <Login />
                </ProtectRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectRoute publicComponent>
                  <SignUp />
                </ProtectRoute>
              }
            />

            <Route
              path="/"
              element={
                <ProtectRoute publicComponent>
                  <SignUp />
                </ProtectRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectRoute>
                  <Tasks />
                </ProtectRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

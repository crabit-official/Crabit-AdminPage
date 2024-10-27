import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '@components/auth/PrivateRoute';
import AcademyPage from '@pages/Academy.tsx';
import HomePage from '@pages/Home.tsx';
import MemberPage from '@pages/Member.tsx';
import SigninPage from '@pages/Signin.tsx';
import Navbar from '@shared/Navbar.tsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/signin" element={<SigninPage />} />
        <Route
          path="/academy"
          element={
            <PrivateRoute>
              <AcademyPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/member"
          element={
            <PrivateRoute>
              <MemberPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

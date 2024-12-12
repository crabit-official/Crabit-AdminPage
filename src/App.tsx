import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import { pageRoutes } from './shared/constants/pageRoutes';
import AcademyRegisterListPage from './pages/AcademyRegisterListPage/AcademyRegisterListPage';
import AcademyDetailPage from './pages/AcademyDetailPage/AcademyDetailPage';
import AcademyListPage from './pages/AcademyListPage/AcademyListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={pageRoutes.main} element={<HomePage />} />
        <Route path={pageRoutes.login} element={<LoginPage />} />\
        <Route
          path={pageRoutes.academy_register}
          element={<AcademyRegisterListPage />}
        />
        <Route
          path={pageRoutes.academy_detail}
          element={<AcademyDetailPage />}
        />
        <Route path={pageRoutes.academy_list} element={<AcademyListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

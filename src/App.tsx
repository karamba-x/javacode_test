import { BrowserRouter, Routes, Route } from "react-router";
import ToDoPage from './pages/ToDoPage';
import AuthLayout from "./layouts/AuthLayout";
import AuthForm from "./components/AuthForm";
import RegisterForm from "./components/RegisterForm";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import { App as AntdApp, ConfigProvider } from 'antd';
import ruRU from "antd/locale/ru_RU";

function App() {

  return (
    <ConfigProvider
      locale={ruRU}>
      <AntdApp>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout />} >
              <Route path="/login" element={<AuthForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Route>

            <Route element={<PrivateRoute />} >
              <Route element={<MainLayout />} >
                <Route path="/" element={<ToDoPage />} />
              </Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App

import { Layout, theme, Typography } from "antd"
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../hooks/redux";
import { CheckSquareOutlined } from '@ant-design/icons';
import styles from './index.module.css'
import routes from "../config/routes";

const { Content, Footer } = Layout;

const AuthLayout = () => {
  const { accessToken } = useAppSelector((state) => state.userReducer);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  if (accessToken) {
    return <Navigate to={routes.app} replace />;
  }

  return (
    <Layout className={styles.layout}>
      <Content className={styles.auth_content}>
        <Typography.Title level={2} className={styles.auth_title}>
          <CheckSquareOutlined style={{ color: colorPrimary }} /> Todo App
        </Typography.Title>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        ©{new Date().getFullYear()} Created by karamba
      </Footer>
    </Layout>

  )
}

export default AuthLayout
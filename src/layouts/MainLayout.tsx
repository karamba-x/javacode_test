import { Layout, theme } from 'antd'
import { Outlet } from 'react-router';
import MainHeader from '../components/MainHeader';
import styles from './index.module.css'

const { Content, Footer } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className={styles.layout}>
      <MainHeader />
      <Content style={{ borderRadius: borderRadiusLG, background: colorBgContainer }} className={styles.main_content}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        ©{new Date().getFullYear()} Created by karamba
      </Footer>
    </Layout>
  )
}

export default MainLayout
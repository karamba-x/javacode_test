import { CheckSquareOutlined } from '@ant-design/icons';
import { Divider, Grid, Layout, Space, theme, Typography } from 'antd';
import styles from './index.module.css';
import AvatarDropdown from '../AvatarDropdown';

const { Header } = Layout;
const { useBreakpoint } = Grid;

const MainHeader: React.FC = () => {
  const screens = useBreakpoint();
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  const dateNow = new Date().toLocaleDateString("ru-RU", { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <Header style={{ background: colorBgContainer }} className={styles.header}>
      <Typography.Title level={screens.sm ? 2 : 3} style={{ marginBottom: 0 }}>
        <CheckSquareOutlined style={{ color: colorPrimary }} /> {'Todo App'}
      </Typography.Title>

      <Space size="large" split={<Divider type="vertical" />}>
        {screens.md && <Typography.Text>{dateNow}</Typography.Text>}
        <AvatarDropdown />
      </Space>
    </Header>
  )
}

export default MainHeader
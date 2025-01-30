import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { clearUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router';
import routes from '../config/routes';
import { useCallback, useMemo } from 'react';

const AvatarDropdown: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);

  const logout = useCallback(() => {
    dispatch(clearUser());
    navigate(routes.login);
  }, [dispatch, navigate]);

  const items: MenuProps['items'] = useMemo(() => [
    {
      key: '1',
      label: 'Выйти',
      icon: <LogoutOutlined />,
      onClick: logout
    },
  ], [logout]);

  return (
    <Dropdown menu={{ items }}>
      <a style={{ padding: 10, color: '#333' }} onClick={(e) => e.preventDefault()}>
        <Space >
          <Avatar icon={<UserOutlined />} />
          <Typography.Text>{user?.name}</Typography.Text>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}

export default AvatarDropdown;

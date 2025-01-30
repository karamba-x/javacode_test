import { LockOutlined, MailOutlined } from "@ant-design/icons"
import { App, Button, Divider, Flex, Form, Input } from "antd"
import { Link, useNavigate } from "react-router"
import { useLoginMutation } from "../services/userService";
import { useAppDispatch } from "../hooks/redux";
import { setUser } from "../store/slices/userSlice";
import { useEffect } from "react";
import routes from "../config/routes";

interface AuthFormValues {
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const { message } = App.useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (error && 'status' in error && error.status === 400) {
      message.error('Неверный email или пароль');
    } else {
      if (error) {
        message.error('Что-то пошло не так');
      }
    }
  }, [error, message]);

  const handleFinish = async (values: AuthFormValues) => {
    try {
      const response = await login(values).unwrap();
      dispatch(setUser(response));
      message.success('Вы успешно вошли');
      navigate('/');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      name="login"
      style={{ minWidth: 320 }}
      size="large"
      onFinish={handleFinish}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Пожалуйста, введите ваш Email!" },
          { type: "email", message: "Пожалуйста, введите корректный Email!" },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
      >
        <Input.Password prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>

      <Form.Item>
        <Flex justify="center" vertical>
          <Button loading={isLoading} block type="primary" htmlType="submit">
            Войти
          </Button>
          <Divider>или</Divider>
          <Link to={routes.register}>
            <Button block>
              Регистрация
            </Button>
          </Link>
        </Flex>
      </Form.Item>
    </Form>
  )
}

export default AuthForm;

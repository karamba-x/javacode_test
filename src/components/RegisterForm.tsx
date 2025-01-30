import { useEffect } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { App, Button, Divider, Flex, Form, Input } from "antd";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "../services/userService";
import { useAppDispatch } from "../hooks/redux";
import { setUser } from "../store/slices/userSlice";
import routes from "../config/routes";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
}

const RegisterForm: React.FC = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (error && 'status' in error && error.status === 400) {
      message.error('Такой пользователь уже существует');
    } else {
      if (error) {
        message.error('Что-то пошло не так');
      }
    }
  }, [error, message]);

  const handleFinish = async (values: RegisterFormValues) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { repeat_password, ...data } = values;
      const response = await register(data).unwrap();
      dispatch(setUser(response));
      message.success('Вы успешно зарегистрировались');
      navigate('/', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      name="register"
      style={{ minWidth: 320 }}
      size="large"
      onFinish={handleFinish}
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Пожалуйста, введите ваше имя!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Имя" />
      </Form.Item>
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
        rules={[
          { required: true, message: "Пожалуйста, введите ваш пароль!" },
          { min: 8, message: "Минимум 8 символов!" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
      </Form.Item>
      <Form.Item
        name="repeat_password"
        dependencies={['password']}
        rules={[
          { required: true, message: "Пожалуйста, повторите ваш пароль!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Повторите пароль" />
      </Form.Item>

      <Form.Item>
        <Flex vertical>
          <Button loading={isLoading} block type="primary" htmlType="submit">
            Регистрация
          </Button>
          <Divider>или</Divider>
          <Link to={routes.login}>
            <Button block>Войти</Button>
          </Link>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
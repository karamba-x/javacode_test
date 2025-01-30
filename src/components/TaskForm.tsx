import { DatePicker, Form, Input, Radio } from "antd";
import { FlagOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import { FormInstance } from 'antd/lib/form';

export interface ITaskForm {
  title: string;
  date: string;
  priority: number;
}

interface TaskFormProps {
  form: FormInstance;
  initialValues?: ITaskForm;
  onFinish: (values: ITaskForm) => void;
}

const TaskForm = ({ form, initialValues, onFinish }: TaskFormProps) => {
  return (
    <Form
      form={form}
      layout="vertical"
      style={{ marginTop: 20 }}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Form.Item
        name="title"
        label="Название задачи: "
        rules={[
          { required: true, message: "Пожалуйста, введите название задачи!" },
        ]}
      >
        <Input placeholder="Напишите название задачи" />
      </Form.Item>
      <Form.Item
        name="date"
        label="Дата: "
        rules={[
          { required: true, message: "Пожалуйста, выберите дату!" },
        ]}
        getValueProps={(value) => ({ value: value && dayjs(Number(value)) })}
        normalize={(value) => value && `${dayjs(value).valueOf()}`}
      >
        <DatePicker showTime format="DD.MM.YYYY HH:mm" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="priority"
        label="Приоритет: "
      >
        <Radio.Group>
          <Radio value={3} style={{ color: 'red' }}><FlagOutlined /> Высокий</Radio>
          <Radio value={2} style={{ color: 'orange' }}><FlagOutlined /> Средний</Radio>
          <Radio value={1} style={{ color: 'green' }}><FlagOutlined /> Низкий</Radio>
          <Radio value={0} style={{ color: 'grey' }}><FlagOutlined /> Нет</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
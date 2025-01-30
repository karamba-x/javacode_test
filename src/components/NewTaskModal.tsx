import { App, Form, Modal } from 'antd';
import { useAppSelector } from '../hooks/redux';
import { useAddTaskMutation } from '../services/tasksService';
import TaskForm, { ITaskForm } from './TaskForm';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose }: NewTaskModalProps) => {
  const [form] = Form.useForm();
  const userId = useAppSelector((state) => state.userReducer.user?.id);
  const [addTask, { isLoading }] = useAddTaskMutation();
  const { message } = App.useApp();

  const handleFinish = async (values: ITaskForm) => {
    const data = {
      ...values,
      date: values.date,
      userId,
      completed: false
    }
    await addTask(data).unwrap();
    message.success('Задача успешно добавлена');
    form.resetFields();
    onClose();
  }

  return (
    <Modal title="Новая задача"
      open={isOpen}
      confirmLoading={isLoading}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Добавить"
      cancelText="Отмена">
      <TaskForm
        form={form}
        onFinish={handleFinish}
        initialValues={{
          title: '',
          date: '',
          priority: 0
        }} />
    </Modal>
  )
}

export default NewTaskModal;

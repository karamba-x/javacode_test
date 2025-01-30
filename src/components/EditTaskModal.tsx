import { useEffect } from "react";
import { App, Form, Modal, Skeleton } from "antd";
import { useAppSelector } from "../hooks/redux";
import { useGetTaskQuery, useUpdateTaskMutation } from "../services/tasksService";
import TaskForm, { ITaskForm } from "./TaskForm";

interface IModal {
  isOpen: boolean;
  taskId: number | null;
}

interface EditTaskModalProps {
  modal: IModal;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ modal, onClose }) => {
  const [form] = Form.useForm();
  const userId = useAppSelector((state) => state.userReducer.user?.id);
  const [updateTask, { isLoading: isLoadingUpdate }] = useUpdateTaskMutation();
  const { message } = App.useApp();
  const { data, isLoading } = useGetTaskQuery(modal.taskId as number, { skip: !modal.taskId });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        date: data.date,
        priority: data.priority
      });
    } 
  }, [data, form]);

  const handleFinish = async (values: ITaskForm) => {
    const data = {
      ...values,
      date: values.date,
      userId,
      completed: false
    };
    await updateTask({ id: modal.taskId, data }).unwrap();
    message.success("Задача успешно обновлена");
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Редактирование задачи"
      destroyOnClose
      open={modal.isOpen}
      confirmLoading={isLoadingUpdate}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Обновить"
      cancelText="Отмена"
    >
      {isLoading && <Skeleton active />}
      {data && <TaskForm form={form} onFinish={handleFinish} />}
    </Modal>
  );
};

export default EditTaskModal;
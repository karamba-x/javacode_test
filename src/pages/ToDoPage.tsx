import { PlusOutlined } from "@ant-design/icons"
import { App, Button, Tabs, TabsProps } from "antd"
import ToDoList from "../components/ToDoList"
import NewTaskModal from "../components/NewTaskModal"
import { useState } from "react"
import { useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "../services/tasksService"
import { useAppSelector } from "../hooks/redux"

const tabItems: TabsProps['items'] = [
  { key: '1', label: 'Все' },
  { key: '2', label: 'В процессе' },
  { key: '3', label: 'Выполненные' },
];

const ToDoPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('1');
  const { user } = useAppSelector((state) => state.userReducer);
  const { message, modal: antdModal } = App.useApp();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const completedFilter = activeTab === '2' ? false : activeTab === '3' ? true : null;

  const { data, isLoading } = useGetTasksQuery({
    userId: user ? user.id : null,
    completed: completedFilter,
  });

  const updateComletedTask = async (id: number, checked: boolean) => {
    await updateTask({ id, data: { completed: !checked } }).unwrap();
  };

  const handleDelete = async (id: number) => {
    antdModal.confirm({
      title: 'Удаление задачи',
      content: 'Вы действительно хотите удалить задачу?',
      okText: 'Да',
      cancelText: 'Нет',
      onOk: async () => {
        await deleteTask(id).unwrap();
        message.success('Задача успешно удалена');
      }
    });
  };

  return (
    <div>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        tabBarExtraContent={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsOpenModal(true)}
          >
            Добавить задачу
          </Button>
        }
        items={tabItems}
      />
      <ToDoList
        data={data ?? []}
        isLoading={isLoading}
        onDeleteTask={handleDelete}
        updateComletedTask={updateComletedTask}

      />
      <NewTaskModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </div>
  );
};

export default ToDoPage;
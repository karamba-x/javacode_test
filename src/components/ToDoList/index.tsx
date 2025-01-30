import { CalendarOutlined, DeleteOutlined, EditOutlined, FlagOutlined } from '@ant-design/icons'
import { Button, Checkbox, List, Skeleton, Space, Tag } from 'antd'
import dayjs from 'dayjs';
import EditTaskModal from '../EditTaskModal';
import { useCallback, useState } from 'react';
import { ITask } from '../../models/Task';
import styles from './index.module.css'

const priorityMap = {
  3: { label: 'Высокий', color: 'red' },
  2: { label: 'Средний', color: 'orange' },
  1: { label: 'Низкий', color: 'green' },
};

interface ToDoListProps {
  onDeleteTask: (id: number) => Promise<void>,
  updateComletedTask: (id: number, checked: boolean) => void,
  isLoading: boolean,
  data: ITask[];
}

const ToDoList: React.FC<ToDoListProps> = ({ onDeleteTask, data, isLoading, updateComletedTask }) => {
  const [modal, setModal] = useState<{ isOpen: boolean, taskId: number | null }>({
    isOpen: false,
    taskId: null
  });

  const formatDate = useCallback((value: string) => {
    return dayjs(Number(value)).format("DD.MM.YYYY HH:mm");
  }, []);


  return (
    <Skeleton active loading={isLoading}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            className={styles.list_item}
            style={{backgroundColor: item.completed ? 'rgba(0,0,0,0.1)' : 'inherit' }}
            extra={
              <Space>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => setModal({ isOpen: true, taskId: item.id })}
                />
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => onDeleteTask(item.id)}
                />
              </Space>
            }
          >
            <Checkbox
              className={styles.checkbox}
              checked={item.completed}
              onChange={() => updateComletedTask(item.id, item.completed)}
            />
            <List.Item.Meta
              title={
                <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                  {item.title}
                </span>
              }
              description={
                <div>
                  {item.priority !== 0 &&
                    <Tag
                      color={item.completed ? 'gray' : priorityMap[item.priority]?.color}>
                      <FlagOutlined /> {priorityMap[item.priority]?.label}
                    </Tag>}
                  <span><CalendarOutlined />{formatDate(item.date)}</span>
                </div>} />
          </List.Item>
        )}
      />
      <EditTaskModal
        modal={modal}
        onClose={() => setModal({ isOpen: false, taskId: null })}
      />
    </Skeleton>
  )
}

export default ToDoList;

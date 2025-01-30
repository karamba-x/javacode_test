import { IFilterTask, ITask } from '../models/Task.js';
import { api } from './index.js';

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], IFilterTask>({
      query: ({ userId, completed }) => {
        let queryString = `/tasks?userId=${userId}`;
        if (completed !== null && completed !== undefined) {
          queryString += `&completed=${completed}`;
        }
        queryString += `&_sort=id&_order=desc`;
        return queryString;
      },
      providesTags: ["Tasks"],
    }),
    getTask: builder.query<ITask, number>({
      query: (id) => `/tasks/${id}`,
      providesTags: ["Tasks"],
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: '/tasks',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Tasks"],
    })
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} = tasksApi;
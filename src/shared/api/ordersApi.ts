import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ORDERS_PATH, BASE_URL } from '../consts';
import { GetOrdersListArgs, Order } from '../types';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Orders'],

  endpoints: (build) => ({
    getOrdersList: build.query<Order[], GetOrdersListArgs>({
      query: ({ sort, status, page, limit }) => ({
        url: `${ORDERS_PATH}?${
          (sort ? '_sort=total&_order=' + sort + '&' : '') + (status !== undefined ? 'status_like=' + status + '&' : '')
        }_page=${page}&_limit=${limit}`,
      }),
      providesTags: ['Orders'],
    }),
  }),
});

export const { useGetOrdersListQuery } = ordersApi;

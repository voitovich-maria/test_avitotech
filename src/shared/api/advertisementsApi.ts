import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ADVERTISEMENTS_PATH, BASE_URL } from '../consts';
import { Advertisement, EditAdvertisementArgs, GetAdvertisementsListArgs } from '../types';

export const advertisementsApi = createApi({
  reducerPath: 'advertisementsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Advertisements'],

  endpoints: (build) => ({
    getAdvertisementsList: build.query<Advertisement[], GetAdvertisementsListArgs>({
      query: ({ searchByName, page, limit }) => ({
        url: `${ADVERTISEMENTS_PATH}?name_like=${searchByName}&_page=${page}&_limit=${limit}`,
      }),
      providesTags: ['Advertisements'],
    }),
    getAdvertisementDetails: build.query<Advertisement, string | undefined>({
      query: (id) => ({
        url: `${ADVERTISEMENTS_PATH}/${id}`,
      }),
      providesTags: ['Advertisements'],
    }),
    createAdvertisement: build.mutation<void, Advertisement>({
      query: (data) => ({
        url: ADVERTISEMENTS_PATH,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Advertisements'],
    }),
    editAdvertisement: build.mutation<void, EditAdvertisementArgs>({
      query: ({ id, data }) => ({
        url: `${ADVERTISEMENTS_PATH}/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Advertisements'],
    }),
    deleteAdvertisement: build.mutation<void, string>({
      query: (id) => ({
        url: `${ADVERTISEMENTS_PATH}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Advertisements'],
    }),
  }),
});

export const {
  useGetAdvertisementsListQuery,
  useGetAdvertisementDetailsQuery,
  useCreateAdvertisementMutation,
  useEditAdvertisementMutation,
  useDeleteAdvertisementMutation,
} = advertisementsApi;

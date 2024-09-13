export type Advertisement = {
  /* Уникальный идентификатор. */
  id: string;
  /* Название. */
  name: string;
  /* Описание. */
  description?: string;
  /* Цена. */
  price: number;
  /* Дата и время создания. */
  createdAt: string;
  /* Количество просмотров. */
  views: number;
  /* Количество лайков. */
  likes: number;
  /* Ссылка на изображение. */
  imageUrl?: string;
};

export const OrderStatus = {
  Created: 0,
  Paid: 1,
  Transport: 2,
  DeliveredToThePoint: 3,
  Received: 4,
  Archived: 5,
  Refund: 6,
} as const;

export type OrderItem = Advertisement & { count: number };

export type Order = {
  /* Уникальный идентификатор. */
  id: string;
  /* Статус. */
  status: (typeof OrderStatus)[keyof typeof OrderStatus];
  /* Дата и время создания. */
  createdAt: string;
  /* Дата и время завершения. */
  finishedAt?: string;
  /* Товары в заказе. */
  items: Array<OrderItem>;
  /* Способ доставки(Почта, СДЭК...) */
  deliveryWay: string;
  /* Сумма заказа */
  total: number;
};

export type Image = {
  /* Уникальный идентификатор. */
  id: number;
  /* Ссылка. */
  url: string;
  /* Название. */
  name: string;
};

export type GetAdvertisementsListArgs = {
  searchByName: string;
  page: number;
  limit: number;
};

export type AdvertisementFormData = Pick<Advertisement, 'name' | 'description' | 'price' | 'imageUrl'>;

export type EditAdvertisementArgs = {
  id: string;
  data: AdvertisementFormData;
};

export type GetOrdersListArgs = {
  sort?: 'asc' | 'desc';
  status?: (typeof OrderStatus)[keyof typeof OrderStatus];
  page: number;
  limit: number;
};

export enum OrderStatusRu {
  'Создан' = 0,
  'Оплачен' = 1,
  'В пути' = 2,
  'Доставлен' = 3,
  'Получен' = 4,
  'В архиве' = 5,
  'Возврат' = 6,
};

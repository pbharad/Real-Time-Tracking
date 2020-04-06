
import Orders from '@/components/Orders'
import Maps from '@/components/Map'

export const routes = [
    {
      path: '/',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/track',
      name: 'Maps',
      component: Maps
    }
  ];

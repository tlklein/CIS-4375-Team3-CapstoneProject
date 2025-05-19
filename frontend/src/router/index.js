import { createRouter, createWebHistory } from "vue-router";
 
import dashboard from '@/views/portal/dashboard.vue';
import home from '@/views/portal/home.vue';
import barbers from '@/views/portal/barberemployee.vue';
import customers from '@/views/portal/customers.vue';
import bookings from '@/views/portal/booking.vue';
import users from '@/views/portal/users.vue';
import services from '@/views/portal/barberservice.vue';
import signin from '@/views/portal/login.vue';
import czunigapage from '@/views/webpage/czunigapage.vue';


  const routes = [
    {
      name: 'Dashboard',
      path: '/portal',
      component: dashboard,
      children: [
         {
          name: 'home',
          path: '/home',
          component:home
        },
        {
          name: 'barber',
          path: '/barberemployee',
          component:barbers
        },
        {
          name: 'customer',
          path: '/customer',
          component:customers
        },
        {
          name: 'booking',
          path: '/booking',
          component:bookings
        },
        {
          name: 'users',
          path: '/users',
          component:users
        },
        {
          name: 'services',
          path: '/services',
          component:services
        },
        {
          name: 'login',
          path: '/login',
          component:signin
        }
      ]
    },
    {
      name: 'czunigapage',
      path: '',
      component: czunigapage,
    }
       
  ];
const router = Router();
export default router;
function Router() {
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}
  
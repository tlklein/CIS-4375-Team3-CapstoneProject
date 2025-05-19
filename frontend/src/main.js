import { createApp } from 'vue';
import App from './App.vue';
import Toast from 'vue-toastification';

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

// Import custom CSS
import './style.css';

// Import router
import router from './router';

const app = createApp(App);

const options = {
  position: 'bottom-right', // Position of the toast
};

app.use(router);
app.use(Toast, options);
app.mount('#app');
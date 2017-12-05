import Vue from 'vue';
import App from './App';
import router from './router';
import Notifications from 'vue-notification';
require('@/assets/semantic.slate.min.css');
require('@/assets/index.sass');

Vue.use(Notifications);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

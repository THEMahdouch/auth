import Vue from 'vue';

import '../public/Skeleton-2.0.4/css/normalize.css';
import '../public/Skeleton-2.0.4/css/skeleton.css';
import '../public/Skeleton-2.0.4/css/customize.css';


import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

import Vue from 'vue';
import store from '@/store/index';
import App from './App.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Card from '@/components/Card.vue';
import Grid from '@/components/Grid.vue';
import Navtab from '@/components/Navtab.vue';
import Required from '@/components/Required.vue';


Vue.component('tp-header', Header);
Vue.component('tp-footer', Footer);
Vue.component('tp-card', Card);
Vue.component('tp-grid', Grid);
Vue.component('tp-navtab', Navtab);
Vue.component('tp-required', Required);

Vue.config.productionTip = false;

new App({
  store
}).$mount();

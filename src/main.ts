import Vue from "vue";

import App from "./App.vue";

import MdButton from 'vue-material/dist/components/MdButton';
import MdField from 'vue-material/dist/components/MdField';
import MdRadio from 'vue-material/dist/components/MdRadio';
import MdCheckbox from 'vue-material/dist/components/MdCheckbox';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdButton)
Vue.use(MdCheckbox)
Vue.use(MdField)
Vue.use(MdRadio)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

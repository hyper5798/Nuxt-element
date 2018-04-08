import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import Egrid from 'egrid'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(VueI18n)
Vue.use(Element)
Vue.use(Egrid)

import locale from 'element-ui/lib/locale/lang/zh-TW'

export default () => {
  Vue.use(Element, { locale })
}

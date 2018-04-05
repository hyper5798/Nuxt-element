import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'

Vue.use(VueI18n)
Vue.use(Element)

import locale from 'element-ui/lib/locale/lang/zh-tw'

export default () => {
  Vue.use(Element, { locale })
}
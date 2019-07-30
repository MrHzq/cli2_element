import Method from './method'
import Variables from './variables'
import FormRules from './form-rules'

export default {
    install(Vue, router) {
        Vue.use(Variables)
        Vue.use(FormRules)
        Vue.use(Method, router)
    }
}

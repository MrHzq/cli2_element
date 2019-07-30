import Method from './method'
import Variables from './variables'
import FormRules from './form-rules'

export default {
    install(Vue) {
        Vue.use(Variables)
        Vue.use(FormRules)
        Vue.use(Method)
    }
}

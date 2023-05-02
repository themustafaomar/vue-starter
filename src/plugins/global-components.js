import AppTextField from '@/components/app/TextField.vue'
import AppSelect from '@/components/app/Select.vue'
import AppBtnLoader from '@/components/app/BtnLoader.vue'

export const useGlobalComponents = ({ app }) => {
  app
    .component('AppTextField', AppTextField)
    .component('AppSelect', AppSelect)
    .component('AppBtnLoader', AppBtnLoader)
}

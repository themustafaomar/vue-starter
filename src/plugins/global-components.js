import AppTextField from '@/components/app/TextField.vue'
import AppSelect from '@/components/app/Select.vue'
import AppUploader from '@/components/app/Uploader.vue'
import AppBtnLoader from '@/components/app/BtnLoader.vue'

export const useGlobalComponents = (app) => {
  app
    .component('AppTextField', AppTextField)
    .component('AppSelect', AppSelect)
    .component('AppUploader', AppUploader)
    .component('AppBtnLoader', AppBtnLoader)
}

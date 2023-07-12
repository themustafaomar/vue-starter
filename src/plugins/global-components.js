import AppSheet from '@/components/app/Sheet.vue'
import AppTextField from '@/components/app/TextField.vue'
import AppSelect from '@/components/app/Select.vue'
import AppUploader from '@/components/app/Uploader.vue'

export const useGlobalComponents = (app) => {
  app
    .component('AppSheet', AppSheet)
    .component('AppTextField', AppTextField)
    .component('AppSelect', AppSelect)
    .component('AppUploader', AppUploader)
}

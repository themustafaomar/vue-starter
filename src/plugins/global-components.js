import AppBtn from '@/components/app/Btn.vue'
import AppMenu from '@/components/app/Menu.vue'
import AppTooltipBtn from '@/components/app/TooltipBtn.vue'
import AppTextField from '@/components/app/TextField.vue'
import AppSelect from '@/components/app/Select.vue'
import AppBtnLoader from '@/components/app/BtnLoader.vue'

export const useGlobalComponents = ({ app }) => {
  app
    // .component('AppBtn', AppBtn)
    // .component('AppMenu', AppMenu)
    // .component('AppTooltipBtn', AppTooltipBtn)
    .component('AppTextField', AppTextField)
    .component('AppSelect', AppSelect)
    .component('AppBtnLoader', AppBtnLoader)
}

import AppBtn from '@/components/app/Btn.vue'
import AppMenu from '@/components/app/Menu.vue'
import AppTooltipBtn from '@/components/app/TooltipBtn.vue'
import AppTextField from '@/components/common/TextField.vue'

export const useGlobalComponents = ({ app }) => {
  app
    .component('AppBtn', AppBtn)
    .component('AppMenu', AppMenu)
    .component('AppTooltipBtn', AppTooltipBtn)
    .component('AppTextField', AppTextField)
}

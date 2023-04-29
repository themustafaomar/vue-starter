import AppBtn from '@/components/common/Btn.vue'
import AppMenu from '@/components/common/Menu.vue'
import AppTooltipBtn from '@/components/common/TooltipBtn.vue'
import AppTextField from '@/components/common/TextField.vue'
import AppSelect from '@/components/common/Select.vue'

export const useGlobalComponents = ({ app }) => {
  app
    .component('AppBtn', AppBtn)
    .component('AppMenu', AppMenu)
    .component('AppTooltipBtn', AppTooltipBtn)
    .component('AppTextField', AppTextField)
    .component('AppSelect', AppSelect)
}

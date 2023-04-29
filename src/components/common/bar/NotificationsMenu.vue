<template>
  <v-menu
    close-delay="100"
    location="bottom end"
    open-delay="0"
    v-model="menu"
    :close-on-content-click="false"
    :open-on-hover="false"
    :width="width"
    offset="9"
  >
    <template #activator="{ props }">
      <app-tooltip-btn path="notifications" v-bind="props">
        <template #icon>
          <v-badge color="#ED561B" dot location="top end">
            <v-icon :icon="icon" class="mx-1" color="medium-emphasis" />
          </v-badge>
        </template>
      </app-tooltip-btn>
    </template>

    <v-toolbar class="ps-4 pe-6" color="surface" density="compact">
      <h3 class="text-blue-grey-darken-3">Notifications</h3>
      <!-- <v-btn
        class="px-2 ms-n1 text-none font-weight-regular"
        size="small"
        variant="text"
        @click="showArchived = !showArchived"
      >
        unread
        {{ showArchived ? t('unread', { number: unread.length }) : t('read', { number: read.length }) }}
      </v-btn> -->

      <!-- <template #append>
        @click.stop.prevent="toggleAll"
        <v-icon
          :icon="showArchived ? 'mdi-email-outline' : 'mdi-email-open-outline'"
          color="medium-emphasis"
        />
      </template> -->
    </v-toolbar>

    <v-divider color="grey" />

    <v-sheet class="notifications-dropdown overflow-hidden" rounded="lg">
      <v-responsive max-height="400" min-height="204" style="overflow-y: scroll">
        <!-- v-if="done" -->
        <div v-if="false" class="py-8 text-center text-subtitle-1">
          <p>{{ t('done') }}</p>
          <v-icon icon="$vuetify" size="96" color="#D7D7D7" />
        </div>

        <template v-else>
          <v-list lines="three">
            <template v-for="notification in notifications" :key="notification.id">
              <v-list-item :ripple="false" class="py-2">
                <template #prepend>
                  <v-avatar size="large" icon image="/avatar.jpg" height="80" />
                </template>

                <v-list-item-title class="text-wrap font-weight-medium text-h7 mb-1">
                  {{ notification.title }}
                </v-list-item-title>

                <div class="text-body-2">
                  <p class="mb-1">{{ notification.description.slice(0, 75) }}</p>

                  <p
                    v-if="!notification.metadata.read_at"
                    class="text-decoration-none text-blue-accent-4 font-weight-medium d-block"
                  >
                    {{ notification.metadata.created }}
                  </p>
                  <p v-else class="text-decoration-none text-grey font-weight-medium d-block">
                    {{ notification.metadata.created }}
                  </p>
                </div>

                <template #append>
                  <div class="ps-4 mt-n2">
                    <!-- :icon="showArchived ? 'mdi-email-outline' : 'mdi-email-open-outline'" -->
                    <!-- @click.stop.prevent="toggle(notification)" -->
                    <v-icon icon="mdi-dots-vertical" size="20" color="grey" />
                  </div>
                </template>
              </v-list-item>
            </template>
          </v-list>
        </template>
      </v-responsive>
    </v-sheet>
  </v-menu>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'
import AppTooltipBtn from '@/components/common/TooltipBtn.vue'

const { t } = useI18n()
const { mobile } = useDisplay()
const menu = ref(false)

// prettier-ignore
const notifications = reactive([
  {
    id: 1,
    title: 'Friend Request Sent',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.',
    metadata: {
      action: '/path/to/action',
      action_text: 'Accept',
      created: '30 seconds ago',
      read_at: null,
    },
  },
  {
    id: 2,
    title: 'Friend Request Sent',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.',
    metadata: {
      action: '/path/to/action',
      action_text: 'Accept',
      created: '1 hour ago',
      read_at: null,
    },
  },
  {
    id: 3,
    title: 'Friend Request Sent',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.',
    metadata: {
      action: '/path/to/action',
      action_text: 'Accept',
      created: '3 hours ago',
      read_at: '2022-11-23T00:10:18.000000Z',
    },
  },
  {
    id: 4,
    title: 'Friend Request Sent',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.',
    metadata: {
      action: '/path/to/action',
      action_text: 'Accept',
      created: '4 months ago',
      read_at: '2022-11-23T00:10:18.000000Z',
    },
  },
])

const icon = computed(() => 'mdi-bell-ring-outline')
const width = computed(() => (mobile.value ? 420 : 390))
</script>

<style>
.notifications-dropdown {
  box-shadow: 0 10px 15px -3px #0000001a, 0 4px 6px -2px #0000000d !important;
}
</style>

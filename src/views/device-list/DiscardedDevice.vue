<template>
  <index :status-id="statusId"/>
</template>

<script>
import { DEVICE_STATUS } from '@/constants/device-status'
import index from '@/views/device-list/index'

export default {
  name: 'DiscardedDevice',
  components: {
    index
  },
  computed: {
    statusId() {
      return DEVICE_STATUS.DISCARDED.code
    }
  }
}
</script>

<style scoped>

</style>

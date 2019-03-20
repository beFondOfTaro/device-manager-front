<template>
  <index :status-id="statusId"/>
</template>
<script>

import index from '@/views/device-list/index'
import { DEVICE_STATUS } from '@/constants/device-status'

export default {
  name: 'UsingDevice',
  components: {
    index
  },
  computed: {
    statusId() {
      return DEVICE_STATUS.USING.code
    }
  }
}
</script>

<style scoped>

</style>

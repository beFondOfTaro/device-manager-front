<template>
  <index :status-id="1"/>
</template>

<script>
import index from '@/views/device-list/index'
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('device')

export default {
  name: 'InStoreDevice',
  components: { index },
  computed: {
    ...mapGetters([
      'deviceSearchParams'
    ])
  },
  created() {
    this.deviceSearchParams.statusId = 1
  }
}
</script>

<style scoped>

</style>

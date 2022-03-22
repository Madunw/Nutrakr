<template>
  <el-container
    ><el-main><Search></Search><Table></Table></el-main><el-aside width="40%"><Form></Form></el-aside
  ></el-container>
</template>

<script>
import Search from '@/components/search.vue'
import Table from '@/components//table.vue'
import Side from '@/components/side-area.vue'
import Form from '@/components/form.vue'

export default {
  name: 'Home',
  components: {
    Search,
    Table,
    Side,
    Form
  }
}
</script>

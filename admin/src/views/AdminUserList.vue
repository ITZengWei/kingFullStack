<template>
  <div>
    <h1>管理员列表</h1>
    <div>
      <el-table :data="tableData">
        <el-table-column prop="_id" width="220" label="ID" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="password" label="密码" />
        <el-table-column
                fixed="right"
                label="操作"
                width="180">
          <template slot-scope="scope">
            <el-button @click="remove(scope.row)" type="danger" size="small">删除</el-button>
            <el-button type="primary" @click="$router.push(`/admin_users/edit/${ scope.row._id }`)" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default  {
  	data() {
  		return {
			  tableData: []
      }
    },

    created() {
	    this.fetch()
    },
    methods: {
	    async fetch() {
        const { data } = await this.$http.get('rest/admin_users')
        console.log(data)
        this.tableData = data
      },
      async remove(row) {
        if (window.confirm('您确认删除吗')) {
	        const { data } = await this.$http.delete('rest/admin_users/' + row._id)
          console.log(data)
          if (data.success) {
	          this.fetch()
	        	this.$message({
              type: 'success',
              message: '删除成功'
            })
          }

        }

      },
    }
  }
</script>
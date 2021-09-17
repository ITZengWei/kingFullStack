<template>
  <div>
    <h1>英雄列表</h1>
    <div>
      <el-table :data="tableData">
        <el-table-column prop="_id" width="220" label="ID" />
        <el-table-column  label="英雄头像" >
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="height: 3rem;" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="英雄名称" />
        <el-table-column
                fixed="right"
                label="操作"
                width="180">
          <template slot-scope="scope">
            <el-button @click="remove(scope.row)" type="danger" size="small">删除</el-button>
            <el-button type="primary" @click="$router.push(`/heroes/edit/${ scope.row._id }`)" size="small">编辑</el-button>
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
        const { data } = await this.$http.get('rest/heroes')
        console.log(data)
        this.tableData = data
      },
      async remove(row) {
        if (window.confirm('您确认删除吗')) {
	        const { data } = await this.$http.delete('rest/heroes/' + row._id)
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
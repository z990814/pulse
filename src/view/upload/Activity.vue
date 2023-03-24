<template>
  <div style="margin: 9px;">
    <el-button class="el-button--goon">添加</el-button>
    <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 100%" :max-height="innerHeight*0.7">
      <el-table-column label="培训项目名称" width="180">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <p style="font-weight: 700;font-size:17px;">{{ scope.row.name }}</p>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="培训时数" width="180">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.hours }}</el-tag>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="学分" width="107">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.credit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证书名称" width="177">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.certificate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参与者工号" width="147">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.jobNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参与者姓名" width="127">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.participantName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="197">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.benginTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="197">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="获得证书时间" width="197">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.beRewardedTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="录入系统时间" width="197">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="状态" width="107">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="审核员">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.auditUserName }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="el-button--goon" size="mini" @click="toAssignRole(scope.$index, scope.row)">分配角色</el-button>
          <el-button class="el-button--goon" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button class="el-button--goon" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      innerHeight: window.innerHeight
    }
  }
}
</script>

<style scoped>

::v-deep .el-table th{
    background-color: rgba(124, 182, 179, 0.342);
}
/* 按钮风格重定义 */
.el-button--goon {
  color: #ffffff;
  background-color: #13c2c2;
  border-color: #13c2c2;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el-button--goon:focus, .el-button--goon:hover {
  color: rgb(245, 245, 245);
  background-color: #0e9a9a;
  border-color: #0e9a9a;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el-button--goon:active {
  color:  #ffffff;
  background-color: #13c2c2;
  border-color: #13c2c2;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
/* 按钮风格重定义 */

</style>
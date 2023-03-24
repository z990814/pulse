<template>
  <div class="body">
    <div class="head">
      <el-button class="el-button--goon" @click="toAddGroup()"><span><i class="el-icon-plus"></i>添加</span></el-button>
    </div>
    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%" :max-height="innerHeight*0.7">
    <el-table-column label="规则名称" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p style="font-weight: 700;font-size:17px;">{{ scope.row.groupTitle }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="规则类型" width="197">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p v-if="scope.row.type === 0" style="font-weight: 700;font-size:17px;">默认随机问题组</p>
            <p v-else-if="scope.row.type === 1" style="font-weight: 700;font-size:17px;">自由固定问题组</p>
            <p v-else-if="scope.row.type === 2" style="font-weight: 700;font-size:17px;">顺序算法问题组</p>
            <p v-else-if="scope.row.type === 3" style="font-weight: 700;font-size:17px;">周顺序算法问题组</p>
            <p v-else-if="scope.row.type === 4" style="font-weight: 700;font-size:17px;">月顺序算法问题组</p>
            <p v-else-if="scope.row.type === 5" style="font-weight: 700;font-size:17px;">年顺序算法问题组</p>
            <p v-else-if="scope.row.type === 6" style="font-weight: 700;font-size:17px;">自定义算法问题组</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="474">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p style="font-weight: 700;font-size:17px;">{{ scope.row.description }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="217">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="217">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="el-button--goon" size="mini" @click="toUpdateGroup(scope.$index, scope.row)">编辑</el-button>
          <el-button class="el-button--goon" size="mini" type="danger" @click="toDeleteGroup(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加规则" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%" style="color:aquamarine;">
      <el-form :model="groupForm">
        <el-form-item label="规则名称:" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="groupForm.groupTitle" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="规则类型:" :label-width="formLabelWidth">
          <el-select v-model="groupForm.type" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="题目数量:" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="groupForm.questionAmount" type="number" required="" autocomplete="off" placeholder="请输入整数">
          </div>
          <el-button v-if="groupForm.type === 1 && groupForm.questionAmount > 0" class="el-button--goon" style="margin-top: 4px;" @click="toChooseQuestions()" > 选择题目</el-button>
        </el-form-item>
        <el-form-item label="描述:" :label-width="formLabelWidth">
          <p v-if="groupForm.type === 0" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">对一个主题的所有问题进行随机抽取</p>
          <div v-else-if="groupForm.type === 1" class="inputGroup">
            <input v-model="groupForm.description" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisible = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="addGroup()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改规则" :close-on-click-modal="false" :visible.sync="dialogVisibleUpdate" width="30%" style="color:aquamarine;">
      <el-form :model="updateForm">
        <el-form-item label="规则名称:" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="updateForm.groupTitle" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="规则类型:" :label-width="formLabelWidth">
          <el-select v-model="updateForm.type" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="题目数量:" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="updateForm.questionAmount" type="number" required="" autocomplete="off" placeholder="请输入整数">
          </div>
          <el-button v-if="updateForm.type === 1 && updateForm.questionAmount > 0" class="el-button--goon" style="margin-top: 4px;" @click="toChooseQuestions()" > 选择题目</el-button>
        </el-form-item>
        <el-form-item label="描述:" :label-width="formLabelWidth">
          <p v-if="updateForm.type === 0" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">对一个主题的所有问题进行随机抽取</p>
          <div v-else-if="updateForm.type === 1" class="inputGroup">
            <input v-model="updateForm.description" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleUpdate = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="updateGroup()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除问题" :close-on-click-modal="false" :visible.sync="dialogVisibleDelete" width="30%" style="color:aquamarine;">
      <p>确定要删除问题：<br>《{{ deleteDes }}》吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleDelete = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="deleteGroup()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import groupApi from '@/api/group'
  export default {
    data() {
      return {
        tableData: [],
        innerHeight: window.innerHeight,
        formQuery: {},
        total: 0,
        dialogVisible: false,
        dialogVisibleUpdate: false,
        dialogVisibleChoose: false,
        dialogVisibleDelete: false,
        deleteDes: '',
        deleteId: 0,
        formLabelWidth: '87px',
        groupForm: {},
        updateForm: {},
        options: [
          {
            value: 0,
            label: '默认随机问题组'
            // 卡组类型（0：默认随机问题组 1： 自由固定问题组 2：顺序算法问题组 3：一周周期算法问题组 4：月份周期算法问题组）
          },
          {
            value: 1,
            label: '自由固定问题组'
          },
          {
            value: 2,
            label: '顺序算法问题组'
          },
          {
            value: 3,
            label: '周顺序算法问题组'
          },
          {
            value: 4,
            label: '月顺序算法问题组'
          },
          {
            value: 5,
            label: '年顺序算法问题组'
          },
          {
            value: 6,
            label: '自定义算法问题组'
          }
        ]
      }
    },
    created() {
      this.getform(1,10)
    },
    methods: {
      toAddGroup() {
        this.groupForm = {}
        this.dialogVisible = true
      },
      toUpdateGroup(index,row) {
        this.updateForm = row
        this.dialogVisibleUpdate = true
      },
      toChooseQuestions() {
        this.dialogVisibleChoose = true
      },
      getform(current, limit) {
        groupApi.getFormDataListPage(current, limit, this.formQuery).then(res => {
          if(res.data.code === 200){
            this.tableData = res.data.data.rows
            this.total = res.data.data.total
          }
        })
      },
      addGroup() {
        groupApi.addGroup(this.groupForm).then(res => {
          if(res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.dialogVisible = false
            this.getform(1,10)
          }
        })
      },
      updateGroup() {
        groupApi.updateGroup(this.updateForm).then(res => {
          if(res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.dialogVisibleUpdate = false
            this.getform(1,10)
          }
        })
      },
      toDeleteGroup(index, row) {
        this.dialogVisibleDelete = true
        this.deleteDes = row.groupTitle
        this.deleteId = row.id
      },
      deleteGroup() {
        groupApi.deleteGroup(this.deleteId).then(res => {
          if(res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }
          this.getform(1,10)
          this.dialogVisibleDelete = false
        })
      }
    }
  }
</script>

<style scoped>
.body {
  margin: 7px;
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

.inputGroup {
  font-family: 'Segoe UI', sans-serif;
  margin: 0em 0 0em 0;
  max-width: 297px;
  position: relative;
}

.inputGroup input {
  font-size: 100%;
  padding: 0.8em;
  outline: none;
  border: 2px solid rgb(200, 200, 200);
  background-color: transparent;
  border-radius: 7px;
  width: 100%;
}

.inputGroup :is(input:focus, input:valid)~label {
  transform: translateY(-50%) scale(.9);
  margin: 0em;
  margin-left: 1.3em;
  padding: 0.4em;
  background-color: #e8e8e8;
}

.inputGroup :is(input:focus, input:valid) {
  border-color: lightseagreen;
}
</style>
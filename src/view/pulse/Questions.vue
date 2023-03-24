<template>
  <div class="body">
    <div class="head">
      <el-button class="el-button--goon" @click="toAddQuestion()"><span><i class="el-icon-plus"></i>添加</span></el-button>
    </div>
    <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 100%" :max-height="innerHeight*0.7">
    <el-table-column label="主题" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p style="font-weight: 700;font-size:17px;">{{ scope.row.theme }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="驱动因素" width="147">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
              <p style="font-weight: 700;font-size:17px;">{{ scope.row.themeModule }}</p>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="子因素" width="124">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p style="font-weight: 700;font-size:17px;">{{ scope.row.tags }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="问题描述" width="417">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p style="font-weight: 700;font-size:17px;">{{ scope.row.description }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="110">
        <template slot-scope="scope">   
          <div slot="reference" class="name-wrapper">
              <p style="font-weight: 700;font-size:17px;">{{ scope.row.sort }}</p>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="选项类型" width="117">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p style="font-weight: 700;font-size:17px;">{{ scope.row.optionsType === 0 ? '单选' : '多选' }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="217">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="el-button--goon" size="mini" @click="toUpdateQuestion(scope.$index, scope.row)">编辑</el-button>
          <el-button class="el-button--goon" size="mini" type="danger" @click="toDeleteQuestion(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加问题" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%" style="color:aquamarine;">
      <el-form :model="quesForm">
        <el-form-item label="主题" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="quesForm.theme" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="驱动因素" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="quesForm.themeModule" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="子因素" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="quesForm.tags" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="问题描述" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="quesForm.description" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="选项类型" :label-width="formLabelWidth">
          <div class="inputGroup">
            <el-select v-model="quesForm.optionsType" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="问题选项" :label-width="formLabelWidth">
          <div v-for="(item, index) in quesOptions" :key="index" class="inputGroup" style="margin: 14px 0px;">
            <input v-model="item.label" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisible = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="addQuestion()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改问题" :close-on-click-modal="false" :visible.sync="dialogVisibleUpdate" width="30%" style="color:aquamarine;">
      <el-form :model="updateForm">
        <el-form-item label="主题" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="updateForm.theme" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="驱动因素" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="updateForm.themeModule" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="子因素" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="updateForm.tags" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="问题描述" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="updateForm.description" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="选项类型" :label-width="formLabelWidth">
          <div class="inputGroup">
            <el-select v-model="updateForm.optionsType" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="问题选项" :label-width="formLabelWidth">
          <div v-for="(item, index) in quesOptions" :key="index" class="inputGroup" style="margin: 14px 0px;">
            <input v-model="item.label" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleUpdate = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="updateQuestion()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除问题" :close-on-click-modal="false" :visible.sync="dialogVisibleDelete" width="30%" style="color:aquamarine;">
      <p>确定要删除问题：<br>《{{ deleteDes }}》吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleDelete = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="deleteQuestion()">确 定</el-button>
      </span>
    </el-dialog>

    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 5, 15, 20, 25, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import quesApi from '@/api/questions'

export default {
  data() {
    return {
      tableData:[],
      innerHeight: window.innerHeight,
      dialogVisible: false,
      dialogVisibleUpdate: false,
      dialogVisibleDelete: false,
      formLabelWidth: '87px',
      quesForm: {},
      updateForm: {},
      deleteDes: '',
      deleteId: 0,
      options: [
        {
          value: 0,
          label: '单选'
        },
        {
          value: 1,
          label: '多选'
        }
      ],
      quesOptions: [
        {
          sort: 1,
          value: 1,
          label: '完全同意'
        },
        {
          sort: 2,
          value: 2,
          label: '同意'
        },
        {
          sort: 3,
          value: 3,
          label: '基本同意'
        },
        {
          sort: 4,
          value: 4,
          label: '不同意'
        },
        {
          sort: 5,
          value: 5,
          label: '完全不同意'
        }
      ],
      formQuery: {},
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  created() {
    this.getform(1,10)
  },
  methods: {
    toAddQuestion() {
      this.dialogVisible = true
      this.quesForm = {}
    },
    toUpdateQuestion(index, row) {
      this.dialogVisibleUpdate = true
      this.updateForm = row
    },
    toDeleteQuestion(index, row) {
      this.dialogVisibleDelete = true
      this.deleteDes = row.description
      this.deleteId = row.id
    },
    deleteQuestion() {
      quesApi.deleteQuestion(this.deleteId).then(res => {
        if(res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
        this.getform(1,10)
        this.dialogVisibleDelete = false
      })
    },
    addQuestion() {
      this.quesForm.options = JSON.stringify(this.quesOptions)
      // console.log(options)
      quesApi.addQuestion(this.quesForm).then(res => {
        if(res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        }
        this.getform(1,10)
        this.dialogVisible = false
      })
    },
    updateQuestion() {
      this.updateForm.options = JSON.stringify(this.quesOptions)
      quesApi.updateQuestion(this.updateForm).then(res => {
        if(res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        }
        this.getform(1,10)
        this.dialogVisibleUpdate = false
      })
    },
    getform(current, limit) {
      quesApi.getFormDataListPage(current, limit, this.formQuery).then(res => {
        if(res.data.code === 200){
          this.tableData = res.data.data.rows
          this.total = res.data.data.total
        }
      })
    },
    // 切换为xx条一页
    handleSizeChange(val) {
      this.getform(1,val)
      this.pageSize = val
    },
    // 去到xx页
    handleCurrentChange(val) {
      this.getform(val,this.pageSize)
      this.currentPage = val
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
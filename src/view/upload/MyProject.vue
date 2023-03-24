<template>
  <div class="body">
    <a class="buttonDownload" href="/培訓項目學員及獲獎取證記錄收集表.xlsx" download="培訓項目學員及獲獎取證記錄收集表.xlsx">下载模版</a>
    <a class="button">上传资料</a>
    <a @click="createProject()" class="buttonNorm" style="margin-left: 7px;"><i class="el-icon-plus"></i>添加培训项目</a>
    <el-divider></el-divider>

    <div class="cardTable">
      <div v-for="(item, index) in tableData" :key="index">
        <el-tooltip placement="top">
          <div slot="content">培训时数：{{ item.hours }}h<br/>学分：{{ item.credit }}</div>
          <div class="card">
            <div style="color:lightseagreen;width: 100%;text-align: center;font-size: 47px;">
              <i class="el-icon-folder"></i>
            </div>
            <h3 style="color:lightseagreen;margin: 0;text-align: center;">{{ item.name }}</h3>
            <div style="width: 100%;text-align: center;margin: 0;">
              <el-tooltip content="查看和编辑该项目" placement="bottom">
                <i class="el-icon-edit-outline" style="font-size: 27px;margin: 7px;cursor: pointer;"></i>
              </el-tooltip>
              <el-tooltip content="添加单条记录到该项目" placement="bottom">
                <i class="el-icon-folder-add" style="font-size: 27px;margin: 7px;cursor: pointer;" @click="insertToThisProject(item.id, item.name, item.credit, item.hours)"></i>
              </el-tooltip>
              <el-tooltip content="上传execl资料到该项目" placement="bottom">
                <i class="el-icon-upload2" @click="uploadToThisProject(item.id, item.name, item.credit, item.hours)" style="font-size: 27px;margin: 7px;cursor: pointer;"></i>
              </el-tooltip>
            </div>
          </div>
        </el-tooltip>
      </div>
    </div>

    <el-dialog title="创建项目" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%" style="color:aquamarine;">
      <el-form :model="projectForm">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="projectForm.name" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="学分" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="projectForm.credit" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="培训时数" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="projectForm.hours" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisible = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="confirmCreate()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="'上传资料到【'+selectProject + '】'" :close-on-click-modal="false" :visible.sync="dialogVisibleUpload" width="30%" style="color:aquamarine;">
      <el-form :model="form">
        <el-form-item label="项目名称：" :label-width="formLabelWidth2">
          <!-- <div class="inputGroup"> -->
            <!-- <input v-model="form.uploadActivityDTO.name" type="text" required="" autocomplete="off" disabled="disabled"> -->
            <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.name }}</p>
          <!-- </div> -->
        </el-form-item>
        <el-form-item label="学分：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.credit }}</p>
        </el-form-item>
        <el-form-item label="培训时数(h)：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.hours }}</p>
        </el-form-item>
        <el-form-item label="录入人员ID：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.enterUserId }}</p>
        </el-form-item>
        <el-form-item label="录入人员工号：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.enterJobNo }}</p>
        </el-form-item>
        <el-form-item label="录入人员姓名：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.enterUserName }}</p>
          </div>
        </el-form-item>
        <el-form-item label="项目起始时间：" :label-width="formLabelWidth2">
          <el-date-picker v-model="dateBeginToEnd" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上传表格：" :label-width="formLabelWidth2">
          <el-upload class="upload-demo" ref="upload" action="http://localhost:9701/AU/sysActivity/upload" :on-preview="handlePreview" :on-remove="handleRemove" :on-change="handleChange" :file-list="form.uploadActivityDTO.file" :http-request="uploadFile" :auto-upload="false">
            <el-button class="el-button--goon" slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">建议上传XLSX文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleUpload = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="confirmUpload()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="'添加资料到【'+selectProject + '】'" :close-on-click-modal="false" :visible.sync="dialogVisibleInsert" width="30%" style="color:aquamarine;">
      <el-form :model="insertActivityDTO">
        <el-form-item label="项目名称：" :label-width="formLabelWidth2">
            <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ insertActivityDTO.name }}</p>
        </el-form-item>
        <el-form-item label="学分：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ insertActivityDTO.credit }}</p>
        </el-form-item>
        <el-form-item label="培训时数(h)：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ insertActivityDTO.hours }}</p>
        </el-form-item>
        <el-form-item label="录入人员ID：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ insertActivityDTO.enterUserId }}</p>
        </el-form-item>
        <el-form-item label="录入人员工号：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ insertActivityDTO.enterJobNo }}</p>
        </el-form-item>
        <el-form-item label="录入人员姓名：" :label-width="formLabelWidth2">
            <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ insertActivityDTO.enterUserName }}</p>
        </el-form-item>
        <el-form-item label="项目起始时间：" :label-width="formLabelWidth2">
          <el-date-picker v-model="dateBeginToEnd" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="参与人员工号：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="projectForm.jobNo" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="参与人员姓名：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="projectForm.paeticipantName" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="获得证书名称：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="projectForm.certificate" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="证书获得时间：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <el-date-picker v-model="projectForm.beRewardedTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleInsert = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="confirmInsert()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import projectAPi from '@/api/project'
import activityApi from '@/api/activity'
import userApi from '@/api/user'

export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisibleUpload: false,
      dialogVisibleInsert: false,
      projectForm: {},
      form: {
        uploadActivityDTO: {
          enterProjectId: 0,
          name: '',
          credit: 0,
          hours: 0,
          enterUserId:0,
          enterJobNo: '',
          enterUserName:'',
          beginTime: '',
          endTime: ''
        },
        file: {}
      },
      insertActivityDTO: {},
      formLabelWidth: '87px',
      formLabelWidth2: '119px',
      formQuery: {},
      tableData: [],
      total: 0,
      selectProject: '',
      dateBeginToEnd: []
    }
  },
  created() {
    this.getform(1,10)
  },
  methods: {
    createProject() {
      this.dialogVisible = true
      this.projectForm  = {}
    },
    confirmCreate() {
      projectAPi.createProject(this.projectForm).then(res => {
        if(res.data.code === 200) {
          this.dialogVisible = false
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.getform(1,10)
        }
      })
    },
    confirmInsert() {

    },
    getform(current, limit) {
      projectAPi.getFormDataListPage(current, limit, this.formQuery).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.rows
          this.total = res.data.data.total
        }
      })
    },
    uploadToThisProject(id, name, credit, hours) {
      this.selectProject = name
      this.form.uploadActivityDTO.enterProjectId = id
      this.form.uploadActivityDTO.name = name
      this.form.uploadActivityDTO.credit = credit
      this.form.uploadActivityDTO.hours = hours
      userApi.getUserInfo().then(res => {
        if(res.data.code === 200) {
          this.form.uploadActivityDTO.enterUserId = res.data.data.userInfo.id
          this.form.uploadActivityDTO.enterJobNo = res.data.data.userInfo.username
          this.form.uploadActivityDTO.enterUserName = res.data.data.userInfo.realName
          this.dialogVisibleUpload = true 
        }
      })
    },
    insertToThisProject(id, name, credit, hours) {
      this.selectProject = name
      this.insertActivityDTO.enterProjectId = id
      this.insertActivityDTO.name = name
      this.insertActivityDTO.credit = credit
      this.insertActivityDTO.hours = hours
      userApi.getUserInfo().then(res => {
        if(res.data.code === 200) {
          this.insertActivityDTO.enterUserId = res.data.data.userInfo.id
          this.insertActivityDTO.enterJobNo = res.data.data.userInfo.username
          this.insertActivityDTO.enterUserName = res.data.data.userInfo.realName
          this.dialogVisibleInsert = true 
        }
      })
    },
    confirmUpload() {
      this.$refs.upload.submit()
    },
    handleChange(file, fileList) {
      this.form.file = file.raw
      // console.log(this.form)
    },
    uploadFile() {
      const formData = new FormData()
      // console.log(this.form.file)
      formData.append('file', this.form.file)

      this.form.uploadActivityDTO.beginTime = this.dateBeginToEnd[0]
      this.form.uploadActivityDTO.endTime = this.dateBeginToEnd[1]

      let uploadActivityDTO = JSON.stringify(this.form.uploadActivityDTO)

      formData.append('uploadActivityDTO', new Blob([uploadActivityDTO], {type: 'application/json'}));

      // console.log(this.form.uploadActivityDTO.beginTime)

      activityApi.upload(formData).then(res => {
        // console.log(res)
        if(res.data.code === 200 ){
          this.dialogVisibleUpload = false
          this.$refs.upload.clearFiles()
          this.$message({
            message: '导入成功',
            type: 'success'
          })
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style scoped>

  .cardTable {
    display: flex;
    flex-wrap: wrap;
  }
  .body {
    margin: 9px;
  }
  i:hover {
    color: lightseagreen;  
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


.card {
  position: relative;
  width: 161px;
  height: 216px;
  border: #0e9a9a 2px solid;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 7px;
}

.number {
  position: absolute;
  left: 0%;
  top: 0%;
  border-radius: 4px 0 9px 0px;
  width: 40px;
  height: 40px;
  background: #0e9a9a;
}

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

.buttonNorm {
 display: inline-block;
 position: relative;
 padding: 10px 25px;
 background-color: lightseagreen;
 color: white;
 font-family: sans-serif;
 text-decoration: none;
 font-size: 0.9em;
 text-align: center;
 /* text-indent: 15px; */
 border: none;
 cursor: pointer;
}

.buttonDownload {
 display: inline-block;
 position: relative;
 padding: 10px 25px;
 background-color: lightseagreen;
 color: white;
 font-family: sans-serif;
 text-decoration: none;
 font-size: 0.9em;
 text-align: center;
 text-indent: 15px;
 border: none;
 cursor: pointer;
}

.buttonDownload:hover {
 background-color: rgb(25, 142, 136);
 color: white;
}

.buttonDownload:before, .buttonDownload:after {
 content: ' ';
 display: block;
 position: absolute;
 left: 15px;
 top: 52%;
}

.buttonDownload:before {
 width: 10px;
 height: 2px;
 border-style: solid;
 border-width: 0 2px 2px;
}

.buttonDownload:after {
 width: 0;
 height: 0;
 margin-left: 3px;
 margin-top: -7px;
 border-style: solid;
 border-width: 4px 4px 0 4px;
 border-color: transparent;
 border-top-color: inherit;
 animation: downloadArrow 1s linear infinite;
 animation-play-state: paused;
}

.buttonDownload:hover:before {
 border-color: #cdefbd;
}

.buttonDownload:hover:after {
 border-top-color: #cdefbd;
 animation-play-state: running;
}

.button{
 /* margin: 7px; */
 margin-left: 11px;
 display: inline-block;
 position: relative;
 padding: 10px 25px;
 background-color: lightseagreen;
 color: white;
 font-family: sans-serif;
 text-decoration: none;
 font-size: 0.9em;
 text-align: center;
 text-indent: 15px;
 border: none;
 cursor: pointer;
}


.button:before, .button:after {
 content: ' ';
 display: block;
 position: absolute;
 left: 15px;
 top: 52%;
}
.button:before {
 width: 10px;
 height: 2px;
 border-style: solid;
 border-width: 0 2px 2px;
}

.button:after {
 width: 0;
 height: 0;
 margin-left: 3px;
 margin-top: -7px;
 border-style: solid;
 border-width: 4px 4px 0px 4px;
 border-color: transparent;
 border-top-color: inherit;
 animation: uploadArrow 1s linear infinite;
 animation-play-state: paused;
 transform: rotate(180deg);
}

.button:hover {
 background-color: rgb(25, 142, 136);
 color: white;
}

.button:hover:before {
 border-color: #cdefbd;
}

.button:hover:after {
 border-top-color: #cdefbd;
 animation-play-state: running;
}


@keyframes downloadArrow {
 0% {
  margin-top: -7px;
  opacity: 1;
 }

 0.001% {
  margin-top: -15px;
  opacity: 0.4;
 }

 50% {
  opacity: 1;
 }

 100% {
  margin-top: 0;
  opacity: 0.4;
 }
}

@keyframes uploadArrow {
  0% {
    margin-top: -7px;
    opacity: 1;
  }

  0.001% {
    margin-top: 0;
    opacity: 0.4;
  }

  50% {
    opacity: 1;
  }

  100% {
    margin-top: -15px;
    opacity: 0.4;
  }
}

</style>
<template>
  <div>
    <!--头部-->
    <div class="header">
      <div class="title">
        <h1>员工学习与发展脉搏调查</h1>
      </div>
      <div class="tips">
        <div class="first">
          <img src="../assets/test-header-1.svg" />
        </div>
        <div class="second">
          <img src="../assets/test-header-2.svg" />
        </div>
        <div class="third"><img src="../assets/test-header-3.svg" /></div>
      </div>
      <div class="shape">
        <div class="shape1"><div class="text">没有时间限制</div></div>
        <div class="shape2"><div class="text">请诚实回答</div></div>
        <div class="shape3">
          <div class="text">请尽量不要选择“中立”的答案</div>
        </div>
      </div>
    </div>
    <!--问题-->
    <div class="content">
      <fieldset class="question">
        <legend>
          <span>我很清楚我的工作职责。</span>
        </legend>
        <div class="group_option">
          <div class="text-option1">完全同意</div>
          <div class="radios">
            <span>
              <label class="container">
                <input type="radio" value="-2" />
                <div
                  class="checkmark"
                  style="height: 2.5em; width: 2.5em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input type="radio" value="-1" />
                <div
                  class="checkmark checkmark2"
                  style="height: 1.75em; width: 1.75em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input type="radio" value="0" />
                <div
                  class="checkmark checkmark3"
                  style="height: 1.25em; width: 1.25em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input type="radio" value="1" />
                <div
                  class="checkmark checkmark2"
                  style="height: 1.75em; width: 1.75em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input type="radio" value="2" />
                <div
                  class="checkmark"
                  style="height: 2.5em; width: 2.5em"
                ></div>
              </label>
            </span>
          </div>
          <div class="text-option2">完全不同意</div>
        </div>
      </fieldset>
      <fieldset class="question">
        <legend>
          <span>我认为我所在部门的工作任务分配是合理的。</span>
        </legend>
        <div class="group_option">
          <div class="text-option1">完全同意</div>
          <div class="radios">
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark"
                  style="height: 2.5em; width: 2.5em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark checkmark2"
                  style="height: 1.75em; width: 1.75em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark checkmark3"
                  style="height: 1.25em; width: 1.25em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark checkmark2"
                  style="height: 1.75em; width: 1.75em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark"
                  style="height: 2.5em; width: 2.5em"
                ></div>
              </label>
            </span>
          </div>
          <div class="text-option2">完全不同意</div>
        </div>
      </fieldset>
      <fieldset class="question">
        <legend>
          <span>在公司内，我目前的工作比较适合我。</span>
        </legend>
        <div class="group_option">
          <div class="text-option1">完全同意</div>
          <div class="radios">
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark"
                  style="height: 2.5em; width: 2.5em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark checkmark2"
                  style="height: 1.75em; width: 1.75em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark checkmark3"
                  style="height: 1.25em; width: 1.25em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark checkmark2"
                  style="height: 1.75em; width: 1.75em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark"
                  style="height: 2.5em; width: 2.5em"
                ></div>
              </label>
            </span>
          </div>
          <div class="text-option2">完全不同意</div>
        </div>
      </fieldset>
      <fieldset class="question">
        <legend>
          <span>我很清楚我所做的工作对公司的价值和意义。</span>
        </legend>
        <div class="group_option">
          <div class="text-option1">完全同意</div>
          <div class="radios">
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark"
                  style="height: 2.5em; width: 2.5em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark checkmark2"
                  style="height: 1.75em; width: 1.75em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark checkmark3"
                  style="height: 1.25em; width: 1.25em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark checkmark2"
                  style="height: 1.75em; width: 1.75em"
                ></div>
              </label>
            </span>
            <span>
              <label class="container">
                <input checked="checked" type="checkbox" />
                <div
                  class="checkmark"
                  style="height: 2.5em; width: 2.5em"
                ></div>
              </label>
            </span>
          </div>
          <div class="text-option2">完全不同意</div>
        </div>
      </fieldset>
      <fieldset class="question">
        <legend>
          <span>请写出一个您期望公司改善的问题点及建议:</span>
        </legend>
        <div class="textarea-container">
          <textarea class="textarea" placeholder="请输入文本"></textarea>
        </div>
      </fieldset>
    </div>
    <!--用户信息-->
    <div class="infomation">
      <fieldset class="info">
        <legend>
          <span>您的工号：</span>
        </legend>
        <input type="text" placeholder="请输入工号" />
      </fieldset>
      <fieldset class="info">
        <legend>
          <span>您的姓名：</span>
        </legend>
        <input type="text" placeholder="请输入姓名" />
      </fieldset>
      <fieldset class="info">
        <legend>
          <span>您的性别：</span>
        </legend>
        <div class="left-option">
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">男</div>
          </div>
        </div>
        <div class="right-option" style="margin-top: -40px">
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">女</div>
          </div>
        </div>
      </fieldset>
      <fieldset class="info">
        <legend>
          <span>您的年龄：</span>
        </legend>
        <div class="left-option">
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">20岁及以下</div>
          </div>
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">21-25岁</div>
          </div>
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">26-30岁</div>
          </div>
        </div>
        <div class="right-option">
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">31-35岁</div>
          </div>
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">36-40岁</div>
          </div>
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">41岁及以上</div>
          </div>
        </div>
      </fieldset>
      <fieldset class="info">
        <legend>
          <span>您的学历：</span>
        </legend>
        <div class="left-option">
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">小学及以下</div>
          </div>
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">初中</div>
          </div>
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">高中/职高</div>
          </div>
        </div>
        <div class="right-option">
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">大专</div>
          </div>
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">本科</div>
          </div>
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">硕士及以上</div>
          </div>
        </div>
      </fieldset>
      <fieldset class="info">
        <legend>
          <span>您的管理职：</span>
        </legend>
        <div class="left-option">
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">无</div>
          </div>
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">线组级</div>
          </div>
        </div>
        <div class="right-option" style="margin-top: -80px">
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">课理级</div>
          </div>
          <div class="option">
            <div class="option-radios">
              <span>
                <label class="container">
                  <input checked="checked" type="checkbox" />
                  <div
                    class="checkmark checkmark2"
                    style="height: 1.75em; width: 1.75em"
                  ></div>
                </label>
              </span>
            </div>
            <div class="text-option">经理级以上</div>
          </div>
        </div>
      </fieldset>
    </div>
    <!--提交按钮-->
    <div class="footer">
      <button class="animated-button">提 交</button>
    </div>
  </div>
</template>

<script>
import index from "@/view/index.vue";
export default {
  components: { index },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/* 头部 */
.header {
  overflow: hidden;
  /* background-color: #33a474; */
}
.title {
  width: 100%;
  height: 300px;
  background-color: #33a474;
  text-align: center;
  color: #fff;
}
h1 {
  padding-top: 10px;
  line-height: 2.3em;
  font-size: 4em;
  /* margin-top: 0;
  margin-bottom: 0; */
}
.tips {
  position: relative;
  width: 100%;
  height: 150px;
  justify-content: center;
  background-color: #f9f9f9;
}
.first {
  position: absolute;
  margin-top: -80px;
  margin-left: 23%;
  width: 350px;
  height: 160px;
  margin-right: 50px;
  background-color: #dcebf0;
}
.second {
  position: absolute;
  margin-top: -80px;
  margin-left: 43%;
  width: 350px;
  height: 160px;
  margin-right: 50px;
  background-color: #ede6da;
}
.third {
  position: absolute;
  margin-top: -80px;
  margin-left: 63%;
  width: 350px;
  height: 160px;
  background-color: #eee0f5;
}
img {
  height: 40%;
  width: 40%;
  margin-left: 30%;
  margin-top: 10px;
}
.shape {
  position: relative;
  width: 100%;
}
.shape1 {
  position: absolute;
  margin-left: 23%;
  margin-top: -150px;
  height: 80px;
  width: 350px;
  background-color: #fff;
}
.shape2 {
  position: absolute;
  margin-left: 43%;
  margin-top: -150px;
  height: 80px;
  width: 350px;
  background-color: #fff;
}
.shape3 {
  position: absolute;
  margin-left: 63%;
  margin-top: -150px;
  height: 80px;
  width: 350px;
  background-color: #fff;
}
.text {
  text-align: center;
  line-height: 80px;
  font-size: 1.2em;
  color: #576071;
  font-weight: 600;
}
/* 问题 */
.question {
  text-align: center;
  margin-top: 5px;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-color: #e3e9f2;
}
legend {
  font-size: 1.5em;
  font-weight: 600;
  color: #576071;
  line-height: 1.8;
  text-align: center;
  white-space: normal;
  padding-top: 20px;
}
.text-option1 {
  font-size: 1.5em;
  font-weight: 600;
  color: #33a474;
  margin-right: 20px;
}
.text-option2 {
  font-size: 1.5em;
  font-weight: 600;
  color: #88619a;
}
/*圆形选框*/
.group_option {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0;
}
.radios {
  display: flex;
  margin-bottom: 20px;
  margin-top: 15px;
  align-items: center;
}

/* Hide the default checkbox */
.container input {
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.container {
  display: flex;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  margin-right: 20px;
}

/* Create a custom checkbox */
.checkmark {
  display: block;
  position: relative;
  top: 0;
  left: 0;
  height: 2em;
  width: 2em;
  border: 2px solid green;
  border-radius: 50%;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #fff;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: block;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: none;
}

/* 勾样式 */
.container .checkmark:after {
  left: 0.9em;
  top: 0.4em;
  width: 0.6em;
  height: 1.2em;
  border: solid seagreen;
  border-width: 0 0.15em 0.15em 0;
  transform: rotate(45deg);
}
.container .checkmark2:after {
  left: 0.7em;
  top: 0.3em;
  width: 0.4em;
  height: 0.8em;
  border: solid seagreen;
  border-width: 0 0.15em 0.15em 0;
  transform: rotate(45deg);
}
.container .checkmark3::after {
  left: 0.45em;
  top: 0.2em;
  width: 0.3em;
  height: 0.6em;
  border: solid seagreen;
  border-width: 0 0.15em 0.15em 0;
  transform: rotate(45deg);
}
/*输入框样式 */
.textarea-container {
  position: relative;
  margin: 20px 0;
}

.textarea {
  width: 30%;
  padding: 10px;
  border: 2px solid #88619a;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
  height: 150px;
}

.textarea:focus,
.textarea:hover {
  border-color: #777;
}
/*用户信息 */
.info {
  text-align: center;
  margin-top: 5px;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-color: #e3e9f2;
}
.info input {
  width: 30%;
  padding: 10px;
  border: 2px solid #88619a;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
  margin: 20px 0;
}
.text-option {
  font-size: 1.5em;
  font-weight: 600;
  color: #33a474;
  /* margin-right: 20px; */
}
.left-option {
  width: 20%;
  margin-left: 35%;
}
.right-option {
  width: 20%;
  margin-left: 55%;
  position: relative;
  margin-top: -120px;
}
.option {
  display: flex;
  justify-content: left;
  /* align-items: center; */
  /* text-align: center; */
  /* margin-left: 45%; */
}

.option-radios {
  display: flex;
  /* margin-bottom: 20px; */
  /* align-items: center; */
  text-align: left;
}
/* 提交按钮 */
.footer {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.animated-button {
  background-color: #88619a;
  border: none;
  color: #ffffff;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 30px;
  margin: 4px 2px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 5px;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
}

.animated-button:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  opacity: 0;
  transform: translate(-50%, -50%);
  transition: all 0.5s ease;
}

.animated-button:hover:after {
  width: 210px;
  height: 200px;
  opacity: 1;
}

.animated-button:focus {
  outline: none;
}

.animated-button:active {
  transform: translateY(2px);
  box-shadow: none;
}
</style>
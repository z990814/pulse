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
        <div class="shape1"></div>
        <div class="shape2"></div>
        <div class="shape3"></div>
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
    </div>
    <!--提交按钮-->
    <div class="footer">
      <button class="animated-button">提 交</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* 头部 */
.header {
  /* background-color: #33a474; */
}
.title {
  width: 100%;
  height: 300px;
  background-color: #33a474;
  /* margin: 0 auto; */
  text-align: center;
  color: #fff;
  font-size: 2.3em;
}
h1 {
  padding-top: 10px;
  line-height: 2.3em;
  margin-top: 0;
  margin-bottom: 0;
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
  margin-left: 400px;
  width: 350px;
  height: 160px;
  margin-right: 50px;
  background-color: #e4ae3a;
}
.second {
  position: absolute;
  margin-top: -80px;
  margin-left: 800px;
  width: 350px;
  height: 160px;
  margin-right: 50px;
  background-color: #4298b4;
}
.third {
  position: absolute;
  margin-top: -80px;
  margin-left: 1200px;
  width: 350px;
  height: 160px;
  background-color: #583f64;
}
img {
  height: 60px;
  width: 60px;
  margin-left: 145px;
  margin-top: 10px;
}
.shape {
  position: relative;
  width: 100%;
}
.shape1 {
  position: absolute;
  margin-left: 400px;
  margin-top: -150px;
  height: 80px;
  width: 350px;
  background-color: #fff;
}
.shape2 {
  position: absolute;
  margin-left: 800px;
  margin-top: -150px;
  height: 80px;
  width: 350px;
  background-color: #fff;
}
.shape3 {
  position: absolute;
  margin-left: 1200px;
  margin-top: -150px;
  height: 80px;
  width: 350px;
  background-color: #fff;
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
  /* background-color: pink; */
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
.container .checkmark3:after {
  left: 0.45em;
  top: 0.2em;
  width: 0.3em;
  height: 0.6em;
  border: solid seagreen;
  border-width: 0 0.15em 0.15em 0;
  transform: rotate(45deg);
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
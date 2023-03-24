<template>
  <div>
    <section>
      <div class="wave">
        <span />
        <span />
        <span />
      </div>
      <div class="content">
        <div class="login">
          <h1 style="color:lightseagreen;width:400px;text-align: center;font-size:47px;font-family: 'Courier New', Courier, monospace;margin: 10px auto;">PULSE</h1>
          <input placeholder="Username" v-model="loginForm.username" type="text" class="input" required="">
          <input placeholder="Password" v-model="loginForm.password" type="password" class="input" required="">
          <button class="button" @click="LoginClick"> LOGIN </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import userApi from '@/api/user'
import store from '@/store/index';

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    LoginClick() {

      userApi.login(this.loginForm).then(res => {
        //content-type: "application/json"
        console.log(res)
        if(res.data.code === 200) {
          const jwt = res.data.data.tokenInfo.tokenValue
          
          store.commit('SET_TOKEN', jwt)

          store.commit('SAVE_MYPERM', res.data.data.permissionList)

          this.$message({
              message: res.data.msg,
              type: 'success'
          })

          this.$router.push({ path:'/home' })
        }
        else {
          this.$message({
              message: res.data.msg,
              type: 'warning'
          })
        }
      })
    }
  }
}
</script>


<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
section{
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
section .wave{
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: lightseagreen;
}

section .wave span{
  position: absolute;
  width: 325vh;
  height: 325vh;
  top:0;
  left: 50%;
  transform: translate(-50%, -75%);
  background: rgb(255, 255, 255);
}
section .wave span:nth-child(1) {
  animation: animate 5s linear infinite;
  border-radius: 45%;
  background:rgb(28, 211, 202) ;
}
section .wave span:nth-child(2) {
  animation: animate 10s linear infinite;
  border-radius: 40%;
  background: rgb(0, 125, 119);
}
section .wave span:nth-child(3) {
  animation: animate 15s linear infinite;
  border-radius: 42.5%;
  background: rgb(255, 255, 255);
}

@keyframes animate{
  0%{
    transform: translate(-50%, -75%) rotate(0deg);
  }
  100%{
    transform: translate(-50%, -75%) rotate(360deg);
  }
}
section .content{
  position: relative;
  z-index: 1;
  color: #fff;
}

/* From uiverse.io by @alexruix */
.input {
 width: 297px; 
 margin-bottom: 35px;
 margin-top: 11px;
 line-height: 28px;
 border: 2px solid transparent;
 border-bottom-color: #777;
 padding: .2rem 0;
 outline: none;
 background-color: transparent;
 color: #0d0c22;
 transition: .3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.input:focus, input:hover {
 outline: none;
 padding: .2rem 1rem;
 border-radius: 1rem;
 border-color: lightseagreen;
}

.input::placeholder {
 color: #777;
}

.input:focus::placeholder {
 opacity: 0;
 transition: opacity .3s;
}

.button {
  width: 207px;
  --color: lightseagreen;
  padding: 0.4em 1.7em;
  background-color: transparent;
  border-radius: .3em;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: .5s;
  font-weight: 400;
  font-size: 17px;
  border: 1px solid;
  font-family: inherit;
  text-transform: uppercase;
  color: var(--color);
  z-index: 1;
}

.button::before, .button::after {
 content: '';
 display: block;
 width: 50px;
 height: 50px;
 transform: translate(-50%, -50%);
 position: absolute;
 border-radius: 50%;
 z-index: -1;
 background-color: var(--color);
 transition: 1s ease;
}

.button::before {
 top: -1em;
 left: -1em;
}

.button::after {
 left: calc(100% + 1em);
 top: calc(100% + 1em);
}

.button:hover::before, .button:hover::after {
 height: 410px;
 width: 410px;
}

.button:hover {
 color: rgb(10, 25, 30);
}

.button:active {
 filter: brightness(.8);
}

.login {
  width: 407px;
  /* height: 317px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* border: 1px lightseagreen solid; */
}
</style>

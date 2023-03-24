<template>
  <div class="body">
    <a class="buttonDownload" href="/培訓項目學員及獲獎取證記錄收集表.xlsx" download="培訓項目學員及獲獎取證記錄收集表.xlsx">下载模版</a>
    
    <button class="button">上传资料</button>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.body {
  margin: 27vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
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
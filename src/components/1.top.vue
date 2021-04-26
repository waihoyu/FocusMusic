<template>
<div>
  <img src="../assets/1.top.png" alt="">
  <input type="text" v-model="inputvalue" @keyup.enter="tosearch" placeholder="搜索歌曲">
</div>  
</template>

<script>
export default {
  data() {
    return {
      inputvalue:''
    }
  },
  methods:{
      tosearch(){
        if(this.inputvalue==''){
          // alert('请输入搜索内容')
          this.$message({
          showClose: true,
          message: '警告，搜索内容不能为空哦！',
          type: 'warning'
        });
        }else{
          // 使用路由传参
          this.$router.push(`/result?v=${this.inputvalue}`)
        }
      }
  }
}
</script>
<style>
div{
  position: relative;
}
  input{
    text-indent: 1em;
    position: absolute;
    top: 20px;
    right: 15px;
    width: 215px;
    height: 30px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
</style>
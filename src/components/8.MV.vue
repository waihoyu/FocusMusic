<template>
    <div>

      <div>
        <video controls :src="url">
        </video>
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
name: "8.MV",
  data(){
  return{
  //获取的mv播放地址
    url:''
  }
  },
  created() {
  axios({
    url: "https://autumnfish.cn/mv/url",
    method: "get",
    params:{
      id:this.$route.query.v
    }
  }).then(res=>{
    // console.log(res);
    this.url=res.data.data.url
  })
  }
}
</script>

<style scoped>
video{
  width: 80%;
}
</style>
<template>
<div class="songs">
    <!-- topbu -->
    <div class="tab-bar">
        <span :class="{active:tag=='0'}" @click="tag=0">全部</span>
        <span :class="{active:tag=='7'}" @click="tag=7">华语</span>
        <span :class="{active:tag=='96'}" @click="tag=96">欧美</span>
        <span :class="{active:tag=='8'}" @click="tag=8">日本</span>
        <span :class="{active:tag=='16'}" @click="tag=16">韩国</span>
        <!-- <span>华语</span>
        <span>欧美</span>
        <span>韩国</span> -->
    </div>
    <!--歌单表格  -->
    <table>
      <tr>
        <th> </th>
        <th> </th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </tr>
      <tr v-for="(item,index) in lists" :key="index">
        <td><span>{{index+1}}</span></td>
          <!--        添加点击事件来传递播放音乐的id -->
        <td><img :src="item.album.picUrl" alt="" @click="playmusic(item.id)"></td>
        <td>{{item.name}}</td>
        <td>{{item.album.artists["0"].name}}</td>
        <td>{{item.album.name}}</td>
        <td>{{item.duration}}</td>
      </tr>
    </table>
</div>  
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      // 歌曲列表
      lists:[],
      tag:0
    }
  },
  // 事件侦听器
  watch:{
    // 当点击不同的歌曲类型,监听tag的变化,获取不同的type值,来更新页面数据
    tag(){
      this.getlist()
    }
  },
  created(){
     this.getlist()
  },
  methods:{
      getlist(){
            axios({
                  url:'https://autumnfish.cn/top/song',
                  method:'get',
                  params:{
                    type:this.tag
                  }
                }).then(res=>{
                  console.log(res);
                  this.lists=res.data.data
                  // 处理时间格式
                  for(var i=0;i<=this.lists.length;i++){
                      let duration=this.lists[i].duration
                      let min=parseInt(duration/1000/60)
                      let sec=parseInt(duration/1000%60)
                      min=min<10?"0"+min:min
                      sec=sec<10?"0"+sec:sec
                      this.lists[i].duration=`${min}:${sec}`
                  }
                })
      },
      playmusic(id){
          axios({
                  url:'https://autumnfish.cn/song/url',
                  method:'get',
                  params:{
                    id
                  }
                }).then(res=>{
                //通过id获取点击的url 
                let url=res.data.data[0].url
                // 直接获取父组件,可以更改任意的值
                this.$parent.musicUrl=url
                })
      }
  }
}
</script>
<style>
/* 头部 */
.tab-bar span{
  color: #808080;
  font-size: 15px;
  margin-right: 20px;
  cursor: pointer;
}
.tab-bar .active{
  color: #dd6d60;
}
/* 歌单表格 */
td,th{
  color:#808080;
  font-size: #606266;
}
table{
  border-collapse: collapse;
  width: 100%;
} 
.songs table tr{
  margin: 10px 0;
  text-align: center;
  height: 94px;
}
tr>td>img{
  width: 70px;
  height: 70px;
  cursor: pointer;
}
tr:hover{
  background-color: #2A4168;
  color: white;
}
tr:hover td{
  color: white;
}
</style>
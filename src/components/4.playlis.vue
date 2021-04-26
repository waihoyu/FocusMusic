<template>
<div>
      <!-- 头部 -->
      <div class="p-top">
        <img src="" alt="" class="p-top-bg">
          <span>
            <img :src="toplist.coverImgUrl" alt="">
          </span>
          <span>
            <p>精品歌单</p>
            <div class="p-top-text">
                {{toplist.description}}
            </div>
          </span>
      </div>
      <!-- 主体 -->
      <div class="p-main">
        <div class="p-main-top">
          <span class="" :class="{active:tag=='全部'}" @click="tag='全部'">全部</span>
          <span class="" :class="{active:tag=='欧美'}" @click="tag='欧美'">欧美</span>
          <span class="" :class="{active:tag=='华语'}" @click="tag='华语'">华语</span>
          <span class="" :class="{active:tag=='流行'}" @click="tag='流行'">流行</span>
          <span class="" :class="{active:tag=='说唱'}" @click="tag='说唱'">说唱</span>
          <span class="" :class="{active:tag=='摇滚'}" @click="tag='摇滚'">摇滚</span>
          <span class="" :class="{active:tag=='民谣'}" @click="tag='民谣'">民谣</span>
          <span class="" :class="{active:tag=='轻音乐'}" @click="tag='轻音乐'">轻音乐</span>
          <span class="" :class="{active:tag=='影视原声'}" @click="tag='影视原声'">影视原声</span>
          <span class="" :class="{active:tag=='ACG'}" @click="tag='ACG'">ACG</span>
          <span class="" :class="{active:tag=='怀旧'}" @click="tag='怀旧'">怀旧</span>
          <span class="" :class="{active:tag=='治愈'}" @click="tag='治愈'">治愈</span>
          <span class="" :class="{active:tag=='旅行'}" @click="tag='旅行'">旅行</span>
        </div>
        <!-- 图片列表 -->
        <div class="p-lis">
              <div class="r-div" v-for="(item,index) in list" :key="index">
                  <span>播放量：{{item.playCount}}</span>
                  <div class="r-div-img">
                      <img :src="item.coverImgUrl" alt="">
                  </div>
                    <p>{{item.name}}</p>
              </div>
        </div>
        <div class="p-bottom">
            <el-pagination
            @current-change='handlecurrentchange'
            background
            layout="prev, pager, next"
            :page-size='10'
            :current-page='page'
            :total="total">
          </el-pagination>
        </div>
          
      </div>
     
</div>  
</template>

<script>
// 导入axios
import axios from 'axios'
export default {
  data(){
      return{
        // 分页
        // 总的数据条数
        total:0,
        // 当前显示页面
        page:1,
        // 顶部的精品歌单
        toplist:{},
        list:[],
        tag:'全部'
      }
  },
  // 侦听器
  watch:{
    tag(){
          // 顶部的精品歌单
          this.topdata()
          // 歌单列表
          this.listdata()
          this.page=1 
        }
  },
  created(){
    // 顶部的精品歌单
    this.topdata()
    // 歌单列表
    this.listdata()
  },
  methods: {
     // 顶部的精品歌单
      topdata(){
            axios({
                  url:'https://autumnfish.cn/top/playlist/highquality',
                  method:'get',
                  params:{
                    limit:1,
                    cat:this.tag
                  }
                }).then(res=>{
                  // console.log(res);
                  this.toplist=res.data.playlists[0]
                })
      },
      // 歌单列表
      listdata(){
          axios({
                url:'https://autumnfish.cn/top/playlist/',
                method:'get',
                params:{
                  limit:10,
                  // （页面-1）*每一页的数据数量
                  offset:(this.page-1)*10,
                  cat:this.tag
                }
              }).then(res=>{
                // 获取页面的总数据条数
                this.total=res.data.total
                this.list=res.data.playlists
              })
      },
      handlecurrentchange(val){
        // 获取当前页码
        this.page=val
        // 重新获取
        this.listdata()
      } 
  },
}
</script>
<style>
/* 头部 */
  .p-top{
    box-sizing: border-box;
    height: 200px;
    width: 100%;
    background:linear-gradient(#484848,#000000,#484848);
    padding: 20px;
  }
  .p-top span:nth-of-type(1){
    display: inline-block;
    width: 160px;
    height: 160px;
  }
  .p-top span:nth-of-type(2){
    display: inline-block;
    width: 880px;
    height: 160px;
  }
  .p-top span:nth-of-type(2) p{
    margin-left: 10px;
    width: 100px;
    height: 30px;
    line-height: 30px;
    border: 1.5px solid #dfac67;
    color: #dfac67;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
    opacity: .6;
  }
  .p-top span img{
    margin-right: 10px;
    width: 160px;
    height: 160px;
  }

  .p-top-text{
    padding: 0 10px;
    width: 880px;
    height: 100px;
    line-height: 20px;
    /* background-color:rosybrown; */
    margin-top: 10px;
    font-size: 14px;
    color: #888482;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }

  /* 主体 */
  .p-main{
    padding-top: 40px;
    position: relative;
    margin-top: 30px;
    width: 100%;
    /* background-color: burlywood; */
  }
  .p-main-top span{
    cursor: pointer;
    color: #808080;
    font-size: 15px;
    margin-right: 20px;
  }
  .p-main-top {
    position: absolute;
    top: 0;
    right: 0;
  }
  .p-main-top .active{
    color: #dd6d60;
  }
  /* 图片列表 */
  .p-lis{
    width: 1100px;
    height: 524px;
    /* background-color: chartreuse; */
  }
   /* 推荐歌单 */
  p{
    font-size: 20px;
    font-family: 楷体;
  }
  .recomment{
    display: inline-block;
    padding: 10px;
    margin-top: 10px;
    width: 1100px;
    height: 486px;
    /* background-color: teal; */
    box-sizing: border-box;
  }
.r-div{
  position: relative;
  display: inline-block;
  width: 200px;
  height: 233px;
  /* background-color: yellow; */
  margin-left: 14px;
  cursor: pointer;
  overflow: hidden;
}
.r-div:hover span{
/* display: block; */
transform: translateY(60px);
}
.r-div span{
  z-index: 10;
  position: absolute;
  top: -60px;
  left: 0;
  display: inline-block;
  width: 190px;
  background:rgba(0, 0, 0, .1);
  word-wrap: break-word;  
  font-size: 14px;
  line-height: 1.6em;
  padding: 5px;
  transition: all .6s;
  
} 
.r-div-img{
  width: 200px;
  height: 200px;
  /* background-color: tomato; */
  border-radius: 5px;
}
.r-div-img img{
  width: 200px;
  height: 200px;
}
.r-div p{
width: 200px;
height: 19px;
line-height: 19px;
/*把超出的内容进行隐藏*/
overflow: hidden;
/*设置内容不换行*/
white-space: nowrap;
/*设置超出内容为省略号*/
text-overflow: ellipsis;
font-size: 15px;
font-family: 楷体;
}
/* 底部分页 */
.p-bottom{
  padding-top: 0px;
  text-align: center;
  height: 60px;
  width: 100%;
}
</style>
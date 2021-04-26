<template>
<div>
 <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item,index) in banners" :key="index">
      <img :src="item.imageUrl" alt="">
    </el-carousel-item>
  </el-carousel>
    <p>推荐歌单</p>
  <div class="recomment">
    <div class="r-div" v-for="(item,index) in list" :key='index'>
      <span>{{item.copywriter}}</span>
      <div class="r-div-img">
        <img :src="item.picUrl" alt="">
      </div>
      <p>{{item.name}}</p>
    </div>
  </div>
  <!-- 最新音乐 -->
 <div class="news">
    <p>最新音乐</p>
    <div class="news-div" v-for="(item,index) in songs" :key="index">
        <div class="news-imgs">
          <img :src="item.picUrl" alt="" @click="playMusic(item.id)">
        </div>
        <div class="news-text">
          <p>{{item.name}}</p>
          <p>{{item.song.artists[0].name}}</p>
        </div>
  </div>
</div>

   <!-- 最新MV -->
    <div class="mvs">
        <p>推荐MV</p>
        <div class="mvs-lis">
          <div v-for="(item,index) in mvs" :key="index">
            <img :src="item.picUrl" alt="">
            <p>{{item.name}}</p>
            <p>{{item.artistName}}</p>
          </div>
        </div>
    </div>
</div>  

</template>

<script>
  import axios from 'axios'

export default {
  data() {
    return {
      // 轮播图数据
      banners:[],
      // 推荐歌单
      list:[],
      // 最新音乐
      songs:[],
      // 最新MV
      mvs:[]
    }
  },
  created(){
    console.log("222222");
    // 轮播图接口 
    axios({
      url:'https://autumnfish.cn/banner',
      method:'get',
      params:{}
    }).then(res=>{
      this.banners=res.data.banners
    })
    // 推荐歌单
     axios({
      url:'https://autumnfish.cn/personalized',
      method:'get',
      params:{
        // 获取的数量
        limit:10
      }
    }).then(res=>{
      this.list=res.data.result
      // console.log(res)
    })
    // 最新音乐接口
     axios({
      url:'https://autumnfish.cn/personalized/newsong',
      method:'get'
    }).then(res=>{
      this.songs=res.data.result
    })

    // 最新MV
    axios({
      url:'https://autumnfish.cn/personalized/mv',
      method:'get'
    }).then(res=>{
      console.log(res)
      this.mvs=res.data.result
    })
  },
  methods: {
    playMusic(id){
      console.log(id)
       // 播放音乐接口。传参id
     axios({
      url:'https://autumnfish.cn/song/url',
      method:'get',
      params:{id}
    }).then(res=>{
      // 通过id获取点击音乐的url
      let url=res.data.data[0].url
      console.log(url)
      // 获取父亲组件的音乐播放器的url
      console.log(this.$parent.musicUrl)
      this.$parent.musicUrl=url
    })
    }
  }
}
</script>
<style>

   /* .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  } */
  .el-carousel__item:nth-child(2n) {
    background-color: #031936;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__item{
  border-radius: 5px;
  }
    .el-carousel__item img{
      height: 200px;
      width: 100%;
  }
  /* 推荐歌单 */
  p{
    font-size: 20px;
    font-family: 楷体;
  }
  .recomment{
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

/* 最新音乐 */
.news{
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
  height: 545px;
  width: 1100px;
  /* background-color: rosybrown; */
}
.news>p{
  position: absolute;
    font-size: 20px;
    font-family: 楷体;
    margin-bottom: 20px;
  }
.news-div{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 542.5px;
  height: 100px;
  /* background-color: saddlebrown; */
  /* display: inline-block; */
  margin-right: 5px;
  transition: all .5s;
}
.news-div:hover{
background-color: rgb(20, 236, 92);
}
.news-imgs{
  width: 80px;
  height: 80px;
  background-color: #000;
  margin-right: 10px;
}
.news-imgs img{
  cursor: pointer;
   width: 80px;
  height: 80px;
}
.news-text{
  width: 180.69px;
  height: 100px;
}
.news-text>p{
  font-size: 18px;
  font-family: 楷体;
  width: 100%;
  margin-top: 20px;
}

/* <!-- 最新MV --> */
.mvs{
  width: 1100px;
  height: 257px;
  /* background-color: sandybrown; */
  margin-bottom: 55px;
  margin-top: 20px;
}
.mvs>p{
  margin-bottom: 20px;
}
.mvs-lis{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 212px;
  /* background-color: seagreen; */
}
.mvs-lis>div{
  /* display: inline-block; */
  width: 250px;
  height: 212px;
}
.mvs-lis div img{
width: 250px;
height: 150px;
border-radius: 5px;
cursor: pointer;
}
.mvs-lis div p:nth-of-type(1){
font-size: 16px;
color: #000;
margin-top: 3px;
}
.mvs-lis div p:nth-of-type(2){
font-size: 14px;
color: #c5c5c5;
margin-top: 5px;
}
</style>
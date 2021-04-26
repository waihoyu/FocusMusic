<template>
<div class="index">
    <div class="nav">
    <ul>
        <li>
             <router-link to="/findmusic">发现音乐</router-link>
        </li>
        <li>
            <router-link to="/playlis">
            推荐歌单
            </router-link>   
        </li>
        <li>
            <router-link to="songs">
            最新音乐
            </router-link>
        </li>
        <li>
            <router-link to="mvs">
            最新MV
            </router-link>
        </li>
    </ul>
    </div>  
    <!-- 主体内容 -->
    <div class="main">
        <!-- <findmusic></findmusic> -->
        <router-view></router-view>
    </div>
    <!-- 最下部播放标签 -->
    <div class="player">
        <audio :src='musicUrl' controls autoplay></audio>
    </div>
</div> 
</template>
<script>
export default {
    data(){
        return{
            musicUrl:'http://m701.music.126.net/20210314210210/b86b4451112b3f66b2ea172e09ceb17f/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/7744145508/ffd3/aa63/311d/b05da9065509f8b164ab0057d40b2d60.mp3'
        }
    }
}
</script>
<style>
.index{
    /* height: 515px; */
    display: flex;
}
  .nav{
      text-align: center;
      height: 515px;
      width: 200px;
      background-color: #242424;
  }
  .nav li{
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 18px;
  }
  li a{
      color: white;
      font-family: NSimSun;
      text-decoration: none;
  }
  .nav li:hover{
      background-color: #000000;
  }
  /* 右侧容器 */
.main{
    flex: 1;
    padding: 20px;
}
    /* <!-- 最下部播放标签 --> */
.player{
    background: #F1F3F4;
    height: 55px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
.player>audio{
    outline: none;
    width: 100%;
    border-radius: 1px;
    color: #f00;
    /* opacity: .8; */
    /* background-size: cover; */
}
/* 主题内容 */
.main{
    height: 515px;
    overflow-y: scroll;
}
</style>
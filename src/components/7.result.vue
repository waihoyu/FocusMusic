<template>
  <div>
    <h1>
      {{ $route.query.v }}
    </h1>
    <span class="r-span"
      >共计找到个<b>{{ count }}</b
      >结果</span
    >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲" name="first">
        <table id="s-table">
          <tr>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </tr>
          <tr
            v-for="(item, index) in songlist"
            :key="index"
            @dblclick="playmusic(item.id)"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.artists[0].name }}</td>
            <td>{{ item.album.name }}</td>
            <td>{{ item.duration }}</td>
          </tr>
        </table>
      </el-tab-pane>

      <el-tab-pane label="歌单" name="second">
        <div class="s-mvs-mian">
          <div v-for="(item,index) in playlists" :key="index">
            <img :src="item.coverImgUrl" alt="" />
            <!-- 播放量 -->
            <div class="playnum">播放量{{item.playCount}}</div>
            <p>{{item.name}}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="third">
        <div class="mvs-mian">
          <div v-for="(item,index) in mv" :key="index" @click="toMV(item.id)">
            <img :src="item.cover" alt="" />
            <!-- 播放量 -->
            <div class="playnum">{{item.playCount}}</div>
            <div class="mv-timer">时间：{{item.duration}}</div>
            <p>{{item.name}}</p>
            <p>{{item.artistName}}</p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // keywords:'',
      //   默认选中第二个
      activeName: "first",
      // 保存查询的歌曲
      songlist: [],
       // 保存查询的歌单
      playlists: [],
       // 保存查询的歌单
      mv: [],
      // 搜索的总数据条数
      count: 0
    };
  },
  created() {
    // 发送请求函数的调用
      this.search()
  },
  // 添加监听器
  watch: {
//     this.$route.query.v(){
//
// },
//    监听tab切换时，改变数据
    activeName() {
      //songs  歌曲
      // lists  歌单
      // mv   mv

      let type = 1;
      switch (this.activeName) {
        case "first":
          type = 1;
          break;
        case "second":
          type = 1000;
          break;
        case "third":
          type = 1004;
          break;
        default:
          break;
      }
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.v,
          type,
          // 获取的数量
          limit: 100,
        },
      }).then((res) => {
        if (type == 1) {
          //  搜索的总数量
          this.count = res.data.result.songCount;
          this.songlist = res.data.result.songs;
          // 处理时间格式
          for (let i = 0; i <= this.songlist.length; i++) {
            // let duration = this.songlist[i].duration;
            let min = parseInt(this.songlist[i].duration / 1000 / 60);
            let sec = parseInt((this.songlist[i].duration / 1000) % 60);
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            this.songlist[i].duration = min + ":" + sec;
          }
        }else if(type==1000){
          console.log(111111111111111111)
          // 歌单的逻辑
          console.log(res)
            this.playlists=res.data.result.playlists
            this.count=res.data.result.playlistCount
        }else{
          this.mv=res.data.result.mvs
          this.count=res.data.result.mvCount
          //  处理时间格式
          for (let i = 0; i <= this.mv.length; i++) {
            // let duration = this.songlist[i].duration;
            let min = parseInt(this.mv[i].duration / 1000 / 60);
            let sec = parseInt((this.mv[i].duration / 1000) % 60);
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            this.mv[i].duration = min + ":" + sec;
            // 处理播放次数格式
            if (this.mv[i].playCount>10000){
              this.mv[i].playCount=parseInt(this.mv[i].playCount/10000)+'万'
            }
          }
        }
      });
    },
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //  去mv页面
    toMV(id){
      this.$router.push(`/mv?v=${id}`)
    },
    // 封装搜索请求
    search(){
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.v,
          type: 1,
          // 获取的数量
          limit: 100,
        },
      }).then((res) => {
        //  搜索的总数量
        this.count = res.data.result.songCount;
        this.songlist = res.data.result.songs;
        // 处理时间格式
        for (let i = 0; i <= this.songlist.length; i++) {
          let duration = this.songlist[i].duration;
          let min = parseInt(this.songlist[i].duration / 1000 / 60);
          let sec = parseInt((this.songlist[i].duration / 1000) % 60);
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          this.songlist[i].duration = min + ":" + sec;
        }
      });
    },
    playmusic(id) {
      console.log(id);
      // 播放音乐接口。传参id
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: { id },
      }).then((res) => {
        // 通过id获取点击音乐的url
        let url = res.data.data[0].url;
        console.log(url);
        // 获取父亲组件的音乐播放器的url
        console.log(this.$parent.musicUrl);
        this.$parent.musicUrl = url;
      });
    },
  },
};
</script>

<style>
h1 {
  display: inline-block;
  margin-right: 10px;
}
.r-span {
  color: #ccc;
  font-size: 13px;
}
tr:first-of-type > th {
  color: tomato;
}
tr {
  cursor: pointer;
  text-align: left;
  height: 50px;
}

/* 歌单列表 */
.s-mvs-mian {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.s-mvs-mian > div {
  /* margin-top: 40px; */
  position: relative;
  width: 218px;
  height: 260px;
  /* background-color: rgb(231, 9, 9); */
}
.s-mvs-mian > div > img {
  cursor: pointer;
  border-radius: 5px;
  width: 200px;
  height: 200px;
}
.s-mvs-mian > div > p:first-of-type {
  margin: 5px 0;
  font-size: 15px;
  color: #000;
}
.s-mvs-mian > div > p:last-of-type {
  font-size: 13px;
  color: #ec1313;
}
.playnum {
  position: absolute;
  top: 0;
  right: 45px;
  color: black;
}

/* mv'部分 */
/* 歌单列表 */
.mvs-mian {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.mvs-mian > div {
  position: relative;
  width: 275px;
  height: 210px;
  /* background-color: rgb(231, 9, 9); */
}
.mvs-mian > div > img {
  cursor: pointer;
  border-radius: 5px;
  width: 250px;
  height: 150px;
}
.mvs-mian > div > p:first-of-type {
  margin: 5px 0;
  font-size: 15px;
  color: #000;
}
.mvs-mian > div > p:last-of-type {
  font-size: 13px;
  color: #c5c5c5;
}
.playnum {
  position: absolute;
  top: 0;
  right: 45px;
  color: white;
}

/* 分页 */
/*.s-fenye {*/
/*  height: 80px;*/
/*}*/
</style>
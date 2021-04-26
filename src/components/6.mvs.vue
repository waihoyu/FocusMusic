<template>
<div class="mvs">
    <div class="mvs-top">
        <ul>
          <span>地区：</span>
          <li :class="{active:area=='全部'}" @click="area='全部'">全部</li>
          <li :class="{active:area=='内地'}" @click="area='内地'">内地</li>
          <li :class="{active:area=='港台'}" @click="area='港台'">港台</li>
          <li :class="{active:area=='欧美'}" @click="area='欧美'">欧美</li>
          <li :class="{active:area=='日本'}" @click="area='日本'">日本</li>
          <li :class="{active:area=='韩国'}" @click="area='韩国'">韩国</li>

        </ul>
         <ul>
           <span>类型：</span>
          <li :class="{active:type=='全部'}" @click="type='全部'">全部</li>
          <li :class="{active:type=='官方版'}" @click="type='官方版'">官方版</li>
          <li :class="{active:type=='原声'}" @click="type='原声'">原声</li>
          <li :class="{active:type=='现场版'}" @click="type='现场版'">现场版</li>
          <li :class="{active:type=='网易出品'}" @click="type='网易出品'">网易出品</li>
        </ul>
         <ul>
           <span>排序：</span>
          <li :class="{active:order=='上升最快'}" @click="order='上升最快'">上升最快</li>
          <li :class="{active:order=='最热'}" @click="order='最热'">最热</li>
          <li :class="{active:order=='最新'}" @click="order='最新'">最新</li>
        </ul>
    </div>
    <div class="mvs-mian">
        <div v-for="(item,index) in list" :key="index">
              <img :src="item.cover" alt="">
              <!-- 播放量 -->
              <div class="playnum">{{item.playCount}}</div>
              <p>{{item.name}}</p>
              <p>{{item.artistName}}</p>
        </div>
    </div>  

    <!-- 分页 -->
     <div class="mvs-bottom">
            <el-pagination
            @current-change='handlecurrentchange'
            background
            layout="prev, pager, next"
            :page-size='limit'
            :current-page='page'
            :total="total">
          </el-pagination>
        </div>
</div>  

</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      // 页码值中的数据
      // 总条数
      total:'20',
      // 页码
      page:1,
      // 页码容量
      limit:8,
      // 获取的数据
      // 地区
      area:'全部',
      // 类型
      type:'全部',
      // 排序
      order:'最热',
      list:[]
    }
  },
  watch:{
    
    area(){
      this.page=1,  
       this.getList()
    },
    type(){
      this.page=1,  
      this.getList()
    },
    order(){
      this.page=1,  
       this.getList()
    }
  },
  created(){
      this.getList()
  },
  methods:{
    getList(){
axios({
            url:'https://autumnfish.cn/mv/all',
            method:'get',
             params:{
             // 地区
            area:this.area,
            // 类型
            type:this.type,
            // 排序
            order:this.order,
            limit:this.limit,
            offset:(this.page-1)*this.limit
            }
           }).then(res=>{
             this.list=res.data.data
            //  接口bug
             res.data.count?this.total=res.data.count:''
           })
    },
    handlecurrentchange(val){
      this.page=val
      this.getList() 
    }
  }
}
</script>
<style>
/* 头部 */
  .mvs-top{
    display: flex;
    /* 设置主轴方向 column自上向下  默认从左向右*/
    flex-direction: column;
    justify-content: space-between;
    height: 117px;
    width: 100%;
    /* background-color: brown; */
  }
  ul,li{
    list-style: none;
 
  }
  .mvs-top ul>li{
    display: inline-block;
    /* width: 109px; */
    height: 25px;
    line-height: 25px;
    padding: 0 20px;
    margin-right: 20px;
    /* border-right: 1px solid #808080; */
    color: #808080;
    font-size: 14px;
    cursor: pointer;
  }
   .mvs-top ul .active{
    color: #e92020;
    background-color: #2a15e9;
    border-radius: 15px;
  }

  /* 歌单列表 */
.mvs-mian{
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

}
.mvs-mian>div{
  position: relative;
  width: 275px;
  height: 210px;
  /* background-color: rgb(231, 9, 9); */
}
.mvs-mian>div>img{
  cursor: pointer;
  border-radius: 5px;
  width: 250px;
  height: 150px;
}
.mvs-mian>div>p:first-of-type{
  margin: 5px 0;
  font-size: 15px;
  color: #000;
}
.mvs-mian>div>p:last-of-type{
  font-size: 13px;
  color: #c5c5c5;
}
.playnum{
  position: absolute;
  top: 0;
  right: 45px;
  color: white;
}

/* 分页 */
.mvs-bottom{
  text-align: center;
  height: 110px;
  margin-top: 10px;
}
</style>
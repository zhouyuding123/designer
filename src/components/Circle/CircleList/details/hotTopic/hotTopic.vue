<template>
  <div style="margin-top:40px">
    <div class="box" v-for="(item,index) in remenlist" @click="todetails(item.id)" :key="index">
        <div class="flex al-c">
             <div><img src="@/assets/imgers/icon/14756@2x.png" style="margin-right:9px;height:40px;width:40px" alt=""></div>
              <div class="maintitle">{{item.title}}</div>
        </div>
              <div class="flex al-c ">
              <div class="maincontent coloccc font12">
                {{item.count}}篇内容
              </div>
              <div class="line"></div>
              <div class="coloccc font12">
                {{item.browse}}次浏览
              </div>
            </div>
    </div>


  </div>
</template>

<script>
import { postD } from "@/api";
import { ForumthemelistApi} from "@/urls/wsUrl";
export default {
    data() {
        return {
            remenlist:[]
        }
    },
    created() {
        this.getremenlist()
    },
    methods: {
        getremenlist(){
            postD(ForumthemelistApi()).then(res=>{
                if(res.code==200){
                    this.remenlist=res.list
                }else{
                     this.$message(res.msg);
                }
            })

        },
        todetails(id){
        this.$router.push({
            path:'/hotTopicdetail',
            query:{
                id:id
            }
        })
        }
    },
}
</script>

<style lang="less" scope>
.box{
width: 1280px;
margin: 0 auto;
// margin-left: auto;
display: flex;
justify-content: space-between  ;
padding: 20px 40px;
margin-bottom: 20px;
height: 80px;
background: #FFFFFF;
border-radius: 6px 6px 6px 6px;
opacity: 1;
max-height: 680px;
     .maintitle{
        font-size: 20px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;

      }
            .line{
        width: 0px;
        height: 10px;
        opacity: 1;
        margin: 0 11px;
        border-right: 1px solid #CCCCCC
      }
}
</style>
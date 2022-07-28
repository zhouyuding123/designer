<template>
<div>
  <div class="wrap">
    <div class="maintitle">
        套餐选择
    </div>
    <div class="flex ju-a">
    <div class="cardbox">
        <div class="title">月卡会员</div>
        <div class="nowprice"><span class="font24 margin-right4">¥</span>888</div>
          <div class="price">¥1000</div>
        <div class="describe">每天仅需30元</div>
    </div>
        <div class="cardbox">
        <div class="title">月卡会员</div>
               <div class="nowprice"><span class="font24 margin-right4">¥</span>888</div>
          <div class="price">¥1000</div>
        <div class="describe">每天仅需30元</div>
    </div>
        <div class="cardbox">
        <div class="title">月卡会员</div>
               <div class="nowprice"><span class="font24 margin-right4">¥</span>888</div>
          <div class="price">¥1000</div>
        <div class="describe">每天仅需30元</div>
    </div>
    </div>
  </div>
  <div class="wrap" style="margin-top:20px">

    <div class="flex ju-b">
    <div class="maintitle">
       支付方式
    </div>
    <div class="" style="margin-right:40px" >
    <span class="font14 color999 fontw400">应付金额：</span>
    <span  style="color:#F20000">¥</span>
    <span class="font28" style="color:#F20000;font-weight:bold">889.00</span>
    </div>
    </div>
    <div class="flex ju-b" style="margin:0 370px">
        <div class="pay">
       <div class="payborder">
        <img src="" alt="">

        </div> 
         <div class="word">
            支付宝支付
        </div>
        </div>
                <div class="pay">
       <div class="payborder">
        <img src="" alt="">

        </div> 
         <div class="word">
            微信支付
        </div>
        </div>
    </div>
  </div>

  <div class="font14 paddtb20">
    <span>
    <el-checkbox v-model="checked"  @change="zxc"></el-checkbox>
    </span>
    
  
    <span>我已阅读并同意</span>
    <span style="font-weight:400;color:#1677FF;text-decoration:underline">会员权益及付费说明</span>
  </div>
</div>

</template>

<script>
export default {

}
</script>

<style lang="less" scope>
.wrap{
    width: 1400px;
    height: 400px;
    background-color:#fff;
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 20px;
    padding-top:40px;
    .maintitle{
        font-size: 24px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-left: 60px;
        width: 96px;
        height: 33px;
        // margin-top:40px;

    }
    
    .cardbox{
        width: 380px;
        height: 260px;
        background: #FFFFFF;
        border-radius: 12px 12px 12px 12px;
        opacity: 1;
        padding-top: 40px;
        border: 1px solid #CCCCCC;
        // background: url('/Users/yucong/Desktop/设计师web/designer/src/assets/imgers/15001@2x.png');
        background-size: cover;
        .title{
               
                height: 33px;
                font-size: 24px;
                font-family: PingFang SC-Bold, PingFang SC;
                font-weight: bold;
                color: #905F12;
             
        }
        .nowprice{
        height: 84px;
        font-size: 60px;
        font-family: PingFang SC-Heavy, PingFang SC;
        font-weight: 800;
        color: #333333;
        }
        .price{   
                font-size: 18px;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #DDC47F;
                margin-bottom: 20px;
                text-decoration: line-through;
        }
        .describe{
            font-size: 18px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #CCCCCC;
        }
    }
    .pay{
        .payborder{
            width: 200px;
            height: 200px;
            border-radius: 0px 0px 0px 0px;
            opacity: 1;
            border: 1px solid #25ABEE;
            .img{
            width: 200px;
            height: 200px;
            }
        }
        .word{
            width: 200px;
            height: 40px;
            background: #25ABEE;
            border-radius: 3px 3px 3px 3px;
            font-size: 24px;
            margin-top: 10px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 40px;
            color: #FFFFFF;
        }
    }
}
// /deep/.el-checkbox {
//     border-radius: 50%;
// }
// .xf {
//     text-align: center;

//     /deep/.el-checkbox__input {
//         border-radius: 50%;
//         border-color: #FFDC00;
//     }
// }
</style>
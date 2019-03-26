/* 页面初始化的数据 */
var nowusermsg = {
    requestData:{},
    valone:'',
    myuid:111,   // 登录用户自己的uid
    uid:111,    // 是查询单号的uid，不是自己的uid。
    id:111,
    state:111,
    clickPerson:"own",   // 是那个点击的，默认是自己点击的。other代表其他人点击的，被查看了
    openid:111,  
    phone:111,    // 登录用户自己的电话号
    personNumber:0,  // 报名人数，默认为1
}


$(function(){
        nowusermsg.myuid = localCache("uid-kongbatong");
        nowusermsg.openid = localCache("openid-kongbatong");
        console.log("nowusermsg.myuid",nowusermsg.myuid,"openid",nowusermsg.openid);
    showLodding("请稍等，加载中...");
    /* 点击时  地图上添加一个maker点 并且聚焦 */
    parseFloat()
   $(".cfdsdmdiv").bind("touch click",function(){
       var result =  {P:parseFloat(nowusermsg.requestData.dLat),R:parseFloat(nowusermsg.requestData.dLng),lat:parseFloat(nowusermsg.requestData.dLat),lng:parseFloat(nowusermsg.requestData.dLng)};
       autocfdiv(result);
   })  
   $(".mddsdmdiv").bind("touch click",function(){
        var result =  {P:parseFloat(nowusermsg.requestData.aLat),R:parseFloat(nowusermsg.requestData.aLng),lat:parseFloat(nowusermsg.requestData.aLat),lng:parseFloat(nowusermsg.requestData.aLng)};
        autocfdiv(result);
   })
   $(".cfdsdmdivbt").bind("touch click",function(){
         var result =  {P:parseFloat(nowusermsg.requestData.dLat),R:parseFloat(nowusermsg.requestData.dLng),lat:parseFloat(nowusermsg.requestData.dLat),lng:parseFloat(nowusermsg.requestData.dLng)};
        autocfdiv(result);
    })  
    $(".mddsdmdivbt").bind("touch click",function(){
        var result =  {P:parseFloat(nowusermsg.requestData.aLat),R:parseFloat(nowusermsg.requestData.aLng),lat:parseFloat(nowusermsg.requestData.aLat),lng:parseFloat(nowusermsg.requestData.aLng)};
        autocfdiv(result);
    })
    // 报名人数初始化
    $("#person-jtnumber").text(nowusermsg.personNumber);
    $("#person-plus").bind("touch click",function(){
        nowusermsg.personNumber++;
        $("#person-jtnumber").text(nowusermsg.personNumber);
    })
    $("#person-reduce").bind("touch click",function(){
        if( nowusermsg.personNumber === 0 ){
            return false;
        }else {
            nowusermsg.personNumber--;
            $("#person-jtnumber").text(nowusermsg.personNumber);
        }
    })
    $("#person-number").hide();
    // 页面的初始化
   /* 获取路由的值 */
   hqselectval();
   console.log(2,nowusermsg);
})


/* 获取向数据库获取值的定义id 和 uid */
    function hqselectval(){
        var hashval = window.location.hash;
        var valone = hashval.split("?");
        nowusermsg.valone  = valone[0];
        var valtwo = valone[1].split("&");
        var valid = valtwo[0].split("=");
        var valuid = valtwo[1].split("=");
        nowusermsg.id =  parseInt(valid[1]);
        nowusermsg.uid = parseInt(valuid[1]);
        
        var sjaaa = hashval.split("&");
        nowusermsg.valone= sjaaa[2]
        console.log(sjaaa);
        // sf=run出现 就代表不是自己点的数据
        if(nowusermsg.valone === "sf=run"){
            nowusermsg.clickPerson = "other";  // 其他点击的，被查看了。
        }else if( nowusermsg.valone === "oneself" ){
            nowusermsg.clickPerson  = "oneself";
        }else  {   // 是自己点自己
            /* 初始化的数据 */
            nowusermsg.clickPerson = "own";  // 自己点击自己
        }
        // 开始向后台发送获取数据
        ajaxhair(nowusermsg.id,nowusermsg.uid);
    }
/* 发送ajax的数据 */
    function ajaxhair(id,uid){
        $.ajax({
            type:"post",
            url:"http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/getFROrderDetails.asp",
            data:{
              uid:uid,
              id:id,
            },
            success:function(data){
                console.log("获取成功的数据",data);
                //  本地化数据
                nowusermsg.requestData = data.obj;
                rendering(data);
                
                if( data.obj.pushType === "Passenger" ){    // 乘客身份
                    trips.passerResult();
                }else if(  data.obj.pushType === "Driver" ){    // 车主身份逻辑的
                    trips.driverResult();
                }
                
                /* 加载成功，取消提示按钮 */
                clearDialog();
            },
            error:function(data){
                console.log("失败的原因",data);
                $("#qxsfcxinxi").bind("touch click",function(){
                    qxsfcxinxi();
                })
                /* 加载失败，取消提示按钮 */
                clearDialog();
                /* 弹出提示信息 */
                showMessage1btn("网络故障,刷新在试","",0);
            }
        })
    }   
// 行程支付功能的模块
    var trips =  {
        state:0,   // 单子的状态，默认为0，
        template:{
            cancel:"<button class='tmpcancel'>取消</button>",  // 取消按钮
            deal:"<button class='tmpdeal'>成交</button>",    // 成交按钮
            Tsinformation:"<div>取消成功,正在退款中</div>",  // 提示按钮，提示他
            Tsinfm:'<div class="clearfix"><div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;border-top: 1px solid #f2f2f2;border-bottom: 1px solid #f2f2f2;">祝您旅途愉快,请您注意安全</div></div>',    // 正在行程中
        },
        passerResult:function(){   // 车主查看乘客(乘客被查看)
            var data = nowusermsg.requestData;
            trips.state = data.state;
            //  State	int	状态（-1:失效；0：发布；1：完结；2：接单)
            if( nowusermsg.clickPerson === "own" ){    // 自己点自己
                if (data.state === -1 ){    
                    $(".sdstatusd").text("已失效");
                   // $("#tmpbutton").empty();
                }else if ( data.state === 0 ){  // 没有人接单
                    // 没人接单(乘客流程中就已经付钱了)  ： 有取消按钮 
                    $(".sdstatusd").text("已发布");
                   $("#tmpbutton").empty();
                    // 取消发布之后，
                   $("#tmpbutton").append("<div id='cancelRelease' style='width: 150px;height: 36px;line-height: 36px;color: #fff;background: #31b0d5;text-align: center;border-radius: 6px;margin: 0 auto;font-size: 16px;' onclick='qxsfcxinxi()'>取消发布</div>");
                }else if ( data.state === 1 ){  // 单子已完成
                    // 有人接单,乘客自己点击完成：没有按钮，只提示旅途愉快,注意安全
                    $(".sdstatusd").text("已完结");
                    $("#tmpbutton").empty();
                    $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;border-top: 1px solid #f2f2f2;border-bottom: 1px solid #f2f2f2;">祝您旅途愉快,请您注意安全</div>')
                }else if ( data.state === 2 ){  // 已被接单
                    $(".sdstatusd").text("已接单");
                    // 有人接单(有车主接单了,乘客自己没点完成)：提前一小时有	：有成交按钮   取消按钮
                    $("#tmpbutton").empty();
                    $("#tmpbutton").append('<div class="clearfix" style="width:50%;display:inline-block;"><div class="cancel_button" style="background: #31b0d5;"  onclick="qxsfcxinxi()">取消发布</div></div><div class="clearfix"  style="width:47%;display:inline-block;"><div class="cancel_button"  style="background:#2b5ae3;" onclick="trips.passerDeal()">成交</div></div>');
                }
            }else if( nowusermsg.clickPerson === "other"){   // 被别人查看的
                if( parseInt(nowusermsg.uid) === parseInt(nowusermsg.myuid) ){
                    $("#tmpbutton").empty();
                    $(".sdstatusd").text("等待他人接单");
                }else{
                    if( data.state === -1 ){
                        $(".sdstatusd").text("已失效");
                        $("#tmpbutton").empty();
                    }else if( data.state === 0 ){  // 单子可接
                        $(".sdstatusd").text("可接单");
                        $("#tmpbutton").empty();
                        // 添加一个接单按钮
                        $("#tmpbutton").append('<div class="cancel_button" style="background:#31b0d5;" onclick="Receipt(0)">接单</div>');
                    }else if ( data.state === 1 ){   // 已完成
                        $(".sdstatusd").text("抱歉,单子已完成");
                        $("#tmpbutton").empty();
                    }else if( data.state === 2 ){   // 已被接单
                        $(".sdstatusd").text("抱歉,单子已被接");
                        $("#tmpbutton").empty();
                    }
                }
            }else if( nowusermsg.clickPerson  === "oneself"  ){   // 车主的我的订单里只有提醒话，其他什么都没有。
                // 车主看乘客的  如果 2  则是 乘客点击了成交按钮，其他则提示提醒乘客点击成交
                if(data.state === 1 ){   // 完结
                    $(".sdstatusd").text("接单成功");
                    $("#tmpbutton").empty();
                    $("#tmpbutton").append('<div  style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;">行程中请系好安全带</div>');
                }else{
                    $(".sdstatusd").text("接单成功");
                    $("#tmpbutton").empty();
                    $("#tmpbutton").append('<div  style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;">请等待乘客点击确认</div>');
                }
            }   
        },
        driverResult:function(){
            var data = nowusermsg.requestData;
             //  State	int	状态（-1:失效；0：发布；1：完结；2：接单)
            if( nowusermsg.clickPerson === "own" ){    // 自己点自己
                if( data.state === -1 ){  
                    // 失效了  车主失效没有按钮
                    $("#tmpbutton").empty();
                    $(".sdstatusd").text("已失效");
                }else if( data.state ===  0 ){
                    //  发布成功
                    $(".sdstatusd").text("发布成功");
                    $("#tmpbutton").empty();
                    // 取消发布之后，
                   $("#tmpbutton").append("<div id='cancelRelease' style='width: 150px;height: 36px;line-height: 36px;color: #fff;background: #31b0d5;text-align: center;border-radius: 6px;margin: 0 auto;font-size: 16px;' onclick='qxsfcxinxi()'>取消发布</div>");
                }else if( data.state === 1 ){
                    // 已完成
                    $("#tmpbutton").empty();
                    $(".sdstatusd").text("已完成");
                }else if( data.state === 2 ){
                    // 已被接单  报名一个就算接单
                    $("#tmpbutton").empty();
                    $(".sdstatusd").text("等待报名中");
                    $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;"">等待报名</div>');
                }   
            }else if( nowusermsg.clickPerson === "other"){   // 被别人查看的
                if( parseInt(nowusermsg.uid) === parseInt(nowusermsg.myuid) ){
                    $("#tmpbutton").empty();
                    $(".sdstatusd").text("等待别人报名");
                }else {
                    if( data.state === -1 ){
                        $(".sdstatusd").text("已失效");
                        $("#tmpbutton").empty();
                    }else if( data.state === 0 ){  // 单子可接
                        $(".sdstatusd").text("可以报名");
                        $("#person-number").show();
                        $("#tmpbutton").empty();
                        $("#tmpbutton").append('<div class="cancel_button" style="background:#31b0d5;" onclick="Receipt(1)">报名</div>');
                    }else if ( data.state === 1 ){   // 已完成
                        $(".sdstatusd").text("抱歉,单子已完成");
                        $("#tmpbutton").empty();
                    }else if( data.state === 2 ){   // 已被接单
                        $(".sdstatusd").text("可以报名");
                        $("#person-number").show();
                        $("#tmpbutton").empty();
                        $("#tmpbutton").append('<div class="cancel_button" style="background:#31b0d5;" onclick="Receipt(1)">报名</div>');
                    }
                }
                
            }else if( nowusermsg.clickPerson  === "oneself"  ){  // 乘客查看 我的支付，我的支付时车主行程，有成交按钮和取消成交按钮
                if( data.state === 1 ){  // 用户已经点击确认了
                    $(".sdstatusd").text("已确认订单");
                    $("#tmpbutton").empty();
                    $("#tmpbutton").append('<div  style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;">旅途中请系好安全带</div>');
                }else {   // 乘客可以点击取消和成交按钮
                    $(".sdstatusd").text("报名成功");
                    $("#tmpbutton").empty();
                    $("#tmpbutton").append('<div style="display:inline-block;width:48%;" class="clearfix"><div class="cancel_button" style="background:#5cb85c;" onclick=" qxsfcxinxi(0)">取消订单</div></div><div  style="display:inline-block;width:48%;" class="clearfix"><div class="cancel_button" style="background:#31b0d5;" onclick="trips.passerDeal()">成交</div></div>');
                }
            }
        },
        passerDeal:function(){   // 乘客点击成交的操作函数
            // 用户点成交要出发完结的ajax
            $.ajax({
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/updateFROrders.asp",
                type:"post",
                data:{
                    uid:nowusermsg.uid,
                    id:nowusermsg.id,
                    state:1   // 1 是完结
                },
                success:function(data){
                    paymentModule.payMoney(nowusermsg.requestData.price,"成交",nowusermsg.requestData.personNum);
                },
                error:function(data){
                    console.log("成交失败",data);
                }
            })
        },
    }
// 向后台请求人数，接单
    function Receipt(val){

        if(val === 0){ // 车主接乘客的单(接单)
            receiptSign();
        }else if(val === 1){ // 乘客报名车主的单(报名直接付钱)
            nowusermsg.personNumber = parseInt($("#person-jtnumber").text());
            if( nowusermsg.personNumber === 0 ){
                showMessage1btn("请先选择人数","",0);
                return false ;
            }else{
                receiptAjax();
            }
        }
        function receiptAjax(){
            $.ajax({
                type:"post",
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/getCurrentPNum.asp",
                data:{
                    froId:nowusermsg.id
                },
                success:function(data){
                    
                    console.log("请求人数的数据",data);
                    if( data.result.leftNum < nowusermsg.personNumber ){
                        if( nowusermsg.personNumber >  (data.result.leftNum+data.result.unPayNum)){
                            showMessage1btn("已满","",0);
                            return false ;
                        }else{
                            $("#tmpbutton").empty();
                            // 不行就初始化
                            nowusermsg.personNumber  = 0 ;
                            $("#person-jtnumber").text(nowusermsg.personNumber);
                            showMessage1btn("五分钟后刷新重试","",0);
                            $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;border-top: 1px solid #f2f2f2;border-bottom: 1px solid #f2f2f2;">五分钟后刷新重试</div>');
                            $(".sdstatusd").text("五分钟后刷新重试");
                        }
                    }else if ( data.result.leftNum >= nowusermsg.personNumber  ) {
                        paymentModule.payMoney(nowusermsg.requestData.price,"报名",nowusermsg.requestData.personNum); 
                    }
                },
                error:function(data){
                    showMessage1btn("网络出错,请重试!","",0);
                }
            })
        }
        function receiptSign(){
            $.ajax({
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeFROReceipts/saveMadeFROReceipts.asp",
                type:"post",
                data:{
                    uid:nowusermsg.myuid,
                    froId:nowusermsg.id,
                    utype:"Driver"
                },
                success:function(data){
                    console.log("报名成功",data);
                    if( data.result === -1 ){
                        showMessage1btn("获取用户失败,请重新打开页面","",0);
                    }else{
                        showMessage1btn("接单成功,请联系乘客","",0);
                        $("#tmpbutton").empty();
                        $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;">接单成功,请您电联乘客</div>');
                        $(".sdstatusd").text("接单成功");
                    }
                },
                error:function(data){
                    showMessage1btn("接单失败,请重试","",0);
                }
            })
            
        }
    }
// 订单详情页的支付模块
    // 支付模块
    var  paymentModule = {
        paymentbttsj:{
            title:"",
            amount:0,
            billno: "FRO",   // 生成订单号 
            instant_channel:"wx", // 订单支付形式 
            openid:{},  // openid的存储 
            usource:"Wx_Kbt",   // 用户的来源 
            FROID:111     // 发布单号，取当前信息的id值 
        },
        payMoney:function(moneyVal,pdval,psersonnumber){  // 只有乘客报名车主的行程才需要付钱 
           var paymentbttsj =  paymentModule.paymentbttsj;
            paymentbttsj.title = "乘客报名";
            
         
            var bSign = "";
            var rand = "";
            for(var i = 0; i < 3; i++){
                var r = Math.floor(Math.random() * 10);
                rand += r;
            }
            // 生成时间戳 "yyyyMMddhhmmss" 格式
            function pad2(n) { return n < 10 ? '0' + n : n };
            function generateTimeReqestNumber() {
                var date = new Date();
                return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
            }

            var sjc = generateTimeReqestNumber();
            paymentbttsj.billno = "FRO";
            paymentbttsj.billno = paymentbttsj.billno + sjc + rand;
            // 这里调用后那个 函数，发布单号，接受单号后，后面再继续
            // 向后台请求 id 
            $.ajax({
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeFROViewPayments/saveMadeFROVPayments.asp",
                type:"post",
                data:{
                    uid:nowusermsg.myuid,
                    froId:nowusermsg.id,	
                    utype:"Passenger",
                    pnum:nowusermsg.personNumber   // 人数为选择人数
                },
                success:function(data){

                    console.log("支付的id",data);
                    // 返回数据库中生成的 id 号
                   
                    var paymentbttsj =  paymentModule.paymentbttsj;
                    paymentbttsj.FROID   =  data.result;
                        // 参数
                    paymentbttsj.amount   = moneyVal*100*psersonnumber;
                    var param = {"title" : paymentbttsj.title,"amount" : paymentbttsj.amount,"outtradeno" : paymentbttsj.billno};
                    // 地址
                    var url = "../../../common/getBSign-kongbatong.asp";
                    // sfcsj.passenger 存储着用户的信息 
                
                    
                    paymentbttsj.openid = {
                        uid:nowusermsg.myuid,
                        phone:nowusermsg.phone,
                        usource:paymentbttsj.usource,
                        FROVPID:paymentbttsj.FROID,
                        utype:"Passenger"   // 付钱的是当前身份
                    };
                    console.log(param);
                    $.post(url,param,function(data){

                        if (!((typeof (data) == 'object') && data.constructor == Object)) {
                            data = eval("(" + data + ")");
                        }
                        if(data.BSign) {
                            bSign = data.BSign;
                        BC.err = function(data) {
                            console.log(data);
                            //注册错误信息接受
                            showMessage1btn(data["ERROR"],"",0);
                        }
                        console.log("aaaa",bSign,"aaaa",nowusermsg.openid,"aaaa",paymentbttsj.openid);
                    BC.click({
                        "instant_channel" : paymentbttsj.instant_channel,
                        "debug" : true,
                        "need_ali_guide" : true,
                        "use_app" : true,
                        "title" : paymentbttsj.title, //商品名
                        "amount" : moneyVal*100,  //总价（分）
                        "out_trade_no" : paymentbttsj.billno, //自定义订单号
                        "sign" : bSign, //商品信息hash值，含义和生成方式见下文
                        "openid" : nowusermsg.openid,
                        "optional" : paymentbttsj.openid //可选，自定义webhook的optional回调参数
                    },
                    {
                        wxJsapiFinish : function(res) {
                            //jsapi接口调用完成后
                            //showMessage1btn(JSON.stringify(res),"",0);
                            switch(res.err_msg){
                                case "get_brand_wcpay_request:ok":
                                    if (pdval=="报名") {
                                            //报名成功要付报名费给我们,
                                        showMessage1btn("支付报名成功,请联系车主","",0);

                                        // 成功了要把电话显示出来   
                                        $(".sfvaldiv").text(nowusermsg.requestData.customerList[0].trim());
                                        // 成功后初始化
                                        nowusermsg.personNumber  = 0 ;
                                        $("#person-jtnumber").text(nowusermsg.personNumber);

                                        $("#tmpbutton").empty();
                                        $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;">报名成功,请您电联车主</div>');
                                        $(".sdstatusd").text("报名成功");
                                    }else if (pdval=="成交") {
                                        console.log("点击成交",data);
                                        $("#tmpbutton").empty();
                                        showMessage1btn("已成交,祝您旅途愉快！","",0);
                                        $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;">祝您旅途愉快,请您注意安全</div>');
                                        $(".sdstatusd").text("已成交");
                                    }
                                    break;
                                case "get_brand_wcpay_request:fail":
                                    showMessage1btn("系统出错，请联系我们！","Back()",0);
                                    break;
                                case "get_brand_wcpay_request:cancel":
                                    showMessage1btn("已取消支付！","Back()",0);
                                    // 成功后初始化
                                    nowusermsg.personNumber  = 0 ;
                                    $("#person-jtnumber").text(nowusermsg.personNumber);
                                    break;
                                }
                            }
                            });
                            BC.err = function(err) {
                                //err 为object, 例 ｛”ERROR“ : "xxxx"｝;
                                showMessage1btn(err.ERROR,"",0);
                            }
                        }else{
                            showMessage1btn("后台参数错误！","",0);
                        }                                           
                            // 删除dialog
                            clearDialog();
                        },"json")

                    },
                error:function(data){
                    showMessage1btn("网络出错,请重试!","",0);
                }
            })

            }
        }

/* 向页面渲染数据的函数 */
    function rendering(data){
        var sj = data.obj;
        if(data.result>0){
            /* 出发地 */
                $(".cfdsdmdiv").text(sj.departure.trim());
            /* 目的地 */
                $(".mddsdmdiv").text(sj.arrival.trim());
            /*出发时间  */
                $(".cftimesdmd").text(sj.departureTime);
            /* 期望时间 */
                $(".cfdsdmd").text(sj.arrivalTime);
            /* 出发城市 */
                $(".cfcitydv").text(sj.dpCity.trim());
            /* 目的城市 */
                $(".mdcitydv").text(sj.arCity.trim());
            /* 提示的城市名 */
                $(".changz").text(sj.dpCity.trim());
            /* 手机号
                分为：1：自己看的结果。
                      2：别人看的结果。
            */
                if (nowusermsg.valone =="own") {   // 自己看自己的
                    if(typeof(sj)=='undefined'?false:(typeof(sj.customerList)=='undefined'?false:true)){
                        $(".sfvaldiv").text(sj.customerList[0].trim());
                    }else{  
                        $(".sfvaldiv").text("成交后才能看到号码");
                    }
                }else {             // 被别人看
                    if(typeof(sj)=='undefined'?false:(typeof(sj.userInfo)=='undefined'?false:true)){
                        $(".sfvaldiv").text(sj.userInfo.mobile);
                    }else{  
                        $(".sfvaldiv").text("成交后才能看到号码");
                    }
                }
            /* 订单结果 */
            nowusermsg.state = sj.state;
            // 乘车人数
            $(".by-carpersondv").text(sj.personNum+"人乘车");
            // 金额
            $(".reference-pricejo").text(sj.price);
            if(nowusermsg.state == 0){
                $(".sdstatusd").text("发布成功");
            }else if(nowusermsg.state == -1){
                $(".sdstatusd").text("失效了");
            }else if(nowusermsg.state == 1){
                $(".sdstatusd").text("订单行程已完成");
            }else{
                $(".sdstatusd").text("发生错误！");
            }
        }
    }


/* 取消订单的操作 */
    function qxsfcxinxi( val ){
        if(nowusermsg.state===0){  // 发布
            $.ajax({
                type:"post",
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/cancelFROrders.asp",
                data:{
                  uid:nowusermsg.uid,
                  id:nowusermsg.id
                },
                success:function(data){
                    if(data.result===-1){
                        /* 操作失败,请重新刷新 */
                        showMessage1btn("操作失败,请重新刷新","",0);
                    }else if(data.result===1 ){
                        if( val = 0 ){   // 乘客看自己对车主的订单发起的取消订单
                            retreatMoney();
                        }else {
                            // 取消订单时，，如果是乘客身份要发起退款
                             if( nowusermsg.requestData.pushType === "Passenger" ){
                                retreatMoney();
                            }else if( nowusermsg.requestData.pushType === "Driver" ){
                                $("#tmpbutton").empty();
                                showMessage1btn("已取消发布","",0);
                                // 操作成功，显示提示
                                $(".sdstatusd").text("失效了");
                            }
                        }
                        
                    }
                },
                error:function(data){
                    showMessage1btn("网络原因,刷新在试","",0);
                }
            })
        }else if(nowusermsg.state===-1){
            showMessage1btn("暂时不能取消","",0);
        }else if(nowusermsg.state===1){
            showMessage1btn("订单已完成","",0);
        }else {
            showMessage1btn("网络原因，刷新在试","",0);
        }
        // 乘客身份发起取消订单时，退款的函数
        function retreatMoney(){
            $.ajax({
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeFROViewPayments/cancelFRROPayments.asp",
                type:"post",
                data:{
                    uid:nowusermsg.uid,
                    id:nowusermsg.id
                },
                success:function(data){
                    console.log("取消支付数据",data);
                    if( data.result === -1 ){
                        $("#tmpbutton").empty();
                        showMessage1btn("该订单不存在,请联系客服","",0);
                            // 操作成功，显示提示
                        $(".sdstatusd").text("已取消发布,改订单未付钱");
                    }else {
                        $("#tmpbutton").empty();
                        showMessage1btn("取消成功,正在退款","",0);
                            // 操作成功，显示提示
                        $(".sdstatusd").text("取消成功");
                    };
                },
                error:function(data){
                    console.log("取消支付失败",data);
                    showMessage1btn("取消支付失败,请联系客服","",0);
                }
            })
        } 
    }


/* 地图的初始化 */
    var map = new AMap.Map('sdcontainer', {
        resizeEnable: true,
        zoom:10,//级别
        center: [119.9,31.7],//中心点坐标
    });
    var paymentvalsj = {
    resultdata:{}
    }    

/* 复用的处理函数 */
    function autocfdiv(result){
        //dw{P: 32.421736, R: 119.90342699999997, lng: 119.903427, lat: 32.421736}
        console.log("定位给的数据",result);
        document.getElementById('lnglat').value = result;
        maponbh(result);
    }


/* 别的页面写来的函数 */
    /* 查询点击时标点 */
    function maponbh(result){
        setdtCeneter(result)
        if(result==false){
            document.getElementById('lnglat').value = {};
            regeoCode();
        }
        document.getElementById('lnglat').value = result;
        regeoCode(result);
    }
    /* 设置中心点函数 */
        /* 设置地图中心点 */
    function setdtCeneter(qjposition){
            var position = [qjposition.R, qjposition.P]; 
            map.setCenter(position); 
        // 获取地图中心点
        var currentCenter = map.getCenter(); 
    }
    var geocoder,marker;
    function regeoCode(result) {
        if(!geocoder){
            geocoder = new AMap.Geocoder({
                city: "常州", //城市设为北京，默认：“全国”
                radius: 1000 //范围，默认：500
            });
        }
        var lnglat  = document.getElementById('lnglat').value.split(',');
        marker = new AMap.Marker({
            position: result
        });
        map.add(marker);
       
        marker.setPosition(lnglat);
        
        geocoder.getAddress(lnglat, function(status, result) {
            if (status === 'complete'&&result.regeocode) {
            }else{alert(JSON.stringify(result))}
        });
    }
    /* 判断 */
    document.getElementById('lnglat').onkeydown = function(e) {
        if (e.keyCode === 13) {
            regeoCode();
            return false;
        }
        return true;
    }; 

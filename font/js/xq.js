/* 页面初始化的数据 */
var nowusermsg = {
    requestData:{},
    valone:'',
    myuid:111,   // 登录用户自己的uid
    uid:111,    // 是查询单号的uid，不是自己的uid。
    userid:"",
    payId:0,    //支付的id信息
    id:111,
    state:111,
    clickPerson:"own",   // 是那个点击的，默认是自己点击的。other代表其他人点击的，被查看了
    openid:111,  
    phone:111,    // 登录用户自己的电话号
    personNumber:0,  // 报名人数，默认为1
    singnUpNum:0,      // 可以报名的人数
    unPayNum:0,         // 剩余未付款人数
}

$(function(){
    basepath = "../../../../MobileWeb/";
    getOpenid(function(openid){
        nowusermsg.myuid = localCache("uid-kongbatong");
        nowusermsg.openid = localCache("openid-kongbatong");
        nowusermsg.phone = localCache("mobile-kongbatong");
        nowusermsg.userid = localCache("userid-kongbatong");

        if(null == nowusermsg.myuid || "" == nowusermsg.myuid) {
            register("//qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html");   //返回注册登录页面
        } else {
            showLodding("请稍等，加载中...");
            console.log("nowusermsg.myuid",nowusermsg.myuid,"openid",nowusermsg.openid, nowusermsg.phone);
            $("#person-number").hide();
            $("#enrolment").hide();
            /* 点击时  地图上添加一个maker点 并且聚焦 */
            parseFloat()
            // 页面的初始化
            hqselectval();
            console.log(2,nowusermsg);
        }
    },location.search);
        
   $(".cfdsdmdiv").bind("touch click",function(){
       var result =  {P:parseFloat(nowusermsg.requestData.aLat),R:parseFloat(nowusermsg.requestData.aLng),lat:parseFloat(nowusermsg.requestData.aLat),lng:parseFloat(nowusermsg.requestData.aLng)};
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
        if (nowusermsg.personNumber > nowusermsg.singnUpNum){
            nowusermsg.personNumber = nowusermsg.singnUpNum;
            showMessage1btn("抱歉,可报名人数为"+nowusermsg.singnUpNum,"",0);
        }else if ( nowusermsg.personNumber < nowusermsg.singnUpNum){
            nowusermsg.personNumber++;
        }else if ( nowusermsg.personNumber == nowusermsg.singnUpNum){
            nowusermsg.personNumber = nowusermsg.singnUpNum;
        }
        $("#person-jtnumber").text(nowusermsg.personNumber);
    })
    $("#person-reduce").bind("touch click",function(){
        if( nowusermsg.personNumber === 0 ){
            return false;
        }else {
            nowusermsg.personNumber--;
        }
        $("#person-jtnumber").text(nowusermsg.personNumber);
    })
    
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
        ajaxhair(nowusermsg.id,nowusermsg.myuid);
        /* 获取路由的值 */
         newPage_receiptAjax();  // 初始化获取可报名人数
    }
/* 发送ajax的数据 */
    function ajaxhair(id,uid){
        $.ajax({
            type:"post",
            url:"//qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/getFROrderDetails.asp",
            data:{
              uid:parseInt(uid),
              id:id,
              userid:nowusermsg.userid
            },
            success:function(data){
                console.log("获取成功的数据",data);
                //  本地化数据
                nowusermsg.requestData = data.obj;
                // 赋值 支付需要的id号
                if ( null != data.obj.id && "" != data.obj.id) {
                    nowusermsg.payId = data.obj.id;
                }

                rendering(data);
                
                if( data.obj.pushType === "Passenger" ){    // 乘客身份
                    // 金额
                    $(".reference-pricejo").text(nowusermsg.requestData.price+"元");
                    $("#reference-oneprice-num").text((nowusermsg.requestData.price/nowusermsg.requestData.personNum).toFixed(0)+"元/人");
                    
                    trips.passerResult();
                }else if(  data.obj.pushType === "Driver" ){    // 车主身份逻辑的
                    // 金额
                    $(".reference-pricejo").text((nowusermsg.requestData.price*nowusermsg.requestData.personNum).toFixed(0)+"元");
                    $("#reference-oneprice-num").text(nowusermsg.requestData.price+"元/人");
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
                if ( null == data.msg || "" == data.msg ) {
                    showMessage1btn("网络故障,刷新在试","",0);
                }else {
                    showMessage1btn(data.msg,"",0);
                }
                
            }
        })
    }   
// 返回的判断
    function fanhuisyj_class(){
        var hash = window.history.length;
        if ( hash == 1  || hash == 0 ){
            window.location.href = "//qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/sfc.html#passenger";
        }else {
            window.history.back(-1);
        }
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
            if ( Date.parse(new Date()) > (Date.parse(data.departureTime)+86400000)) {
                // 失效了  车主失效没有按钮
                $("#tmpbutton").empty();
                $(".sdstatusd").text("已失效");
            }else {
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
                                    // 被别人看
                            $(".sdstatusd").text("已支付");
                            $("#tmpbutton").empty();
                            $("#tmpbutton").append("<div id='cancelRelease' style='width: 150px;height: 36px;line-height: 36px;color: #fff;background: #31b0d5;text-align: center;border-radius: 6px;margin: 0 auto;font-size: 16px;' onclick='qxsfcxinxi()'>取消发布</div>")
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
                                if ( nowusermsg.requestData.receiptMob == nowusermsg.phone && nowusermsg.requestData.userInfo.id != parseInt(nowusermsg.myuid)  ) {
                                    $(".sdstatusd").text("接单成功");
                                    $("#tmpbutton").empty();
                                    $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;">接单成功,请您电联乘客</div>');
                                    
                                }else {
                                    showMessage1btn("该订单无法查看，确认返回","to_sfc_page()",0);
                                    $(".sdstatusd").text("抱歉,单子已被接");
                                    $("#tmpbutton").empty();
                                }
                                
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
            }
        },
        driverResult:function(){
            
            var data = nowusermsg.requestData;
            if ( Date.parse(new Date()) > (Date.parse(data.departureTime)+86400000)) {
                // 失效了  车主失效没有按钮
                $("#tmpbutton").empty();
                $(".sdstatusd").text("已失效");
            }else {
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
                                    // 被别人看
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
                                $("#enrolment").show();
                                $("#tmpbutton").empty();
                                $("#tmpbutton").append('<div class="cancel_button" style="background:#31b0d5;" onclick="Receipt(1)">报名</div>');
                            }else if ( data.state === 1 ){   // 已完成
                                $(".sdstatusd").text("抱歉,单子已完成");
                                $("#tmpbutton").empty();
                            }else if( data.state === 2 ){   // 已被接单
                                $(".sdstatusd").text("可以报名");
                                $("#person-number").show();
                                $("#enrolment").show();
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
                            $("#tmpbutton").append('<div style="display:inline-block;width:48%;" class="clearfix"><div class="cancel_button" style="background:#5cb85c;" onclick=" retreatMoney()">取消订单</div></div><div  style="display:inline-block;width:48%;" class="clearfix"><div class="cancel_button" style="background:#31b0d5;" onclick="trips.passerDeal()">成交</div></div>');
                        }
                    }
            }
            
        },
        passerDeal:function(){   // 乘客点击成交的操作函数
            // 用户点成交要出发完结的ajax
            // 点击成交直接付钱
            paymentModule.payMoney(nowusermsg.requestData.price,"成交",1);
              
        },
    }
// 返回上一页，主页
    function to_sfc_page(){
        window.location.href = "http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/sfc.html#passenger";
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
            if (nowusermsg.singnUpNum  == 0){
                newPage_receiptAjax();
            }
            if( nowusermsg.singnUpNum < nowusermsg.personNumber ){
                if( nowusermsg.personNumber >  (nowusermsg.singnUpNum + nowusermsg.unPayNum)){
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
            }else if ( nowusermsg.singnUpNum >= nowusermsg.personNumber  ) {
                paymentModule.payMoney(nowusermsg.requestData.price,"报名",nowusermsg.personNumber); 
            }
        }
        function receiptSign(){
            $.ajax({
                url:"//qckj.czgdly.com/bus/MobileWeb/madeFROReceipts/saveMadeFROReceipts.asp",
                type:"post",
                data:{
                    uid:nowusermsg.myuid,
                    userid:nowusermsg.userid,
                    froId:nowusermsg.id,
                    utype:"Driver"
                },
                success:function(data){
                    console.log("报名成功",data);
                    showMessage1btn(data.msg,"",0);
                    if( data.result > -1 ){
                        $("#tmpbutton").empty();
                    }
                },
                error:function(data){
                    if ( null == data.msg || "" == data.msg ) {
                        showMessage1btn("接单失败,请重试","",0);
                    }else {
                        showMessage1btn(data.msg,"",0);
                    }
                    
                }
            })
            
        }
    }
// 刷新当前页面
    function onload_page(){
        window.location.reload();
    }
// 初始化时获取人数
    function newPage_receiptAjax(){
        $.ajax({
            type:"post",
            url:"//qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/getCurrentPNum.asp",
            data:{
                froId:nowusermsg.id
            },
            success:function(data){
                // 可报名人数
                $("#enrolment-div").text(data.result.leftNum+"人");
                if (data.result.leftNum>0){
                    nowusermsg.singnUpNum = data.result.leftNum;
                    nowusermsg.unPayNum = data.result.unPayNum;
                }else {
                    nowusermsg.singnUpNum = 0;
                    nowusermsg.unPayNum  = 0;
                }     
            },
            error:function(data){
                nowusermsg.singnUpNum = 0;
                nowusermsg.unPayNum  = 0;
            }
        })
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
           
                if (pdval=="报名"){
                    paymentbttsj.title = "乘客报名";
                }else if (pdval=="成交"){
                    paymentbttsj.title = "乘客成交";
                }
                
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
                    url:"//qckj.czgdly.com/bus/MobileWeb/madeFROViewPayments/saveMadeFROVPayments.asp",
                    type:"post",
                    data:{
                        uid:nowusermsg.myuid,
                        froId:nowusermsg.id,	
                        userid:nowusermsg.userid,
                        utype:"Passenger",
                        pnum:nowusermsg.personNumber   // 人数为选择人数
                    },
                    success:function(data){
                        console.log("支付的id",data);
                        if ( data.result > 0) {
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
                                // utype:"Passenger"   // 付钱的是当前身份
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
                                //"instant_channel" : paymentbttsj.instant_channel,
                                "debug" : false,
                                "need_ali_guide" : true,
                                "use_app" : true,
                                "title" : paymentbttsj.title, //商品名
                                "amount" : moneyVal*100*psersonnumber,  //总价（分）
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
                                            
        
                                                // 成功了要把电话显示出来   
                                                $("#sfvaldiv-fb").text(nowusermsg.requestData.userInfo);
                                                $("#sfvaldiv-fb").attr("href","tel:"+nowusermsg.requestData.userInfo);
                                                // 成功后初始化
                                                nowusermsg.personNumber  = 0 ;
                                                $("#person-jtnumber").text(nowusermsg.personNumber);
        
                                                $("#tmpbutton").empty();
                                                $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;">报名成功,请您电联车主</div>');
                                                $(".sdstatusd").text("报名成功");
                                                showMessage1btn("支付报名成功,请联系车主","xqHref_tosfc()",0);
                                            }else if (pdval=="成交") {
                                                console.log("点击成交",data);
                                                $("#tmpbutton").empty();
                                                $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;">祝您旅途愉快,请您注意安全</div>');
                                                $(".sdstatusd").text("已成交");
                                                showMessage1btn("已成交,祝您旅途愉快！","xqHref_tosfc()",0);
                                            }
                                            
                                            break;
                                        case "get_brand_wcpay_request:fail":
                                            showMessage1btn("系统出错，请联系我们！","xqHref_tosfc()",0);
                                            break;
                                        case "get_brand_wcpay_request:cancel":
                                            
                                            // 成功后初始化
                                            nowusermsg.personNumber  = 0 ;
                                            $("#person-jtnumber").text(nowusermsg.personNumber);
                                            showMessage1btn("已取消支付！","xqHref_tosfc()",0);
                                            break;
                                        }
                                    }
                                    });
                                    BC.err = function(err) {
                                        //err 为object, 例 ｛”ERROR“ : "xxxx"｝;
                                        showMessage1btn(err.ERROR,"xqHref_tosfc()",0);
                                    }
                                }else{
                                    showMessage1btn("后台参数错误！","xqHref_tosfc()",0);
                                }                                           
                                    // 删除dialog
                                    clearDialog();
                                },"json")
        
                        }else {
                            if ( null == data.msg || "" == data.msg ) {
                                showMessage1btn("网络故障,稍后在试","",0);
                            }else {
                                showMessage1btn(data.msg,"",0);
                            }
                        }
                    },
                    error:function(data){
                        showMessage1btn("网络出错,请重试!","",0);
                    }
                })
            }
        }
    function xqHref_tosfc(){
        window.location.reload();
    }
/* 向页面渲染数据的函数 */
    function rendering(data){
        var sj = data.obj;
        if(data.result>0){
            /* 出发地 */
                $(".cfdsdmdiv").text(sj.dpCity.trim()+sj.departure.trim());
            /* 目的地 */
                $(".mddsdmdiv").text(sj.arCity.trim()+sj.arrival.trim());
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
            if(typeof(sj)=='undefined'?false:(typeof(sj.userInfo.mobile)=='undefined'?false:true)  ){
                if ( sj.userInfo.mobile!= null &&  sj.userInfo.mobile != undefined &&  sj.userInfo.mobile != "" ){
                    $("#sfvaldiv-jddiv").show();
                    $("#sfvaldiv-jd").text(sj.userInfo.mobile);
                    $("#sfvaldiv-jd").attr("href","tel:"+sj.userInfo.mobile);
                }
            }else {
                $("#sfvaldiv-jddiv").hide();
                $("#sfvaldiv-jd").attr("href","");
            }
            
            if (typeof(sj)=='undefined'?false:(typeof(sj.receiptMob)=='undefined'?false:true) ){
                if ( sj.receiptMob!= null &&  sj.receiptMob != undefined &&  sj.receiptMob != "" ){
                    $("#sfvaldiv-fbdiv").show();
                    $("#sfvaldiv-fb").text(sj.receiptMob);
                    $("#sfvaldiv-fb").attr("href","tel:"+sj.receiptMob);
                }
            }else {
                $("#sfvaldiv-fbdiv").hide();
                $("#sfvaldiv-fbdiv").attr("href","");
            }
            
            /* 订单结果 */
            nowusermsg.state = sj.state;
            // 乘车人数
            $(".by-carpersondv").text(sj.personNum+"人");
            
            if(nowusermsg.state == 0){
                $(".sdstatusd").text("发布成功");
            }else if(nowusermsg.state == -1){
                $(".sdstatusd").text("已失效");
            }else if(nowusermsg.state == 1){
                $(".sdstatusd").text("订单行程已完成");
            }else{
                $(".sdstatusd").text("发生错误！");
            }
        }
    }


/* 取消订单的操作 */
    function qxsfcxinxi( val ){
        showMessage2btn("确认取消订单吗?",'qxsfcxinxi_cancel('+val+')');
    }
    // 乘客确认取消的操作
    function qxsfcxinxi_cancel( val ){

        //状态（-1:失效；0：发布；1：完结；2：接单）
           if(nowusermsg.state===0 || nowusermsg.state=== 2 || nowusermsg.state === 1){  // 发布
               $.ajax({
                   type:"post",
                   url:"//qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/cancelFROrders.asp",
                   data:{
                     uid:nowusermsg.myuid,
                     id:nowusermsg.id,
                     userid:nowusermsg.userid,
                     source:'KBT'
                   },
                   success:function(data){
                       if(data.result===1 ){
                           if( val == 0 ){   // 乘客看自己对车主的订单发起的取消订单
                               retreatMoney();
                           }else {
                               // 取消订单时，，如果是乘客身份要发起退款
                                if( nowusermsg.requestData.pushType === "Passenger" ){
                                   $("#tmpbutton").empty();
                                   $(".sdstatusd").text("已失效");
                               }else if( nowusermsg.requestData.pushType === "Driver" ){
                                   $("#tmpbutton").empty();
                                   // 操作成功，显示提示
                                   $(".sdstatusd").text("已失效");
                               }
                           }
                       }
                       showMessage1btn(data.msg,"onload_page()",0);
                   },
                   error:function(data){
                       if ( null == data.msg || "" == data.msg ){
                           showMessage1btn("网络出错,刷新在试","",0);
                       }else {
                           showMessage1btn(data.msg,"",0);
                       }
                      
                   }
               })
           }else if(nowusermsg.state===-1){
               showMessage1btn("订单已失效","",0);
           }
    }     
        // 乘客身份发起取消订单时，退款的函数
        function retreatMoney(){
            $.ajax({
                url:"//qckj.czgdly.com/bus/MobileWeb/madeFROViewPayments/cancelFROVPayments.asp",
                type:"post",
                data:{
                    uid:nowusermsg.myuid,
                    userid:nowusermsg.userid,
                    id:nowusermsg.id
                },
                success:function(data){
                    console.log("取消支付数据",data);
                    showMessage1btn(data.msg,"",0);
                    if( data.result === -1 ){
                        $("#tmpbutton").empty();
                       
                            // 操作成功，显示提示
                        $(".sdstatusd").text("已取消发布,改订单未付钱");
                    }else {
                        $("#tmpbutton").empty();
                            // 操作成功，显示提示
                        $(".sdstatusd").text("取消成功");
                    };
                },
                error:function(data){
                    console.log("取消支付失败",data);
                    if ( null == data.msg || "" == data.msg ) {
                        showMessage1btn("取消支付失败,请联系客服","",0);
                    }else {
                        showMessage1btn(data.msg,"",0);
                    }
                    
                }
            })
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
        // document.getElementById('lnglat').value = result;
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
        // var lnglat  = document.getElementById('lnglat').value.split(',');
        marker = new AMap.Marker({
            position: result
        });
        map.add(marker);
       
        // marker.setPosition(lnglat);
        
        // geocoder.getAddress(lnglat, function(status, result) {
        //     if (status === 'complete'&&result.regeocode) {
        //     }else{alert(JSON.stringify(result))}
        // });
    }
    
    /* 判断 */
    // document.getElementById('lnglat').onkeydown = function(e) {
    //     if (e.keyCode === 13) {
    //         regeoCode();
    //         return false;
    //     }
    //     return true;
    // }; 

    // 跳转的register 
    function register(val){
        var nowhref = window.location.href;
        localCache("page",nowhref);     // 存储在本地的地址
        window.location.href = val;		// 发送给他的地址 	
    } 

    
/* 页面初始化的数据 */
var nowusermsg = {
    requestData:{},
    valone:'',
    myuid:111,   // 登录用户自己的uid
    uid:111,    // 是查询单号的uid，不是自己的uid。
    id:111,
    state:111,
    clickPerson:"own",   // 时那个点击的，默认是自己点击的。other代表其他人点击的，被查看了
    openid:111,  
    phone:111,    // 登录用户自己的电话号
}

        
       

$(function(){
    getOpenid(function(openid){
        nowusermsg.myuid = localCache("uid-kongbatong");
        nowusermsg.openid = localCache("openid-kongbatong");
        nowusermsg.phone = localCache("mobile-kongbatong");
        nowusermsg.openid = openid ;
        if( null == nowusermsg.uid || "" == nowusermsg.uid ) { 
            register("http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html");   //返回注册登录页面
        } else {
           console.log("获取成功");
        }
    },location.search);
    // 取本地缓存数据

    console.log(nowusermsg);

    showLodding("请稍等，加载中...");
    /* 点击时  地图上添加一个maker点 并且聚焦 */
   $(".cfdsdmdiv").bind("touch click",function(){
       cfdsdmdivcl("cfd");
   })  
   $(".mddsdmdiv").bind("touch click",function(){
       cfdsdmdivcl("mdd");
   })
   $(".cfdsdmdivbt").bind("touch click",function(){
    cfdsdmdivcl("cfd");
    })  
    $(".mddsdmdivbt").bind("touch click",function(){
        cfdsdmdivcl("mdd");
    })
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
        if(nowusermsg.valone == "sf=run"){
            nowusermsg.clickPerson = "other";  // 其他点击的，被查看了。
        }else {   // 是自己点自己
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
                /* 绑取消订单的事件 */
                $("#qxsfcxinxi").bind("touch click",function(){
                    qxsfcxinxi();
                })
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
        passerResult:function(){   // 车主查看乘客
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
                    $("#tmpbutton").append('<div class="clearfix" style="width:50%;display:inline-block;"><div class="cancel_button" style="background: #31b0d5;"  onclick="qxsfcxinxi()">取消</div></div><div class="clearfix"  style="width:47%;display:inline-block;"><div class="cancel_button"  style="background:#2b5ae3;" onclick="trips.passerDeal()">成交</div></div>');
                }
            }else if( nowusermsg.clickPerson === "other"){   // 被别人查看的
                $("#tmpbutton").empty();
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
                }else if( data.state === 1 ){
                    // 已完成
                    $("#tmpbutton").empty();
                    $(".sdstatusd").text("已完成");
                }else if( data.state === 2 ){
                    // 已被接单  报名一个就算接单
                    $("#tmpbutton").empty();
                    $(".sdstatusd").text("可以报名");
                    $("#tmpbutton").append('<div class="cancel_button" style="background:#31b0d5;" onclick="Receipt(1)">报名</div>');
                }   
            }else if( nowusermsg.clickPerson === "other"){   // 被别人查看的
                $(".sdstatusd").text("可以报名");
                $("#tmpbutton").empty();
                $("#tmpbutton").append('<div class="cancel_button" style="background:#31b0d5;" onclick="Receipt(1)">报名</div>');
            }
        },
        passerDeal:function(){   // 乘客点击成交的操作函数
            $("#tmpbutton").empty();
            showMessage1btn("已成交,祝您旅途愉快！","",0);
            $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;">祝您旅途愉快,请您注意安全</div>');
            $(".sdstatusd").text("已成交");
        },
    }
// 向后台请求人数，接单
    function Receipt(val){
        if(val === 0){ // 车主接乘客的单
            receiptAjax(0);
        }else if(val === 1){ // 乘客报名车主的单
            receiptAjax(1);
        }
        function receiptAjax(val){
            $.ajax({
                type:"post",
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/getCurrentPNum.asp",
                data:{
                    froId:nowusermsg.id
                },
                success:function(data){
                    console.log(data);
                    if( val === 0 ){
                        if(data.result>0){
                            showMessage1btn("接单成功,请联系乘客","",0);
                            //  要向后台发送数据
                            $("#tmpbutton").empty();
                            $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;">接单成功,请您电联乘客</div>');
                            $(".sdstatusd").text("接单成功");
                        }else if( data.result <= 0 ){
                            $("#tmpbutton").empty();
                            showMessage1btn("接单失败,已被接单","",0);
                            $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;border-top: 1px solid #f2f2f2;border-bottom: 1px solid #f2f2f2;">抱歉,单子已被接</div>');
                            $(".sdstatusd").text("已被接单");
                        }
                    }else if( val === 1 ){
                        if( data.result > 0 ){
                            paymentModule.payMoney(nowusermsg.requestData.price); 
                        }else if ( data.result <= 0 ) {
                            $("#tmpbutton").empty();
                            showMessage1btn("报名失败,已满","",0);
                            $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;border-top: 1px solid #f2f2f2;border-bottom: 1px solid #f2f2f2;">抱歉,已满</div>');
                            $(".sdstatusd").text("已满");
                        }
                    }
                },
                error:function(data){
                    showMessage1btn("网络出错,请重试!","",0);
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
        payMoney:function( moneyVal ){  // 只有乘客报名车主的行程才需要付钱 
           var paymentbttsj =  paymentModule.paymentbttsj;
            paymentbttsj.title = "车主接单";
            paymentbttsj.FROID = nowusermsg.id; 
         
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
            paymentbttsj.billno = paymentbttsj.billno + sjc + rand ;
            // 参数
            paymentbttsj.amount   = moneyVal;
            var param = {"title" : paymentbttsj.title,"amount" : paymentbttsj.amount,"outtradeno" : paymentbttsj.billno};
            // 地址
            var url = "../../../common/getBSign-kongbatong.asp";
            // sfcsj.passenger 存储着用户的信息 
            // openid 需要传入的数据的定义
            var utype = nowusermsg.requestData.pushType;
            
            paymentbttsj.openid = {
                uid:nowusermsg.myuid,
                phone:nowusermsg.phone,
                usource:paymentbttsj.usource,
                FROID:paymentbttsj.FROID,
                utype:utype
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
                "amount" : moneyVal,  //总价（分）
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
                            //报名成功要付报名费给我们,
                            showMessage1btn("支付报名成功,请联系车主","",0);
                            //  要向后台发送数据
                            $("#tmpbutton").empty();
                            $("#tmpbutton").append('<div style="text-align: center;line-height: 36px;font-size: 18px;color: #1badd8;">报名成功,请您电联车主</div>');
                            $(".sdstatusd").text("报名成功");
                            break;
                        case "get_brand_wcpay_request:fail":
                            showMessage1btn("系统出错，请联系我们！","Back()",0);
                            break;
                        case "get_brand_wcpay_request:cancel":
                            showMessage1btn("已取消支付！","Back()",0);
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
            /* 手机号*/
                $(".sfvaldiv").text(sj.userInfo.mobile.trim());
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
    function qxsfcxinxi(){
        if(nowusermsg.state===0){
            $.ajax({
                type:"post",
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/updateFROrders.asp",
                data:{
                  uid:nowusermsg.uid,
                  id:nowusermsg.id,
                  state:-1,
                },
                success:function(data){
                    console.log("获取成功的数据",data);
                    if(data.result===-1){
                        /* 操作失败,请重新刷新 */
                        showMessage1btn("操作失败,请重新刷新","",0);
                    }else if(data.result===1){
                        $("#tmpbutton").empty();
                        showMessage1btn("已取消发布,正在退款中","",0);
                        // 操作成功，显示提示
                        $(".sdstatusd").text("失效了");
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
/* 点击时，判断地址，并在地图撒花姑娘 */ 
/* 始发地点击找地址 */
    function cfdsdmdivcl(val){
        /* 出发地要 找地址 */
        if(val=="cfd"){
            var valcfd  = $(".cfcitydv").text()+$(".cfdsdmdiv").text();
            var  chax = valcfd.split("省");
            if(chax[1]===undefined || chax[1]=== null || chax[1]==="" ){
                autocfdsdmdiv(chax[0]);
            }else {
                autocfdsdmdiv(chax[1]);
            }
        }else if(val=="mdd"){
            autocfdsdmdiv($(".mdcitydv").text()+$(".mddsdmdiv").text());
        }
    }
/* 复用的处理函数 */
    function autocfdiv(result){
    var sj = result;
    var dw = sj.tips[0].location;
    if(sj.info=="OK"){
        maponbh(dw);
        setdtCeneter([dw.R,dw.P]);
    }
    }
/* 根据地址 数据 Location的json地址坐标的 */
    function autocfdsdmdiv(val){
    AMap.plugin('AMap.Autocomplete', function(){
            var autoOptions = {
                city:"全国"
            }
        // 实例化Autocomplete
        var autoComplete = new AMap.Autocomplete(autoOptions);
        
        autoComplete.search(val, function(status,result) {
        // 搜索成功时，result即是对应的匹配数据
        /* 存储数据 */
        paymentvalsj.resultdata = result;
        autocfdiv(result);
        })
    })
    }

/* 别的页面写来的函数 */
    /* 查询点击时标点 */
    function maponbh(jbelnglat){
        setdtCeneter(jbelnglat)
        if(jbelnglat==false){
            document.getElementById('lnglat').value = {};
            regeoCode();
        }
        $("#idxinxi").empty();
        document.getElementById('lnglat').value = jbelnglat;
        regeoCode();
        $("#idxinxi").append("<P>找到地址</P>");
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
    function regeoCode() {
        if(!geocoder){
            geocoder = new AMap.Geocoder({
                city: "常州", //城市设为北京，默认：“全国”
                radius: 1000 //范围，默认：500
            });
        }
        var lnglat  = document.getElementById('lnglat').value.split(',');
         if(!marker){
            marker = new AMap.Marker({
                position: {P: 31.780507,
                R: 119.95466199999998,
             lat: 31.780507,
                lng: 119.954662}
            });
            map.add(marker);
        }
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

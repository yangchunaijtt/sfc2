    var searchcityval = {
        searchval:"",  // ？nocity后面的值 
        selectval:"",  // 选择的值 
        dijival:{},  // 点击事件发生后，所选城市的经纬度参数 
        citysfdmmd:"",  // 在始发地目的地页 进行搜索的后面判断的值 
        // 进入搜索时，autoInputsun函数的模板 
        autoInputsuntmp:"<div class='tjheader clearfix' id='tjheaderid'><div class='icon'><span class='glyphicon glyphicon-send iconone'></span></div><div class='show-weizhi clearfix'><p class='dizi'>副食品大楼(县直街)</p><p class='jtdz'>江苏省常州市钟楼区荷花池街道延陵西路157号</p></div></div>"          
    }
 
    function createlival(){
        // 点击之后在指定地方花maker 
        function zhidimaker(val){
            var lival = $(val).text();
           
            AMap.plugin('AMap.Geocoder', function() {
                var geocoder = new AMap.Geocoder({
                  // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                  city: lival,
                })
              
                geocoder.getLocation(lival, function(status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                    // result中对应详细地理坐标信息
                    
                    // 获取到了指定的指标值 
                    searchcityval.dijival = result.geocodes[0].location;
                    // 在获取到的地方花个maker 
                    maponbh(searchcityval.dijival);
                    setdtCeneter([searchcityval.dijival.R,searchcityval.dijival.P]);

                  }
                })
              })
        }

        // 处理城市选择页点击 
            // 处理城市选择页点击 
        $(".ulliwx").bind("touch click",function(){
            choicecity.ullicstyicz(".ulliwx");
        })
        $(".ullish").bind("touch click",function(){
            choicecity.ullicstyicz(".ullish");
        })
        $(".ullisz").bind("touch click",function(){
            choicecity.ullicstyicz(".ullisz");
        })
        $(".ullinj").bind("touch click",function(){
            choicecity.ullicstyicz(".ullinj");
        })  
        $(".ullint").bind("touch click",function(){
            choicecity.ullicstyicz(".ullint");
        })
        $(".ulliyz").bind("touch click",function(){
            choicecity.ullicstyicz(".ulliyz");
        })
        $(".ullitz").bind("touch click",function(){
            choicecity.ullicstyicz(".ullitz");
        })
        $(".ullizjg").bind("touch click",function(){
            choicecity.ullicstyicz(".ullizjg");
        })
        $(".ullics").bind("touch click",function(){
            choicecity.ullicstyicz(".ullics");
        })
    // 点自己的操作 
        $(".nowcityval div").bind("touch click",function(){
            var hash = window.location.hash ;
            var hash1 = hash.split("?");
            var hashzhi = hash1[1];
            choicecity.type = hashzhi;
           if(choicecity.type === "cfd"){
                 window.location.hash = "#sxxwz";
           } else if(choicecity.type === "mdd"){
                window.location.hash = "#mxxwz";
           }
        })
    }

// 具体地址的城市选择页，功能模块
        var choicecity ={
            type:"cfd",   // 发布的
            ullicstyicz:function(val){
                removeacive();
                $(val).addClass("ulliactive");
                choicecity.cszhi(val);
                
            },
            cszhi:function(val){
                var textval = $(val).text();
                $(".nowcity .nowcityval div").text(textval);
                cityselectval.nowcity = textval;
                choicecity.xzlichuli(textval);
            },
            xzlichuli:function(textval){
                // cfd  mdd
                var hash = window.location.hash ;
                var hash1 = hash.split("?");
                var hashzhi = hash1[1];
                choicecity.type = hashzhi;
                var locationhash = window.location.hash;
                $(".xcspanleft").text(textval);
                searchcityval.citysfdmmd =  textval ;
                $(".dqcsval").text(textval);
                cityselectval.nowcity = textval;
                $("#inxcbody").val(textval.trim());
                if(hashzhi=="cfd"){
                    $("#cgz-cfcity").text(textval);
                    window.location.hash = "#sxxwz";
                }else if (hashzhi=="mdd"){
                    $("#cgz-mdcity").text(textval);
                    window.location.hash = "#mxxwz";
                }
            }
        }

    function cszhi(val){
        var textval = $(val).text();
        $(".nowcity .nowcityval div").text(textval);
        cityselectval.nowcity = textval;
        xzlichuli(textval);
    };
    function removeacive(){
        $(".ulliwx").removeClass("ulliactive");
        $(".ullish").removeClass("ulliactive");
        $(".ullisz").removeClass("ulliactive");
        $(".ullinj").removeClass("ulliactive");
        $(".ulliyz").removeClass("ulliactive");
        $(".ullitz").removeClass("ulliactive");
        $(".ullizjg").removeClass("ulliactive");
        $(".ullint").removeClass("ulliactive");
        $(".ullics").removeClass("ulliactive");
    };

    // 进入input时chufadi  出发地时 进入可以自动选择的页面 
    function inchufadi(){
        if(FreeRide.freeMode ==="intercity" || fabuxiaoxi.dwsj!==""){
            if(FreeRide.freeMode ==="intercity" && fabuxiaoxi.dwsj===""){
                window.location.hash = "#s";
            }else if(FreeRide.freeMode ==="intercity" && fabuxiaoxi.dwsj!==""){
                $("#cgz-mdcity").text(fabuxiaoxi.cfdcity);
                $("#cgz-cfd").val(fabuxiaoxi.dwsj.formattedAddress);
                window.location.hash = "#sxxwz";
            }
        }else if(FreeRide.freeMode ==="incity" || fabuxiaoxi.dwsj!==""){
            if(FreeRide.freeMode ==="incity" && fabuxiaoxi.dwsj===""){
                $("#inxcbody").val("常州市");
                $(".xcspanleft").text("常州市");
                xzlichuli("常州市");
                window.location.hash = "#sxxwz";
            }else if(FreeRide.freeMode ==="incity" && fabuxiaoxi.dwsj!==""){
                $("#cgz-mdcity").text(fabuxiaoxi.cfdcity);
                $("#cgz-cfd").val(fabuxiaoxi.dwsj.formattedAddress);
                window.location.hash = "#sxxwz";
            }
        }
    }
     // 进入input时address  目的地时 进入可以自动选择的页面 
     function inaddress(){
        if(FreeRide.freeMode ==="intercity"){
            window.location.hash = "#m";
        }else if(FreeRide.freeMode ==="incity"){
            $("#inxcbody").val("常州市");
            $(".xcspanleft").text("常州市");
            xzlichuli("常州市");
            window.location.hash = "#mxxwz";
        }
     }

     // 始发地 目的地 点击后 赋值并给下一页
        function xzlichuli(textval){
            
            var locationhash = window.location.hash;
            $(".xcspanleft").text(textval);
            searchcityval.citysfdmmd =  textval ;
            $(".dqcsval").text(textval);
            cityselectval.nowcity = textval;
            $("#inxcbody").val(textval.trim());
            if(locationhash=="#s"){
                $("#cgz-cfcity").text(textval);
                $("#inxcbody").val(textval.trim());
                window.location.hash = "#sxxwz";
            }else if (locationhash=="#m"){
                $("#cgz-mdcity").text(textval);
                $("#inxcbody").val(textval.trim());
                window.location.hash = "#mxxwz";
            }
            
        }
     
     // 点击搜索功能的函数 
     var  autoInputsunval = {
         result:{},   //  autoInputsun的返回值result返回给需要的数据 
         cfdresult:{},
         mddresult:{},
     }
    
     function autosunnode(i,result){
         // 名字操作上去 
        $(".searchweizhi").append(searchcityval.autoInputsuntmp);
        var tjheader = "tjheader"+i;
        $(".tjheader").attr("class",tjheader);
        var dizi ="."+tjheader+"  .dizi";
        var jtdz ="."+tjheader+" .jtdz";
        $(dizi).text(result.tips[i].name);
        var jtdzval =result.tips[i].district+result.tips[i].address;
        $(jtdz).text(jtdzval);
        // DOM创建出来再绑定事件 
        tjhbind();
       
     }


     // 点击返回选择城市页 
        // 需要多几步判断 
        $(".xcheader").bind("touch click ",function(){
            var  whash = window.location.hash;
            if(whash==="#s"){
                window.location.hash = "#s";
            }else if(whash==="#m"){
                window.location.hash = "#m";
            }else if(whash==="#sxxwz"){
                window.location.hash = "#s";
            }else if(whash==="#mxxwz"){
                window.location.hash = "#m";
            }
        })

    
     // 选择城市后返回并把数据填上在表单是上 
     // 定位出发地 目的地 
     // #mxxwz  #sxxwz 
     function tjhbind(){
        $(".tjheader0").bind("touch click",function(){
            xxwzclick(0);
            touchchuli(autoInputsunval.result.tips[0]); 
        })
        $(".tjheader1").bind("touch click",function(){
            xxwzclick(1);
            touchchuli(autoInputsunval.result.tips[1]); 
        })
        $(".tjheader2").bind("touch click",function(){
            xxwzclick(2);
            touchchuli(autoInputsunval.result.tips[2]);  
        })
        $(".tjheader3").bind("touch click",function(){
            xxwzclick(3);
            touchchuli(autoInputsunval.result.tips[3]);  
        })
        $(".tjheader4").bind("touch click",function(){
            xxwzclick(4);
            touchchuli(autoInputsunval.result.tips[4]);  
        })
        $(".tjheader5").bind("touch click",function(){
            xxwzclick(5);
            touchchuli(autoInputsunval.result.tips[5]);  
        })
        $(".tjheader6").bind("touch click",function(){
            xxwzclick(6);
            touchchuli(autoInputsunval.result.tips[6]);  
        })
        $(".tjheader7").bind("touch click",function(){
            xxwzclick(7);
            touchchuli(autoInputsunval.result.tips[7]);  
        })
        $(".tjheader8").bind("touch click",function(){
            xxwzclick(8);
            touchchuli(autoInputsunval.result.tips[8]);  
        })
        $(".tjheader9").bind("touch click",function(){
            xxwzclick(9);
            touchchuli(autoInputsunval.result.tips[9]);  
        })
     }
        
        // 点击时，要判断他是始发地  还是目的地 
        function xxwzclick(i){
           
            var locationhash = FreeRide.clickdirection;
            // 给城市赋值 
            if(locationhash=== 0){
                FreeRide.topisjump = 1;
                fabuxiaoxi.cfdcity = $("#cgz-cfcity").text();
                var result = autoInputsunval.cfdresult;
                var tipsone = autoInputsunval.cfdresult.tips;  
                //  #sxxwz 出发地 经纬度信息
                fabuxiaoxi.cfddata  = autoInputsunval.cfdresult.tips[i];

                // 给出发地赋值
                $("#cgz-cfd").val(tipsone[i].name);
                $("#chufadi").text(tipsone[i].name);
                $(".lnglat").val(tipsone[i].location);  
               
            }else if(locationhash === 1){
                FreeRide.btmisjump = 1;
                fabuxiaoxi.mddcity = $("#cgz-mdcity").text();
                var result = autoInputsunval.mddresult;
                var tipstwo = autoInputsunval.mddresult.tips;  
                // 点击时，目的地的数据 
                fabuxiaoxi.mmddata =  autoInputsunval.mddresult.tips[i];
                // 给目的地赋值
                $("#cgz-mdd").val(tipstwo[i].name);
                $("#address").text(tipstwo[i].name);
            } 
            if(FreeRide.btmisjump===1 && FreeRide.topisjump ===1 ){
                // 都已完成，跳转到时间选择页。
                window.location.hash = "#time";
            }
            // 如果没有输入，直接点击呢。

        }

// 支付功能的实现 
        

     // 支付button的实现 
     // 以后多个就这样实现 
     var paymentbttsj  = {
         title:"",
         amount:100,
         billno: "FRO",   // 生成订单号 
         instant_channel:"wx", // 订单支付形式 
         openid:{},  // openid的存储 
         usource:"Wx_Kbt",   // 用户的来源 
         FROID:111     // 发布单号，取当前信息的id值 
     }

    function paymentbutton(FROID,qmguid){
        //首先取消所有 
        // qmguid： 数据的发布者的id号  
        // 如果uid一直 ，则不需要付钱，点击时直接看  
        if(parseInt(qmguid) == parseInt(nowusermsg.uid) ){
            // 支付成功  可以观看用户的信息 
            // 如果一样，直接用本地的id就好 
            var jwxxone = "#ownshowdata?id="+FROID+"&uid="+qmguid+"&sf=run";
            
            var wlgrefone = "http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/font/html/xq.html"+jwxxone;
          
            window.location.href = wlgrefone ;
            
            // 现在判断解决， 
            return false;
            // 判断if else  
        }else{
                // id不一样 
        paymentbttsj.title = "发布订单";
        paymentbttsj.FROID = FROID; 
     
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
        paymentbttsj.billno = paymentbttsj.billno + generateTimeReqestNumber() + rand;
        

    // 参数
    var param = {"title" : paymentbttsj.title,"amount" : paymentbttsj.amount,"outtradeno" : paymentbttsj.billno};

    // 地址
    var url = "../common/getBSign-kongbatong.asp";

// sfcsj.passenger 存储着用户的信息 
        // openid 需要传入的数据的定义
        var sfvallx = locationqjval.val;
        var utype = "";
        if(sfvallx ==="a=p"){
            utype = "Passenger";
        }else if(sfvallx==="b=v"){
            utype = "Driver";
        }
        paymentbttsj.openid = {
            uid:nowusermsg.uid,
            phone:nowusermsg.phone,
            usource:paymentbttsj.usource,
            FROID:paymentbttsj.FROID,
            utype:utype
        };
       
    $.post(url,param,function(data){
        if (!((typeof (data) == 'object') && data.constructor == Object)) {
            data = eval("(" + data + ")");
        }

        if(data.BSign) {
            bSign = data.BSign;

        BC.err = function(data) {
            //注册错误信息接受
            showMessage1btn(data["ERROR"],"",0);
        }
        
        BC.click({
            //"return_url" : "http://qckj.czgdly.com/bus/MobileWeb/WxWeb/myTickets_content.html",
            "instant_channel" : paymentbttsj.instant_channel,
            "debug" : false,
            "need_ali_guide" : true,
            "use_app" : true,
            "title" : paymentbttsj.title, //商品名
            "amount" : paymentbttsj.amount,  //总价（分）
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
                        showMessage1btn("支付成功！如需退单，请提前发班时间24小时退定！","Back()",1);
                        // 支付成功  可以观看用户的信息 
                        var jwxx = "#ownshowdata?id="+paymentbttsj.FROID+"&uid="+qmguid+"&sf=run";
                        // 传入id号 和 uid 
                        // 应该是发布数据的那个人的 
                        var wlgref = "http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/font/html/xq.html"+jwxx;
                        window.location.href = wlgref ;
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

// 时间页面的组件 
    // 时间选择所需要的数据 
    function setTimeWheel(){            
        var dd = new Date();
        var currYear = dd.getFullYear();  
        var opt={};
        //opt.datetime = { preset : 'datetime', minDate: new Date(2012,3,10,9,22), maxDate: new Date(2014,7,30,15,44), stepMinute: 5  };
        dd.setDate(dd.getDate()+1);//获取AddDayCount天后的日期
        opt.sdatetime = {minDate: dd};
        opt.sdtdefault_0 = {
            dateOrder: 'yymmddDD',
            theme: 'android-ics light', //皮肤样式
            display: 'bottom', //显示方式 
            mode: 'scroller', //日期选择模式
            lang:'zh',
            dateFormat: 'yyyy-mm-dd',
            startYear:currYear, //开始年份
            endYear:currYear + 1, //结束年份
            stepMinute: 1,  // More info about stepMinute: http://docs.mobiscroll.com/2-16-1/datetime#!opt-stepMinute
            onSelect: function (valueText, inst) {  
                var sday = inst.getDate();  
                var today = new Array('周日','周一','周二','周三','周四','周五','周六'); 
                
                //获取当前日期
                var tmpNow = new Date();
                tmpNow.setDate(tmpNow.getDate()+1);//获取AddDayCount天后的日期
                                    
                var dateArray = inst.getArrayVal();
                var week = today[sday.getDay()];  
                var year = dateArray[0];
                var Month = parseInt(dateArray[1]) + 1;
                var day = dateArray[2];
                var hour = dateArray[3];
                var minute = dateArray[4];
                
                if (sday < tmpNow){
                    opt.sdatetime = {minDate: tmpNow};
                    week = today[tmpNow.getDay()];
                    year = tmpNow.getFullYear();
                    Month = tmpNow.getMonth() + 1;
                    day = tmpNow.getDate();
                    hour = tmpNow.getHours();
                    minute = tmpNow.getMinutes();
                }
                
                if (parseInt(Month) < 10) {
                    Month = "0" + Month;
                }
                
                if (parseInt(hour) < 10) {
                    hour = "0" + hour;
                }
                
                if (parseInt(minute) < 10) {
                    minute = "0" + minute;
                }
                
                if ($(this).hasClass("start_time_default")){
                    $(this).removeClass("start_time_default").addClass("start_time only_one_time");
                }
                var tmpStr = "<span class='date'>" + Month + "月" + day + "日" + "<b class='week'>" + week + "</b>" + hour + ":" + minute + "</span>"
                $(this).html(tmpStr);
                $(this).attr("data-val",valueText);
                
                var optSDateTime_tmp = $.extend(opt['sdatetime'], opt['sdtdefault_0']);
                $("#dt-a-0").mobiscroll().datetime(optSDateTime_tmp);
                $("#dt-c-1").mobiscroll().datetime(optSDateTime_tmp);
                changePriceByUCar();
            }  
        };
        var optSDateTime_0 = $.extend(opt['sdatetime'], opt['sdtdefault_0']);
        $("#dt-a-0").mobiscroll().datetime(optSDateTime_0);  
        $("#dt-c-1").mobiscroll().datetime(optSDateTime_0); 
    }
    // 存储值的地方 
    var changePriceByUCarval = {
        cfsj:"",    // 存储出发时间的值 
        qwsj:""   // 存储期望到达的时间 
    }
    // 值变化取值 
        function changePriceByUCar(){
          
        }
    // 时间取值函数 
        // 取消方法 
            function timequxfunction(){
                window.location.hash = "#details?settle";
            }
        // 点击确认时的操作 
            function timeqrfunction(){
                if($("#dt-a-0").text()==="选择出发时间"){
                    showMessage1btn("请选择出发时间!","",0);
                }else if($("#dt-c-1").text()==="选择期望到达时间"){
                    showMessage1btn("请选择期望到达时间!","",0);
                }else {
                    var cfsj =  $("#dt-a-0").attr("data-val");
                    var mdsj =  $("#dt-c-1").attr("data-val");
                    if(Date.parse(mdsj)>Date.parse(cfsj)){
                        // 赋值
                        FreeRide.cftime = cfsj;
                        FreeRide.mdtime = mdsj;
                        // 给发布使用
                        fabuxiaoxi.cftime = cfsj;
                        fabuxiaoxi.mdtime = mdsj;
                        window.location.hash = "#personnum";
                    }else {
                        showMessage1btn("期望时间不能小于出发时间!","",0);
                    }
                }
            }
    
//  实现页面滑动到底部加载

    // 滑动需要的全局函数 
    // 乘客passengerNode的滑动效果 
    var passengerNodeval = {
        page:2,    // 当前页，用于向页面发送请求的页码参数 第一次发送的为2 
        loadcount:3  // 页面展示的为第几页的数据 
    }
    function hdpassengerNode(){
        var useruid =  nowusermsg.uid;
        var $passenger = $('#passengerNode').infiniteScroll({     //#content是包含所有图或块的容器
            path: function(){
                // 如果用户滑动时，当前页面展示的数据页码小于等于后台的数据页码 
                // 这里判断有问题 
                if(  passengerNodeval.page <= passengerNodeval.loadcount){
                    return "http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/queryPageMadeFROrders_get.asp?cur="+passengerNodeval.page+"&pushType=Passenger"+"&uid="+useruid+"&dateRange="+"&dpCity="+"&arCity=";
                }
            },
            history: false,
            scrollThreshold:50,
            elementScroll:".cylx",
            status:".page-load-status",
            responseType:"json",
            debug:true
        });
        $passenger.on( 'load.infiniteScroll', function( event, response ) {
            var data = response;
            // 获取成功后，要把页面加1，方便用户在滑动，在触发获取函数
            passengerNodeval.page++;
            // 开始处理结果 
             // 赋值最大页数 
            passengerNodeval.loadcount = data.page;
           
                 // 调用处理乘客页的函数 
                setPassenger(data);   
        })
    }

     // 车主页vownperNode的滑动效果 
     var vownperNodeval = {
        page:2,    // 当前页，用于向页面发送请求的页码参数 第一次发送的为2 
        loadcount:3   // 页面展示的为第几页的数据 
    }
    function hdvownperNode(){
        var useruid =  nowusermsg.uid;
        var $vownper = $('#vownperNode').infiniteScroll({     //#content是包含所有图或块的容器
            path: function(){
                // 如果用户滑动时，当前页面展示的数据页码小于等于后台的数据页码 
                // 数据量很小情况下  报错了 
                if(  vownperNodeval.page <= vownperNodeval.loadcount){
                    // 获取全部时间的行程，失效页没有关系 
                    return "http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/queryPageMadeFROrders_get.asp?cur="+vownperNodeval.page+"&pushType=Driver"+"&uid="+useruid+"&dateRange="+"&dpCity="+"&arCity=";
                }
            },
            history: false,
            elementScroll:".vonpondclxc",
            scrollThreshold:50,
            status:".vowpage-load-status",
            responseType:"json",
            debug:true
        });
        $vownper.on( 'load.infiniteScroll', function( event, response ) {
            var data = response;
            // 获取成功后，要把页面加1，方便用户在滑动，在触发获取函数
            // 开始处理结果 
             // 赋值最大页数 
            vownperNodeval.loadcount = data.page;
            vownperNodeval.page = vownperNodeval.page+1;
                 // 调用处理车主页的函数 
                 setVowner(data);
        })
    }

// 全部行程中 乘客页滑动效果 
     // 全部行程中 乘客页滑动效果runpassengerNode的滑动效果 
     var runpassengerval = {
        page:2,    // 当前页，用于向页面发送请求的页码参数 第一次发送的为2 
        loadcount:3   // 页面展示的为第几页的数据 
    }
    function hdrunpassenger(){
        var useruid =  nowusermsg.uid;
        var $runpassengerval = $('#runpassengerNode').infiniteScroll({     //#content是包含所有图或块的容器
            path: function(){
                // 如果用户滑动时，当前页面展示的数据页码小于等于后台的数据页码 
                // 数据量很小情况下  报错了 
                if(  runpassengerval.page <= runpassengerval.loadcount){
                    // 获取全部时间的行程，失效页没有关系 
                    return "http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/queryPageMadeFROrders_get.asp?cur="+runpassengerval.page+"&pushType=Passenger"+"&uid="+"&dateRange="+"&dpCity=''"+"&arCity=";
                }
            },
            history: false,
            elementScroll:".runpassenger",
            scrollThreshold:50,
            status:".runpaspage-load-status",
            responseType:"json",
            debug:true
        });
        $runpassengerval.on( 'load.infiniteScroll', function( event, response ) {
            var data = response;
            // 获取成功后，要把页面加1，方便用户在滑动，在触发获取函数
            // 开始处理结果 
             // 赋值最大页数 
            runpassengerval.loadcount = data.page;
            runpassengerval.page = vownperNodeval.page+1;
                 // 调用处理车主页的函数 
                 setqbPassenger(data);
        })
    }
// 全部行程中 车主的滑动效果 
     // 滑动需要的全局函数 
    // 全部行程中 乘客页滑动效果runvowner的滑动效果 
    var runvownerval = {
        page:2,    // 当前页，用于向页面发送请求的页码参数 第一次发送的为2 
        loadcount:3  // 页面展示的为第几页的数据 
    }
    function hdrunvowner(){
        var useruid =  nowusermsg.uid;
        var $runpassengerval = $('#runvownerNode').infiniteScroll({     //#content是包含所有图或块的容器
            path: function(){
                // 如果用户滑动时，当前页面展示的数据页码小于等于后台的数据页码 
                // 数据量很小情况下  报错了 
                if(  runvownerval.page <= runvownerval.loadcount){
                    // 获取全部时间的行程，失效页没有关系 
                
                    return "http://qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/queryPageMadeFROrders_get.asp?cur="+runvownerval.page+"&pushType=Driver"+"&uid="+"&dateRange="+"&dpCity="+"&arCity=";
                }
            },
            history: false,
            elementScroll:".runvowner",
            scrollThreshold:50,
            status:".runvownerNode-load-status",
            responseType:"json",
            debug:true
        });
        $runpassengerval.on( 'load.infiniteScroll', function( event, response ) {
            var data = response;
            // 获取成功后，要把页面加1，方便用户在滑动，在触发获取函数
            // 开始处理结果 
             // 赋值最大页数 
            runvownerval.loadcount = data.page;
            runvownerval.page = runvownerval.page+1;
                 // 调用处理全部车主页的函数 
                 setqbVowneraa(data);
        })
    }



// 支付页 滑动获取数据效果 
    var paymentzyval = {
            page:2,    // 当前页，用于向页面发送请求的页码参数 第一次发送的为2 
            loadcount:3   // 页面展示的为第几页的数据 
        }
        function hdpaymentzy(){
            var useruid =  nowusermsg.uid;
            var $runpassengerval = $('.phdiconfyq').infiniteScroll({     //#content是包含所有图或块的容器
                path: function(){
                    // 如果用户滑动时，当前页面展示的数据页码小于等于后台的数据页码 
                    // 数据量很小情况下  报错了 
                    if(  paymentzyval.page <= paymentzyval.loadcount){
                        // 获取全部时间的行程，失效页没有关系 
                        return "http://qckj.czgdly.com/bus/MobileWeb/madeFROViewPayments/queryPageMadeFROVPayments.asp?cur="+paymentzyval.page+"&uid="+useruid+"&dateRange=";
                    }
                },
                history: false,
                elementScroll:".paymentzy",
                scrollThreshold:50,
                responseType:"json",
                debug:true
            });
            $runpassengerval.on( 'load.infiniteScroll', function( event, response ) {
                var data = response;
                // 获取成功后，要把页面加1，方便用户在滑动，在触发获取函数
                                                // 10     2         
                // 开始处理结果 
                // 赋值最大页数 
                paymentzyval.loadcount = data.page;
                paymentzyval.page = paymentzyval.page+1;
                    // 调用处理全部车主页的函数 
                    paymentpageval.result = data ;
                    if(data.result>0){
                         for(var jj = 0 ;jj<data.obj.froViewPayments.length;jj++){
                             $(".phdiconfyq").append(sfcsj.paymentpage);
                         // 处理支付页面的数据 
                             paymentpcl(jj,data);
                         }
                    }
            })
        }

// 筛选判断的逻辑 
    var runscreenv = {
        winhash:"",      // 存储路由信息 
        time:"",       // 发送ajax的time值 
        cfd:"",         // 出发地 
        mdd:""         // 目的地 
    }
    //事件处理 
        // 给runscreen添加值 
        var valjson = {
            "background":"#f2f2f2",
            "color":"#555"
        };
        // 选择时间 
            function runscrqdvohs(){
                $(".runscrqdvo").css(valjson);
                $(".runscrqdvt").css(valjson);
                $(".runscrqdvtr").css(valjson);
            }
            var rscrdvohslet = {
                one:1,
                two:1,
                three:1
            }
            $(".runscrqdvo").bind("touch click",function(){
                rscrdvohslet.one +=1;
                if(rscrdvohslet.one%2 === 0){
                    runscrqdvohs();  
                    $(".runscrqdvo").css(rsfidvloval);   
                    runscreenv.time = "today";
                }else {
                    $(".runscrqdvo").css(valjson);
                    runscreenv.time = "";
                }
            })
            $(".runscrqdvt").bind("touch click",function(){
                rscrdvohslet.two +=1;
                if(rscrdvohslet.two%2 ===0){
                    runscrqdvohs();  
                    $(".runscrqdvt").css(rsfidvloval);
                    runscreenv.time = "weekday";
                }else{
                    $(".runscrqdvt").css(valjson);
                    runscreenv.time = "";
                }
                
            })
            $(".runscrqdvtr").bind("touch click",function(){
                rscrdvohslet.three +=1;
                if(rscrdvohslet.three%2 ===0){
                    runscrqdvohs();  
                    $(".runscrqdvtr").css(rsfidvloval);
                    runscreenv.time = "month";
                }else {
                    $(".runscrqdvtr").css(valjson);
                    runscreenv.time = "";
                }
                
            })
        // 选择出发地 
            // 输入 
                $(".rscfcdaipt").bind("blur",function(){
                    $(".rsfidvlo").css(valjson);
                    $(".rsfidvlt").css(valjson);
                    $(".rsfidvltr").css(valjson);
                    $(".rsfidvf").css(valjson);
                    $(".rsfidvlfif").css(valjson);
                    runscreenv.cfd = $(".rscfcdaipt").val();

                })
            // 点击几个城市 
                function rsfidvlovalhs(){
                    // 几个div 
                    $(".rsfidvlo").css(valjson);
                    $(".rsfidvlt").css(valjson);
                    $(".rsfidvltr").css(valjson);
                    $(".rsfidvf").css(valjson);
                    $(".rsfidvlfif").css(valjson); 
                }
                var rsfidvloval = {
                    "background":"#23beae",
                    "color":"#fff"
                };
                var rsflovlhslet = {
                    one:1,
                    two:1,
                    three:1,
                    four:1,
                    five:1
                }
                var rsdcsdloval = {
                    "background":"#ff4a39",
                    "color":"#fff"
                }
                var rsdcsdlvllet ={
                     one:1,
                     two:1,
                     three:1,
                     four:1,
                     five:1
                 }
                $(".rsfidvlo").bind('touch click',function(){
                    rsflovlhslet.one +=1;
                    if(rsflovlhslet.one%2===0){
                        runscreenv.cfd = $(".rsfidvlo").text();
                        rsfidvlovalhs();
                        $(".rsfidvlo").css(rsfidvloval);
                    }else {
                        runscreenv.cfd="";
                        $(".rsfidvlo").css(valjson);
                    }
                })
                $(".rsfidvlt").bind('touch click',function(){
                    rsflovlhslet.two +=1;
                    if(rsflovlhslet.two%2===0){
                        runscreenv.cfd = $(".rsfidvlt").text();
                        rsfidvlovalhs();
                        $(".rsfidvlt").css(rsdcsdloval);
                    }else {
                        runscreenv.cfd="";
                        $(".rsfidvlt").css(valjson);
                    }
                })
                $(".rsfidvltr").bind('touch click',function(){
                    rsflovlhslet.three +=1;
                    if(rsflovlhslet.three%2===0){
                        runscreenv.cfd = $(".rsfidvltr").text();
                        rsfidvlovalhs();
                        $(".rsfidvltr").css(rsfidvloval);
                    }else {
                        runscreenv.cfd="";
                        $(".rsfidvltr").css(valjson);
                    }
                    
                })
                $(".rsfidvf").bind('touch click',function(){
                    rsflovlhslet.four +=1;
                    if(rsflovlhslet.four%2===0){
                        runscreenv.cfd = $(".rsfidvf").text();
                        rsfidvlovalhs();
                        $(".rsfidvf").css(rsfidvloval);
                    }else {
                        runscreenv.cfd="";
                        $(".rsfidvf").css(valjson);
                    }
                    
                })
                $(".rsfidvlfif").bind('touch click',function(){
                    rsflovlhslet.five +=1;
                    if(rsflovlhslet.five%2===0){
                        runscreenv.cfd = $(".rsfidvlfif").text();
                        rsfidvlovalhs();
                        $(".rsfidvlfif").css(rsfidvloval);
                    }else {
                        runscreenv.cfd="";
                        $(".rsfidvlfif").css(valjson);   
                    }
                    
                })
        // 选择目的地 
            // 输入框 
            // 下面几个点击 
                function rsdcsdlovalhs(){
                    // 几个div 
                    // 下面几个div 
                    $(".rsdcsdlo").css(valjson); 
                    $(".rsdcsdlt").css(valjson); 
                    $(".rsdcsdltr").css(valjson); 
                    $(".rsdcsdlf").css(valjson); 
                    $(".rsdcsdlfi").css(valjson); 
                }
                
        function rscsxsjofhu(){
            winhash = window.location.hash;
            if(winhash==="#run?passgeran"){
                window.location.hash = "#run?passger";
            }else if(winhash==="#run?diveran"){
                window.location.hash = "#run?diver";
            }
        }
        // 点击确定时，取值发送ajax，调用渲染页面函数 
        $(".runscjwfbsxdd").bind("touch click",function(){
            runscreenv.winhash = window.location.hash;
            if(runscreenv.time==="" && runscreenv.cfd ==="" && runscreenv.mdd===""){
                getqbVowner();
                getqbPassenger();
                if(runscreenv.winhash==="#run?passgeran"){
                    window.location.hash = "#run?passger";
                }else if(runscreenv.winhash==="#run?diveran"){
                    window.location.hash = "#run?diver";
                }
            }else{
                // 判断路由 
                // 乘客页 
                if(runscreenv.winhash==="#run?passgeran"){
                    $.ajax({
                        url: sfcsj.passengerUrl,
                       type: 'post',
                       data:{
                           cur:1,  // 默认取第一页 
                           pushType:"Passenger",   // 乘客 
                           uid:"",  // id号   默认为空就是取全部的数据
                           dateRange:runscreenv.time,      
                           arCity:runscreenv.mdd.trim(),      // 到达城市 
                           dpCity:runscreenv.cfd.trim()      // 出发城市 
                       },
                        success: function (data) {
                            qbxcvalsj.passenger = data;
                           // setPassenger() 处理 乘客端数据的函数
                           // 先清空，在添加 
                          
                           // 成功取到数据后，要清空runscreenv，防止下次再用值不对 
                           runscjwfbsxddcsh();
                           $("#runpassengerNode").empty();
                           setqbPassenger(data);
                           window.location.hash = "#run?passger";
                           
                       }
                      });
                }else if(runscreenv.winhash==="#run?diveran"){
                    $.ajax({
                        url: sfcsj.vownerUrl,
                       type: 'post',
                       data:{
                           cur:1,  // 默认取第一页 
                           pushType:"Driver",   // 乘客 
                           uid:"",  // id号   默认为空就是取全部的数据
                           dateRange:runscreenv.time.trim(),      
                           arCity:runscreenv.mdd.trim(),      // 到达城市 
                           dpCity:runscreenv.cfd.trim()     // 出发城市 
                       },
                        success: function (data) {
                           qbxcvalsj.vowner = data;
                           // 获取成功，但是数据暂时为空 
                           // setPassenger() 处理 乘客端数据的函数
                           // 成功取到数据后，要清空runscreenv，防止下次再用值不对 
                           runscjwfbsxddcsh();
                           $("#runvownerNode").empty();
                           setqbVowneraa(data);
                           window.location.hash = "#run?diver";
                       }
                      });
                }
                // 完成了要把runscreen,使用完要把那个清空 
            }
        })
        // 把所有东西初始化 
        // 切换到这两个路由时，就进行初始化  
        function runscjwfbsxddcsh(){
            runscreenv.cfd ="";
            runscreenv.mdd="";
            runscreenv.time = "";
            runscreenv.winhash ="";
            // 样式也要初始化 
            var valjson = {
                "background":"#f2f2f2",
                "color":"#555"
            };
            $(".runsccfcdva .runsccficondv ul li").css(valjson);
            $(".runscrqdvtddcs .runsddcsondv ul li").css(valjson);
            $(".runscrqdvo").css(valjson);
            $(".runscrqdvt").css(valjson);
            $(".runscrqdvtr").css(valjson);
            $(".rscfcdaipt").val(" ");
            $(".rscfcdaipt").attr("placeholder","请填写以市为结尾的数据");
            $(".rsdcsoipt").val(" ");
            $(".rsdcsoipt").attr("placeholder","请填写以市为结尾的数据");
            // 几个div 
            $(".rsfidvlo").css(valjson);
            $(".rsfidvlt").css(valjson);
            $(".rsfidvltr").css(valjson);
            $(".rsfidvf").css(valjson);
            $(".rsfidvlfif").css(valjson); 
            // 下面几个div 
            $(".rsdcsdlo").css(valjson); 
            $(".rsdcsdlt").css(valjson); 
            $(".rsdcsdltr").css(valjson); 
            $(".rsdcsdlf").css(valjson); 
            $(".rsdcsdlfi").css(valjson); 
        }
        // 取消时，直接使用路由 
        $(".runscjwfbsxqx").bind("touch click",function(){
            // 返回 #run  路由页面  
            runscreenv.winhash = window.location.hash;
            getqbVowner();
            getqbPassenger();
           
            if(runscreenv.winhash===""){
                window.location.hash = "#run";
            }else if(runscreenv.winhash==="#run?diveran"){
                window.location.hash = "#run?diver";
            }else if(runscreenv.winhash==="#run?passgeran"){
                window.location.hash = "#run?passger";
            }
        })


    
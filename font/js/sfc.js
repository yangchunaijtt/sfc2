    var nowusermsg = {
        uid:"",         //用户id 
        userid:"",
        openid:111,
        phone:111,   //用户的手机号 
        lyxx:"",   // 存储需要用到路由的值 
        newPageHash:"",  // 初始化页面获取到的hash值。
        secrecy:""         // 存储
    }
    // 禁用效果 
    $(document.body).css({
    "overflow-x":"hidden",
    "overflow-y":"hidden"
    });

    // 可以监听页面刷新事件
    $(function(){
        // 后台给的先调用下 这段js 
        getOpenid(function(openid){
            // nowusermsg.newPageHash = window.location.hash;
            // nowusermsg.secrecy = urlToObj(nowusermsg.newPageHash);
            // if ( nowusermsg.newPageHash == "#passenger" || nowusermsg.newPageHash == "" || nowusermsg.secrecy == "" ) {
                
            // } else {
            //     localStorage.setItem("uid-kongbatong",nowusermsg.secrecy.uid);
            //     localStorage.setItem("mobile-kongbatong",nowusermsg.secrecy.mobile);
            //     localStorage.setItem("userid-kongbatong",nowusermsg.secrecy.userid);
            // }
            nowusermsg.uid = localCache("uid-kongbatong");
            nowusermsg.openid = localCache("openid-kongbatong");
            nowusermsg.phone = localCache("mobile-kongbatong");
            nowusermsg.userid = localCache("userid-kongbatong");
            nowusermsg.openid = openid;
            console.log("openid",openid,nowusermsg.openid);
            if(null == nowusermsg.uid || "" == nowusermsg.uid) {
                register("//qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html");   //返回注册登录页面
            } else {
                //  判断注册了没
                owneridentity.ownerajax();
                // 定位
                sfc_amapdw();
                // initData(nowusermsg.uid); //加载页面数据
                getPassenger("","","",0);
                getVowner("","","",0);
                hactive();
                formcontrol();
                getqbVowner();
                getqbPassenger();
                // 默认获取车主提现的数据
                balanceMycash.cashMoneyPage("","",0);
                // 车主提现信息
                balanceMycash.getMoneyRecord();
                // 主页的高度
                $(document.body).outerHeight($(window).outerHeight());      
                // 高度设置的问题
                // 全部行程页 车主页的高度 
                $(".runvownerNodedclxc").outerHeight($(document.body).outerHeight()-$(".header").outerHeight()-50);
           
                // 全部行程页 乘客页的高度 
                $(".runpassengerNodedivdclxc").outerHeight($(document.body).outerHeight()-$(".header").outerHeight()-50);
                // 初始化时设置默认值 
                $(".dqcsval").text($(".xcspanleft").text());
                // 给滑动元素获取高度 
                // 乘客页的高度 
                $(".cylx").outerHeight($(document.body).outerHeight()-$(".passenger .select").outerHeight()-$(".header").outerHeight()-40);
                // 车主页的高度 
                // 这里容易出问题，最后在改改 
                $(".vonpondclxc").outerHeight($(document.body).outerHeight()-$(".passenger .select").outerHeight()-$(".header").outerHeight()-50);
                // 解决一些页面内容太多无法滑动的问题 
                $(".details").outerHeight($(document.body).outerHeight()-$(".header").outerHeight());
                $("#searchxincheng").outerHeight($(document.body).outerHeight()-$(".header").outerHeight());
                // 让筛选页也可以滑动 
                $(".runscreen").outerHeight($(document.body).outerHeight()-$(".header").outerHeight());
                // 发布页的css样式
                $(".personNum").outerHeight($(document.body).outerHeight()-$(".header").outerHeight()-20);
                // 小手机的显示问题
                if($(".personNum").outerHeight()<587){
                    $(".personNum").outerHeight(587);
                }
                // 时间选择页
                $(".timeheader").outerHeight($(document.body).outerHeight()-$(".header").outerHeight()-120);
                // 小手机的显示问题
                if($(".timeheader").outerHeight()<440){
                    $(".timeheader").outerHeight(440);
                }
                // 车主注册页
                $(".owner-register").outerHeight($(document.body).outerHeight()-$(".header").outerHeight());
                // 审核页的样式
                $(".to-examine").outerHeight($(document.body).outerHeight());
                // 我的账单页
                $("#cashMoneyPage").outerHeight($(document.body).outerHeight()-$(".header").outerHeight());

                paymentBinding.phdiconDivNew();
                // 点击时车主时 调用渲染函数
                owenerCash.owerPage(1,"");
                // 点击我的支付时，调用的函数
                paymentpage(nowusermsg.uid,"Passenger",1,"");
                // 筛选绑定的事件
                screen.newPage();
                paymentBinding.newPage();
                paymentBinding.passnewPage();
                runsccfcs.newPage();
                // 地图页高度
                $(".chufadi-total").outerHeight($(document.body).outerHeight()-$(".header").outerHeight()-$("#container").outerHeight());
            }
        },location.search);
        
        // 当 hash变化时切换显示
// 给导航条绑定切换
    var globalVariable = {
        hpassengerpd:1,
    }
   $(".hpassenger").bind("touch click",function(){
         $(".runluyouaa").hide();
         globalVariable.hpassengerpd++;
       if(globalVariable.hpassengerpd%2===0){
        $("#hpassengericon").attr("class","glyphicon glyphicon-triangle-top");
       }else {
        $("#hpassengericon").attr("class","glyphicon glyphicon-triangle-bottom"); 
       }
       $(".hvowner").slideToggle("normal");
   })
   // 给导航条绑定事件 
   var hrunxuzval = 1;
    $(".hrun").bind("touch click",function(){
        // 0代表没有车主身份,1代表有,2代表审核中。3代表刚刚注册成功，跳转到请稍等页面。4代表注册审核失败，跳转出重新注册页面
        //  owneridentity.states = 4;
        hashlycolorsz();
        $(".hrun").css("color","#e39f7a");
        if(owneridentity.states===0){
            if ( owneridentity.isAjax) {
                window.location.hash = "#register";
            }else {
                showLodding("请稍等，加载中...");
            }
        }else if(owneridentity.states===1){
            hrunxuzval ++;
            if(hrunxuzval%2===0){
                $(".hrunoneicon").attr('class',"glyphicon glyphicon-triangle-top hrunoneicon");
            }else {
                $(".hrunoneicon").attr('class',"glyphicon glyphicon-triangle-bottom hrunoneicon");
            }
            $(".runluyouaa").slideToggle("normal");
        }else if(owneridentity.states===2){
            $(".to-examine").empty();
            $(".to-examine").append("<div class='to-examinets'>正在审核中,请耐心等待....</div><img src='./font/fontjs/examine.gif'   class='to-examineimg'>");
            window.location.hash = "#examine";
        }else if(owneridentity.states===3){
            $(".to-examine").empty();
            $(".to-examine").append("<div class='to-examinets'>发送成功,请耐心等待审核....</div><img src='./font/fontjs/examine.gif'   class='to-examineimg'>");
            window.location.hash = "#examine";
        }else if(owneridentity.states===4){
            $(".to-examine").empty();
            $(".to-examine").append("<div class='to-examinets'> 注册失败,请重新注册....</div><img src='./font/fontjs/examine.gif'   class='to-examineimg'><a href='#register' class='btn btn-success to-examineicon'>点击重新注册</a>");
            window.location.hash = "#examine";
        }
    })
        
    // 给返回添加返回事件 
    $(".rscsxsjofhu").bind("touch click",function(){
        rscsxsjofhu();
    })

        if(cityselectval.nowcity==""){
            $(".acityselect").text("常州市");
        }
        //支付模块的功能 
        // 提交操作
        $("#gaodesubmit").bind("touch click",function(e){
           paymentModular.payment();
        })

        //修改样式 
        $("#ctxz").css("display","none")

        window.onhashchange = hashChange;

        
        //另外js的初始化数据 
        createlival();
        //绑定时间函数 
        setTimeWheel();
        //这里的问题 
        $("#chufadi-div").bind("touch click",function(){
            inchufadi();
        })
        //这里的问题 
        $("#address-div").bind("touch click",function(){
            inaddress();
        })
        $(".dqcsval").text(cityselectval.nowcity);
        $("#inxcbody").blur(function(){
            $("#inxcbody").val("");
        })
        $("#inxcbody").focus(function(){
            var lctionhash = window.location.hash;
            $("#inxcbody").val("");
            if(lctionhash==="#s"){
                $("#cgz-mdcity").val(cityselectval.nowcity);
                window.location.hash  = "#sxxwz";
            }
            if(lctionhash==="#m"){
                $("#cgz-mdcity").val(cityselectval.nowcity);
                window.location.hash  = "#mxxwz";
            }
        })
        // 初始化条件 
            $("#chufadi").text("从哪儿出发？");
            $("#address").text("想去哪儿？");

        $(".timequx").bind("touch click",function(){
            timequxfunction();
        })
        
        $(".timeqr").bind("touch click",function(){
            timeqrfunction();
        })

        //定位市默认选择常州颜色，但是不在地图上点击
        removeacive();
        $(".ullish").addClass("ulliactive");
        cszhi(".ullish");
    // 页面点击路由颜色设置 
        $(".hpassenger").bind("touch click",function(){
            hashlycolorsz();
            $(".hpassenger").css("color","#e39f7a");
        })
        $("#ddxq").bind("touch click",function(){
            hashlycolorsz();
            $("#ddxq").css("color","#e39f7a");
            $("#ddxq a").css("color","#e39f7a");
        })

// 绑定事件都放在这里面     
// 始发地 目的地 点击后 赋值并给下一页
        $("#searchxincheng .xzli1").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli1").text();
            if ( window.location.hash == "#cityother") {
                runsccfcs.clickTo(textval);
            }else {
                xzlichuli(textval);
            }
           
        })
        $("#searchxincheng .xzli2").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli2").text();
            if ( window.location.hash == "#cityother") {
                runsccfcs.clickTo(textval);
            }else {
                xzlichuli(textval);
            }
            
        })
        $("#searchxincheng .xzli3").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli3").text();
            if ( window.location.hash == "#cityother") {
                runsccfcs.clickTo(textval);
            }else {
                xzlichuli(textval);
            }
            
        })
        $("#searchxincheng .xzli4").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli4").text();
            if ( window.location.hash == "#cityother") {
                runsccfcs.clickTo(textval);
            }else {
                xzlichuli(textval);
            }
            
        })
        $("#searchxincheng .xzli5").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli5").text();
            if ( window.location.hash == "#cityother") {
                runsccfcs.clickTo(textval);
            }else {
                xzlichuli(textval);
            }
            
        })
        $("#searchxincheng .xzli6").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli6").text();
            if ( window.location.hash == "#cityother") {
                runsccfcs.clickTo(textval);
            }else {
                 xzlichuli(textval); 
            }
            
        })
        $("#searchxincheng .xzli7").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli7").text();
            if ( window.location.hash == "#cityother") {
                runsccfcs.clickTo(textval);
            }else {
                xzlichuli(textval);
            }
            
        })
        $("#searchxincheng .xzli8").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli8").text();
            if ( window.location.hash == "#cityother") {
                runsccfcs.clickTo(textval);
            }else {
                xzlichuli(textval);
            }
            
        })
        $("#searchxincheng .xzli9").bind("touch click",function(){  
            var  textval =  $("#searchxincheng .xzli9").text();
            if ( window.location.hash == "#cityother") {
                runsccfcs.clickTo(textval);
            }else {
                xzlichuli(textval)
            }
                
        })
        $("#searchxincheng .xzli10").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli10").text();
            if ( window.location.hash == "#cityother") {
                runsccfcs.clickTo(textval);
            }else {
                xzlichuli(textval);
            }
            
        })
    // 筛选页删除按钮
        $("#runsccfcs-arremove").bind("touch click",function(){
            $("#runsccfcs-arinput").val("");
        })
        $("#runsccfcs-dpremove").bind("touch click",function(){
            $("#runsccfcs-dpinput").val("");
        })
    // 点击取消，页面跳为地图页面 
        $(".xcqx").bind("touch click",function(){
            window.history.back(-1);
        })
    // 选择目的地 
            // 输入框 
            var valjson = {
                "background":"#f2f2f2",
                "color":"#555"
            };
            $(".rsdcsoipt").bind("blur",function(){
                $(".rsdcsdlo").css(valjson);
                $(".rsdcsdlt").css(valjson);
                $(".rsdcsdltr").css(valjson);
                $(".rsdcsdlf").css(valjson);
                $(".rsdcsdlfi").css(valjson);
                runscreenv.mdd = $(".rsdcsoipt").val();
            })
            var rsdcsdloval = {
                "background":"#ff4a39",
                "color":"#fff"
            }
            $(".rsdcsdlo").bind("touch click",function(){
                personumfunction.mddnumclear(1);
                personumfunction.rsdcsdlvllet.one+=1;
                if(personumfunction.rsdcsdlvllet.one%2 ===0){
                    rsdcsdlovalhs($(".rsdcsdlo").text());
                    $(".rsdcsdlo").css(rsdcsdloval);
                }else {
                   personumfunction.clearrsdcsdlovalhs();
                    $(".rsdcsdlo").css(valjson);
                }
            })
            $(".rsdcsdlt").bind("touch click",function(){
                personumfunction.mddnumclear(2);
                personumfunction.rsdcsdlvllet.two+=1;
                if(personumfunction.rsdcsdlvllet.two%2 ===0){
                    rsdcsdlovalhs($(".rsdcsdlt").text());
                    $(".rsdcsdlt").css(rsdcsdloval);
                }else {
                   personumfunction.clearrsdcsdlovalhs();
                    $(".rsdcsdlt").css(valjson);
                }
                
            })
            $(".rsdcsdltr").bind("touch click",function(){
                personumfunction.mddnumclear(3);
                personumfunction.rsdcsdlvllet.three+=1;
                if(personumfunction.rsdcsdlvllet.three%2 ===0){
                    rsdcsdlovalhs($(".rsdcsdltr").text());
                    $(".rsdcsdltr").css(rsdcsdloval);
                }else {
                   personumfunction.clearrsdcsdlovalhs();
                    $(".rsdcsdltr").css(valjson);
                }
               
            })
            $(".rsdcsdlf").bind("touch click",function(){
                personumfunction.mddnumclear(4);
                personumfunction.rsdcsdlvllet.four+=1;
                if(personumfunction.rsdcsdlvllet.four%2 ===0){
                    rsdcsdlovalhs($(".rsdcsdlf").text());
                    $(".rsdcsdlf").css(rsdcsdloval);
                }else {
                   personumfunction.clearrsdcsdlovalhs();
                    $(".rsdcsdlf").css(valjson);
                }
            })
            $(".rsdcsdlfi").bind("touch click",function(){
                personumfunction.mddnumclear(5);
                personumfunction.rsdcsdlvllet.five+=1;
                if(personumfunction.rsdcsdlvllet.five%2 ===0){
                    rsdcsdlovalhs($(".rsdcsdlfi").text());
                    $(".rsdcsdlfi").css(rsdcsdloval);
                }else {
                   personumfunction.clearrsdcsdlovalhs();
                    $(".rsdcsdlfi").css(valjson);
                }
            })
        // 人数筛选页的input绑定
            // 出发
            $(".rscfcdaipt").on("focus",function(){
                $(".rsfidvlo").css(valjson);
                $(".rsfidvlt").css(valjson);
                $(".rsfidvltr").css(valjson);
                $(".rsfidvf").css(valjson);
                $(".rsfidvlfif").css(valjson);
                runscreenv.cfd = "";
                $(".rscfcdaipt").val("");
            })
            // 到达
            $(".rsdcsoipt").on("focus",function(){
                $(".rsdcsdlo").css(valjson);
                $(".rsdcsdlt").css(valjson);
                $(".rsdcsdltr").css(valjson);
                $(".rsdcsdlf").css(valjson);
                $(".rsdcsdlfi").css(valjson);
                runscreenv.mdd = "";
                $(".rsdcsoipt").val("");
            })
    
    // 新添加的城市输入功能的绑定事件
        // 清空操作
        $("#cgz-cfdelete").bind("touch click",function(){
            FreeRide.searchweizhi(0);
        })
        $("#cgz-mddelete").bind("touch click",function(){
            FreeRide.searchweizhi(1);
        })
        // 返回操作
        $(".changzhou-return").bind("touch click",function(){
                window.location.hash = "#details?"+locationqjval.val;
        })
        // 按钮跳转到下一页
        $("#changzhou-button").bind("touch click",function(){
                var tishi = "";
                //出发地的所有信息 
                var cfddata = fabuxiaoxi.cfddata;
                // 目的地所有信息 
                var mdata = fabuxiaoxi.mmddata;
             
                if(cfddata==""   && fabuxiaoxi.dwsj=="" ){
                    tishi = "请选择始发地";
                }else if (mdata ==""   ){
                    tishi = "请选择目的地";
                    
                }else if ( ( null == cfddata.location || null == cfddata.location.lng ) && ( null ==  fabuxiaoxi.dwsj.position || null== fabuxiaoxi.dwsj.position.lng)) {
                    tishi = "请重新选择始发地";
                }
                else if ( null ==   mdata.location  || null == mdata.location.lng){
                    tishi = "请重新选择目的地";
                }
                
                if (  tishi == ""){
                    window.location.hash = "#time";
                }else {
                    showMessage1btn(tishi,"",0);
                }

        })
        // 点击跳到选择城市页
        $("#cgz-cfcity").bind("touch click",function(){
            city_class.clickHash = window.location.hash;
            city_class.click_button = "dp";
            $("#city-wrapper-nowcity").text($("#cgz-cfcity").text());
            window.location.hash = "#city";
        })
        $("#cgz-mdcity").bind("touch click",function(){
            city_class.clickHash = window.location.hash;
            city_class.click_button = "ar";
            $("#city-wrapper-nowcity").text($("#cgz-mdcity").text());
            window.location.hash = "#city";
        })
        // 初始化
        $("#cgz-mdd").val("");
        $("#cgz-cfd").val("");
        // 输入时下面出现搜索结果
        $("#cgz-cfd").bind("input",function(){
            FreeRide.clickdirection = 0;
            FreeRide.cgzcfd("cgz-cfd");
        })
        $("#cgz-mdd").bind("input",function(){
            FreeRide.clickdirection = 1;
            FreeRide.cgzcfd("cgz-mdd");
        })
        // 绑定清空
        $("#cgz-mdd").bind("focus",function(){
            FreeRide.searchweizhi(1);
        })
        $("#cgz-cfd").bind("focus",function(){
            FreeRide.searchweizhi(0);
        })
    // 选择人数页的绑定
        $(".personnum-quxiao").bind("touch click",function(){
            window.location.hash = "#details?settle";
        })
        // 绑定事件
        $(".pnum-numone").bind("touch click",function(){
            personnum.clear();
            personnum.updated(1);
            $(".pnum-numone").css("border","1px solid #ffc35f");
            $(".pnum-ctnumber").text(1);
            $(".pnum-ftinput").val(1);
            
        })
        $(".pnum-numtwo").bind("touch click",function(){
            personnum.clear();
            personnum.updated(2);
            $(".pnum-numtwo").css("border","1px solid #ffc35f");
            $(".pnum-ctnumber").text(2);
            $(".pnum-ftinput").val(2);
        })
        $(".pnum-numthree").bind("touch click",function(){
            personnum.clear();
            personnum.updated(3);
            $(".pnum-ctnumber").text(3);
            $(".pnum-ftinput").val(3);
            $(".pnum-numthree").css("border","1px solid #ffc35f");
        })
        $(".pnum-numfour").bind("touch click",function(){
            personnum.clear();
            personnum.updated(4);
            $(".pnum-ctnumber").text(4);
            $(".pnum-ftinput").val(4);
            $(".pnum-numfour").css("border","1px solid #ffc35f");
        })
        //删除操作
        $(".pnum-rdicon").bind("touch click",function(){
            personnum.clear();
            personnum.updated(1);
            $(".pnum-numone").css("border","1px solid #ffc35f");
            personnum.personnumber = 1;
            $(".pnum-ctnumber").text(personnum.personnumber);
            $(".pnum-ftinput").val(personnum.personnumber);
        })
        $(".pnum-choiceicon").bind("touch click",function(){
            personnum.iconstates++;
            if(personnum.iconstates%2===0){
                $(".pnum-choiceicon").attr("class","glyphicon glyphicon-triangle-top pnum-choiceicon");
                $(".pnum-number").slideUp();
                
            }else{
                $(".pnum-choiceicon").attr("class","glyphicon glyphicon-triangle-bottom pnum-choiceicon");
                $(".pnum-number").slideDown();
            }
        }) 
        // 提交功能
        $(".pnum-rdnum").bind("touch click",function(){
            personnum.iconstates++;
            $(".pnum-choiceicon").attr("class","glyphicon glyphicon-triangle-bottom pnum-choiceicon");
            $(".pnum-number").slideDown();
            // 点击提交人数
            if(personnum.personnumber===0){
                showMessage1btn("乘车人数不能小于1人,请重选","",0);
                return false;
            }else {
                fabuxiaoxi.personNum= personnum.personnumber;
                window.location.hash ="#details?settle";
            }
        })
        // 默认值
        $(".pnum-ctnumber").text(personnum.personnumber);
        // 加事件
        $(".pnum-ctlefticon").bind("touch click",function(){
            personnum.personnumber++;
            $(".pnum-ctnumber").text(personnum.personnumber);
            $(".pnum-ftinput").val(personnum.personnumber);
            if(personnum.personnumber<=4){
                personnum.clear();
                personnum.updated(personnum.personnumber);
                if(personnum.personnumber===1){
                    $(".pnum-numone").css("border","1px solid #ffc35f");
                }else if(personnum.personnumber===2){
                    $(".pnum-numtwo").css("border","1px solid #ffc35f");
                }else if(personnum.personnumber===3){
                    $(".pnum-numthree").css("border","1px solid #ffc35f");
                }else if(personnum.personnumber===4){
                    $(".pnum-numfour").css("border","1px solid #ffc35f");
                }
            }else if(personnum.personnumber>4){
                personnum.updated(personnum.personnumber);
                $(".pnum-numone").css("border","none");
                $(".pnum-numtwo").css("border","none");
                $(".pnum-numthree").css("border","none");
                $(".pnum-numfour").css("border","none");
                $(".pnum-number").css("border","none");
            }
        })
        // 减事件
        $(".pnum-ctrighticon").bind("touch click",function(){
            personnum.personnumber--;
            $(".pnum-ctnumber").text(personnum.personnumber);
            $(".pnum-ftinput").val(personnum.personnumber);
            if(personnum.personnumber<=0){
                personnum.clear();
                personnum.personnumber = 0;
                $(".pnum-ctnumber").text(personnum.personnumber);
                $(".pnum-ftinput").val(personnum.personnumber);
                return false;
            }else if(personnum.personnumber<=4 && personnum.personnumber >0){
                personnum.clear();
                personnum.updated(personnum.personnumber);
                if(personnum.personnumber===1){
                    $(".pnum-numone").css("border","1px solid #ffc35f");
                }else if(personnum.personnumber===2){
                    $(".pnum-numtwo").css("border","1px solid #ffc35f");
                }else if(personnum.personnumber===3){
                    $(".pnum-numthree").css("border","1px solid #ffc35f");
                }else if(personnum.personnumber===4){
                    $(".pnum-numfour").css("border","1px solid #ffc35f");
                }
            }else if(personnum.personnumber>4){
                personnum.updated(personnum.personnumber);
                $(".pnum-numone").css("border","none");
                $(".pnum-numtwo").css("border","none");
                $(".pnum-numthree").css("border","none");
                $(".pnum-numfour").css("border","none");
                $(".pnum-number").css("border","none");
            }
        })
        // input输入时
        $(".pnum-ftinput").on('input',function(){
            var val = parseInt($(".pnum-ftinput").val());
            var valone = "";
            if( NaN == val  ||  "" == val ||  undefined == val ){
                valone = 1 ;
                $(".pnum-ctnumber").text(valone);
                $(".pnum-ftinput").val(valone);
                $(".pnum-rdnum").text(valone+"人乘车");
            }else {
                personnum.personnumber = val;
                $(".pnum-ctnumber").text(val);
                $(".pnum-rdnum").text(val+"人乘车");
                if(val<=4){
                    personnum.clear();
                    personnum.updated(val);
                    if(personnum.personnumber===1){
                        $(".pnum-numone").css("border","1px solid #ffc35f");
                    }else if(personnum.personnumber===2){
                        $(".pnum-numtwo").css("border","1px solid #ffc35f");
                    }else if(personnum.personnumber===3){
                        $(".pnum-numthree").css("border","1px solid #ffc35f");
                    }else if(personnum.personnumber===4){
                        $(".pnum-numfour").css("border","1px solid #ffc35f");
                    }
                }else if(val>4){
                    $(".pnum-numone").css("border","none");
                    $(".pnum-numtwo").css("border","none");
                    $(".pnum-numthree").css("border","none");
                    $(".pnum-numfour").css("border","none");
                    $(".pnum-number").css("border","none");
                }
            }
        })
        //输入框得到焦点时
        $(".pnum-ftinput").on('focus',function(){
            $(".pnum-ftinput").val("");
        })
        //输入框失去焦点时
        $(".pnum-ftinput").on('blur',function(){
            personnum.personnumber = $(".pnum-ftinput").val();
            $(".pnum-ctnumber").text($(".pnum-ftinput").val());
        })
    // 时间页绑定事件
        $(".time-delete").bind("touch click",function(){
            fabuxiaoxi.cftime ="";
            fabuxiaoxi.mdtime = "";
            $('#dt-a-0').text("选择出发时间");
            $('#dt-c-1').text("选择期望到达时间");
        })
    // 结账页绑定的数据
        // 跳转到人数页
        $("#completed-number").bind("touch click",function(){
            settleAccounts.rendertimes = 0 ;
            window.location.hash = "#personnum";
        })
        $(".mileage").bind("touch click",function(){
            settleAccounts.rendertimes = 0;
            window.location.hash = "#sxxwz";
        })
        //  绑定到选择地址页
        $("#completed-seaddress").bind("touch click",function(){
            settleAccounts.rendertimes = 0;
            window.location.hash ="#sxxwz";
        })
        // 不发布，删除掉数据
        $(".completed-deicon").bind('touch click',function(){
            settleAccounts.clear();
            window.location.hash = "#details?"+locationqjval.val;
            settleAccounts.rendertimes = 0;
            
        })
         // 时间页绑定
         $("#searchsetdate").bind("touch click",function(){
            settleAccounts.rendertimes = 1;
            window.location.hash = "#time";
        })
    // 金额页设置  设置最小金额为9元
        $(".completed-price").bind("touch click",function(){
            settleAccounts.rendertimes = 0;
            window.location.hash = "#details?tramount";
        })
        // 删除 回到初始化状态
        $(".confirm-cficon").bind("touch click",function(){
            $(".tramount-money").text(fabuxiaoxi.amoney);
            $(".tramount-ftinput").val(fabuxiaoxi.amoney);
        })
        // 返回
        $(".tramount-delete").bind("touch click",function(){
            window.location.hash = "#details?settle";
        })
        // 加
        $(".tramount-lefticon").bind("touch click",function(){
            tramount.amont++;
            $(".tramount-money").text(tramount.amont);
            $(".tramount-ftinput").val(tramount.amont);
        })
        // 减
        $(".tramount-righticon").bind("touch click",function(){
            tramount.amont = parseFloat((tramount.amont - 1).toFixed(0)) ;
            // 我的计算金额会出现问题，最多让减到9元
            if(tramount.amont<6){
                showMessage1btn("不能低于6元,请重试","",0);
                tramount.amont = fabuxiaoxi.amoney;
                $(".tramount-money").text(tramount.amont);
                $(".tramount-ftinput").val(tramount.amont);
                return false;
            }
            $(".tramount-money").text(tramount.amont);
            $(".tramount-ftinput").val(tramount.amont);
        })
        // 发布出去
        $(".confirm-cfmoney").bind("touch click",function(){
            if(tramount.amont<6){
                showMessage1btn("金额不能小于6元,请重试","",0);
            }else {
                if ( locationqjval.val == "a=p" ) {
                    fabuxiaoxi.amoney = tramount.amont*fabuxiaoxi.personNum;
                    $(".completed-pprice").text(tramount.amont);
                }else if ( locationqjval.val == "b=v") {
                    fabuxiaoxi.amoney = tramount.amont;
                    $(".completed-pprice").text(fabuxiaoxi.amoney);
                }
                settleAccounts.rendertimes = 10;
                window.location.hash = "#details?settle";
            }
        })
        // input输入时
        $(".tramount-ftinput").on('input',function(){
            tramount.amont = $(".tramount-ftinput").val();
            $(".tramount-money").text($(".tramount-ftinput").val());
        })
        //输入框得到焦点时
        $(".tramount-ftinput").on('focus',function(){
            $(".tramount-ftinput").val("");
        })
        //输入框失去焦点时
        $(".tramount-ftinput").on('blur',function(){
            if($(".tramount-ftinput").val()<9){
                showMessage1btn("金额不能小于9元,请重试","",0);
                tramount.amont = 9;
                $(".tramount-ftinput").val(9);
                $(".tramount-money").text(9);
            }
        })
    // 只能输入数字(金额添加只能输入数字)
        $(".tramount-ftinput").bind("keyup", function () {
                $(this).val($(this).val().replace(/[^\d.]/g, ""));
                //必须保证第一个为数字而不是.
                $(this).val($(this).val().replace(/^\./g, ""));
                //保证只有出现一个.而没有多个.
                $(this).val($(this).val().replace(/\.{2,}/g, "."));
                //保证.只出现一次，而不能出现两次以上
                $(this).val($(this).val().replace(".", "$#$").replace(/\./g, "").replace("$#$", "."));
        })
    // 人数选择只能添加数字
        $(".pnum-ftinput").bind("keyup", function () {
                $(this).val($(this).val().replace(/[^\d.]/g, ""));
                //必须保证第一个为数字而不是.
                $(this).val($(this).val().replace(/^\./g, ""));
                //保证只有出现一个.而没有多个.
                $(this).val($(this).val().replace(/\.{2,}/g, "."));
                //保证.只出现一次，而不能出现两次以上
                $(this).val($(this).val().replace(".", "$#$").replace(/\./g, "").replace("$#$", "."));
        })
    // 车主注册页绑定事件
        // 删除所有
            $(".owneregister-button").bind("touch click",function(){
                carregister.photoajax();
            })
    // 给车主提现页绑定数据
            $("#balace-return").bind("touch click",function(){
                window.location.href = "#vowner";
            })
        // 提现操作
            $("#idbalance-mycash").bind("touch click",function(){
                if(balanceMycash.moneydata.total - balanceMycash.moneydata.cash > 0){
                    $(".paytan").slideToggle();
                }else {
                    showMessage1btn("可提额度为0","",0);
                    return false ;
                }
            })
    //账单页操作
            // 发布
            // 接单
            // 提现
            // 全部发布：Push；接单：Receipt； 提现：Cash
            $("#cashmoney-ctbigqb").css("color","red");
            $("#cashmoney-ctbgtime").css("color","red");
        $("#cashmoney-hdclick").bind("touch click",function(){
            cashmoneyfunction.click();
        })
        
        $("#cashmoney-ctbigfb").bind("touch click",function(){
            cashmoneyfunction.type = "Push";
            cashmoneyfunction.topcolornew();
            $("#cashmoney-ctbigfb").css("color","red");
            cashmoneyfunction.addevent(0);
        })
        $("#cashmoney-ctbigjd").bind("touch click",function(){
            cashmoneyfunction.type = "Receipt";
            cashmoneyfunction.topcolornew();
            $("#cashmoney-ctbigjd").css("color","red");
            cashmoneyfunction.addevent(0);
        })
        $("#cashmoney-ctbigtx").bind("touch click",function(){
            cashmoneyfunction.type = "Cash";
            cashmoneyfunction.topcolornew();
            $("#cashmoney-ctbigtx").css("color","red");
            cashmoneyfunction.addevent(0);
        })
        $("#cashmoney-ctbigqb").bind("touch click",function(){
            cashmoneyfunction.type = "";
            cashmoneyfunction.topcolornew();
            $("#cashmoney-ctbigqb").css("color","red");
            cashmoneyfunction.addevent(0);
        })
        // 下面的操作,点两次的问题
        $("#cashmoney-ctbgtoday").bind("touch click",function(){
            cashmoneyfunction.dateRange = "today";
            cashmoneyfunction.bootcolornew();
            $("#cashmoney-ctbgtoday").css("color","red");
            cashmoneyfunction.addevent(1);            
        })
        $("#cashmoney-ctbgweek").bind("touch click",function(){
            cashmoneyfunction.dateRange = "weekday";
            cashmoneyfunction.bootcolornew();
            $("#cashmoney-ctbgweek").css("color","red");
            cashmoneyfunction.addevent(1); 
        })
        $("#cashmoney-ctbgmonth").bind("touch click",function(){
            cashmoneyfunction.dateRange = "month";
            cashmoneyfunction.bootcolornew();
            $("#cashmoney-ctbgmonth").css("color","red");
            cashmoneyfunction.addevent(1); 
        })
        $("#cashmoney-ctbgtime").bind("touch click",function(){
            cashmoneyfunction.dateRange = "";
            cashmoneyfunction.bootcolornew();
            $("#cashmoney-ctbgtime").css("color","red");
            cashmoneyfunction.addevent(1);   
        })
        $("#cashmoney-slitoo").bind("touch click",function(){
            cashmoneyfunction.states ++;
            cashmoneyfunction.close();
        })
        $(".cashmongy-hdreturn").bind("touch click",function(){
            window.location.hash = "#ddxq?diver";
        })
        // 刷新返回
        $("#cashMoneyPage-refresh").bind("touch click",function(){
            balanceMycash.cashMoneyPage("","",0);
        })
        $("#cashMoneyPage-return").bind("touch click",function(){
            window.location.hash = "#run?passger";
        })
    
        
    // 提现页的事件
        // 全部提现
        $(".paytan-txqb").bind("touch click",function(){
            var qbmoney = balanceMycash.moneydata.total - balanceMycash.moneydata.cash;
            $(".paytan-txinput").val(qbmoney);
        })
        // 确定提现
        $(".paytan-qbtixian").bind("touch click",function(){
            var tell =  "";
            if( $(".paytan-txinput").val() ==="" || undefined == $(".paytan-txinput").val() ){
                tell = "提现金额不能为空";
            }else if ($("#paytan-txname").val() ==="" ||  undefined == $("#paytan-txname").val() ) {
                tell = "真实姓名不能为空";
            }else if ($("#paytan-txzh").val() ==="" || undefined ==  $("#paytan-txzh").val() ) {
                tell = "支付宝账号不能为空";
            }
            if (tell !=="") {
                showMessage1btn(tell,"",0);
                return false;
            }else {
                balanceMycash.cashMoney();
            }
            
        })
        // 删除返回
        $(".paytan-remove").bind("touch click",function(){
            $(".paytan").slideToggle();
        })

        // 页面刷新和跳转时也调用这个路由
            hashChange();
    })
    // 函数 
        function hvownermyrun(){
            $(".hvownermyrun").css("color","#555");
            $(".hvownerqbrun").css("color","#555");
            $(".hvownermypay").css("color","#555");
            $(".hrunmycar").css("color","#555");
            $(".hrunqbcar").css("color","#555");
            $(".hrucarpay").css("color","#555");
        }

    var fabuxiaoxi = {
        cfddata:"", // 存储出发地数据的地方 
        mmddata:"", // 存储目的地数据的地方 
        cfdcity:"", // 存储出发地的城市 
        mddcity:"", // 存储目的地的城市 
        splitmddcity:"",    // 需要进行切的值 
        dwsj:"",     // 定位得到的数据 
        cftime:"",      // 出发时间
        mdtime:"",      // 到达时间
        personNum:1,     // 出发人数,默认为1。
        amoney:0,       // 钱数
        routeMileage:0,   // 路线里程
        locationnam:"",   // 定位地址名
    };

    // 存储乘客和车主的路由值 
    var locationqjval = {
        val:"a=p"   // 存储是车主还是乘客的路由值 
    }
    // 选择城市的初始化函数 
    var cityselectval = {
        nowcity:""
    }
// 账单页的操作
    var cashmoneyfunction = {
        states:0,
        click:function(){
            cashmoneyfunction.states ++;
            if(cashmoneyfunction.states%2===0){
                cashmoneyfunction.open();
            }else {
                cashmoneyfunction.close();
            }
        },
        open:function(){
            $("#cashmoney-ctbigicons").attr('class',"cashmongy-hdsxicon glyphicon glyphicon-triangle-top");
            $("#cashmoney-ctbig").slideToggle("normal");
        },
        close:function(){
            $("#cashmoney-ctbigicons").attr('class',"cashmongy-hdsxicon glyphicon glyphicon-triangle-bottom");
            $("#cashmoney-ctbig").slideToggle("normal");
        },
        type:"",
        dateRange:'',
        topstates:0,    
        bottomstates:0,
        addevent:function(val){
            if( val === 0){
                cashmoneyfunction.topstates++;
            }else if(val ===1) {
                cashmoneyfunction.bottomstates++;
            }
            if((cashmoneyfunction.topstates+cashmoneyfunction.bottomstates)%2===0){
                cashmoneyfunction.states ++;
                cashmoneyfunction.close();
                balanceMycash.cashMoneyPage(cashmoneyfunction.type,cashmoneyfunction.dateRange,1);

            }else {
                return false ;
            }
        },
        topcolornew:function(){
            $("#cashmoney-ctbigfb").css("color","#555");
            $("#cashmoney-ctbigjd").css("color","#555");
            $("#cashmoney-ctbigtx").css("color","#555");
            $("#cashmoney-ctbigqb").css("color","#555");
        },
        bootcolornew:function(){
            $("#cashmoney-ctbgtoday").css("color","#555");
            $("#cashmoney-ctbgweek").css("color","#555");
            $("#cashmoney-ctbgmonth").css("color","#555");
            $("#cashmoney-ctbgtime").css("color","#555");
        },
        newcsg:function(){
            cashmoneyfunction.type = "";
            cashmoneyfunction.dateRange = "";
        }
    }

     // 账单页无限滚动效果
     var cashMange_click = {
        statusHide:function(){
            $(".cashNode-load-status").find("p").hide();	
        },
        lastShow:function(){
            this.statusHide();
            $(".cashNode-load-status>.infinite-scroll-last").show();
        },
        errShow:function(){
            this.statusHide();
            $(".cashNode-load-status>.infinite-scroll-error").show();
        },
        driverScreen:function(){
            // 点击后销毁滑动效果
            drivelinfie_click.statusHide();	//重置状态栏
            $('#cashm-footer').infiniteScroll('destroy'); //销毁滚动加载
            $('#cashm-footer').off( 'load.infiniteScroll',footerdiv_onpage); //注销滑动监听
            $(".cashm-footerdiv").animate({ scrollTop: 0 }, 10);  //返回顶部
        }
    }
//  全部提现的操作 
    var balanceMycash = {
        cashMoneyPageData:[],   // 我的账单页数据
        all_bill_data:[],
        now_bill_data:[],
        other_bill_data:[],
        cash_arr:[],
        push_arr:[],
        all_temp:'<div class="bill-time clearfix"><span class="bill-time-left" id="bill-time-month-one"></span><span class="bill-time-right iconfont iconshangcheng"></span></div><div class="bill clearfix"><div class="bill-center-total-div  clearfix" id="bill-cash-temp"><!-- 添加提现订单的地方 --></div></div><!-- 赚钱的地方 --><div class="bill clearfix"><div class="bill-center-total-div  clearfix" id="bill-push-temp"><!-- 添加赚钱订单的地方 --></div></div>',
        tx_temp:'<!-- 添加提现订单的地方 --><div class="bill-center clearfix"><span class="bill-center-icon bill-center-icon-top iconfont icontixian"></span><div class="bill-center-div clearfix"><div class="bill-center-div-left left clearfix"><p class="bill-center-p-top" id="bill-cash-name">提现余额</p><p class="bill-center-p-bt" id="bill-cash-time"></p></div><span class="bill-center-div-right left" id="bill-cash-status"></span><div class="bill-center-button-div clearfix" id="bill-center-button-div"></div></div><div class="bill-center-money" id="bill-cash-money"></div></div>',     // 提现的模板
        push_temp:' <!-- 添加赚钱订单的地方 --><div class="bill-center clearfix"><span class="bill-center-icon bill-center-icon-bottom iconfont iconshared"></span><div class="bill-center-div clearfix"><div class="bill-center-div-left left clearfix"><p class="bill-center-p-top" id="cill-push-name"></p><p class="bill-center-p-bt" id="cill-push-time"></p> </div><span class="bill-center-div-right left" id="cill-push-status"></span></div><div class="bill-center-money" id="cill-push-money"></div></div>', // 赚钱的模板
        moneydata:{},   // 钱数信息
        cashMoneyPage:function(typeval,dateRangeval,valzhi){ // 我的账单页的显示
            showLodding("请稍等，加载中...");
            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/madeOwnerHasCashs/queryPageMadeOwnerAllCashs.asp",
                data:{
                   uid:nowusermsg.uid,
                   cur:1,
                   type:typeval,
                   datePange:dateRangeval,
                   pageSize:8
                },
                success:function(data){
                    balanceMycash.all_bill_data = [];
                    // 账单页无限滑动
                    // 渲染账单页
                    if ( valzhi ==1 ){
                        cashMange_click.driverScreen();
                    }
                    console.log("获取车主金额信息",data);
                    cashmoneyfunction.type = "";
                    cashmoneyfunction.dateRange = "";
                    if(data.result>0){
                        balanceMycash.newPage(data);
                         // 账单页无限滑动
                        
                         if(valzhi == 1){
                            // 点击选择车主数据
                            cashMoneyPage.page = data.page;
                            if(data.page === 1){
                                cashMange_click.lastShow();
                            }
                        }
                        if (valzhi == 0){
                            if(data.page > 1 ){
                                // 账单页无限滑动
                                cashMoneyPage.page = data.page;
                                cashMoneyPageline(typeval,dateRangeval);
                            }else {
                                cashMange_click.lastShow();
                            }
                        }
                    }else { // 小于等于0
                        $("#cashMoneyPage-nosj").show();
                        $(".cashmongy-header").hide();
                        $("#cashm-footer").hide();
                        if(valzhi == 1){
                            cashMange_click.errShow();
                        }
                    }

                    /* 加载成功，取消提示按钮 */
                    clearDialog();
                },
                error:function(data){
                    balanceMycash.all_bill_data = [];
                    console.log("获取车主金额失败",data);
                    /* 加载成功，取消提示按钮 */
                    clearDialog();
                }
            })
        },
        getMoneyRecord:function(){ // 获取车主提现的所有信息
            $.ajax({
                url:"//qckj.czgdly.com/bus/MobileWeb/madeOwnerHasCashs/getOACStatistics.asp",
                type:"post",
                data:{
                    uid:nowusermsg.uid
                },
                success:function(data){
                    console.log("车组提现信息",data);
                    balanceMycash.moneydata = data.obj;
                    if(data.result > 0){
                        // 没有数据，等有数据写
                        $("#balance-summoney").text(data.obj.total);
                        $("#balance-ytmoney").text(data.obj.cash);
                        $("#balance-ktmoney").text(data.obj.total-data.obj.cash);
                    }else {
                        $("#balance-summoney").text(0.0);
                        $("#balance-ytmoney").text(0.0);
                        $("#balance-ktmoney").text(0.0);
                    }
                },
                error:function(data){
                    console.log("车组失败",data);
                    if ( null == data.msg || "" == data.msg  ) {
                        showMessage1btn("网络出错,稍后再试","",0);
                    }else {
                        showMessage1btn(data.msg,"",0);
                    }
                    
                }
            })
        },
        cashMoney:function(){   // 向后台发送提现api
            // price       	提现金额
            // cashAliRelName		提现账户对应真实姓名
            // cashAliAccount 		提现支付宝账户
            var price =parseFloat($(".paytan-txinput").val().trim());
            var cashAliRelName = $("#paytan-txname").val().trim();
            var cashAliAccount = $("#paytan-txzh").val().trim();
            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/madeOwnerHasCashs/saveMadeOwnerHasCashs.asp",
                data:{
                    uid:nowusermsg.uid,
                    userid:nowusermsg.userid,
                    price:price,
                    cashAliRelName:cashAliRelName,
                    cashAliAccount:cashAliAccount
                },
                success:function(data){
                    console.log("提现第一步成功",data);
                    balanceMycash.cashMoneyBackstage(data.obj.cashNo);
                },
                error:function(data){
                    if ( null == data.msg || "" == data.msg){
                        showMessage1btn("网络出错,稍后再试","",0);
                    }else {
                        showMessage1btn(data.msg,"",0);
                    }
                }
            })
        },
        cashMoneyBackstage:function(val){
            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/madeOwnerHasCashs/takeOwnerCashs.asp",
                data:{
                    bizNo:val
                },
                success:function(data){
                    console.log("提现数据",data)
                    //1：提现成功；0：提现失败，可稍后对此单继续提现；-1：提现失败，无法对此单再次提现操作
                    showMessage1btn(data.msg,"",0);
                    $(".paytan").slideToggle();
                    
                },
                error:function(data){
                    if (  null == data.msg || "" == data.msg ) {
                        showMessage1btn("网络出错,稍后再试","",0);
                    }else {
                        showMessage1btn(data.msg,"",0);
                    }
                    $(".paytan").slideToggle();
                }
            })
        },
        newPage:function(data){
            $("#cashMoneyPage-nosj").hide();
            $(".cashmongy-header").show();
            $("#cashm-footer").show();
            
            // 默认添加个 主模板
            $("#cashm-footer").empty();
            
            balanceMycash.all_bill_data = balanceMycash.all_bill_data.concat(data.obj.uCashs);
            // 比较的 年份 和 月份
            var compare_year = new Date(balanceMycash.all_bill_data[0].date).getFullYear();
            var compare_month =  new Date(balanceMycash.all_bill_data[0].date).getMonth();

            // var aa = [0,1];
            // var bb = [1,2];
            // aa = aa.concat(bb);
            var Receipt_num = 0; // 接单次数
            var Push_num = 0 ; // 发布次数
            var cash_num = 0; // 提现次数
            for(var i = 0; i<balanceMycash.all_bill_data.length;i++){
                // 主模板的添加
                if ( i == 0 ) {
                    $("#cashm-footer").append(balanceMycash.all_temp);
                    // 最后在渲染
                    balanceMycash.main_page(0,balanceMycash.all_bill_data[0]);
                   
                }else {
                    if ( compare_year != new Date(balanceMycash.all_bill_data[i].date).getFullYear() ||  compare_month !=  new Date(balanceMycash.all_bill_data[i].date).getMonth() ) {
                        // 两个添加的赋值，不一样则让他们无法添加,让前一个添加，无法添加
                        $("#bill-push-temp").attr("id","bill-push-temp"+i);
                        $("#bill-cash-temp").attr("id","bill-cash-temp"+i);
                        $("#cashm-footer").append(balanceMycash.all_temp);
                        // 最后在渲染
                        balanceMycash.main_page(i,balanceMycash.all_bill_data[i]);
                        
                    } 
                }
                // 时间一样，则判断主模板来添加，并渲染 一次 负模板。
                // 时间不一样，则添加主模板，在添加负模板。
                // 下面内容的添加 (渲染具体的数据)
                if ( balanceMycash.all_bill_data[i].type == "Push" || balanceMycash.all_bill_data[i].type == "Receipt") {
                    var push_page_data = "";
                    if (balanceMycash.all_bill_data[i].type == "Push"){
                       push_page_data = "push";
                       Push_num ++ ;
                    }else {
                       push_page_data = "receipt";
                       Receipt_num ++ ;
                    }
                   
                    $("#bill-push-temp").append(balanceMycash.push_temp);
                    balanceMycash.push_page(push_page_data,i,balanceMycash.all_bill_data[i]);
                }else if ( balanceMycash.all_bill_data[i].type == "Cash" ) {
                    // 提现
                    $("#bill-cash-temp").append(balanceMycash.tx_temp);
                    balanceMycash.cash_page(i,balanceMycash.all_bill_data[i]);
                    cash_num ++ ;
                }
                
                compare_year  = new Date(balanceMycash.all_bill_data[i].date).getFullYear();
                compare_month =  new Date(balanceMycash.all_bill_data[i].date).getMonth();
                
            }
                
            // 接单次数的渲染
            $("#bill-receipt-num").text(Receipt_num);
            // 发布次数
            $("#bill-push-num").text(Push_num);
            // 提现次数
            $("#bill-cash-num").text(cash_num);

            /* 加载成功，取消提示按钮 */
            clearDialog();
        },
        push_page:function(pdval,i,val){
            if ( pdval == "push") {
                $("#cill-push-name").text("发布佣金");
            }else {
                $("#cill-push-name").text("接单佣金");
            }
            $("#cill-push-name").attr("id","cill-push-name"+i);

            var cill_push_status_name = "";
            if ( val.status == 0){
                cill_push_status_name = "待提现";
                
            } else if (val.status == 1 ) {
                cill_push_status_name = "已提现";
            } else if (val.status == -1 ) {
                cill_push_status_name = "已失效";
            }
            $("#cill-push-status").text(cill_push_status_name);
            $("#cill-push-status").attr("id","cill-push-status"+i);

            var push_time = val.date.split("-")[1]+"-"+val.date.split("-")[2];
            $("#cill-push-time").text(push_time);
            $("#cill-push-time").attr("id","cill-push-time"+i);

            $("#cill-push-money").text(val.price);
            $("#cill-push-money").attr("id","cill-push-money"+i);
        },
        cash_page:function(i,val){
            $("#bill-center-button-div").empty();
            var status = "";
            if (val.status == 0) {
                status = "待提现";
                // if ( val.price >= 0.1) {
                    $("#bill-center-button-div").append('<span class="bill-center-button-span" id="bill-center-button-span">提现</span>');
                    $("#bill-center-button-span").bind("touch click",function(){
                        var cash_button_no =  balanceMycash.all_bill_data.find(function(value, indexes, arr){  if( i == indexes){return value}});
                        balanceMycash.cashMoneyBackstage(cash_button_no.no);
                    })
                    $("#bill-center-button-span").attr("id","bill-center-button-span"+i);
                // }
            }else if (val.status == 1) {
                status = "已提现";
                
            }else if (val.status == -1) {
                status = "已失效";
            }
            $("#bill-cash-status").text(status);
            $("#bill-cash-status").attr("id","bill-cash-status"+i);

            var push_time =val.date.split("-")[1] +"-" + val.date.split("-")[2];
            $("#bill-cash-time").text(push_time);
            $("#bill-cash-time").attr("id","bill-cash-time"+i);

            $("#bill-cash-money").text(val.price);
            $("#bill-cash-money").attr("id","bill-cash-money"+i);

            // 每一次 都把那个div添加个id
            $("#bill-center-button-div").attr("id","bill-center-button-div"+i);
        },
        main_page:function(i,val){
            // 时间
            var val_time = new Date(val.date).getFullYear() +"-" + (new Date(val.date).getMonth()+1) ;
            $("#bill-time-month-one").text(val_time);
            $("#bill-time-month-two").text(val_time);
            $("#bill-time-month-three").text(val_time);
            var bill_time_month_one = "bill-time-month-one" +i;
            $("#bill-time-month-one").attr("id",bill_time_month_one);

            var bill_time_month_two = "bill-time-month-two" +i;
            $("#bill-time-month-two").attr("id",bill_time_month_two);

            var bill_time_month_three = "bill-time-month-three" +i;
            $("#bill-time-month-three").attr("id",bill_time_month_three);
            
        }
    }

// 给车主提现页绑定
    var owenerCash = {
        cashResult:{}, // 车主存储的数据
        owerPage:function(valzhi,dateRange){ // 每次点开这个页面都渲染一次
            $.ajax({
                url:"//qckj.czgdly.com/bus/MobileWeb/madeFROReceipts/queryPageMadeFROReceipts.asp",
                type:"post",
                data:{
                    cur:1,
                    uid:nowusermsg.uid,
                    utype:"Driver",
                    dateRange:dateRange,
                    pageSize:8
                },
                success:function(data){
                  
                    console.log("车主接单信息",data);
                    // 乘客处理代码在 1452行
                    owenerCash.cashResult = data;
                    $(".phdiconfyq").empty();
                    if(data.result>0){
                        for(var jj = 0 ;jj<data.obj.froReceipts.length;jj++){
                            $(".phdiconfyq").append(sfcsj.ownerpaymentpage);
                        // 处理支付页面的数据 
                            paymentpcl(jj,data,0); // 0 是处理车主的数据渲染问题
                        }
                        if(valzhi == 1 ){
                            // 车主要处理接单数据
                            
                            if(data.page>1){
                                paymentzyval.page = data.page;
                                hdpaymentzy("Driver",dateRange);
                            }else {
                                payment_click.lastShow();
                            }
                        }
                   }else {
                     payment_click.errShow();
                   }
                },  
                error:function(data){
                    console.log("车主接单获取失败",data);
                    if ( null == data.msg || "" == data.msg ){
                        showMessage1btn("网络出错,获取我的订单失败","",0);
                    }else {
                        showMessage1btn(data.msg,"",0);
                    }
                    
                    $(".phdiconfyq").empty();
                }
            })
        }
    }

// 车主注册页操作模块
    var carregister = {
        idCardFront:0,  //身份证正面数据
        idCardBack:0,   //身份证反面数据
        dLicenseFront:0,    // 驾驶照正面数据
        dLicenseBack:0,     // 驾驶照反面数据
        second:0,
        photoData:{
            size:0,  // 大小
            width:0, // 宽度
            height:0, // 高度
            rst:0,    // 压缩显示的数据
        },
        filechange:function(val,imgval,thisval){  // 变化事件
            // 存储 转换的 base64值的地方 
            var imgbase64 = 0;
            // 压缩比率，乘以 1000 的结果
            var compressionRatio = 1;

            var fileSize = thisval;
            
            showLodding("请稍等,上传中...");
            
             // 222673   218    1048576
             // Math.round((125/(222673/10240))*10)/100 ;   0.57
            if(fileSize.size/1024 >= 256 ){
                compressionRatio =  Math.round(125/(fileSize.size/10240)*10)/100 ;
            }

             // 压缩率最大 两个小数位
            // localResizeIMG
            if ( compressionRatio < 0.1 ){
                compressionRatio = 0.1;
            }

            console.log("压缩比率",compressionRatio);

            lrz(fileSize, [{ width: 200  },{quality:compressionRatio}])
            .then(function (rst) {
              
                imgbase64 = rst.base64;
                $(imgval).attr("src",imgbase64);
                if (val == '#idCardFront'){
                    carregister.idCardFront  = imgbase64;
                }else if (val == '#idCardBack'){
                    carregister.idCardBack  = imgbase64;
                }else if ( val =='#dLicenseFront' ){
                    carregister.dLicenseFront  = imgbase64;
                }else if ( val =='#dLicenseBack' ){
                    carregister.dLicenseBack = imgbase64;
                }

                carregister.photoData.rst = rst;
                /* 加载成功，取消提示按钮 */
                clearDialog();

                // 初始化
                imgbase64 = 0;
            })
            .catch(function (err) {
                // 处理失败会执行
                showMessage1btn("上传失败,请重新上传!","",0);
                $(val).val("");
                 /* 加载成功，取消提示按钮 */
                 clearDialog();
            })
            .always(function () {
                // 不管是成功失败，都会执行
            });
        },
        photoajax:function(){   // 向后台发送
            if( carregister === 1){
                return false;
            }
            carregister.second = 1;
            var tips = "";
            if(carregister.idCardFront===0){
                tips="请上传身份证正面照";
            }else if(carregister.idCardBack===0){
                tips="请上传身份证反面照";
            }else if(carregister.dLicenseFront===0){
                tips="请上传驾驶照正面照";
            }else if(carregister.dLicenseBack===0){
                tips="请上传驾驶照反面照";
            }
            if(tips != ""){
                showMessage1btn(tips,"",0);
                return false;
            }
            showLodding("请稍等,上传中...");
            $.ajax({
                url:"//qckj.czgdly.com/bus/MobileWeb/madeOwnerCertification/saveMadeOwnerCertification.asp",
                data:{
                    uid:nowusermsg.uid,
                    idCardFront:carregister.idCardFront,
                    idCardBack:carregister.idCardBack,
                    dLicenseFront:carregister.dLicenseFront,
                    dLicenseBack:carregister.dLicenseBack
                },
                //processData: false,
                //contentType: false,
                dataType:"json",
                timeout:10000,
                type:"post",
                success:function(data){
                    if(data.result==1){
                        // 0代表没有车主身份,1代表有,2代表审核中。3代表刚刚注册成功，跳转到请稍等页面。4代表注册审核失败，跳转出重新注册页面
                        owneridentity.states = 3 ;
                        
                        // 成功了,跳转到提醒页面
                        $(".to-examine").empty();
                        $(".to-examine").append("<div class='to-examinets'>发送成功,正在审核....</div><img src='./font/fontjs/examine.gif'   class='to-examineimg'>");
                        
                        showMessage1btn(data.msg,"",0);

                        window.location.hash = "#examine";
                        /* 加载成功，取消提示按钮 */
                        clearDialog();
                        // 上传成功初始化
                        
                        // 初始化
                        carregister.idCardFront = 0;
                        carregister.idCardBack = 0;
                        carregister.dLicenseFront = 0;
                        carregister.dLicenseBack = 0;
                        owneridentity.states = 2;
                        carregister.second = 0;
                    }
                },
                error:function(data){
                    /* 加载成功，取消提示按钮 */
                    clearDialog();
                    if (null == data.msg|| "" == data.msg) {
                        showMessage1btn("发生错误,请重试","",0);
                    }else {
                        showMessage1btn(data.msg,"",0);
                    }
                    
                },
                complete:function(XMLHttpRequest,status){ //请求完成后最终执行参数
                    clearDialog();
            　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
                　　　　　 showMessage1btn("超时,请重试","",0);
            　　　　}
                }
            })
        }
    }
// 判断有无车住身份模块
    var owneridentity = {
        states:0,    // 0代表没有车主身份,1代表有,2代表审核中。3代表刚刚注册成功，跳转到请稍等页面。4代表注册失败，跳转出重新注册页面
        isAjax:false,
        ownerajax:function(){   // 页面一开始调用下,
            $.ajax({
                url:"//qckj.czgdly.com/bus/MobileWeb/buyTicket/isCarOwner.asp",
                type:"post",
                data:{
                    uid:nowusermsg.uid,
                    userid:nowusermsg.userid
                },
                success:function(data){
                    console.log("身份成功",data);
                    owneridentity.isAjax = true;
                    /* 加载成功，取消提示按钮 */
                    clearDialog();
                    if(data.status===1 && data.result===1 ){
                        owneridentity.states = 1 ;
                    }else if(data.result=== 1 && data.status===-1 ){  // 审核未通过
                        owneridentity.states  = 4; 
                    }else if(data.result=== 1 && data.status=== 0){
                        owneridentity.states = 2 ;
                    }else if(data.result=== -1 && null  == data.status){
                        owneridentity.states = 0; 
                    }
                },
                error:function(data){
                    owneridentity.isAjax = true;
                    /* 加载成功，取消提示按钮 */
                    clearDialog();
                    console.log("请求身份失败");
                    owneridentity.states = 0;
                }
            })
        }
    }
    
// 选择人数页操作模块
    var personnum = {
        iconstates:1,
        personnumber:1,   // 人数默认为0
        // 清空操作
        updated:function(val){
            $(".pnum-rdnum").text(val+"人乘车");
            personnum.personnumber = parseInt(val);
        },
        // 清空css样式
        clear:function(){
            fabuxiaoxi.personNum = 0;
            $(".pnum-numone").css("border","none");
            $(".pnum-numtwo").css("border","none");
            $(".pnum-numthree").css("border","none");
            $(".pnum-numfour").css("border","none");
            $(".pnum-number").css("border","none");
            $(".pnum-rdnum").text("请选择...");
        }
    }
// 定位功能模块 定位模块 定位功能
   
        // 定位功能  
    function sfc_amapdw(){
        AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonPosition:'RB',     //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true  //定位成功后是否自动调整地图视野到定位点
            });
            map.addControl(geolocation);

            //监听按钮事件
            AMap.event.addListener(geolocation, 'complete', onComplete);
            
            geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                    onComplete(result)
                    //定位时绑定到出发地的函数的值上 
                    //fabuxiaoxi.cfddata = result; 
                }else{
                    onError(result);
                }
            });
        });
    }
        
           //  定位功能函数 
       function onComplete(data) {
           // 定位得到数据，设置
           gaode.successdata = data;
            console.log("定位成功",data);

           // 存储数据
           fabuxiaoxi.dwsj = data; 
            // 定位地址名
            var locationval = "";
            if( null ==  data.addressComponent.township ||   undefined == data.addressComponent.township  ){
                locationval =  data.addressComponent.street + data.addressComponent.streetNumber;
            }else if( null ==  data.addressComponent.street  || data.addressComponent.street === "" ||  undefined == data.addressComponent.street   ){
                locationval = data.addressComponent.township  + data.addressComponent.streetNumber;
            }else if( null == data.addressComponent.streetNumber || data.addressComponent.streetNumber=== "" ||   undefined == data.addressComponent.streetNumber ){
                locationval = data.addressComponent.township + data.addressComponent.street ;
            }else {
                locationval = data.addressComponent.township + data.addressComponent.street + data.addressComponent.streetNumber;
            }
            
            console.log(locationval);

            $("#chufadi").text(locationval);
            fabuxiaoxi.locationnam = locationval;

           fabuxiaoxi.cfdcity = fabuxiaoxi.dwsj.addressComponent.city;
           cityselectval.nowcity = fabuxiaoxi.dwsj.addressComponent.city;
           // 定义成功后，切换路由到首页         
        
            // 出发城市设置
           $("#cgz-cfcity").text(fabuxiaoxi.dwsj.addressComponent.city);

           $(".dqcsval").text(cityselectval.nowcity);
           $(".xcspanleft").text(cityselectval.nowcity);
           $("#chufadi-cfcity").text(fabuxiaoxi.dwsj.addressComponent.city);

            // 置为1 
            FreeRide.topisjump = 1;
           $("#cgz-cfd").val(locationval);
       }
       //解析定位错误信息
       function onError(data) {
           showMessage1btn("定位失败,请刷新在试","",0);
           gaode.errordata = data;
       } 
// 金额页函数模块
   var tramount = {
       amont:0,  // 设置一个默认的金额
       rendering:function(){    // 页面初始化函数
            var unitPrice = 0 ;
            if (   locationqjval.val == "a=p"){
                unitPrice =  fabuxiaoxi.amoney/fabuxiaoxi.personNum ;
            } else if ( locationqjval.val == "b=v" ) {
                unitPrice = fabuxiaoxi.amoney;
            }
                $(".tramount-money").text(unitPrice);
                $(".tramount-ftinput").val(unitPrice);
            tramount.amont = unitPrice;
       }
   }
// 结账页的操作函数
    var settleAccounts = {
        rendertimes:0, //渲染次数，第一次跳转则为0，jump会显示，跳转到路程选择页等几个页面则置为0。time等页面则为1。不渲染。
        jump:function(){
            $("#completed-number").text(fabuxiaoxi.personNum+"人乘车");
            if(fabuxiaoxi.cfdcity==="常州市" && fabuxiaoxi.mddcity ==="常州市"){
                $("#completed-seaddress").text("市内");
            }else if(fabuxiaoxi.cfdcity==="" && fabuxiaoxi.mddcity==="" ){
                $("#completed-seaddress").text("请选择地址");
            }else{
                $("#completed-seaddress").text("城际");
            } 
            if(locationqjval.val==="a=p"){
                $("#completed-sesf").text("乘客");
            }else if(locationqjval.val==="b=v"){
                $("#completed-sesf").text("车主");
            }  
        // 里程计算下
            var dLng = 0;  //经度
            var dLat = 0;  // 纬度
            var cfddata = fabuxiaoxi.cfddata;
            var mdata = fabuxiaoxi.mmddata;
            if(cfddata!==""){
                dLng = cfddata.location.lng;
                dLat = cfddata.location.lat;
            }
            if(fabuxiaoxi.dwsj!==""){
                dLng = fabuxiaoxi.dwsj.position.lng;
                dLat = fabuxiaoxi.dwsj.position.lat;
            }
            var p1 = [dLng,dLat];   // [经度,纬度]
            var p2 = [mdata.location.lng,mdata.location.lat];
            
            // 返回结果为米
            var dis = 0;
            // 计算一下公里数
            showLodding("计算价钱中...");
            function get_path () {
				var get_url = '//restapi.amap.com/v3/direction/driving?key=f2ac4e16093bd03c67c74b39e765b244&originid=&destinationid=&extensions=base&strategy=2&waypoints=&avoidpolygons=&avoidroad=&origin='+p1+'&destination='+p2;
				$.get(get_url,function(data,status){
					if (data.status == 1 || data.status=="1" ) {
                        dis = parseFloat((parseFloat(data.route.paths[0].distance)/1000).toFixed(1)) ;
                        fabuxiaoxi.routeMileage = dis ;
                        $(".mileage-price").text(fabuxiaoxi.routeMileage);
                        console.log("距离一共多少公里",fabuxiaoxi.routeMileage);
                        Calculation();
                        // 清除
                        clearDialog();
					}else {
                        get_path ();
                        // 清除
                        clearDialog();
					}
                   console.log("请求距离",data,status);
                    // 清除
                    clearDialog();
				});
            }
            get_path ();
            //  计算一下钱数
            function Calculation(){
                    // 钱数简单计算下
                // 钱啥时候都计算一下
                var pay_route = 1;
                var qs_money =  4;
                
                var routelc =parseFloat(fabuxiaoxi.routeMileage) ;
                if  ( fabuxiaoxi.cfdcity == fabuxiaoxi.mddcity) {
                    pay_route = 1 ;
                    qs_money =  4;
                    // if (fabuxiaoxi.personNum <3 ){
                        
                    // }else {
                    //     qs_money =  4.8;
                    //     pay_route = 1.2;
                    // }
                } else {
                    qs_money =   15 ;
                    if ( routelc >5 && routelc <=30) {
                        pay_route = 1;
                    
                    }else if ( routelc >30 &&  routelc <= 150) {
                        pay_route = 0.5;
                    }else {
                        pay_route = 0.4;
                    }
                
                }
                if ( settleAccounts.rendertimes != 10 ){
                    if ( locationqjval.val == "a=p" ) {
                        fabuxiaoxi.amoney = parseFloat(fabuxiaoxi.personNum*((qs_money + routelc*pay_route).toFixed(0)));
                        $(".completed-pprice").text(fabuxiaoxi.amoney/fabuxiaoxi.personNum);
                    }else if ( locationqjval.val == "b=v") {
                        fabuxiaoxi.amoney = parseFloat((qs_money + routelc*pay_route).toFixed(0));
                        $(".completed-pprice").text(fabuxiaoxi.amoney);
                    }
                }else {
                    $(".completed-pprice").text(fabuxiaoxi.amoney);
                }
            }
        },
        clear:function(){   //清空操作
            fabuxiaoxi.cfdcity = "";
            fabuxiaoxi.cfddata = "";
            fabuxiaoxi.mmddata = "";
            fabuxiaoxi.mddcity = "";
            fabuxiaoxi.dwsj = "";
            fabuxiaoxi.cftime = "";
            fabuxiaoxi.mdtime = "";
            fabuxiaoxi.personNum = 1;
            fabuxiaoxi.amoney = 0;
            // 页面元素初始化
            $("#cgz-cfd").val("");
            $("#cgz-mdd").val("");
           
            $(".pnum-ctnumber").text(0);
            $(".pnum-ftinput").val("");
            personnum.clear();

            fabuxiaoxi.cftime ="";
            fabuxiaoxi.mdtime = "";
            $('#dt-a-0').text("选择出发时间");
            $('#dt-c-1').text("选择期望到达时间");

            $("#completed-seaddress").text("请选择地址");
            $("#completed-number").text("请选择人数");
            $(".completed-pprice").text("0.0");
            $("#completed-sesf").text("乘客");
        }
    }

// 模范嘀嗒添加功能     模块
    var FreeRide = {
        freeMode:"incity",   // 默认页面的选择方式为城际incity
        clickdirection:0,      // input输入时，判断时那个在输入
        // 默认是0，直接点击时填上输入框。 0代表出发地,1代表目的地输入，0代表点击了出发城市后，直接看到有的。1代表选择了目的城市后，直接点击出现的。
        topisjump:0,    //  上一个输入框是否已经输入完成。0 未完成。
        btmisjump:0,    //   下一个是否已经完成 。   0  未完成 1完成。
        cgzcfd:function(textval){   // 动态渲染数据出来的
            var keywords = document.getElementById(textval).value;
            AMap.plugin('AMap.Autocomplete', function(){
                    var autoOptions = {
                        city:"常州"
                    }                 
                    var searchval = "";
              // 实例化Autocomplete             
                if(textval=== "cgz-cfd" || FreeRide.clickdirection===0 ){
                    searchval = $("#cgz-cfcity").text()+keywords;
                }else if(textval==="cgz-mdd" || FreeRide.clickdirection===1){
                    searchval = $("#cgz-mdcity").text()+keywords;
                }
              var autoComplete = new AMap.Autocomplete(autoOptions);             
              autoComplete.search(searchval, function(status,result) {
                // 搜索成功时，result即是对应的匹配数据
                if(FreeRide.clickdirection === 0 ){
                    autoInputsunval.cfdresult = result;
                    autoInputsunval.result = result;
                }
                if(FreeRide.clickdirection === 1){
                    
                    autoInputsunval.mddresult = result;
                    autoInputsunval.result = result;
                }
                $(".searchweizhi").empty();
                for(var j = 0; j<result.tips.length;j++){
                    autosunnode(j,result);
                }
                
              })
            })
        },
        searchweizhi:function(zhival){    // 清空操作
            $(".searchweizhi").empty();
            if(zhival===0){         //出发清空
                $("#cgz-cfd").val("");
                fabuxiaoxi.cfddata = "";
                fabuxiaoxi.cfdcity ="";
                fabuxiaoxi.dwsj = "";
                FreeRide.topisjump  = 0;
            }else if(zhival===1){     // 目的清空
                $("#cgz-mdd").val("");
                fabuxiaoxi.mmddata ="";
                fabuxiaoxi.mddcity = "";
                FreeRide.btmisjump = 0;
            }
        }
    }

    function register(val){
        var nowhref = window.location.href;
        localCache("page",nowhref);     // 存储在本地的地址
        window.location.href = "Register_content.html";		// 发送给他的地址 	
    }  

    function hashlycolorsz(){
        // #e39f7a 
        $(".hpassenger").css("color","#555");
        $("#ddxq").css("color","#555");
        $(".hrun").css("color","#555");
        $("#ddxq a").css("color","#555");
    }
    
    // goods.js页面的数据合并 
    var gaode = {
        successdata:{}, // 成功的对象
        errordata:{},   // 失败存储的对象
        successposition:{},  // 成功得到的postion 对象
        formattedAddress:"", // 定位得到的地址  始发地
        Destination:"",        // 目的地   
        citysearchval:"",   // input 搜索的值 
        citysearchSearchval:{},    //搜索得到的结果
        citysearchSearchtips:[],   //搜索得到的数组结果
        dingweicity:""  // 搜索定位城市需要的城市名 
    }
    var localdiz = {
        nowSignin:"//qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html"      // 登录地址 
    }

    // 点击得到的的数据 
    var clickresult = {
        result:{}
    }
    // 全局静态 数据
    var sfcsj = {
        passenger:{},  //乘客的数据
        vowner:{},       // 车主的数据
        passengerUrl:"../madeFreeRideOrders/queryPageMadeFROrders.asp",
        // 乘客数据的地址 
        vownerUrl:"../madeFreeRideOrders/queryPageMadeFROrders.asp",
        // 乘客数据的div
        
        passengerDiv:"<div class='cylx-cy clearfix' id='passengerDiv'><a href='#showdata' id='aPassengerDiv'  target='_parent' class='clearfix'><div class='cylx-cyheader'><span class='bt'>常用</span><div class='time'><span class='hours' id='psghours'></span></div></div><div class='cylx-cycenter clearfix'><div id='cylx-departure' class='psgdeparture'></div><span class='glyphicon glyphicon-arrow-right cycicon'></span><div id='cylx-Destination'  class='psgdestination'></div></div><div class='cydstate clearfix'><span class='cydstates'>订单情况:</span><div class='cydstated' id='cydstatedzt'></div></div></a></div>",
        // 车主数据的 div 
        vownerDiv:"<a href='#showdata' id='avownerDiv'   target='_parent'  class='clearfix'><div class='circle clearfix' id='vownerDiv'><div class='left vownerleft clearfix'><div class='time'><span class='data' id='vdata'></span><div class='rq'><span class='hours' id='vdhours'></span></div></div><div class='mdd clearfix'><div class='cfd' id='vdcfd'></div><span class='glyphicon glyphicon-arrow-right mdd-icon'></span><div class='df' id='vdf'></div></div></div><div class='right clearfix'><span class='ricon left glyphicon glyphicon-menu-right'></span></div><div class='cydstate clearfix'><span class='cydstates'>订单情况:</span><div class='cydstated' id='cirstatedzt'></div></div></div> </a>",
        // 全部行程中乘客 
        runpassengerDiv:"<div class='circle clearfix' id='runpassengerDiv'><a href='javascript:;' id='arunpassengerDiv'  target='_parent' class='arunpassengerDivclass clearfix'><div class='left runpassengerleft  clearfix'><div class='time'><span class='data' id='rpsgdata'></span><div class='rq'><span class='hours' id='rpsghours'></span></div></div><div class='mdd clearfix'><div class='cfd' id='rpsgcfd'></div><span class='glyphicon glyphicon-arrow-right mdd-icon'></span><div class='df' id='rpsgdf'></div><div class='runpassengerDivuid' style='display:none' id='idrunpassengerDivuid'></div> </div></div></a><div class='right clearfix'><button  class='ricon left btn btn-success' id='paymentbutton'>查看</button></div></div>",
        //全部行程中车主
        runvownerDiv:"<div class='circle clearfix' id='runvownerDiv'><a href='#ownshowdata' id='arunvownerDiv'   target='_parent'  class='arunvownerDivclass clearfix'><div class='left runvownerleft  clearfix' ><div class='time'><span class='data' id='rvdata'>14号</span><div class='rq'><span class='hours' id='rvdhours'></span></div></div><div class='mdd clearfix'><div class='cfd' id='rvdcfd'></div><span class='glyphicon glyphicon-arrow-right mdd-icon'></span><div class='df' id='rvdf'></div></div></div><input type='submit' class='ricon left btn btn-success ' value='查看' style='margin-top:22px;'></div></a></div>",
        // 支付页的模板 
        paymentpage:'<div id="myorder-od" class="tjorder clearfix"><a href="#payment" class="pass-aqkpayment clearfix" id="pmaqkpayment" style="display:block;"><div class="tjorder-hd clearfix"> <div class="tjorder-hdleft clearfix"><span class="tjorder-hdlefticon iconfont iconkeche"></span><span id="myorder-oddistance"  class="tjorder-hdleftnr"></span></div><p id="myorder-odstatus" class="tjorder-hdright"></p></div><div  class="tjorder-ct clearfix"><div   class="tjorder-ctleft"><span  id="myorder-newdpcity"></span><span id="myorder-oddpcity"></span></div><div   class="tjorder-ctright"><span id="myorder-newarcity"></span><span id="myorder-odarcity"></span></div></div><div class="tjorder-date clearfix"><div class="tjorder-dateleft clearfix"><span class="tjorder-dateleftts">出发时间:</span><span id="myorder-oddptime" class="tjorder-datelefttime"></span></div><div class="tjorder-dateright clearfix"><span class="tjorder-daterighticon iconfont iconrenminbi1688"></span><span id="myorder-odprice" class="tjorder-daterightmoney"></span></div></div><div class="tjorder-date clearfix"><div class="tjorder-dateleft clearfix"><span class="tjorder-dateleftts">返程时间:</span><span id="myorder-odartime" class="tjorder-datelefttime"></span></div></div></a><div id="myorder-odbutton" class="tjorder-button clearfix"></div></div>',
        // 车主接单页模板
        ownerpaymentpage:"<a href='#payment' class='aqkpayment clearfix' id='pmaqkpayment'><div class='paymentbody clearfix'><div class='paydate clearfix'><span class='paydateicon'>出发时间:</span><div class='paytime' id='pmpaytime'></div></div><div class='paymoney clearfix'><div class='pmsl'>订单金额:</div><div class='payyiyuan' id='pmpayyiyuan'></div></div><div class='paystate'><span class='payszfjg'>始发地:</span><span class='payssuc' id='pmpayssuc'></span></div></div></a>",
        // 账单页数据
        cashMoneyPage:'</div><div class="cashm-header clearfix"><span class="cashm-hdspanone">账单时间:</span><span class="cashm-hdspantwo" id="cashm-fttime"></span></div><div class="cashm-center  clearfix"><div class="cashm-ctrdiv clearfix"><div class="cashm-left"><span class="cashm-ctspan">金额</span><span class="cashm-ctspan" id="cashm-money"></span></div><span class="cashm-xian"></span></div><div class="cashm-ctrdiv clearfix"><div class="cashm-left"><span class="cashm-ctspan">当月总金额</span><span class="cashm-ctspan" id="cashm-nowmoney"></span></div><span class="cashm-xian"></span></div><div class="cashm-ctrdiv clearfix"><span class="cashm-ctspan">当月已提金额</span><span class="cashm-ctspan" id="cashm-cashmoney"></span></div></div>'
    }

    //让时间绑定切换到页面的事件 
    function formcontrol(){
        // 存储身份
        $("#sbutnaone").bind("touch click",function(){
            locationqjval.val = "a=p";
            hashChange("#details?a=p");
        });
        $(".passenger-bindingone").bind("touch click",function(){
            locationqjval.val = "a=p";
            hashChange("#details?a=p");
        });
        $(".passenger-bindingtwo").bind("touch click",function(){
            locationqjval.val = "a=p";
            hashChange("#details?a=p");
        });
        // 存储身份
        $(".vowner-bindingone").bind("touch click",function(){
            locationqjval.val = "b=v";
            hashChange("#details?b=v");
        })
        $(".vowner-bindingtwo").bind("touch click",function(){
            locationqjval.val = "b=v";
            hashChange("#details?b=v");
        })
        $("#sbuttonatwo").bind("touch click",function(){
            locationqjval.val = "b=v";
            hashChange("#details?b=v");
        })
    
        $("#balance-csbutton").bind("touch click",function(){
            window.location.hash = "#cashMoney";
        })

    }
    
    // 默认页面显示，先不弄,放这里
    function created(){
        $(".passenger").show();
        $(".vowner").hide();
        $(".run").hide();
        $(".details").hide();
        $("#searchcity").hide();
        $("#searchxincheng").hide();
        $(".showsjdata").hide();
        $(".paymentzy").hide();
        $(".pdetails").hide();
        $(".owner-register").hide();   
        $(".to-examine").hide();
    }
    //切换路由的初始化方法
    function hashcreate(){
        $(".passenger").hide();
        $(".vowner").hide();
        $(".run").hide();
        $(".details").hide();
        $("#searchcity").hide();
        $("#searchxincheng").hide();
        $(".showsjdata").hide();
        $(".paymentzy").hide();
        $(".pdetails").hide();
        $(".owner-register").hide();
        $(".to-examine").hide();
        $("#cashMoneyPage").hide();
        $(".city").hide();
        $(".paymentzy").hide();
        $(".pass-paymentzy").hide();
        // 点击了，先隐藏，在进行效果展示 
    }
    // 切换路由的方法
    function hashChange(hashzhi){
        var locationHash = window.location.hash;
         // 处理一下参数
        // #details?a=3
        var val1 = locationHash.split("?");
        if( locationHash === ""){  // 默认是passenger
            // 大的颜色变化
            hashlycolorsz();
            $(".hpassenger").css("color", "#e39f7a");

            window.location.hash="#passenger";
        }else if(hashzhi=="#details?a=p" || hashzhi=="#details?b=v"){
            locationHash="#details";
            window.location.hash= hashzhi;
            $("#address").text("想要去哪儿?");
        }else {
            if(val1[0]=="#passenger" || locationHash =="#passenger" ){
                // 大的颜色变化
                hashlycolorsz();
                $(".hpassenger").css("color", "#e39f7a");
                // 颜色变化
                hvownermyrun();
                $(".hvownermyrun").css("color", "#5bc0de");

                $(".runluyouaa").hide();
                $(".hrunoneicon").attr('class',"glyphicon glyphicon-triangle-bottom hrunoneicon");
                hashcreate();
                $(".passenger").show();
            }
            
            // 不是那个路由的，默认隐藏那个效果 
            $("#hpassengericon").attr("class","glyphicon glyphicon-triangle-bottom"); 
    
            // run路由 
            if(val1[0]=="#run"|| locationHash=="#run"){
                // 路由为 run 时 默认取值 
                // 为run时，请求数据 
                hashcreate();
                $(".run").show();
                $(".runvowner").hide();
                $(".runscreen").hide();
                
                $(".runpassenger").show();
                if(val1[1]=="diver"){
                    // 大的颜色变化
                    hashlycolorsz();
                    $(".hpassenger").css("color", "#e39f7a");
                    // 颜色变化
                    hvownermyrun();
                    $(".hrunqbcar").css("color","#5bc0de");

                    $(".runpassenger").hide();
                    $(".runscreen").hide();
                    $(".runvowner").show();
                }else if(val1[1]=="passger"){
                    // 车主大的颜色变化
                    hashlycolorsz();
                    $(".hrun").css("color","#e39f7a");
                    // 颜色变化
                    hvownermyrun();
                    $(".hvownerqbrun").css("color","#5bc0de");

                    $(".runvowner").hide();
                    $(".runscreen").hide();
                    $(".runpassenger").show();
                }else if(val1[1]=="passgeran" || val1[1]=="diveran"){
                   
                    $(".runvowner").hide();
                    $(".runpassenger").hide();
                    runscjwfbsxddcsh();
                    $(".runscreen").show();
                    val1[1]==="passgeran"?nowusermsg.lyxx = "passgeran":nowusermsg.lyxx = "diveran";
                }
            }else{
                // 不是run则 隐藏导航栏 
                $(".runluyouaa").hide();
                $(".hrunoneicon").attr('class',"glyphicon glyphicon-triangle-bottom hrunoneicon");
            }

            // 判断参数 
            if(val1[0]=="#ownshowdata"){
                
            }
            $(".hvowner").hide();
             if(val1[0]=="#vowner" ||locationHash=="#vowner"){
                // 车主大的颜色变化
                hashlycolorsz();
                $(".hrun").css("color","#e39f7a");
                 // 颜色变化
                hvownermyrun();
                $(".hrunmycar").css("color","#5bc0de");

                hashcreate();
                $(".vowner").show();
            }else if(locationHash==="#details"|| val1[0]==="#details"){
                $("#ctxz").css("display","block");
                hashcreate();
                $(".details").show();
                if(locationHash=="#details?a=p" || locationHash =="#details?b=v"){
                    $(".completed").hide();
                    $(".tramount").hide();
                    $("#address").text("想要去哪儿?");
                    $(".chufadi-total").show();
                }else if(locationHash=="#details?settle"){
                    $(".chufadi-total").hide();
                    $(".tramount").hide();
                    if(settleAccounts.rendertimes===0){
                        settleAccounts.jump();
                        settleAccounts.rendertimes = 1;
                    }
                    $(".completed").show();
                }else if(locationHash=="#details?tramount"){
                    $(".completed").hide();
                    $(".chufadi-total").hide();
                    tramount.rendering();
                    $(".tramount").show();
                }
            }else if(val1[0] == "#searchcity"){
                hashcreate();
                $("#searchcity").show();
            }else if(locationHash =="#s" || locationHash =="#m"|| locationHash == "#cityother" || locationHash =="#time" ||
                locationHash == "#xxwz" ||locationHash == "#sxxwz"||locationHash == "#mxxwz" ||  
                locationHash =="#personnum" || val1[0] == "#personnum" ){
                hashcreate();
                $("#searchxincheng").show();
                if(locationHash =="#s"){
                    searchcfdhide();
                    $("#searchxincheng .nowcheckcity").show();
                    $("#searchxincheng .searchcfd").show();
                    $(".personNum").hide();
                    //  两个页面的显示和隐藏
                    $(".nowcheckcity").show();
                    $(".changzhou-city").hide();
                }else if(locationHash =="#m"){
                    searchcfdhide();
                    $("#searchxincheng .nowcheckcity").show();
                    $("#searchxincheng .searchcfd").show();
                    $(".personNum").hide();
                    //  两个页面的显示和隐藏
                    $(".nowcheckcity").show();
                    $(".changzhou-city").hide();
                }else if (locationHash == "#cityother" ) {
                    searchcfdhide();
                    $("#searchxincheng .nowcheckcity").show();
                    $("#searchxincheng .searchcfd").show();
                    $(".personNum").hide();
                    //  两个页面的显示和隐藏
                    $(".nowcheckcity").show();
                    $(".changzhou-city").hide();
                }else if(locationHash =="#time"){
                    searchcfdhide();
                    $("#searchxincheng .nowcheckcity").hide();
                    $("#searchxincheng .searchtime").show();
                    $(".personNum").hide();
                    $("#datetime").val("");
                    //  两个页面的显示和隐藏
                    $(".nowcheckcity").hide();
                    $(".changzhou-city").hide();
                }else if(locationHash == "#xxwz"||locationHash == "#sxxwz"||locationHash == "#mxxwz"){
                    searchcfdhide();
                    $("#searchxincheng .searchweizhi").show();
                    $("#searchxincheng .nowcheckcity").show();
                    $(".personNum").hide();
                    //  两个页面的显示和隐藏
                    $(".nowcheckcity").hide();
                    $(".changzhou-city").show();
                }else if(locationHash ==="#personnum"){
                    $("#searchxincheng .nowcheckcity").hide();
                    $("#searchxincheng .searchtime").hide();
                    $("#searchxincheng  .searchcfd").hide();
                    $(".searchweizhi").hide();
                    $(".personNum").show();
                    //  两个页面的显示和隐藏
                    $(".nowcheckcity").hide();
                    $(".changzhou-city").hide();
                }
            }else if(val1[0]==="#showdata" || locationHash =="#showdata"){
                
            }else if(val1[0] =="#ddxq"|| locationHash=="#ddxq"){
                hashcreate();
                if(val1[1]==="passger"){
                    // 支付页 
                    $(".pass-phdiconfyqdiv").outerHeight($(document.body).outerHeight()-$(".header").outerHeight()-40);
                    // 大的颜色变化
                    hashlycolorsz();
                    $(".hpassenger").css("color", "#e39f7a");
                    // 颜色的变化
                    hvownermyrun();
                    $(".hvownermypay").css("color","#5bc0de");

                    $("#pass-phdicon-injection-qb").css('color',"#4040e8");
                    $(".pass-paymentzy").show();
                    $(".pass-paymentzy").show();
                }else if(val1[1]==="diver"){
                    // 我的订单页
                    $(".phdiconfyqdiv").outerHeight($(document.body).outerHeight()-$(".header").outerHeight()-188);
                    // 车主大的颜色变化
                    hashlycolorsz();
                    $(".hrun").css("color","#e39f7a");
                    // 颜色变化
                    hvownermyrun();
                    $(".hrucarpay").css("color","#5bc0de");
                    $("#phdicon-injection-qb").css('color',"#4040e8");
                    $(".paymentzy").show();
                }
                
            }else if(val1[0]=="#payment"){
                // 处理支付详情页 
                passengercli();
                hashcreate();
                $(".pdetails").show();
            }else if(val1[0]==="#register" || locationHash ==="#register"){
                hashcreate();
                $(".owner-register").show();
            }else if(val1[0]==="#examine" || locationHash === "#examine"){
                hashcreate();
                $(".to-examine").show();
            }else if ( val1[0]==="#cashMoney" || locationHash === "#cashMoney" ) {
                hashcreate();
                $("#cashMoneyPage").show();
            }else if (val1[0]==="#city" || locationHash === "#city" ) {
                hashcreate();
                $(".city").show();
                city_class.newPage();
            }
        }
    }
    
// 打开详情页函数        
    function searchcfdhide(){
        $("#searchxincheng .searchcfd").hide();
        $("#searchxincheng .searchweizhi").hide();
        $("#searchxincheng .searchtime").hide();
    }
    //header 中 ctive 的选择
    function hactive(){
        $(".htoggletwo").bind(" touch click",function(){
            removeActive();
            $(".htoggletwo").addClass("hactive");
        })
        $(".htogglethree").bind(" touch click",function(){
            // 把我的行程隐藏 
            $(".hvowner").hide();
            removeActive();
        })
        function removeActive(){
            $(".htoggleone").removeClass("hactive");
            $(".htoggletwo").removeClass("hactive");
            $(".htogglethree").removeClass("hactive");
            
        };
       
    }
    
    // 获取数据的地方 
    //获取乘客数据进行渲染
    function getPassenger(dateRange,dpCity,arCity,state){
        $.ajax({
             url: sfcsj.passengerUrl,
            type: 'post',
            data:{
                cur:1,  // 默认取第一页 
                pushType:"Passenger",   // 乘客 
                uid:nowusermsg.uid, // id号 
                viewType:"self",        // 看自己
                pageSize:8,         // 首页的数量
                dateRange:dateRange,      // 日期范围
                arCity:arCity,      // 到达城市 
                dpCity:dpCity,      // 出发城市 
                state:state         // 状态
            },
             success: function (data) {
                $("#passengerNode").empty();
                 if(data.result>0){
                    sfcsj.passenger = data;
                    // 获取成功，但是数据暂时为空 
                    // 处理 乘客端数据的函数
                    setPassenger(data);
                     // 获取到Uid后，乘客页添加滑动效果 
                     
                    if ( data.page > 1 ){
                        passengerNodeval.page = data.page;  
                        hdpassengerNode(dateRange,dpCity,arCity,state);
                    }else{
                        hdpassengerNode_click.lastShow();
                    }
                 }else {
                    hdpassengerNode_click.errShow();
                 }
            }
           });
    }

    // 获取车主端的数据并进行渲染
    function getVowner(dateRange,dpCity,arCity,state){
        $.ajax({
            url: sfcsj.vownerUrl,
            type: 'post',
            data:{
                cur:1,  // 默认取第一页 
                pushType:"Driver",   // 车主身份
                viewType:"self",        // 看自己
                uid:nowusermsg.uid, // id号 
                pageSize:8,         // 首页请求的数量
                dateRange:dateRange,      // 日期范围，默认取一个月之内的 
                arCity:arCity,      // 到达城市 
                dpCity:dpCity,      // 出发城市 
                state:state
            },
            success: function (data) {
                $("#vownperNode").empty();
                // 我的行程车主绑定的滑动效果
                
                if ( data.result > 0 ) {
                    sfcsj.vowner = data ;
                    // 获取成功，但是数据暂时为空 
                    // setVowner() 处理车主端的数据 
                    setVowner(data);
                    if (data.page>1 ){
                        vownperNodeval.page = data.page;
                        hdvownperNode(dateRange,dpCity,arCity,state);
                    }else {
                        hdvownperNode_click.lastShow();
                    }
                }else {
                    hdvownperNode_click.errShow();
                }   
           }
        });
    }

    // 全部行程中的数据 
    var qbxcvalsj = {
        passenger:{}, // 乘客数据 
        vowner:{}  // 车主数据 
    }
    // 全部行程中的乘客 
    function getqbPassenger(){
        $.ajax({
            url: sfcsj.passengerUrl,
           type: 'post',
           data:{
               cur:1,  // 默认取第一页 
               pushType:"Passenger",   // 乘客 
               viewType:"all",        // 看自己
               uid:nowusermsg.uid,  // id号  
               pageSize:8,         // 首页的数量
               dateRange:"",      
               arCity:"",      // 到达城市 
               dpCity:""     // 出发城市 
           },
            success: function (data) {
                if ( data.result > 0 ){
                    qbxcvalsj.passenger = data;
                    
                    $("#runpassengerNode").empty();
                    //  乘客端数据的函数
                    setqbPassenger(data);
                    if (data.page>1 ) {
                        // 赋值
                        runpassengerval.page  = data.page;
                        // 添加无限滑动效果
                        hdrunpassenger("","","");
                    }else {
                        passerlinfie_click.lastShow();
                    }
                }else {
                    passerlinfie_click.errShow();
                }
           }
          });
    }
        // 处理全部行程中乘客的信息 
            function setqbPassenger(data){
             var passengerData = data.obj.frOrders;
                if(data.result>0){ //为0才可以进行操作
                    
                    for(var i = 0 ;i<passengerData.length;i++){
                            // 全部行程中的数据的操作 
                        if(passengerData[i].state > -1){
                            $("#runpassengerNode").append(sfcsj.runpassengerDiv);

                            // 全部行程中的uid应该不是本地的uid，而是ajax时的uid 
                            var runidaPassengerDiv = "arunpassengerDiv"+i;
                            
                            $("#arunpassengerDiv").attr("id",runidaPassengerDiv);
                            setPassengerqbval(i,passengerData);
                        }
                    }
                }
            }

    // 全部行程中的车主数据  
    function getqbVowner(){
        $.ajax({
            url: sfcsj.vownerUrl,
           type: 'post',
           data:{
               cur:1,  // 默认取第一页 
               pushType:"Driver",   // 乘客 
               viewType:"all",        // 看自己
               uid:nowusermsg.uid,  // id号 
               pageSize:8,         // 首页请求的数量
               dateRange:"",      // 日期范围，取全部的 
               arCity:"",      // 到达城市 
               dpCity:""      // 出发城市 
           },
            success: function (data) {
               
               if (data.result > 0 ){
                    qbxcvalsj.vowner = data;
                    
                    // 获取成功，但是数据暂时为空 
                    $("#runvownerNode").empty();
                    // 处理 乘客端数据的函数
                    setqbVowneraa(data);
                    if (data.page>1){
                        // 赋值
                    runvownerval.page = data.page;
                        //绑定查看车主页无限滚事件
                        hdrunvowner("","","");
                    }else {
                        drivelinfie_click.errShow();
                    }
               }else {
                    drivelinfie_click.errShow();
               }
           }
          });
    }
        // 处理全部行程中车主的信息 
            function setqbVowneraa(data){
                var vownerData = data.obj.frOrders;
                // 先判断状态码 
                if(data.result>0){ //为0才可以进行操作
                  console.log("查看我的车主的信息",vownerData);
                 
                    for(var i = 0 ;i<vownerData.length;i++){
                        if(vownerData[i].state > -1){
                            $("#runvownerNode").append(sfcsj.runvownerDiv);
                            var arunvownerDivsj = "./font/html/xq.html#ownshowdata?"+"id="+vownerData[i].id+"&uid="+vownerData[i].uid+"&sf=run";
                            $("#arunvownerDiv").attr("href",arunvownerDivsj);
                            var idarunvownerDiv = "arunvownerDiv"+i;
                            $("#arunvownerDiv").attr("id",idarunvownerDiv);
                            setqbVowner(i,vownerData); 
                        }
                    }
                }
            }

    // 乘客页  对数据渲染到页面的 函数 
    function  setPassenger(data){
        var passengerData = data.obj.frOrders;
        // 先判断状态码 
        if(data.result>0){ //为0才可以进行操作
           
            for(var i = 0 ;i<passengerData.length;i++){
             // 乘客页中  行程的变化 
                $("#passengerNode").append(sfcsj.passengerDiv);
                // 改变div的编号
                var idpassengerDiv = "passengerDiv"+i;
                $("#passengerDiv").attr("id",idpassengerDiv);

                // 改变a标签的编号
                var aPassengerDivsj ="./font/html/xq.html#ownshowdata?"+"id="+passengerData[i].id+"&uid="+nowusermsg.uid;
                $("#aPassengerDiv").attr("href",aPassengerDivsj);
               
                var idaPassengerDiv = "aPassengerDiv"+i;
                $("#aPassengerDiv").attr("id",idaPassengerDiv);
                
                // 对乘客页数据的渲染操作 
                    setPassengerval(i,passengerData);
            }
        }
    }
    // 对乘客页书记的渲染操作函数 
        function setPassengerval(i,passengerData){
        // 先获取，在修改 
            // 操作时间 
            $("#psghours").text(passengerData[i].departureTime);
            var psghours = "psghours"+i;
            $("#psghours").attr("id",psghours);
            //  操作出发地 
            $(".psgdeparture").text(passengerData[i].departure);
            var psgdeparture = "psgdeparture"+i;
            $(".psgdeparture").attr("class",psgdeparture);
            // 操作目的地 
            $(".psgdestination").text(passengerData[i].arrival);
            var psgdestination = "psgdestination"+i;
            $(".psgdestination").attr("class",psgdestination);
            // 乘客页状态的判断显示 
                if(passengerData[i].state === -1){
                    $("#cydstatedzt").text("已失效");
                    var cydstatedzt = "cydstatedzt"+i;
                    $("#cydstatedzt").attr("id",cydstatedzt);
                }else if(passengerData[i].state === 0){
                    $("#cydstatedzt").text("已发布");
                    var cydstatedzt = "cydstatedzt"+i;
                    $("#cydstatedzt").attr("id",cydstatedzt);
                    var cydstatedztcl = "#"+cydstatedzt;
                    $(cydstatedztcl).css('color',"#5cb85c");
                }else  if(passengerData[i].state === 1){
                    $("#cydstatedzt").text("已支付");
                    var cydstatedzt = "cydstatedzt"+i;
                    $("#cydstatedzt").attr("id",cydstatedzt);
                    var cydstatedztcl = "#"+cydstatedzt;
                    $(cydstatedztcl).css('color',"#f0ad4e");
                }else if(passengerData[i].state === 2) {
                    $("#cydstatedzt").text("已接单");
                    var cydstatedzt = "cydstatedzt"+i;
                    $("#cydstatedzt").attr("id",cydstatedzt);
                    var cydstatedztcl = "#"+cydstatedzt;
                    $(cydstatedztcl).css('color',"#d9534f");
                }
        }

    // 对全部行程中乘客数据的渲染 
        function setPassengerqbval(i,passengerData){
            // 给他动态添加点击事件 
                var oclickid = passengerData[i].id;

                var paymentbuttonsh = "paymentbutton("+passengerData[i].id+","+passengerData[i].uid+")";
                $("#paymentbutton").attr("onclick",paymentbuttonsh);
                var paymentbutton = "paymentbutton"+ passengerData[i].id;
                $("#paymentbutton").attr("id",paymentbutton);
            //切分数据 
                var sj = passengerData[i].departureTime.split(" ");

            // 这是数据的发布者的id号 
           // 对uid号进行操作 
                $(".runpassengerDivuid").text(passengerData[i].uid);
                var runpassengerDivuid  = "runpassengerDivuid"+passengerData[i].uid;
                $(".runpassengerDivuid").attr("class",runpassengerDivuid);
            // 对号数的操作 
                $("#rpsgdata").text(sj[0]);
                var rpsgdata  = "rpsgdata"+i;
                $("#rpsgdata").attr("id",rpsgdata);
            // 对细分时间的操作 
                $("#rpsghours").text(sj[1]);
                var rpsghours  = "rpsghours"+i;
                $("#rpsghours").attr("id",rpsghours);
            // 对出发地的操作 
                $("#rpsgcfd").text(passengerData[i].departure);
                var rpsgcfd  = "rpsgcfd"+i;
                $("#rpsgcfd").attr("id",rpsgcfd);
            // 对目的地的操作 
                $("#rpsgdf").text(passengerData[i].arrival);
                var rpsgdf  = "rpsgdf"+i;
                $("#rpsgdf").attr("id",rpsgdf);
        }
    // 车主页  对数据渲染到页面的 函数 
    function  setVowner(data){
        var vownerData = data.obj.frOrders;
    
        // 先判断状态码 
        if(data.result>0){ //为0才可以进行操作
            if(data.obj===""){
                return false;
            }else{
               
                for(var i = 0 ;i<vownerData.length;i++){
                    $("#vownperNode").append(sfcsj.vownerDiv);
                    // 车主是?b=xxxx
                    var avownperNodesj = "./font/html/xq.html#ownshowdata?"+"id="+vownerData[i].id+"&uid="+nowusermsg.uid;;
                    $("#avownerDiv").attr("href",avownperNodesj);
                    var idaPassengerDiv = "aPassengerDiv"+i;
                    $("#avownerDiv").attr("id",idaPassengerDiv);
                // 车主页的行程 
                        setVownercz(i,vownerData);
                }
            }
            
        }
    }
    // 车主页的信息 
        function setVownercz(i,vownerData){
            var sj = vownerData[i].departureTime.split(" ");
            // 大的时间的操作 
                $("#vdata").text(sj[0]);
                var vdata = "vdata"+i;
                $("#vdata").attr("id",vdata);
            // 细分的时间的操作 
                $("#vdhours").text(sj[1]);
                var vdhours = "vdhours"+i;
                $("#vdhours").attr("id",vdhours);
            // 出发地的操作
                $("#vdcfd").text(vownerData[i].departure);
                var vdcfd = "vdcfd"+i;
                $("#vdcfd").attr("id",vdcfd);
            // 目的地的操作 
                $("#vdf").text(vownerData[i].arrival);
                var vdf = "vdf"+i;
                $("#vdf").attr("id",vdf);
            // 车主页状态的操作 
               //  #cirstatedzt 
                if(vownerData[i].state === -1){
                    $("#cirstatedzt").text("已失效");
                    var cirstatedzt = "cirstatedzt"+i;
                    $("#cirstatedzt").attr("id",cirstatedzt);
                }else if(vownerData[i].state === 0){
                    $("#cirstatedzt").text("已发布");
                    var cirstatedzt = "cirstatedzt"+i;
                    $("#cirstatedzt").attr("id",cirstatedzt);
                    var cirstatedztcl = "#"+cirstatedzt;
                    $(cirstatedztcl).css('color',"#5cb85c");
                }else  if(vownerData[i].state === 1){
                    $("#cirstatedzt").text("已支付");
                    var cirstatedzt = "cirstatedzt"+i;
                    $("#cirstatedzt").attr("id",cirstatedzt);
                    var cirstatedztcl = "#"+cirstatedzt;
                    $(cirstatedztcl).css('color',"#f0ad4e");
                }else if(vownerData[i].state === 2){
                    $("#cirstatedzt").text("已被报名");
                    var cirstatedzt = "cirstatedzt"+i;
                    $("#cirstatedzt").attr("id",cirstatedzt);
                    var cirstatedztcl = "#"+cirstatedzt;
                    $(cirstatedztcl).css('color',"#d9534f");
                }
        }
    // 全部行程页的车主信息 
        function setqbVowner(i,vownerData){
            var sj = vownerData[i].departureTime.split(" ");
            // 全部行程中大的时间 
                $("#rvdata").text(sj[0]);
                var rvdata = "rvdata"+i;
                $("#rvdata").attr("id",rvdata);
            // 全部行程中小的时间 
                $("#rvdhours").text(sj[1]);
                var rvdhours = "rvdhours"+i;
                $("#rvdhours").attr("id",rvdhours);
            // 全部行程总的出发地 
                $("#rvdcfd").text(vownerData[i].departure);
                var rvdcfd = "rvdcfd"+i;
                $("#rvdcfd").attr("id",rvdcfd);
            // 全部行程中的目的地 
                $("#rvdf").text(vownerData[i].arrival);
                var rvdf = "rvdf"+i;
                $("#rvdf").attr("id",rvdf);
        }

    // 地图API页面处理逻辑 
     // 定位存储的字符串 
    var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom:14,//级别
        center: [119.9,31.7]//中心点坐标

    });

      // 点击处理函数  公用的 
      function touchchuli(result){
        if(result.location==""){
            
            maponbh(false);
        }else {
            // {P: 31.774645, R: 119.97328400000004, lng: 119.973284, lat: 31.774645} 
           
            maponbh(result.location);
            clickresult.result= result;
            // 这里的问题 
        }
     }

    // 根据点击获取坐标点 和 位置
        var geocoder,marker;
        function regeoCode() {
            var dingweiszcity = $(".acityselect").text();

            if(!geocoder){
                geocoder = new AMap.Geocoder({
                    city: dingweiszcity, //城市设为北京，默认：“全国”
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
                    var address = result.regeocode.formattedAddress;
                    document.getElementById('address').innerText = address;
                }else{alert(JSON.stringify(result))}
            });
        }
        // 判断 
            map.on('click',function(e){
                setdtCeneter(e.lnglat);
                document.getElementById('lnglat').value = e.lnglat;
                regeoCode();
                
            })

        document.getElementById('lnglat').onkeydown = function(e) {
            if (e.keyCode === 13) {
                regeoCode();
                return false;
            }
            return true;
        };    

        // 查询点击时标点 
        function maponbh(jbelnglat){
            setdtCeneter(jbelnglat)
            if(jbelnglat==false){
                document.getElementById('lnglat').value = {};
                regeoCode();
            }
            document.getElementById('lnglat').value = jbelnglat;
            regeoCode();
           
        }

        // 设置中心点函数 
        // 设置地图中心点 
        function setdtCeneter(qjposition){
            //var position = new AMap.LngLat(116, 39);  // 标准写法
            // 简写
           
             var position = [qjposition.R, qjposition.P]; 
             map.setCenter(position); 
            // 获取地图中心点
            var currentCenter = map.getCenter(); 
        }

// 提交功能模块的实现 
     var paymentModular = {
         // 初始化数据 
         states:0,  // 
        // 初始化函数 
        successdata:{},
        errdata:{},
        olddpcity:"",
        oldarcity:"",
        olddptime:"",
        oldartime:"",
        payment:function(){
             // 当点击提交时，把获取到的值给他们 
             
             gaode.formattedAddress = $("#chufadi").text();       
             gaode.Destination = $("#address").text();
            // 判断一下目的地是否为空  
             if($("#chufadi").text() == ""){
                 $("#chufadi").text("请稍做等待！");
                 paymentModular.states = 0;
                 return false;
             }  
             if($("#address").text() == "" ){
                 $("#address").text("不能为空！");
                 paymentModular.states = 0;
                 return false;
             }
            
             $(".xcspanleft").text($(".acityselect").text());

            //出发地的所有信息 
            var cfddata = fabuxiaoxi.cfddata;
            // 目的地所有信息 
             var mdata = fabuxiaoxi.mmddata;

            var lyhash  = window.location.hash;
            var valzhi  = lyhash.split("?");
            var   pushType ="";
            
            if(locationqjval.val=="a=p"){   // b=c是车主 
               pushType = "Passenger";  // 判断是车主 还是乘客发布的 
            }
            
            if(locationqjval.val=="b=v"){ // a=p 是乘客 
                pushType = "Driver";  // 判断是车主 还是乘客发布的 
            }

        // 处理定位功能的数据 
            var dLng = "";
            var dLat = "";
            var departure = "";

            if(cfddata!==""){
                dLng = cfddata.location.lng;
                dLat = cfddata.location.lat;
                departure = cfddata.name;
            }
            
            if(fabuxiaoxi.dwsj!==""){
                dLng = fabuxiaoxi.dwsj.position.lng;
                dLat = fabuxiaoxi.dwsj.position.lat;
                fabuxiaoxi.cfdcity = fabuxiaoxi.dwsj.addressComponent.city;
                departure = fabuxiaoxi.locationnam;
            }
            var successdattsxx = "";
            if(nowusermsg.uid ===""){
                successdattsxx = "账号登录异常,请返回重登";
            }else if( null ==pushType || pushType ===""||   undefined == pushType){
                successdattsxx="状态出错,请重新开始";
            }else if(departure.trim()==="" || null == departure  || null == dLng || null == dLat || dLng ==="" || dLat===""){
                if( undefined == departure ||departure.trim()==="" ){
                    successdattsxx= "出发地出错,请重新选择出发地";
                }else if( undefined  == dLng || undefined ==  dLat || dLng ==="" ||  dLat===""){
                    successdattsxx= "不能直接选择市名为出发地";
                }
            }
            if( undefined ==  mdata.name.trim() || undefined == mdata.location.lng  || undefined == mdata.location.lat|| mdata.name.trim()==="" || mdata.location.lng ==="" ||  mdata.location.lat===""){
                if(  undefined  == mdata.name.trim()|| mdata.name.trim()==="" ){
                    successdattsxx= "目的地出错,请重新选择目的地";
                }else if( undefined ==  mdata.location.lng || undefined == mdata.location.lat || mdata.location.lng ==="" ||  mdata.location.lat===""){
                    successdattsxx= "不能直接选择市名为目的地";
                }
            }
            if( undefined == fabuxiaoxi.mdtime  || fabuxiaoxi.mdtime===""){
                successdattsxx= "您忘了选期望到达时间了";
            }else if( undefined == fabuxiaoxi.cftime || fabuxiaoxi.cftime===""){
                successdattsxx= "您忘了选出发时间了";
            }else if(undefined ==  fabuxiaoxi.personNum || fabuxiaoxi.personNum==="" ){
                successdattsxx= "您忘了选人数了";
            }
            if(successdattsxx!==""){
                showMessage1btn(successdattsxx,"",0);
                return false;
            }else if( paymentModular.oldarcity == mdata.name.trim() && paymentModular.olddpcity == departure.trim() &&paymentModular.oldartime == fabuxiaoxi.cftime && paymentModular.olddptime ==  fabuxiaoxi.mdtime){
                // 阻止重复提交
               // 10秒后初始化下。
                setTimeout(function(){
                    paymentModular.oldarcity  = '';
                    paymentModular.olddpcity = '';
                    paymentModular.oldartime='';
                    paymentModular.olddptime
                 },5000);
                return false;
            }

            showLodding("请稍等，上传中...");

            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/saveMadeFROrders.asp",
                data:{
                    uid	:nowusermsg.uid,        // 用户id  
                    userid:nowusermsg.userid,
                    departure:departure.trim(),   // 出发地 
                    dLng :dLng ,    // 出发地经度 
                    dLat: dLat,   // 出发地纬度 
                    arrival:mdata.name.trim(),     // 目的地 
                    arrivalTime:fabuxiaoxi.mdtime,      // 到达时间问题 
                    aLng:mdata.location.lng,    // 目的地经度 
                    aLat:mdata.location.lat,  // 目的地纬度 
                    departureTime:fabuxiaoxi.cftime,    // 出发时间
                    pushType:pushType,        // 发布类型 
                    arCity:fabuxiaoxi.mddcity.trim(),      // 到达城市 
                    dpCity:fabuxiaoxi.cfdcity.trim(),      // 出发城市 
                    personNum:parseInt(fabuxiaoxi.personNum),         // 乘坐的人数 
                    price:parseFloat(fabuxiaoxi.amoney)     // 发布金额
                },
                success:function(data){
                     /* 加载成功，取消提示按钮 */
                    clearDialog();
                    settleAccounts.rendertimes = 0;
                    if(data.result ===  -1 ){
                        if(successdattsxx===""){
                            successdattsxx = "发布出错,请刷新在试";
                        }
                        settleAccounts.rendertimes = 1 ;
                        showMessage1btn(successdattsxx,"",0);
                        return false;
                    }else {
                        // 赋值，用于比较，防止卡顿，出现重复的
                        paymentModular.oldarcity = mdata.name.trim();
                        paymentModular.olddpcity = departure.trim() ;
                        paymentModular.oldartime = fabuxiaoxi.cftime;
                        paymentModular.olddptime =  fabuxiaoxi.mdtime;
                        // 提交的元素 
                        if( pushType === "Passenger" ){
                            //  如果是乘客发布，需要付钱给平台
                            // 付款单号可能会出现问题，需要取之前的来解决
                            // data.obj 返回数据给的单号
                           // 用完要把用过的值初始化，现在不用付款了。
                                    // 用完时间要初始化,完成了在初始化。
                                    fabuxiaoxi.mddcity = "";    // 置空 
                                    fabuxiaoxi.cfddata = "";    // 置空 
                                    fabuxiaoxi.mmddata = "";    // 置空 
                                    settleAccounts.rendertimes = 0 ;
                                    paymentModular.oldarcity = "";
                                    paymentModular.olddpcity = "" ;
                                    paymentModular.oldartime = "";
                                    paymentModular.olddptime = "";
                                    // div 里的值赋为空
                                    $("#address").text("");
                                    $("#cgz-mdd").val("");
                                    $("#cgz-cfd").val("");
                                    // 乘客发布时,支付成功的同时向后台发送数据
                                    showMessage1btn("发布成功,如需退款，请提前24小时取消订单","returnSfcPage()",0);
                                    // 数据成功后，在重新请求下页面,刷新数据，把刚刚取到的数据放在页面上给用户观看。
                        }else if( pushType === "Driver" ){
                             // 用完时间要初始化,完成了在初始化。
                            // 用完要把用过的值初始化 
                            // 用完时间要初始化,完成了在初始化。
                            fabuxiaoxi.mddcity = "";    // 置空 
                            fabuxiaoxi.cfddata = "";    // 置空 
                            fabuxiaoxi.mmddata = "";    // 置空 
                            settleAccounts.rendertimes = 0 ;
                            paymentModular.oldarcity = "";
                            paymentModular.olddpcity = "" ;
                            paymentModular.oldartime = "";
                            paymentModular.olddptime = "";
                            // div 里的值赋为空
                            $("#address").text("");
                            $("#cgz-mdd").val("");
                            $("#cgz-cfd").val("");
                            // 数据成功后，在重新请求下页面,刷新数据，把刚刚取到的数据放在页面上给用户观看。
                            showMessage1btn("发布成功,如需退款，请提前24小时取消订单","returnSfcPage()",0);
                        }
                    }
                },
                error:function(data){
                    /* 加载成功，取消提示按钮 */
                    clearDialog();
                    settleAccounts.rendertimes = 0;
                    // 用完要把用过的值初始化 
                    fabuxiaoxi.mddcity = "";    // 置空 
                    fabuxiaoxi.cfddata = "";    // 置空 
                    fabuxiaoxi.mmddata = "";    // 置空 
                    settleAccounts.rendertimes = 0 ;
                    paymentModular.oldarcity = "";
                    paymentModular.olddpcity = "" ;
                    paymentModular.oldartime = "";
                    paymentModular.olddptime = "";
                    if ( null == data.msg || "" == data.msg ) {
                        showMessage1btn("网络出错,请重试","",0);
                    }else {
                        showMessage1btn(data.msg,"",0);
                    }
                    
                }
            })
        }
    }
// 返回页面
    function returnSfcPage(){
        window.location.href = "//qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/sfc.html"; 
    }
// 支付页逻辑的实现 
    // 存储获取到的支付页的信息，供支付详情页掉欧阳 
 var paymentpageval = {
        result:{},  // 数据 

        chisu:0,    // 计算用户支付了几次 
        type:"passger"  // 请求类型
    }
    // 只有乘客才有支付表，车主不需要，车主只有接单表
    function paymentpage(uid,val,valzhi,dateRange){
        $.ajax({
            type:"post",
            url:"//qckj.czgdly.com/bus/MobileWeb/madeFROViewPayments/queryPageMadeFROVPayments.asp",
            data:{
                cur:1, // 查看页码 
                uid:uid,
                dateRange:dateRange,  // 查看日期，查看所有 
                utype:val,
                pageSize:8      // 首页
            },
            success:function(data){
             
                console.log("乘客支付信息表",data);
                paymentpageval.result = data ;
                $(".pass-phdiconfyq").empty();
               if(data.result>0){
                    for( var i = 0 ;i<data.obj.froViewPayments.length;i++){
                        paymentpageval.chisu++;
                        $(".pass-phdiconfyq").append(sfcsj.paymentpage);
                    // 处理支付页面的数据 
                        paymentpcl(i,data,2);
                    }
                   
                    if(valzhi == 1){
                        if (data.page > 1){
                            pass_paymentzyval.page = data.page;
                            pass_hdpaymentzy("Passenger",dateRange);
                        }else {
                            pass_payment_click.lastShow();
                        }
                    }
               }else {
                    pass_payment_click.errShow();
               }
            },
            error:function(data){
                console.log("失败",data);
            }
        })
    }
    // 支付成功处理的页面的数据 
    //    <a href="#payment" class="aqkpayment clearfix" id="pmaqkpayment">  
    function paymentpcl(i,data,val){
        if(   null  == val ||  undefined  == val || val ===2 ||  val === "" ){
            // 乘客支付的数据
            var sj = data.obj.froViewPayments[i];
            i = data.obj.froViewPayments[i].id;
            // 处理点击支付的数据 
            // 传递参数 
            var pmaqkpayment  = "#payment?id="+i+"&identity=Passenger";
            $("#pmaqkpayment").attr("href",pmaqkpayment);
            var pmaqkpaymentid = "#pmaqkpayment"+sj.id;
            $("#pmaqkpayment").attr("id",pmaqkpaymentid);
            
            // 大的div 
            $("#myorder-od").attr("id","myorder-od"+sj.id);

            // 处理赋值
            // 市内市外
            var oddistance = "";
            if (sj.arCity == sj.dpCity ) {
                oddistance = "市内";
            }else {
                oddistance = "城际";
            }
            $("#myorder-oddistance").text(oddistance);
            $("#myorder-oddistance").attr("id","myorder-oddistance"+sj.id);
            // 出发地
            $("#myorder-oddpcity").text(sj.departure);
            $("#myorder-oddpcity").attr("id","myorder-oddpcity"+sj.id);
            
            $("#myorder-oddptime").text(sj.dpTime);
            $("#myorder-oddptime").attr("id","myorder-oddptime"+sj.id);
            // 到达
            $("#myorder-odarcity").text(sj.arrival);
            $("#myorder-odarcity").attr("id","myorder-odarcity"+sj.id);

            // 起点城市
            $("#myorder-newdpcity").text(sj.dpCity);
            var myorder_newdpcity = "myorder-newdpcity"+sj.id;
            $("#myorder-newdpcity").attr("id",myorder_newdpcity);
            // 终点城市
            $("#myorder-newarcity").text(sj.arCity);
            var myorder_newarcity = "myorder-newarcity"+sj.id;
            $("#myorder-newarcity").attr("id",myorder_newarcity);
            
                // 添加时间
            $("#myorder-odartime").text(sj.insertDate);
            $("#myorder-odartime").attr("id","myorder-odartime"+sj.id);
            // 状态
            var odstatus = "";
            var odbutton = '';
            var odprice = 0 ;
            if (sj.payState == 1) {
                odstatus= "已支付";
                odbutton = '<span class="tjorder-myorderts">路上请系好安全带!</span>';
                odprice = sj.price;
            }else if (sj.payState == -1){
                odstatus= "已取消";
                odbutton = '<span class="tjorder-myorderts">如需用车,请重新下单!</span>';
                if ( null  == sj.price || undefined == sj.price ) {
                    odprice= "已取消";
                }else {
                    odprice = sj.price;
                }
            }else {
                odstatus= "未支付";
                odbutton = '<span class="tjorder-myorderts">快点击去支付吧!</span>';
                odprice = "未支付";
            }
            $("#myorder-odstatus").text(odstatus);
            $("#myorder-odstatus").attr("id","myorder-odstatus"+sj.id);
            // 其他提示
            $("#myorder-odbutton").empty();
            $("#myorder-odbutton").append(odbutton);
            $("#myorder-odbutton").attr('id',"myorder-odbutton"+sj.id);
            // 价格
            $("#myorder-odprice").text(odprice);
            $("#myorder-odprice").attr("id","myorder-odprice"+sj.id);

        }else if( val === 0 ){
            // 车主的我的订单的处理
            var  sjone = data.obj.froReceipts[i];
            i = data.obj.froReceipts[i].id;
            // 传递参数 
            var pmaqkpaymentone  = "#payment?id="+i+"&identity=Driver";
            $("#pmaqkpayment").attr("href",pmaqkpaymentone);
            var pmaqkpaymentid = "#pmaqkpayment"+i;
            $("#pmaqkpayment").attr("id",pmaqkpaymentid);
        // 处理出发时间
            $("#pmpaytime").text(sjone.departureTime);
            var pmpaytime = "pmpaytime"+i;
            $("#pmpaytime").attr("id",pmpaytime);
        // 处理订单金额 
            $("#pmpayyiyuan").text(sjone.price);
            var pmpayyiyuan = "pmpayyiyuan"+i;
            $("#pmpayyiyuan").attr("id",pmpayyiyuan);
        // 处理始发地
            $("#pmpayssuc").text(sjone.dpCity+sjone.departure);
            var pmpayssuc = "pmpayssuc"+i;
            $("#pmpayssuc").attr("id",pmpayssuc);
        }
    }   

// 点击路由时 读取信息 
    // "#payment?id=1 
    function passengercli(){
        var winhash = window.location.hash;
       
        var sjone = winhash.split("?");   // #payment? id = 1 & identity = Driver
        var sjid = sjone[1].split("&"); // ["id=0", "identity=Passenger"]
        var sjindexes =  sjid[0].split("=");  // id 0 
        var sjbijiao  =  sjid[1].split("=");   //   identity  Passenger
        var indexes =  parseInt(sjindexes[1]);
        var bijiao = sjbijiao[1];

        $("#pdetail-refund").hide();
        
        $(".pdetlsdadlook").empty();
        $("#details-paymoney").empty();

        if( bijiao === "Passenger" ){  // 乘客的处理逻辑
           
            $("#pdetail-refund").hide();
            $("#details-passengershow").show();

            // 账单详情页绑定返回
            $("#pdetailssyj-return").unbind("click");
            $("#pdetailssyj-return").bind("click",function(){
                pass_payment_click.driverScreen();
                paymentBinding.phdiconDivNew();
                // 点击我的支付时，调用的函数
                paymentpage(nowusermsg.uid,"Passenger",1,"");
                window.history.back(-1);
            })
            var val =  paymentpageval.result.obj.froViewPayments.find(function(value, index, arr){  if(value.id == indexes){return value}});
            // 赋值
            // 支付数据
            if ( null == val.payPrice  || undefined == val.payPrice  ) {
                $("#details-price").hide();
            }else {
                $("#details-priceje").text(val.payPrice+"(已支付金额)");
                $("#details-pricetime").text(val.payDate);
                $("#details-price").show();
            }
            
            //退款信息
            if ( null == val.refundPrice ||  undefined == val.refundPrice ){
                $("#details-refund").hide();
            }else {
                $("#details-refund").show();
                $("#details-refundje").text(val.refundPrice);
                $("#details-refundtime").text(val.refundDate);
                $("#details-refunddh").text(val.refundNo);
            }
            // 出发地
            $("#details-dptime").text(val.dpTime);
            $("#details-dpname").text(val.departure);
            $("#details-dpcity").text(val.dpCity);
            // 目的地
            $("#details-artime").text(val.insertDate);
            $("#details-arname").text(val.arrival);
            $("#details-arcity").text(val.arCity);

            
                
                // 价格 
                $("#details-pricedh").text(val.price);
                // 单号
               
                if ( (null != val.vpNo && "" != val.vpNo) ||  (null != val.feeRate && "" != val.feeRate)){
                    // 已支付则显示
                    $("#details-oddNumber").show();
                    // 服务费比率
                    if ( null != val.feeRate && "" != val.feeRate) {
                        $("#details-pricefeedata").text(val.feeRate+"%");  // 服务费比率
                    }else {
                        $("#details-pricefeedata").text("");  // 服务费比率
                    }
                    // 支付单号
                    if ( null != val.vpNo && "" != val.vpNo) {
                        $("#details-oddsz").text(val.vpNo); // 支付单号
                    }else {
                        $("#details-oddsz").text("无支付信息"); // 支付单号
                    }
                }else {
                    $("#details-oddNumber").hide();
                }
                

                $("#details-passenger-num").text(val.pnum);

            if ( nowusermsg.uid == val.puid && val.pushType =='Driver' ){
                $("#details-paymoney").empty();
            }else {
                    if ( Date.parse(new Date()) > (Date.parse(val.dpTime)+86400000)) {
                        // 失效了  车主失效没有按钮
                        $("#details-paymoney").empty();
                    }
                    if(val.payState === 1){ 
                        jg ="已支付";
                        $("#details-passengerState").text(jg);
                        
                        if(Date.parse(new Date()) < (Date.parse(val.dpTime)+86400000)){
                            
                            if (val.pushType == "Driver") {
                                // 没过规定时间  有取消和立即支付按钮
                                $("#details-paymoney").append('<div style="width:200px;height:100%;margin:0 auto;" class="clearfix"><span class="details-paymorebutton" id="details-payquxiao" style="margin:6px auto;display:block;">取消订单</span></div>');
                                // 取消操作
                                $("#details-payquxiao").bind("touch click",function(){
                                    qxsfcxinxi(nowusermsg.uid,val.id,"已支付");
                                })
                                var details_payquxiao = "details-payquxiao"+1;
                                $("#details-payquxiao").attr("id",details_payquxiao);
                            }else {
                                // 没过规定时间  有取消和立即支付按钮
                                $("#details-paymoney").append('<div class="details-paymontext">取消请到行程页</div>');
                            }
                            // 支付
                            $("#details-paymaypay").bind("touch click",function(){
                                paymentModule.payMoney(val.price,val.pnum,val.id);
                            })
                            
                        }else {
                            jg="已支付";
                            $("#details-passengerState").text(jg);
                            // 过了规定时间
                            $("#details-paymoney").append('<div class="details-paymontext">祝您旅途愉快</div>')
                        }
                    }else if (val.payState === -1){
                        jg="已取消"
                        $("#details-passengerState").text(jg);
                    }else {
                        jg = "未支付";
                        $("#details-passengerState").text(jg);
                        $("#details-paymoney").append('<div style="width:200px;height:100%;margin:0 auto;" class="clearfix"><span class="details-paymorebutton" id="details-payquxiao">取消订单</span><span class="details-paymorebutton" id="details-paymaypay">立即支付</span></div>');
                        
                        // 取消操作
                        if(Date.parse(new Date()) < (Date.parse(val.dpTime)+86400000)){
                            $("#details-payquxiao").bind("touch click",function(){
                                qxsfcxinxi(nowusermsg.uid,val.id,"未支付");
                            })
                        }else {
                            jg="已取消";
                            
                            $("#details-passengerState").text(jg);
                        }
    
                        var details_payquxiao = "details-payquxiao"+1;
                        $("#details-payquxiao").attr("id",details_payquxiao);
                        
                        // 支付
                        $("#details-paymaypay").bind("touch click",function(){
                            paymentModule.payMoney(val.price,val.pnum,val.id);
                        })
                        var details_paymaypay = "details-paymaypay"+1;
                        $("#details-paymaypay").attr("id",details_paymaypay);
                    }
                
            }
               
            // 填充 
                if(val.payState === 1){
                    $(".pdetlsdadlook").append("<div class='clearfix' style='height: 56px;'><button class='lookpaydan btn btn-success'>查看行程页面</button><div class='lookpaydxx' style='display:none;'></div></div>");
                    // 点击查看页面功能
                   
                    $(".lookpaydan").bind("touch click",function(){
                        var jwxx = "#ownshowdata?id="+val.froid+"&uid="+val.puid+"&oneself";
                        var wlgref = "//qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/font/html/xq.html"+jwxx;
                        window.location.href = wlgref ;
                    })
                }else {
                    $(".pdetlsdadlook").empty();
                }
        }else  if(bijiao === "Driver") {
            $("#details-passengershow").hide();
            $("#pdetail-refund").show();
            // 账单详情页绑定返回
            $("#pdetailssyj-return").unbind("click");
            $("#pdetailssyj-return").bind("click",function(){
                payment_click.driverScreen();
                paymentBinding.phdiconDivNew();
                // 点击时车主时 调用渲染函数
                owenerCash.owerPage(1,"");
                window.history.back(-1);
            })
            var valtwo =   owenerCash.cashResult.obj.froReceipts.find(function (value, index, arr){  if(value.id == indexes){return value}});
            // 结果
            var stateResult = "";
            //-2 待退款；-1:取消；0：下单；1：完成；2：待付款
            if ( valtwo.state == -1) {
                stateResult = "已取消";
            }else if ( valtwo.state == 0) {
                stateResult = "已下单";
            }else if ( valtwo.state == 1){
                stateResult = "已完成";
            }else if ( valtwo.state == 2){
                stateResult = "已完成";
            }
            $("#details-driverState").text(stateResult);
             // 车主的处理逻辑
            
            // 赋值
            $("#details-driverdptime").text(valtwo.departureTime);
            $("#details-driverdname").text(valtwo.departure);
            $("#details-driverdpcity").text(valtwo.dpCity);
            // 目的地
            $("#details-driverartime").text(valtwo.arrivalTime);
            $("#details-driverarname").text(valtwo.arrival);
            $("#details-driverarcity").text(valtwo.arCity);
            //价格和人数等
            $("#details-driverPricedh").text(valtwo.price);
            $("#details-driverOddsz").text(valtwo.personNum);
            $(".pdetlsdadlook").empty();
            // 填充 
                $(".pdetlsdadlook").append("<div class='clearfix' style='height: 56px;'><button class='lookpaydan btn btn-success'>查看行程页面</button><div class='lookpaydxx' style='display:none;'></div></div>");
                $(".lookpaydan").bind("touch click",function(){
                    var jwxx = "#ownshowdata?id="+valtwo.froid+"&uid="+valtwo.puid+"&oneself";
                    var wlgref = "//qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/font/html/xq.html"+jwxx;
                    window.location.href = wlgref ;
                })
              
        }
    }
/* 取消订单的操作 */
function qxsfcxinxi(uid,id,sftuimonry){
    retreatMoney(uid,id);
}

// 乘客身份在已付款时，点击取消，要退钱。
function retreatMoney(uid,id){
    $.ajax({
        url:"//qckj.czgdly.com/bus/MobileWeb/madeFROViewPayments/cancelFROVPayments.asp",
        type:"post",
        data:{
            uid:uid,
            id:id,
            userid:nowusermsg.userid,
            source:"KBT"
        },
        success:function(data){
            console.log("取消支付数据",data);
            if( data.result === -1 ){
                $("#details-paymoney").empty();
                showMessage1btn(data.msg,"",0);
                    // 操作成功，显示提示
                    $("#details-paymoney").append('<div class="details-paymontext">取消成功</div>');
            }else {
                $("#details-paymoney").empty();
                showMessage1btn(data.msg,"",0);
                // 操作成功，显示提示
                $("#details-paymoney").append('<div class="details-paymontext">取消成功</div>');
            };
        },
        error:function(data){
            console.log("退款失败",data);
            if ( null == data.msg || "" == data.msg ) {
                showMessage1btn("退款失败,请联系客服","",0);
            }else {
                showMessage1btn(data.msg,"",0);
            }
           
        }
    })
} 


// chd-screen top-screen绑定的函数
var screen = {
    ptime:"",    // 筛选时间
    pdpcity:"",  // 筛选出发城市
    parcity:"",  // 筛选到达城市
    pstate:3,       // 状态
    pdownIcon:1,
    atime:"",    // 筛选时间
    adpcity:"",  // 筛选出发城市
    aarcity:"",  // 筛选到达城市
    adownIcon:1,
    astate:3,    // 状态
    newPage:function(){
        //绑定的事件和初始化
        $("#chd-screen").bind("touch click",function(){
            screen.pdownIcon ++ ;
            $("#chd-screen-div").slideToggle();
            if (screen.pdownIcon%2 == 0 ){
                $("#chd-screen-downicon").attr("class","chd-righticon glyphicon glyphicon-triangle-top");
            }else {
                $("#chd-screen-downicon").attr("class","chd-righticon glyphicon glyphicon-triangle-bottom");
            }
        })
        $("#chd-screen-today").bind("touch click",function(){
            screen.ptime = "today";
            screen.chdTimeNew();
            $("#chd-screen-today").css('color',"#4040e8");
        })
        $("#chd-screen-week").bind("touch click",function(){
            screen.ptime = "weekday";
            screen.chdTimeNew();
            $("#chd-screen-week").css('color',"#4040e8");
        })
        $("#chd-screen-month").bind("touch click",function(){
            screen.ptime = "month";
            screen.chdTimeNew();
            $("#chd-screen-month").css('color',"#4040e8");
        })
        $("#chd-screen-time-whole").bind("touch click",function(){
            screen.ptime = "";
            screen.chdTimeNew();
            $("#chd-screen-time-whole").css('color',"#4040e8");
        })

        $("#chd-dpcity-whole").bind("touch click",function(){
            screen.pdpcity = "";
            $("#chd-dpcity-whole").css('color',"#4040e8");
        })

        $("#chd-arcity-whole").bind("touch click",function(){
            screen.parcity = "";
            $("#chd-arcity-whole").css('color',"#4040e8");
        })
        $("#chd-screen-dpcity-input").bind("focus",function(){
            $("#chd-dpcity-whole").css('color',"#555");
        })
        $("#chd-screen-arcity-input").bind("focus",function(){
            $("#chd-arcity-whole").css('color',"#555");
        })
        // 状态
        //-1:失效；0：发布；1：完结；2：接单； 3：全部
        $("#chd-screenstate-sx").bind("touch click",function(){
            screen.pstate = -1 ;
            screen.chdStateNew();
            $("#chd-screenstate-sx").css('color',"#4040e8");
            screen.passengerAjax();
        })
        $("#chd-screenstate-fb").bind("touch click",function(){
            screen.pstate = 0 ;
            screen.chdStateNew();
            $("#chd-screenstate-fb").css('color',"#4040e8");
            screen.passengerAjax();
        })
        $("#chd-screenstate-wj").bind("touch click",function(){
            screen.pstate = 1 ;
            screen.chdStateNew();
            $("#chd-screenstate-wj").css('color',"#4040e8");
            screen.passengerAjax();
        })
        $("#chd-screenstate-jd").bind("touch click",function(){
            screen.pstate = 2;
            screen.chdStateNew();
            $("#chd-screenstate-jd").css('color',"#4040e8");
            screen.passengerAjax();
        })
        $("#chd-screenstate-qb").bind("touch click",function(){
            screen.pstate = 3;
            screen.chdStateNew();
            $("#chd-screenstate-qb").css('color',"#4040e8");
            screen.passengerAjax();
        })

        
        // 车主页绑定事件
        $("#top-screen").bind("touch click",function(){
            screen.adownIcon ++ ;
            $("#top-screen-div").slideToggle();
            if (screen.adownIcon%2 == 0 ){
                $("#top-screen-downicon").attr("class","top-righticon glyphicon glyphicon-triangle-top");
            }else {
                $("#top-screen-downicon").attr("class","top-righticon glyphicon glyphicon-triangle-bottom");
            }
        })
        $("#top-screen-today").bind("touch click",function(){
            screen.atime = "today";
            screen.topTimeNew();
            $("#top-screen-today").css('color',"#4040e8");
        })
        $("#top-screen-week").bind("touch click",function(){
            screen.atime = "weekday";
            screen.topTimeNew();
            $("#top-screen-week").css('color',"#4040e8");
        })
        $("#top-screen-month").bind("touch click",function(){
            screen.atime = "month";
            screen.topTimeNew();
            $("#top-screen-month").css('color',"#4040e8");
        })
        $("#top-screen-time-whole").bind("touch click",function(){
            screen.atime = "";
            screen.topTimeNew();
            $("#top-screen-time-whole").css('color',"#4040e8");
        })

        $("#top-dpcity-whole").bind("touch click",function(){
            screen.adpcity = "";
            $("#top-dpcity-whole").css('color',"#4040e8");
        })
        $("#top-arcity-whole").bind("touch click",function(){
            screen.aarcity = "";
            $("#top-arcity-whole").css('color',"#4040e8");
        })

        $("#top-screen-dpcity-input").bind("focus",function(){
            $("#top-screen-dpcity-input").css('color',"#555");
        })
        $("#top-screen-arcity-input").bind("focus",function(){
            $("#top-screen-arcity-input").css('color',"#555");
        })

        // 状态
        //-1:失效；0：发布；1：完结；2：接单； 3：全部
        $("#top-screenstate-sx").bind("touch click",function(){
            screen.astate = -1 ;
            screen.topStateNew();
            $("#top-screenstate-sx").css('color',"#4040e8");
            screen.driverAjax();

        })
        $("#top-screenstate-fb").bind("touch click",function(){
            screen.astate = 0 ;
            screen.topStateNew();
            $("#top-screenstate-fb").css('color',"#4040e8");
            screen.driverAjax();
        })
        $("#top-screenstate-wj").bind("touch click",function(){
            screen.astate = 1 ;
            screen.topStateNew();
            $("#top-screenstate-wj").css('color',"#4040e8");
            screen.driverAjax();
        })
        $("#top-screenstate-jd").bind("touch click",function(){
            screen.astate = 2;
            screen.topStateNew();
            $("#top-screenstate-jd").css('color',"#4040e8");
            screen.driverAjax();
        })
        $("#top-screenstate-qb").bind("touch click",function(){
            screen.astate = 3;
            screen.topStateNew();
            
            $("#top-screenstate-qb").css('color',"#4040e8");
            screen.driverAjax();
        })
        
        
    },
    chdTimeNew:function(){
        $("#chd-screen-today").css('color',"#555");
        $("#chd-screen-week").css('color',"#555");
        $("#chd-screen-month").css('color',"#555");
        $("#chd-screen-time-whole").css('color',"#555");
    },
    passengerAjax:function(){
        screen.pdownIcon = 1;
        // ajax
        $("#chd-screen-downicon").attr("class","chd-righticon glyphicon glyphicon-triangle-bottom");
        $("#chd-screen-div").slideUp();
        getPassenger(screen.ptime,screen.pdpcity,screen.parcity,screen.pstate);
        $(".cylx").animate({ scrollTop: 0 }, 10);  //返回顶部
    },
    driverAjax:function(){
        screen.adownIcon = 1;
        // ajax
        $("#top-screen-downicon").attr("class","top-righticon glyphicon glyphicon-triangle-bottom");
        $("#top-screen-div").slideUp();
        getVowner(screen.atime,screen.adpcity,screen.aarcity,screen.astate);
        $(".vonpondclxc").animate({ scrollTop: 0 }, 10);  //返回顶部
    },
    topTimeNew:function(){
        $("#top-screen-today").css('color',"#555");
        $("#top-screen-week").css('color',"#555");
        $("#top-screen-month").css('color',"#555");
        $("#top-screen-time-whole").css('color',"#555");
    },
    chdStateNew:function(){
        $("#chd-screenstate-sx").css('color',"#555");
        $("#chd-screenstate-fb").css('color',"#555");
        $("#chd-screenstate-wj").css('color',"#555");
        $("#chd-screenstate-jd").css('color',"#555");
        $("#chd-screenstate-qb").css('color',"#555");
    },
    topStateNew:function(){
        $("#top-screenstate-sx").css('color',"#555");
        $("#top-screenstate-fb").css('color',"#555");
        $("#top-screenstate-wj").css('color',"#555");
        $("#top-screenstate-jd").css('color',"#555");
        $("#top-screenstate-qb").css('color',"#555");
    }
}

var paymentBinding = {
    iconCliack:1,
    val:"",
    passval:"",
    passger:"",
    driver:"",
    newPage:function(){
        $("#phdicon-injection-div").bind("touch click",function(){
            paymentBinding.iconCliack ++;
            $("#phdicon-injection").slideToggle();
            if ( paymentBinding.iconCliack %2 == 0 ){
                $("#phdicon-injection-divicon").attr("class","phdicon-right-icon glyphicon glyphicon-triangle-top");
            }else {
                $("#phdicon-injection-divicon").attr("class","phdicon-right-icon glyphicon glyphicon-triangle-bottom");
            }
        })
        $("#phdicon-injection-today").bind("touch click",function(){
                paymentBinding.phdiconDivNew();
            $("#phdicon-injection-today").css('color',"#4040e8");
            paymentBinding.payAjAX("today");
        })
        $("#phdicon-injection-week").bind("touch click",function(){
            paymentBinding.phdiconDivNew();
            $("#phdicon-injection-week").css('color',"#4040e8");
            paymentBinding.payAjAX("weekday");
        })
        $("#phdicon-injection-month").bind("touch click",function(){
                paymentBinding.phdiconDivNew();
            $("#phdicon-injection-month").css('color',"#4040e8");
            paymentBinding.payAjAX("month");
        })
        $("#phdicon-injection-qb").bind("touch click",function(){
            paymentBinding.phdiconDivNew();
            $("#phdicon-injection-qb").css('color',"#4040e8");
            paymentBinding.payAjAX("");
        })
    },
    payAjAX:function(valdata){
        paymentBinding.val = valdata;
        $("#phdicon-injection-divicon").attr("class","phdicon-right-icon glyphicon glyphicon-triangle-bottom");
        $("#phdicon-injection").slideUp();
        paymentBinding.driver = valdata;
        payment_click.driverScreen();
        owenerCash.owerPage(1,paymentBinding.driver);
        
    },
    phdiconDivNew:function(){
        $("#phdicon-injection-today").css("color","#555");
        $("#phdicon-injection-week").css("color","#555");
        $("#phdicon-injection-month").css("color","#555");
        $("#phdicon-injection-qb").css("color","#555");
    },
    passnewPage:function(){
        $("#pass-phdicon-injection-div").bind("touch click",function(){
            paymentBinding.iconCliack ++;
            $("#pass-phdicon-injection").slideToggle();
            if ( paymentBinding.iconCliack %2 == 0 ){
                $("#pass-phdicon-injection-divicon").attr("class","phdicon-right-icon glyphicon glyphicon-triangle-top");
            }else {
                $("#pass-phdicon-injection-divicon").attr("class","phdicon-right-icon glyphicon glyphicon-triangle-bottom");
            }
        })
        $("#pass-phdicon-injection-today").bind("touch click",function(){
                paymentBinding.passphdiconDivNew();
            $("#pass-phdicon-injection-today").css('color',"#4040e8");
            paymentBinding.passpayAjAX("today");
        })
        $("#pass-phdicon-injection-week").bind("touch click",function(){
            paymentBinding.passphdiconDivNew();
            $("#pass-phdicon-injection-week").css('color',"#4040e8");
            paymentBinding.passpayAjAX("weekday");
        })
        $("#pass-phdicon-injection-month").bind("touch click",function(){
                paymentBinding.passphdiconDivNew();
            $("#pass-phdicon-injection-month").css('color',"#4040e8");
            paymentBinding.passpayAjAX("month");
        })
        $("#pass-phdicon-injection-qb").bind("touch click",function(){
            paymentBinding.passphdiconDivNew();
            $("#pass-phdicon-injection-qb").css('color',"#4040e8");
            paymentBinding.passpayAjAX("");
        })
    },
    passphdiconDivNew:function(){
        $("#pass-phdicon-injection-today").css("color","#555");
        $("#pass-phdicon-injection-week").css("color","#555");
        $("#pass-phdicon-injection-month").css("color","#555");
        $("#pass-phdicon-injection-qb").css("color","#555");
    },
    passpayAjAX:function(valdata){
        paymentBinding.passval = valdata;
        $("#pass-phdicon-injection-divicon").attr("class","phdicon-right-icon glyphicon glyphicon-triangle-bottom");
        $("#pass-phdicon-injection").slideUp();
        paymentBinding.passger = valdata;
        pass_payment_click.driverScreen();
        paymentpage(nowusermsg.uid,"Passenger",1,paymentBinding.passger);
    },
}


var runsccfcs = {
    choice:"dpcity",
    windHash:"#run?diveran",
    newPage:function(){
        $("#runsccfcs-dpinput").bind("focus",function(){
            city_class.clickHash = window.location.hash;
            city_class.click_button = "dp";
            $("#city-wrapper-nowcity").text($("#runsccfcs-dpinput").val());
            window.location.hash = "#city";
        })
        $("#runsccfcs-arinput").bind("focus",function(){
            city_class.clickHash = window.location.hash;
            city_class.click_button = "ar";
            $("#city-wrapper-nowcity").text($("#runsccfcs-arinput").val());
            window.location.hash = "#city";
        })
    }
}

// 城市选择页

var city_class = {
    clickHash:"#sxxwz",
    click_button:"dp",
    city_cityname:"",
    city_dpcity:"",
    city_arcity:"",
    screen_dpcity:"",
    screen_arcity:"",
    city_json:{
        1:["A","阿坝","阿拉善","阿里","安康","安庆","鞍山","安顺","安阳","澳门"],
        2:["B","北京","白银","保定","宝鸡","保山","包头","巴中","北海","蚌埠","本溪","毕节","滨州","百色","亳州"],
        3:["C","重庆","成都","长沙","长春","沧州","常德","昌都","长治","常州","巢湖","潮州","承德","郴州","赤峰","池州","崇左","楚雄","滁州","朝阳"],
        4:["D","大连","东莞","大理","丹东","大庆","大同","大兴安岭","德宏","德阳","德州","定西","迪庆","东营"],
        5:["E","鄂尔多斯","恩施","鄂州"],
        6:["F","福州","防城港","佛山","抚顺","抚州","阜新","阜阳"],
        7:["G","广州","桂林","贵阳","甘南","赣州","甘孜","广安","广元","贵港","果洛"],
        8:["H","杭州","哈尔滨","合肥","海口","呼和浩特","海北","海东","海南","海西","邯郸","汉中","鹤壁","河池","鹤岗","黑河","衡水","衡阳",
        "河源","贺州","红河","淮安","淮北","怀化","淮南","黄冈","黄南","黄山","黄石","惠州",
        "葫芦岛","呼伦贝尔","湖州","菏泽"],
        9:["J","济南","佳木斯","吉安","江门","焦作","嘉兴","嘉峪关",
        "揭阳","吉林","金昌","晋城","景德镇","荆门","荆州","金华","济宁","晋中","锦州","九江",
        "酒泉"],
        10:["K","昆明","开封"],
        11:["L","兰州","拉萨","来宾","莱芜","廊坊","乐山","凉山","连云港",
        "聊城","辽阳","辽源","丽江","临沧","临汾","临夏","临沂","林芝","丽水","六安","六盘水",
        "柳州","陇南","龙岩","娄底","漯河","洛阳","泸州","吕梁"],
        12:["M","马鞍山","茂名","眉山","梅州","绵阳","牡丹江"],
        13:["N","南京","南昌","南宁","宁波","南充","南平","南通","南阳","那曲","内江",
        "宁德","怒江","P","盘锦","攀枝花","平顶山","平凉","萍乡","莆田","濮阳"],
        14:["Q","青岛","黔东南","黔南","黔西南","庆阳","清远","秦皇岛","钦州","齐齐哈尔","泉州","曲靖","衢州"],
        15:["R","日喀则","日照"],
        16:["S","上海","深圳","苏州","沈阳","石家庄","三门峡","三明","三亚","商洛","商丘","上饶",
        "山南","汕头","汕尾","韶关","绍兴","邵阳","十堰","朔州","四平","绥化","遂宁","随州","宿迁",
        "宿州"],
        17:["T","天津","太原","泰安","泰州","台州","唐山","天水","铁岭","铜川","通化","通辽",
        "铜陵","铜仁","台湾"],
        18:["W","武汉","乌鲁木齐","无锡","威海","潍坊","文山","温州","乌海","芜湖",
        "乌兰察布","武威","梧州"],
        19:["X","厦门","西安","西宁","襄樊","湘潭","湘西","咸宁","咸阳","孝感",
        "邢台","新乡","信阳","新余","忻州","西双版纳","宣城","许昌","徐州","香港","锡林郭勒","兴安"],
        20:["Y","银川","雅安","延安","延边","盐城","阳江","阳泉","扬州","烟台","宜宾","宜昌","宜春",
        "营口","益阳","永州","岳阳","榆林","运城","云浮","玉树","玉溪","玉林"],
        21:["Z","枣阳市","枣庄","增城市","扎兰屯市","张家港","张家界","张家口","漳平市",
        "章丘市","樟树市","张掖","漳州","湛江","肇庆","昭通","招远市","郑州","镇江","枝江市","中山",
        "中卫","钟祥市","周口","舟山",
        "庄河市","诸城市","珠海","诸暨市","驻马店","卓尼",
        "涿州市","株洲","淄博","自贡","资兴市","资阳"]
    },
    newPage:function(){
        var cityWrapper = document.querySelector('.city-wrapper-hook');
        var cityScroller = document.querySelector('.scroller-hook');
        var cities = document.querySelector('.cities-hook');
        var shortcut = document.querySelector('.shortcut-hook');

        var scroll;

        var shortcutList = [];
        var anchorMap = {};

        function initCities() {
        var y = 0;
        var titleHeight = 28;
        var itemHeight = 44;

        var lists = '';
        var en = '<ul>';
        cityData.forEach(function (group) {
            var name = group.name;
            lists += '<div class="title">'+name+'</div>'; 
            lists += '<ul>';
            group.cities.forEach(function(g) {
            lists += '<li class="item" data-name="'+ g.name +'" data-id="'+ g.cityid +'"><span class="border-1px name">'+ g.name +'</span></li>';
            });
            lists += '</ul>';


            var name = group.name.substr(0, 1);
            en += '<li data-anchor="'+name+'" class="item">'+name+'</li>';
            var len = group.cities.length;
            anchorMap[name] = y;
            y -= titleHeight + len * itemHeight;

        });
        en += '</ul>';

        cities.innerHTML = lists;

        shortcut.innerHTML = en;
        shortcut.style.top = (cityWrapper.clientHeight - shortcut.clientHeight) / 2 + 'px';

        $("#cities-hook-div > ul").children("li").each(function(index, element) {
            $(this).unbind("click").bind("click",function(){
               console.log($(this).context.innerText);
               var city_name = $(this).context.innerText.trim();
               city_class.city_cityname == city_name;
               if (city_class.clickHash  == "#run?diveran"){
                   if ( city_class.click_button == "dp"){
                        $("#runsccfcs-dpinput").val(city_name);
                   }else {
                        $("#runsccfcs-arinput").val(city_name);
                   }
               }else if (city_class.clickHash  == "#run?passgeran"){
                    if ( city_class.click_button == "dp"){
                        $("#runsccfcs-dpinput").val(city_name);
                    }else {
                        $("#runsccfcs-arinput").val(city_name);
                    }
                }else if (city_class.clickHash  == "#sxxwz"  ){
                    if ( city_class.click_button == "dp"){
                        $("#cgz-cfcity").text(city_name);
                    }else {
                        $("#cgz-mdcity").text(city_name);
                    }
                }else if ( city_class.clickHash == "#mxxwz" ){
                    if ( city_class.click_button == "dp"){
                        $("#cgz-cfcity").text(city_name);
                    }else {
                        $("#cgz-mdcity").text(city_name);
                    }
                }
                window.location.hash = city_class.clickHash;
            });
        });
        $("#city-wrapper-div").bind("click",function(){
            var city_wrapper_div = $("#city-wrapper-nowcity").text();
            if (city_wrapper_div == "" || city_wrapper_div == null ||city_wrapper_div == undefined ) {
                return false;
            }else {
                if (city_class.clickHash  == "#run?diveran"){
                    if ( city_class.click_button == "dp"){
                         $("#runsccfcs-dpinput").val(city_wrapper_div);
                    }else {
                         $("#runsccfcs-arinput").val(city_wrapper_div);
                    }
                }else if (city_class.clickHash  == "#run?passgeran"){
                     if ( city_class.click_button == "dp"){
                         $("#runsccfcs-dpinput").val(city_wrapper_div);
                     }else {
                         $("#runsccfcs-arinput").val(city_wrapper_div);
                     }
                 }else if (city_class.clickHash  == "#sxxwz"  ){
                     if ( city_class.click_button == "dp"){
                         $("#cgz-cfcity").text(city_wrapper_div);
                     }else {
                         $("#cgz-mdcity").text(city_wrapper_div);
                     }
                 }else if ( city_class.clickHash == "#mxxwz" ){
                     if ( city_class.click_button == "dp"){
                         $("#cgz-cfcity").text(city_wrapper_div);
                     }else {
                         $("#cgz-mdcity").text(city_wrapper_div);
                     }
                 }

                 window.location.hash = city_class.clickHash;
            }
        })

        scroll = new window.BScroll(cityWrapper, {
            probeType: 3,
            click:true
        });

        // scroll.on('scroll', function (pos) {
        //   console.log(Math.round(pos.y));
        // });

        scroll.scrollTo(0, 0);
        }


        //bind Event
        function bindEvent() {
        var touch = {};
        var firstTouch;

        shortcut.addEventListener('touchstart', function (e) {

            var anchor = e.target.getAttribute('data-anchor');

            firstTouch = e.touches[0];
            touch.y1 = firstTouch.pageY;
            touch.anchor = anchor;

            scrollTo(anchor);

        });

        shortcut.addEventListener('touchmove', function (e) {

            firstTouch = e.touches[0];
            touch.y2 = firstTouch.pageY;

            var anchorHeight = 16;

            var delta = (touch.y2 - touch.y1) / anchorHeight | 0;

            var anchor = shortcutList[shortcutList.indexOf(touch.anchor) + delta];

            scrollTo(anchor);

            e.preventDefault();
            e.stopPropagation();

        });

        function scrollTo(anchor) {
            var maxScrollY = cityWrapper.clientHeight - cityScroller.clientHeight;

            var y = Math.min(0, Math.max(maxScrollY, anchorMap[anchor]));

            if (typeof y !== 'undefined') {
                scroll.scrollTo(0, y);
            }
        }
        }

        initCities();
        bindEvent();
         $(".shortcut").css("top","60px");
        
    }
}

// 依赖的数组值
var cityData = [
	{
        name: "★周边城市",
		cities: [
			{
				name: "常州市",
				tags: "CHANGZHOU,常州市",
				cityid: 1
			},
			{
				name: "无锡市",
				tags: "WUXI,无锡市",
				cityid: 4
			},
			{
				name: "苏州市",
				tags: "SUZHOU,苏州市",
				cityid: 2
			},
			{
				name: "上海市",
				tags: "SHANGHAI,上海市",
				cityid: 3
			},
			{
				name: "南京市",
				tags: "NANJING,南京市",
				cityid: 6
			}
		]
	},
	{
		name: "A",
		cities: [
			{
				name: "鞍山市",
				tags: "ANSHAN,鞍山市",
				cityid: 64
			},
			{
				name: "安庆市",
				tags: "ANQING,安庆市",
				cityid: 149
			},
			{
				name: "安阳市",
				tags: "ANYANG,安阳市",
				cityid: 174
			},
			{
				name: "阿拉善盟",
				tags: "ALASHANMENG,阿拉善盟",
				cityid: 202
			},
			{
				name: "阿坝州",
				tags: "ABAZHOU,阿坝州",
				cityid: 290
			},
			{
				name: "安顺市",
				tags: "ANSHUN,安顺市",
				cityid: 294
			},
			{
				name: "阿里地区",
				tags: "ALIDIQU,阿里地区",
				cityid: 316
			},
			{
				name: "安康市",
				tags: "ANKANG,安康市",
				cityid: 320
			},
			{
				name: "阿克苏地区",
				tags: "AKESUDIQU,阿克苏地区",
				cityid: 348
			},
			{
				name: "阿勒泰地区",
				tags: "ALETAIDIQU,阿勒泰地区",
				cityid: 355
			},
			{
				name: "阿拉尔市",
				tags: "ALAER,阿拉尔市",
				cityid: 356
			}
		]
	},
	{
		name: "B",
		cities: [
			{
				name: "北京市",
				tags: "BEIJING,北京市",
				cityid: 1
			},
			{
				name: "保定市",
				tags: "BAODING,保定市",
				cityid: 62
			},
			{
				name: "包头市",
				tags: "BAOTOU,包头市",
				cityid: 63
			},
			{
				name: "本溪市",
				tags: "BENXI,本溪市",
				cityid: 77
			},
			{
				name: "蚌埠市",
				tags: "BANGBU,蚌埠市",
				cityid: 100
			},
			{
				name: "北海市",
				tags: "BEIHAI,北海市",
				cityid: 161
			},
			{
				name: "滨州市",
				tags: "BINZHOU,滨州市",
				cityid: 166
			},
			{
				name: "宝鸡市",
				tags: "BAOJI,宝鸡市",
				cityid: 170
			},
			{
				name: "亳州市",
				tags: "BOZHOU,亳州市",
				cityid: 189
			},
			{
				name: "巴彦淖尔市",
				tags: "BAYANNAOER,巴彦淖尔市",
				cityid: 199
			},
			{
				name: "白山市",
				tags: "BAISHAN,白山市",
				cityid: 208
			},
			{
				name: "白城市",
				tags: "BAICHENG,白城市",
				cityid: 210
			},
			{
				name: "百色市",
				tags: "BAISE,百色市",
				cityid: 263
			},
			{
				name: "白沙黎族自治县",
				tags: "BAISHALIZUZIZHIXIAN,白沙黎族自治县",
				cityid: 278
			},
			{
				name: "巴中市",
				tags: "BAZHONG,巴中市",
				cityid: 288
			},
			{
				name: "毕节地区",
				tags: "BIJIEDIQU,毕节地区",
				cityid: 296
			},
			{
				name: "保山市",
				tags: "BAOSHAN,保山市",
				cityid: 301
			},
			{
				name: "白银市",
				tags: "BAIYIN,白银市",
				cityid: 323
			},
			{
				name: "巴音郭楞州",
				tags: "BAYINGUOLENGZHOU,巴音郭楞州",
				cityid: 350
			},
			{
				name: "博尔塔拉州",
				tags: "BOERTALAZHOU,博尔塔拉州",
				cityid: 352
			}
		]
	},
	{
		name: "C",
		cities: [
			{
				name: "成都市",
				tags: "CHENGDU,成都市",
				cityid: 17
			},
			{
				name: "重庆市",
				tags: "CHONGQING,重庆市",
				cityid: 18
			},
			{
				name: "长沙市",
				tags: "CHANGSHA,长沙市",
				cityid: 24
			},
			{
				name: "长春市",
				tags: "CHANGCHUN,长春市",
				cityid: 25
			},
			{
				name: "",
				tags: "CHANGZHOU,常州市",
				cityid: 45
			},
			{
				name: "沧州市",
				tags: "CANGZHOU,沧州市",
				cityid: 59
			},
			{
				name: "承德市",
				tags: "CHENGDE,承德市",
				cityid: 72
			},
			{
				name: "常德市",
				tags: "CHANGDE,常德市",
				cityid: 106
			},
			{
				name: "郴州市",
				tags: "CHENZHOU,郴州市",
				cityid: 107
			},
			{
				name: "长治市",
				tags: "CHANGZHI,长治市",
				cityid: 127
			},
			{
				name: "滁州市",
				tags: "CHUZHOU,滁州市",
				cityid: 148
			},
			{
				name: "池州市",
				tags: "CHIZHOU,池州市",
				cityid: 187
			},
			{
				name: "赤峰市",
				tags: "CHIFENG,赤峰市",
				cityid: 196
			},
			{
				name: "巢湖市",
				tags: "CHAOHU,巢湖市",
				cityid: 204
			},
			{
				name: "朝阳市",
				tags: "CHAOYANG,朝阳市",
				cityid: 205
			},
			{
				name: "潮州市",
				tags: "CHAOZHOU,潮州市",
				cityid: 257
			},
			{
				name: "崇左市",
				tags: "CHONGZUO,崇左市",
				cityid: 267
			},
			{
				name: "澄迈县",
				tags: "CHENGMAIXIAN,澄迈县",
				cityid: 274
			},
			{
				name: "楚雄州",
				tags: "CHUXIONGZHOU,楚雄州",
				cityid: 308
			},
			{
				name: "昌都地区",
				tags: "CHANGDUDIQU,昌都地区",
				cityid: 313
			},
			{
				name: "昌吉州",
				tags: "CHANGJIZHOU,昌吉州",
				cityid: 351
			}
		]
	},
	{
		name: "D",
		cities: [
			{
				name: "大连市",
				tags: "DALIAN,大连市",
				cityid: 14
			},
			{
				name: "东莞市",
				tags: "DONGWAN,东莞市",
				cityid: 21
			},
			{
				name: "大庆市",
				tags: "DAQING,大庆市",
				cityid: 48
			},
			{
				name: "东营市",
				tags: "DONGYING,东营市",
				cityid: 73
			},
			{
				name: "德州市",
				tags: "DEZHOU,德州市",
				cityid: 120
			},
			{
				name: "大同市",
				tags: "DATONG,大同市",
				cityid: 125
			},
			{
				name: "大理州",
				tags: "DALIZHOU,大理州",
				cityid: 136
			},
			{
				name: "丹东市",
				tags: "DANDONG,丹东市",
				cityid: 163
			},
			{
				name: "德阳市",
				tags: "DEYANG,德阳市",
				cityid: 173
			},
			{
				name: "大兴安岭地区",
				tags: "DAXINGANLINGDIQU,大兴安岭地区",
				cityid: 218
			},
			{
				name: "儋州市",
				tags: "DANZHOU,儋州市",
				cityid: 270
			},
			{
				name: "东方市",
				tags: "DONGFANG,东方市",
				cityid: 273
			},
			{
				name: "定安县",
				tags: "DINGANXIAN,定安县",
				cityid: 275
			},
			{
				name: "达州市",
				tags: "DAZHOU,达州市",
				cityid: 285
			},
			{
				name: "德宏州",
				tags: "DEHONGZHOU,德宏州",
				cityid: 309
			},
			{
				name: "迪庆州",
				tags: "DIQINGZHOU,迪庆州",
				cityid: 311
			},
			{
				name: "定西市",
				tags: "DINGXI,定西市",
				cityid: 330
			}
		]
	},
	{
		name: "E",
		cities: [
			{
				name: "鄂尔多斯市",
				tags: "EERDUOSI,鄂尔多斯市",
				cityid: 43
			},
			{
				name: "鄂州市",
				tags: "EZHOU,鄂州市",
				cityid: 230
			},
			{
				name: "恩施州",
				tags: "ENSHIZHOU,恩施州",
				cityid: 235
			}
		]
	},
	{
		name: "F",
		cities: [
			{
				name: "福州市",
				tags: "FUZHOU,福州市",
				cityid: 34
			},
			{
				name: "佛山市",
				tags: "FOSHAN,佛山市",
				cityid: 36
			},
			{
				name: "抚顺市",
				tags: "FUSHUN,抚顺市",
				cityid: 66
			},
			{
				name: "阜新市",
				tags: "FUXIN,阜新市",
				cityid: 164
			},
			{
				name: "阜阳市",
				tags: "FUYANG,阜阳市",
				cityid: 188
			},
			{
				name: "抚州市",
				tags: "FUZHOU,抚州市",
				cityid: 223
			},
			{
				name: "防城港市",
				tags: "FANGCHENGGANG,防城港市",
				cityid: 260
			}
		]
	},
	{
		name: "G",
		cities: [
			{
				name: "广州市",
				tags: "GUANGZHOU,广州市",
				cityid: 3
			},
			{
				name: "贵阳市",
				tags: "GUIYANG,贵阳市",
				cityid: 82
			},
			{
				name: "赣州市",
				tags: "GANZHOU,赣州市",
				cityid: 102
			},
			{
				name: "桂林市",
				tags: "GUILIN,桂林市",
				cityid: 135
			},
			{
				name: "贵港市",
				tags: "GUIGANG,贵港市",
				cityid: 262
			},
			{
				name: "广元市",
				tags: "GUANGYUAN,广元市",
				cityid: 280
			},
			{
				name: "广安市",
				tags: "GUANGAN,广安市",
				cityid: 284
			},
			{
				name: "甘孜州",
				tags: "GANZIZHOU,甘孜州",
				cityid: 291
			},
			{
				name: "甘南州",
				tags: "GANNANZHOU,甘南州",
				cityid: 333
			},
			{
				name: "固原市",
				tags: "GUYUAN,固原市",
				cityid: 336
			},
			{
				name: "果洛州",
				tags: "GUOLUOZHOU,果洛州",
				cityid: 342
			}
		]
	},
	{
		name: "H",
		cities: [
			{
				name: "杭州市",
				tags: "HANGZHOU,杭州市",
				cityid: 5
			},
			{
				name: "合肥市",
				tags: "HEFEI,合肥市",
				cityid: 15
			},
			{
				name: "哈尔滨市",
				tags: "HAERBIN,哈尔滨市",
				cityid: 16
			},
			{
				name: "呼和浩特市",
				tags: "HUHEHAOTE,呼和浩特市",
				cityid: 41
			},
			{
				name: "邯郸市",
				tags: "HANDAN,邯郸市",
				cityid: 60
			},
			{
				name: "葫芦岛市",
				tags: "HULUDAO,葫芦岛市",
				cityid: 70
			},
			{
				name: "衡水市",
				tags: "HENGSHUI,衡水市",
				cityid: 80
			},
			{
				name: "海口市",
				tags: "HAIKOU,海口市",
				cityid: 83
			},
			{
				name: "湖州市",
				tags: "HUZHOU,湖州市",
				cityid: 90
			},
			{
				name: "淮安市",
				tags: "HUAIAN,淮安市",
				cityid: 97
			},
			{
				name: "衡阳市",
				tags: "HENGYANG,衡阳市",
				cityid: 105
			},
			{
				name: "汉中市",
				tags: "HANZHONG,汉中市",
				cityid: 115
			},
			{
				name: "菏泽市",
				tags: "HEZE,菏泽市",
				cityid: 124
			},
			{
				name: "惠州市",
				tags: "HUIZHOU,惠州市",
				cityid: 133
			},
			{
				name: "黄山市",
				tags: "HUANGSHAN,黄山市",
				cityid: 141
			},
			{
				name: "淮南市",
				tags: "HUAINAN,淮南市",
				cityid: 150
			},
			{
				name: "淮北市",
				tags: "HUAIBEI,淮北市",
				cityid: 183
			},
			{
				name: "呼伦贝尔市",
				tags: "HULUNBEIER,呼伦贝尔市",
				cityid: 198
			},
			{
				name: "鹤岗市",
				tags: "HEGANG,鹤岗市",
				cityid: 212
			},
			{
				name: "黑河市",
				tags: "HEIHE,黑河市",
				cityid: 217
			},
			{
				name: "黄石市",
				tags: "HUANGSHI,黄石市",
				cityid: 227
			},
			{
				name: "黄冈市",
				tags: "HUANGGANG,黄冈市",
				cityid: 232
			},
			{
				name: "怀化市",
				tags: "HUAIHUA,怀化市",
				cityid: 244
			},
			{
				name: "鹤壁市",
				tags: "HEBI,鹤壁市",
				cityid: 247
			},
			{
				name: "河源市",
				tags: "HEYUAN,河源市",
				cityid: 254
			},
			{
				name: "贺州市",
				tags: "HEZHOU,贺州市",
				cityid: 264
			},
			{
				name: "河池市",
				tags: "HECHI,河池市",
				cityid: 265
			},
			{
				name: "红河州",
				tags: "HONGHEZHOU,红河州",
				cityid: 306
			},
			{
				name: "海东地区",
				tags: "HAIDONGDIQU,海东地区",
				cityid: 338
			},
			{
				name: "海北州",
				tags: "HAIBEIZHOU,海北州",
				cityid: 339
			},
			{
				name: "黄南州",
				tags: "HUANGNANZHOU,黄南州",
				cityid: 340
			},
			{
				name: "海南州",
				tags: "HAINANZHOU,海南州",
				cityid: 341
			},
			{
				name: "海西州",
				tags: "HAIXIZHOU,海西州",
				cityid: 344
			},
			{
				name: "哈密地区",
				tags: "HAMIDIQU,哈密地区",
				cityid: 346
			},
			{
				name: "和田地区",
				tags: "HETIANDIQU,和田地区",
				cityid: 347
			}
		]
	},
	{
		name: "J",
		cities: [
			{
				name: "济南市",
				tags: "JINAN,济南市",
				cityid: 12
			},
			{
				name: "锦州市",
				tags: "JINZHOU,锦州市",
				cityid: 68
			},
			{
				name: "晋中市",
				tags: "JINZHONG,晋中市",
				cityid: 71
			},
			{
				name: "吉林市",
				tags: "JILIN,吉林市",
				cityid: 74
			},
			{
				name: "济宁市",
				tags: "JINING,济宁市",
				cityid: 79
			},
			{
				name: "金华市",
				tags: "JINHUA,金华市",
				cityid: 86
			},
			{
				name: "嘉兴市",
				tags: "JIAXING,嘉兴市",
				cityid: 88
			},
			{
				name: "九江市",
				tags: "JIUJIANG,九江市",
				cityid: 101
			},
			{
				name: "荆州市",
				tags: "JINGZHOU,荆州市",
				cityid: 109
			},
			{
				name: "景德镇市",
				tags: "JINGDEZHEN,景德镇市",
				cityid: 151
			},
			{
				name: "江门市",
				tags: "JIANGMEN,江门市",
				cityid: 153
			},
			{
				name: "揭阳市",
				tags: "JIEYANG,揭阳市",
				cityid: 154
			},
			{
				name: "焦作市",
				tags: "JIAOZUO,焦作市",
				cityid: 175
			},
			{
				name: "晋城市",
				tags: "JINCHENG,晋城市",
				cityid: 190
			},
			{
				name: "鸡西市",
				tags: "JIXI,鸡西市",
				cityid: 211
			},
			{
				name: "佳木斯市",
				tags: "JIAMUSI,佳木斯市",
				cityid: 215
			},
			{
				name: "吉安市",
				tags: "JIAN,吉安市",
				cityid: 221
			},
			{
				name: "荆门市",
				tags: "JINGMEN,荆门市",
				cityid: 229
			},
			{
				name: "济源市",
				tags: "JIYUAN,济源市",
				cityid: 252
			},
			{
				name: "金昌市",
				tags: "JINCHANG,金昌市",
				cityid: 322
			},
			{
				name: "嘉峪关市",
				tags: "JIAYUGUAN,嘉峪关市",
				cityid: 324
			},
			{
				name: "酒泉市",
				tags: "JIUQUAN,酒泉市",
				cityid: 328
			}
		]
	},
	{
		name: "K",
		cities: [
			{
				name: "昆明市",
				tags: "KUNMING,昆明市",
				cityid: 19
			},
			{
				name: "开封市",
				tags: "KAIFENG,开封市",
				cityid: 110
			},
			{
				name: "喀什地区",
				tags: "KASHIDIQU,喀什地区",
				cityid: 179
			},
			{
				name: "克拉玛依市",
				tags: "KELAMAYI,克拉玛依市",
				cityid: 180
			},
			{
				name: "克孜勒苏柯州",
				tags: "KEZILESUKEZHOU,克孜勒苏柯州",
				cityid: 349
			}
		]
	},
	{
		name: "L",
		cities: [
			{
				name: "洛阳市",
				tags: "LUOYANG,洛阳市",
				cityid: 27
			},
			{
				name: "兰州市",
				tags: "LANZHOU,兰州市",
				cityid: 30
			},
			{
				name: "廊坊市",
				tags: "LANGFANG,廊坊市",
				cityid: 46
			},
			{
				name: "临沂市",
				tags: "LINYI,临沂市",
				cityid: 58
			},
			{
				name: "辽阳市",
				tags: "LIAOYANG,辽阳市",
				cityid: 75
			},
			{
				name: "连云港市",
				tags: "LIANYUNGANG,连云港市",
				cityid: 96
			},
			{
				name: "泸州市",
				tags: "LUZHOU,泸州市",
				cityid: 117
			},
			{
				name: "莱芜市",
				tags: "LAIWU,莱芜市",
				cityid: 122
			},
			{
				name: "聊城市",
				tags: "LIAOCHENG,聊城市",
				cityid: 123
			},
			{
				name: "柳州市",
				tags: "LIUZHOU,柳州市",
				cityid: 134
			},
			{
				name: "丽江市",
				tags: "LIJIANG,丽江市",
				cityid: 137
			},
			{
				name: "丽水市",
				tags: "LISHUI,丽水市",
				cityid: 139
			},
			{
				name: "拉萨市",
				tags: "LASA,拉萨市",
				cityid: 178
			},
			{
				name: "六安市",
				tags: "LIUAN,六安市",
				cityid: 186
			},
			{
				name: "临汾市",
				tags: "LINFEN,临汾市",
				cityid: 193
			},
			{
				name: "吕梁市",
				tags: "LVLIANG,吕梁市",
				cityid: 194
			},
			{
				name: "辽源市",
				tags: "LIAOYUAN,辽源市",
				cityid: 206
			},
			{
				name: "龙岩市",
				tags: "LONGYAN,龙岩市",
				cityid: 226
			},
			{
				name: "娄底市",
				tags: "LOUDI,娄底市",
				cityid: 245
			},
			{
				name: "漯河市",
				tags: "LUOHE,漯河市",
				cityid: 248
			},
			{
				name: "来宾市",
				tags: "LAIBIN,来宾市",
				cityid: 266
			},
			{
				name: "临高县",
				tags: "LINGAOXIAN,临高县",
				cityid: 277
			},
			{
				name: "乐山市",
				tags: "LESHAN,乐山市",
				cityid: 283
			},
			{
				name: "凉山州",
				tags: "LIANGSHANZHOU,凉山州",
				cityid: 292
			},
			{
				name: "六盘水市",
				tags: "LIUPANSHUI,六盘水市",
				cityid: 293
			},
			{
				name: "临沧市",
				tags: "LINCANG,临沧市",
				cityid: 304
			},
			{
				name: "林芝地区",
				tags: "LINZHIDIQU,林芝地区",
				cityid: 317
			},
			{
				name: "陇南市",
				tags: "LONGNAN,陇南市",
				cityid: 331
			},
			{
				name: "临夏州",
				tags: "LINXIAZHOU,临夏州",
				cityid: 332
			}
		]
	},
	{
		name: "M",
		cities: [
			{
				name: "绵阳市",
				tags: "MIANYANG,绵阳市",
				cityid: 50
			},
			{
				name: "马鞍山市",
				tags: "MAANSHAN,马鞍山市",
				cityid: 99
			},
			{
				name: "牡丹江市",
				tags: "MUDANJIANG,牡丹江市",
				cityid: 129
			},
			{
				name: "茂名市",
				tags: "MAOMING,茂名市",
				cityid: 155
			},
			{
				name: "梅州市",
				tags: "MEIZHOU,梅州市",
				cityid: 156
			},
			{
				name: "眉山市",
				tags: "MEISHAN,眉山市",
				cityid: 286
			}
		]
	},
	{
		name: "N",
		cities: [
			{
				name: "南京市",
				tags: "NANJING,南京市",
				cityid: 11
			},
			{
				name: "宁波市",
				tags: "NINGBO,宁波市",
				cityid: 20
			},
			{
				name: "南宁市",
				tags: "NANNING,南宁市",
				cityid: 33
			},
			{
				name: "南昌市",
				tags: "NANCHANG,南昌市",
				cityid: 38
			},
			{
				name: "南充市",
				tags: "NANCHONG,南充市",
				cityid: 53
			},
			{
				name: "南通市",
				tags: "NANTONG,南通市",
				cityid: 92
			},
			{
				name: "南阳市",
				tags: "NANYANG,南阳市",
				cityid: 113
			},
			{
				name: "宁德市",
				tags: "NINGDE,宁德市",
				cityid: 144
			},
			{
				name: "南平市",
				tags: "NANPING,南平市",
				cityid: 145
			},
			{
				name: "内江市",
				tags: "NEIJIANG,内江市",
				cityid: 282
			},
			{
				name: "怒江州",
				tags: "NUJIANGZHOU,怒江州",
				cityid: 310
			},
			{
				name: "那曲地区",
				tags: "NAQUDIQU,那曲地区",
				cityid: 312
			}
		]
	},
	{
		name: "P",
		cities: [
			{
				name: "平顶山市",
				tags: "PINGDINGSHAN,平顶山市",
				cityid: 103
			},
			{
				name: "攀枝花市",
				tags: "PANZHIHUA,攀枝花市",
				cityid: 119
			},
			{
				name: "莆田市",
				tags: "PUTIAN,莆田市",
				cityid: 143
			},
			{
				name: "盘锦市",
				tags: "PANJIN,盘锦市",
				cityid: 165
			},
			{
				name: "濮阳市",
				tags: "PUYANG,濮阳市",
				cityid: 176
			},
			{
				name: "萍乡市",
				tags: "PINGXIANG,萍乡市",
				cityid: 219
			},
			{
				name: "普洱市",
				tags: "PUER,普洱市",
				cityid: 303
			},
			{
				name: "平凉市",
				tags: "PINGLIANG,平凉市",
				cityid: 327
			}
		]
	},
	{
		name: "Q",
		cities: [
			{
				name: "青岛市",
				tags: "QINGDAO,青岛市",
				cityid: 13
			},
			{
				name: "泉州市",
				tags: "QUANZHOU,泉州市",
				cityid: 35
			},
			{
				name: "秦皇岛市",
				tags: "QINHUANGDAO,秦皇岛市",
				cityid: 61
			},
			{
				name: "齐齐哈尔市",
				tags: "QIQIHAER,齐齐哈尔市",
				cityid: 65
			},
			{
				name: "曲靖市",
				tags: "QUJING,曲靖市",
				cityid: 138
			},
			{
				name: "衢州市",
				tags: "QUZHOU,衢州市",
				cityid: 140
			},
			{
				name: "清远市",
				tags: "QINGYUAN,清远市",
				cityid: 157
			},
			{
				name: "七台河市",
				tags: "QITAIHE,七台河市",
				cityid: 216
			},
			{
				name: "潜江市",
				tags: "QIANJIANG,潜江市",
				cityid: 238
			},
			{
				name: "钦州市",
				tags: "QINZHOU,钦州市",
				cityid: 261
			},
			{
				name: "琼海市",
				tags: "QIONGHAI,琼海市",
				cityid: 269
			},
			{
				name: "黔西南州",
				tags: "QIANXINANZHOU,黔西南州",
				cityid: 297
			},
			{
				name: "黔东南州",
				tags: "QIANDONGNANZHOU,黔东南州",
				cityid: 298
			},
			{
				name: "黔南州",
				tags: "QIANNANZHOU,黔南州",
				cityid: 299
			},
			{
				name: "庆阳市",
				tags: "QINGYANG,庆阳市",
				cityid: 329
			}
		]
	},
	{
		name: "R",
		cities: [
			{
				name: "日照市",
				tags: "RIZHAO,日照市",
				cityid: 167
			},
			{
				name: "日喀则地区",
				tags: "RIKAZEDIQU,日喀则地区",
				cityid: 315
			}
		]
	},
	{
		name: "S",
		cities: [
			{
				name: "深圳市",
				tags: "SHENZHEN,深圳市",
				cityid: 2
			},
			{
				name: "上海市",
				tags: "SHANGHAI,上海市",
				cityid: 4
			},
			{
				name: "沈阳市",
				tags: "SHENYANG,沈阳市",
				cityid: 8
			},
			{
				name: "石家庄市",
				tags: "SHIJIAZHUANG,石家庄市",
				cityid: 22
			},
			{
				name: "苏州市",
				tags: "SUZHOU,苏州市",
				cityid: 23
			},
			{
				name: "三亚市",
				tags: "SANYA,三亚市",
				cityid: 37
			},
			{
				name: "绍兴市",
				tags: "SHAOXING,绍兴市",
				cityid: 89
			},
			{
				name: "绥化市",
				tags: "SUIHUA,绥化市",
				cityid: 128
			},
			{
				name: "四平市",
				tags: "SIPING,四平市",
				cityid: 130
			},
			{
				name: "宿迁市",
				tags: "SUQIAN,宿迁市",
				cityid: 147
			},
			{
				name: "汕头市",
				tags: "SHANTOU,汕头市",
				cityid: 158
			},
			{
				name: "商丘市",
				tags: "SHANGQIU,商丘市",
				cityid: 177
			},
			{
				name: "石河子市",
				tags: "SHIHEZI,石河子市",
				cityid: 181
			},
			{
				name: "宿州市",
				tags: "SUZHOU,宿州市",
				cityid: 185
			},
			{
				name: "朔州市",
				tags: "SHUOZHOU,朔州市",
				cityid: 191
			},
			{
				name: "松原市",
				tags: "SONGYUAN,松原市",
				cityid: 209
			},
			{
				name: "双鸭山市",
				tags: "SHUANGYASHAN,双鸭山市",
				cityid: 213
			},
			{
				name: "上饶市",
				tags: "SHANGRAO,上饶市",
				cityid: 224
			},
			{
				name: "三明市",
				tags: "SANMING,三明市",
				cityid: 225
			},
			{
				name: "十堰市",
				tags: "SHIYAN,十堰市",
				cityid: 228
			},
			{
				name: "随州市",
				tags: "SUIZHOU,随州市",
				cityid: 234
			},
			{
				name: "神农架林区",
				tags: "SHENNONGJIALINQU,神农架林区",
				cityid: 239
			},
			{
				name: "邵阳市",
				tags: "SHAOYANG,邵阳市",
				cityid: 240
			},
			{
				name: "三门峡市",
				tags: "SANMENXIA,三门峡市",
				cityid: 249
			},
			{
				name: "韶关市",
				tags: "SHAOGUAN,韶关市",
				cityid: 253
			},
			{
				name: "汕尾市",
				tags: "SHANWEI,汕尾市",
				cityid: 255
			},
			{
				name: "遂宁市",
				tags: "SUINING,遂宁市",
				cityid: 281
			},
			{
				name: "山南地区",
				tags: "SHANNANDIQU,山南地区",
				cityid: 314
			},
			{
				name: "商洛市",
				tags: "SHANGLUO,商洛市",
				cityid: 321
			},
			{
				name: "石嘴山市",
				tags: "SHIZUISHAN,石嘴山市",
				cityid: 334
			}
		]
	},
	{
		name: "T",
		cities: [
			{
				name: "天津市",
				tags: "TIANJIN,天津市",
				cityid: 7
			},
			{
				name: "太原市",
				tags: "TAIYUAN,太原市",
				cityid: 26
			},
			{
				name: "唐山市",
				tags: "TANGSHAN,唐山市",
				cityid: 40
			},
			{
				name: "铁岭市",
				tags: "TIELING,铁岭市",
				cityid: 69
			},
			{
				name: "台州市",
				tags: "TAIZHOU,台州市",
				cityid: 87
			},
			{
				name: "泰州市",
				tags: "TAIZHOU,泰州市",
				cityid: 95
			},
			{
				name: "泰安市",
				tags: "TAIAN,泰安市",
				cityid: 121
			},
			{
				name: "天水市",
				tags: "TIANSHUI,天水市",
				cityid: 169
			},
			{
				name: "铜陵市",
				tags: "TONGLING,铜陵市",
				cityid: 184
			},
			{
				name: "通辽市",
				tags: "TONGLIAO,通辽市",
				cityid: 197
			},
			{
				name: "通化市",
				tags: "TONGHUA,通化市",
				cityid: 207
			},
			{
				name: "天门市",
				tags: "TIANMEN,天门市",
				cityid: 237
			},
			{
				name: "屯昌县",
				tags: "TUNCHANGXIAN,屯昌县",
				cityid: 276
			},
			{
				name: "铜仁地区",
				tags: "TONGRENDIQU,铜仁地区",
				cityid: 295
			},
			{
				name: "铜川市",
				tags: "TONGCHUAN,铜川市",
				cityid: 318
			},
			{
				name: "吐鲁番地区",
				tags: "TULUFANDIQU,吐鲁番地区",
				cityid: 345
			},
			{
				name: "塔城地区",
				tags: "TACHENGDIQU,塔城地区",
				cityid: 354
			}
		]
	},
	{
		name: "W",
		cities: [
			{
				name: "武汉市",
				tags: "WUHAN,武汉市",
				cityid: 6
			},
			{
				name: "威海市",
				tags: "WEIHAI,威海市",
				cityid: 42
			},
			{
				name: "无锡市",
				tags: "WUXI,无锡市",
				cityid: 47
			},
			{
				name: "乌鲁木齐市",
				tags: "WULUMUQI,乌鲁木齐市",
				cityid: 52
			},
			{
				name: "潍坊市",
				tags: "WEIFANG,潍坊市",
				cityid: 81
			},
			{
				name: "温州市",
				tags: "WENZHOU,温州市",
				cityid: 85
			},
			{
				name: "芜湖市",
				tags: "WUHU,芜湖市",
				cityid: 98
			},
			{
				name: "乌海市",
				tags: "WUHAI,乌海市",
				cityid: 195
			},
			{
				name: "乌兰察布市",
				tags: "WULANCHABU,乌兰察布市",
				cityid: 200
			},
			{
				name: "梧州市",
				tags: "WUZHOU,梧州市",
				cityid: 259
			},
			{
				name: "五指山市",
				tags: "WUZHISHAN,五指山市",
				cityid: 268
			},
			{
				name: "文昌市",
				tags: "WENCHANG,文昌市",
				cityid: 271
			},
			{
				name: "万宁市",
				tags: "WANNING,万宁市",
				cityid: 272
			},
			{
				name: "文山州",
				tags: "WENSHANZHOU,文山州",
				cityid: 305
			},
			{
				name: "渭南市",
				tags: "WEINAN,渭南市",
				cityid: 319
			},
			{
				name: "武威市",
				tags: "WUWEI,武威市",
				cityid: 325
			},
			{
				name: "吴忠市",
				tags: "WUZHONG,吴忠市",
				cityid: 335
			}
		]
	},
	{
		name: "X",
		cities: [
			{
				name: "西安市",
				tags: "XIAN,西安市",
				cityid: 10
			},
			{
				name: "西宁市",
				tags: "XINING,西宁市",
				cityid: 28
			},
			{
				name: "厦门市",
				tags: "XIAMEN,厦门市",
				cityid: 32
			},
			{
				name: "徐州市",
				tags: "XUZHOU,徐州市",
				cityid: 39
			},
			{
				name: "湘潭市",
				tags: "XIANGTAN,湘潭市",
				cityid: 55
			},
			{
				name: "邢台市",
				tags: "XINGTAI,邢台市",
				cityid: 67
			},
			{
				name: "襄阳市",
				tags: "XIANGYANG,襄阳市",
				cityid: 108
			},
			{
				name: "新乡市",
				tags: "XINXIANG,新乡市",
				cityid: 111
			},
			{
				name: "许昌市",
				tags: "XUCHANG,许昌市",
				cityid: 112
			},
			{
				name: "咸阳市",
				tags: "XIANYANG,咸阳市",
				cityid: 116
			},
			{
				name: "新余市",
				tags: "XINYU,新余市",
				cityid: 152
			},
			{
				name: "宣城市",
				tags: "XUANCHENG,宣城市",
				cityid: 182
			},
			{
				name: "忻州市",
				tags: "XINZHOU,忻州市",
				cityid: 192
			},
			{
				name: "锡林郭勒盟",
				tags: "XILINGUOLEMENG,锡林郭勒盟",
				cityid: 201
			},
			{
				name: "兴安盟",
				tags: "XINGANMENG,兴安盟",
				cityid: 203
			},
			{
				name: "孝感市",
				tags: "XIAOGAN,孝感市",
				cityid: 231
			},
			{
				name: "咸宁市",
				tags: "XIANNING,咸宁市",
				cityid: 233
			},
			{
				name: "仙桃市",
				tags: "XIANTAO,仙桃市",
				cityid: 236
			},
			{
				name: "湘西州",
				tags: "XIANGXIZHOU,湘西州",
				cityid: 246
			},
			{
				name: "信阳市",
				tags: "XINYANG,信阳市",
				cityid: 250
			},
			{
				name: "西双版纳州",
				tags: "XISHUANGBANNAZHOU,西双版纳州",
				cityid: 307
			}
		]
	},
	{
		name: "Y",
		cities: [
			{
				name: "烟台市",
				tags: "YANTAI,烟台市",
				cityid: 29
			},
			{
				name: "银川市",
				tags: "YINCHUAN,银川市",
				cityid: 49
			},
			{
				name: "宜昌市",
				tags: "YICHANG,宜昌市",
				cityid: 51
			},
			{
				name: "岳阳市",
				tags: "YUEYANG,岳阳市",
				cityid: 56
			},
			{
				name: "营口市",
				tags: "YINGKOU,营口市",
				cityid: 76
			},
			{
				name: "扬州市",
				tags: "YANGZHOU,扬州市",
				cityid: 91
			},
			{
				name: "盐城市",
				tags: "YANCHENG,盐城市",
				cityid: 94
			},
			{
				name: "运城市",
				tags: "YUNCHENG,运城市",
				cityid: 104
			},
			{
				name: "宜宾市",
				tags: "YIBIN,宜宾市",
				cityid: 118
			},
			{
				name: "阳泉市",
				tags: "YANGQUAN,阳泉市",
				cityid: 126
			},
			{
				name: "延吉市",
				tags: "YANJI,延吉市",
				cityid: 131
			},
			{
				name: "玉林市",
				tags: "YULIN,玉林市",
				cityid: 162
			},
			{
				name: "延安市",
				tags: "YANAN,延安市",
				cityid: 171
			},
			{
				name: "榆林市",
				tags: "YULIN,榆林市",
				cityid: 172
			},
			{
				name: "伊春市",
				tags: "YICHUN,伊春市",
				cityid: 214
			},
			{
				name: "鹰潭市",
				tags: "YINGTAN,鹰潭市",
				cityid: 220
			},
			{
				name: "宜春市",
				tags: "YICHUN,宜春市",
				cityid: 222
			},
			{
				name: "益阳市",
				tags: "YIYANG,益阳市",
				cityid: 242
			},
			{
				name: "永州市",
				tags: "YONGZHOU,永州市",
				cityid: 243
			},
			{
				name: "阳江市",
				tags: "YANGJIANG,阳江市",
				cityid: 256
			},
			{
				name: "云浮市",
				tags: "YUNFU,云浮市",
				cityid: 258
			},
			{
				name: "雅安市",
				tags: "YAAN,雅安市",
				cityid: 287
			},
			{
				name: "玉溪市",
				tags: "YUXI,玉溪市",
				cityid: 300
			},
			{
				name: "玉树州",
				tags: "YUSHUZHOU,玉树州",
				cityid: 343
			},
			{
				name: "伊犁州",
				tags: "YILIZHOU,伊犁州",
				cityid: 353
			}
		]
	},
	{
		name: "Z",
		cities: [
			{
				name: "郑州市",
				tags: "ZHENGZHOU,郑州市",
				cityid: 9
			},
			{
				name: "遵义市",
				tags: "ZUNYI,遵义市",
				cityid: 44
			},
			{
				name: "株洲市",
				tags: "ZHUZHOU,株洲市",
				cityid: 54
			},
			{
				name: "淄博市",
				tags: "ZIBO,淄博市",
				cityid: 57
			},
			{
				name: "张家口市",
				tags: "ZHANGJIAKOU,张家口市",
				cityid: 78
			},
			{
				name: "珠海市",
				tags: "ZHUHAI,珠海市",
				cityid: 84
			},
			{
				name: "镇江市",
				tags: "ZHENJIANG,镇江市",
				cityid: 93
			},
			{
				name: "周口市",
				tags: "ZHOUKOU,周口市",
				cityid: 114
			},
			{
				name: "中山市",
				tags: "ZHONGSHAN,中山市",
				cityid: 132
			},
			{
				name: "漳州市",
				tags: "ZHANGZHOU,漳州市",
				cityid: 142
			},
			{
				name: "舟山市",
				tags: "ZHOUSHAN,舟山市",
				cityid: 146
			},
			{
				name: "湛江市",
				tags: "ZHANJIANG,湛江市",
				cityid: 159
			},
			{
				name: "肇庆市",
				tags: "ZHAOQING,肇庆市",
				cityid: 160
			},
			{
				name: "枣庄市",
				tags: "ZAOZHUANG,枣庄市",
				cityid: 168
			},
			{
				name: "张家界市",
				tags: "ZHANGJIAJIE,张家界市",
				cityid: 241
			},
			{
				name: "驻马店市",
				tags: "ZHUMADIAN,驻马店市",
				cityid: 251
			},
			{
				name: "自贡市",
				tags: "ZIGONG,自贡市",
				cityid: 279
			},
			{
				name: "资阳市",
				tags: "ZIYANG,资阳市",
				cityid: 289
			},
			{
				name: "昭通市",
				tags: "ZHAOTONG,昭通市",
				cityid: 302
			},
			{
				name: "张掖市",
				tags: "ZHANGYE,张掖市",
				cityid: 326
			},
			{
				name: "中卫市",
				tags: "ZHONGWEI,中卫市",
				cityid: 337
			}
		]
	}
];


    // url转成obj形式
    function urlToObj(str){
        　　var obj = {};
        　　var arr1 = str.split("?");
        　　var arr2 = arr1[1].split("&");
        　　for(var i=0 ; i < arr2.length; i++){
        　　　　var res = arr2[i].split("=");
        　　　　obj[res[0]] = res[1];
        　　}
        　　return obj;
    }

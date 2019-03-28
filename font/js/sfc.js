    var nowusermsg = {
        uid:"",         //用户id 
        openid:111,
        phone:111,   //用户的手机号 
        lyxx:""   // 存储需要用到路由的值 
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
            nowusermsg.uid = localCache("uid-kongbatong");
            nowusermsg.openid = localCache("openid-kongbatong");
            nowusermsg.phone = localCache("mobile-kongbatong");
            nowusermsg.openid = openid;
            console.log("openid",openid,nowusermsg.openid);
            if(null == nowusermsg.uid || "" == nowusermsg.uid) {
                register("//qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html");   //返回注册登录页面
            } else {
                // initData(nowusermsg.uid); //加载页面数据
                getPassenger();
                getVowner();
                hactive();
                formcontrol();
                getqbVowner();
                getqbPassenger();
                //  判断注册了没
                owneridentity.ownerajax();
                // 默认获取车主提现的数据
                balanceMycash.cashMoneyPage("","",0);
                // 车主提现信息
                balanceMycash.getMoneyRecord();

                // 主页的高度
                $(document.body).outerHeight($(window).outerHeight());      
                // 高度设置的问题
                // 全部行程页 车主页的高度 
                $(".runvownerNodedclxc").outerHeight($(document.body).outerHeight()-$(".header").outerHeight()-80);
                
                // 全部行程页 乘客页的高度 
                $(".runvownerNodedclxc").outerHeight($(document.body).outerHeight()-$(".header").outerHeight()-80);
              
                
            }
        },location.search);
        // 初始化时设置默认值 

        $(".dqcsval").text($(".xcspanleft").text());
        // 给滑动元素获取高度 
        
        // 乘客页的高度 
        $(".cylx").outerHeight($(document.body).outerHeight()-$(".passenger .select").outerHeight()-$(".header").outerHeight()-40);
        // 车主页的高度 
        // 这里容易出问题，最后在改改 
        $(".vonpondclxc").outerHeight($(document.body).outerHeight()-$(".passenger .select").outerHeight()-$(".header").outerHeight()-60);
        
        
        
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
            window.location.hash = "#register";
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
            $(".to-examine").append("<div class='to-examinets'>发送成功,请耐心等待审核....</div><img src='./font/fontjs/danger.gif'   class='to-examineimg'>");
            window.location.hash = "#examine";
        }else if(owneridentity.states===4){
            $(".to-examine").empty();
            $(".to-examine").append("<div class='to-examinets'> 注册失败,请重新注册....</div><img src='./font/fontjs/weep.gif'   class='to-examineimg'><a href='#register' class='btn btn-success to-examineicon'>点击重新注册</a>");
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
        $("#chufadi").bind("touch click",function(){
            inchufadi();
        })
        //这里的问题 
        $("#address").bind("touch click",function(){
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
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli2").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli2").text();
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli3").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli3").text();
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli4").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli4").text();
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli5").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli5").text();
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli6").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli6").text();
            xzlichuli(textval);  
        })
        $("#searchxincheng .xzli7").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli7").text();
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli8").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli8").text();
            xzlichuli(textval);
        })
        $("#searchxincheng .xzli9").bind("touch click",function(){  
            var  textval =  $("#searchxincheng .xzli9").text();
            xzlichuli(textval)    
        })
        $("#searchxincheng .xzli10").bind("touch click",function(){
            var  textval =  $("#searchxincheng .xzli10").text();
            xzlichuli(textval);
        })
    // 点击取消，页面跳为地图页面 
        $(".xcqx").bind("touch click",function(){
            window.location.hash = "#details?"+locationqjval.val;
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
            if(fabuxiaoxi.amoney === 0 ){   
                //没有到那一步，把目的地清空，出发地不清空。
                FreeRide.searchweizhi(1);
                window.location.hash = "#details?"+locationqjval.val;
            }else{
                window.location.hash = "#details?settle";
            }
        })
        // 点击跳到选择城市页
        $("#cgz-cfcity").bind("touch click",function(){
            FreeRide.clickdirection = 0;
            FreeRide.searchweizhi(0);
            window.location.hash = "#searchcity?cfd";
        })
        $("#cgz-mdcity").bind("touch click",function(){
            FreeRide.clickdirection = 1;
            FreeRide.searchweizhi(1);
             window.location.hash = "#searchcity?mdd";
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
            if( val === NaN || val === "" || val === undefined){
                var valone = 0 ;
                $(".pnum-ctnumber").text(valone);
                $(".pnum-ftinput").val(0)
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
            tramount.amont = (tramount.amont - 1).toFixed(1);
            // 我的计算金额会出现问题，最多让减到9元
            if(tramount.amont<9){
                showMessage1btn("不能低于9元,请重试","",0);
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
            if(tramount.amont<9){
                showMessage1btn("金额不能小于9元,请重试","",0);
            }else {
                fabuxiaoxi.amoney = tramount.amont;
                $(".completed-pprice").text(fabuxiaoxi.amoney);
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
            if( $(".paytan-txinput").val() ==="" || $(".paytan-txinput").val() ===undefined){
                tell = "提现金额不能为空";
            }else if ($("#paytan-txname").val() ==="" || $("#paytan-txname").val() ===undefined) {
                tell = "真实姓名不能为空";
            }else if ($("#paytan-txzh").val() ==="" || $("#paytan-txzh").val() ===undefined) {
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
        // 路由点击的问题
        $(".hvownermypay").bind("touch click",function(){
            // 大的颜色变化
            hashlycolorsz();
            $(".hpassenger").css("color", "#e39f7a");
            // 颜色的变化
            hvownermyrun();
            $(".hvownermypay").css("color","#5bc0de");

            paymentpage(nowusermsg.uid,"Passenger",1);
            $("#mypayidname").text("我的支付");
            // 乘客隐藏掉那个
            $("#balanceid").hide();
            
        })
        $(".hrucarpay").bind("touch click",function(){
            // 车主大的颜色变化
            hashlycolorsz();
            $(".hrun").css("color","#e39f7a");
            // 颜色变化
            hvownermyrun();
            $(".hrucarpay").css("color","#5bc0de");
            // 点击时车主时 调用渲染函数
            owenerCash.owerPage(1);
            $("#mypayidname").text("我的接单");
            // 车主就显示
            $("#balanceid").show();
            
        })
        // 页面刷新和跳转时也调用这个路由
            hashChange();
//  调用本地定位函数，定位很慢。
            sfclocation();
            
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
        personNum:0,     // 出发人数,默认为0。
        amoney:0,       // 钱数
        routeMileage:0,   // 路线里程
        locationnam:"",   // 定位地址名
    };

    // 存储乘客和车主的路由值 
    var locationqjval = {
        val:""   // 存储是车主还是乘客的路由值 
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
        moneydata:{},   // 钱数信息
        cashMoneyPage:function(typeval,dateRangeval,valzhi){ // 我的账单页的显示
            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/madeOwnerHasCashs/queryPageMadeOwnerAllCashs.asp",
                data:{
                   uid:nowusermsg.uid,
                   cur:1,
                   type:typeval,
                   datePange:dateRangeval
                },
                success:function(data){
                    if ( valzhi ==1 ){
                        cashMange_click.driverScreen();
                    }
                    console.log("获取车主金额信息",data);
                    cashmoneyfunction.type = "";
                    cashmoneyfunction.dateRange = "";
                    if(data.result>0){
                        $("#cashMoneyPage-nosj").hide();
                        $(".cashmongy-header").show();
                        $("#cashm-footer").show();
                        balanceMycash.cashMoneyPageData = data.obj.uCashs;
                        var casgdata = balanceMycash.cashMoneyPageData;
                        $("#cashm-footer").empty();
                        for(var i = 0; i<casgdata.length;i++){
                            $("#cashm-footer").append(sfcsj.cashMoneyPage);
                            balanceMycash.setMoneyRecord(i,casgdata[i]);
                        }
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
                                cashMoneyPageline();
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
                },
                error:function(data){
                    console.log("获取车主金额失败",data);
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
                    showMessage1btn("网络出错,获取我的提现总额失败","",0);
                }
            })
        },
        cashMoney:function(){   // 向后台发送提现api
            // price       	提现金额
            // cashAliRelName		提现账户对应真实姓名
            // cashAliAccount 		提现支付宝账户
            var price = $(".paytan-txinput").val().trim();
            var cashAliRelName = $("#paytan-txname").val().trim();
            var cashAliAccount = $("#paytan-txzh").val().trim();
            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/madeOwnerHasCashs/saveMadeOwnerHasCashs.asp",
                data:{
                    uid:nowusermsg.uid,
                    price:price,
                    cashAliRelName:cashAliRelName,
                    cashAliAccount:cashAliAccount
                },
                success:function(data){
                    console.log("提现成功",data);
                    if(data.result > 0 ){
                        showMessage1btn("发送成功,正在处理您的提现请求","",0);
                        $(".paytan").slideToggle();
                    }else {
                        $(".paytan").slideToggle();
                        showMessage1btn("网络出错,请重试","",0);
                    }
                    
                },
                error:function(data){
                    console.log("提现失败",data);
                    $(".paytan").slideToggle();
                    showMessage1btn("服务器出现故障,正在通知管理人员","",0);
                }
            })
        },
        setMoneyRecord:function(i,valdata){ // 添加车主提现记录
            // 日期
            $("#cashm-fttime").text(valdata.date);
            var cashm_fttime = "cashm-fttime"+i;
            $("#cashm-fttime").attr("id",cashm_fttime);
            // 金额
            $("#cashm-money").text(valdata.price);
            var cashm_money = "cashm-money"+i;
            $("#cashm-money").attr("id",cashm_money);
            // 总金额
            $("#cashm-nowmoney").text(valdata.total);
            var cashm_nowmoney = "cashm-nowmoney"+i;
            $("#cashm-nowmoney").attr("id",cashm_nowmoney);
            // 已提金额
            $("#cashm-cashmoney").text(valdata.cash);
            var cashm_cashmoney = "cashm-cashmoney"+i;
            $("#cashm-cashmoney").attr("id",cashm_cashmoney);
        }
    }

// 给车主提现页绑定
    var owenerCash = {
        cashResult:{}, // 车主存储的数据
        owerPage:function(valzhi){ // 每次点开这个页面都渲染一次
            $.ajax({
                url:"//qckj.czgdly.com/bus/MobileWeb/madeFROReceipts/queryPageMadeFROReceipts.asp",
                type:"post",
                data:{
                    cur:1,
                    uid:nowusermsg.uid,
                    utype:"Driver",
                    dateRange:"",
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
                        if(valzhi ==1){
                            if(data.page>1){
                                // 车主要处理接单数据
                                paymentzyval.page = data.page;
                                hdpaymentzy("Driver");
                            }
                        }
                   }
                },  
                error:function(data){
                    console.log("车主接单获取失败",data);
                    showMessage1btn("网络出错,获取我的订单失败","",0);
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
        filechange:function(val,file,xrdiv){  // 变化事件
            if(val==="#idCardFront"){
                carregister.turnbase(carregister.idCardFront,file,xrdiv,0);
            }else if(val==="#idCardBack"){
                carregister.turnbase(carregister.idCardBack,file,xrdiv,1);
            }else if(val==="#dLicenseFront"){
                carregister.turnbase(carregister.dLicenseFront,file,xrdiv,2);
            }else if(val==="#dLicenseBack"){
                carregister.turnbase(carregister.dLicenseBack,file,xrdiv,3);
            }
        },
        printing:function(judgeval,val,xrdiv){  // 把judgeval放到图片上
            if(val === 1){
                console.log("压缩前", judgeval.length / 1024);
            }else if(val===2){
                console.log("压缩后", judgeval.length / 1024);
                document.getElementById(xrdiv).src = judgeval;
            }
        },
        turnbase:function(judgeval,file,xrdiv,zhival){    // 照片转base64
            var judgeval = judgeval;
            var image = '';
            if(!file.files || !file.files[0]){
                return;
            }
            var reader = new FileReader();
            reader.onload = function(evt){
                image = evt.target.result;
                judgeval = image;
                console.log(carregister.printing(judgeval,1));
                //使用压缩
                carregister.dealImage(judgeval,800,carregister.printing,xrdiv,zhival);
            }
            reader.readAsDataURL(file.files[0]);       
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
            if(tips!==""){
                showMessage1btn(tips,"",0);
                return false;
            }
            console.log()
            $.ajax({
                url:"//qckj.czgdly.com/bus/MobileWeb/madeOwnerCertification/saveMadeOwnerCertification.asp",
                data:{
                    uid:nowusermsg.uid,
                    idCardFront:carregister.idCardFront,
                    idCardBack:carregister.idCardBack,
                    dLicenseFront:carregister.dLicenseFront,
                    dLicenseBack:carregister.dLicenseBack
                },
                type:"post",
                success:function(data){
                    console.log("提交图片的数据",data);
                    if(data.result===1){
                        // 0代表没有车主身份,1代表有,2代表审核中。3代表刚刚注册成功，跳转到请稍等页面。4代表注册审核失败，跳转出重新注册页面
                        owneridentity.states = 3 ;
                        
                        // 成功了,跳转到提醒页面
                        $(".to-examine").empty();
                        $(".to-examine").append("<div class='to-examinets'>发送成功,正在审核....</div><img src='./font/fontjs/danger.gif'   class='to-examineimg'>");
                        window.location.hash = "#examine";

                        owneridentity.states = 2;
                        carregister.second = 0;
                    }
                },
                error:function(data){
                    showMessage1btn("发生错误,请重试","",0);
                }
            })
        },
        dealImage:function(judgeval,w,callback,xrdiv,zhival) {   // 压缩方法
            var judgeval =judgeval;
			var newImage = new Image();
			var quality = 1;    //压缩系数0-1之间
			newImage.src = judgeval;
			newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
			var imgWidth, imgHeight;
			newImage.onload = function () {
				imgWidth = this.width;
				imgHeight = this.height;
				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext("2d");
				if (Math.max(imgWidth, imgHeight) > w) {
					if (imgWidth > imgHeight) {
						canvas.width = w;
						canvas.height = w * imgHeight / imgWidth;
					} else {
						canvas.height = w;
						canvas.width = w * imgWidth / imgHeight;
					}
				} else {
					canvas.width = imgWidth;
					canvas.height = imgHeight;
					quality = 1;
				}
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
				var judgeval = canvas.toDataURL("image/png", quality); //压缩语句
				// 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
				while (judgeval.length / 1024 > 500) {
					quality -= 0.01;
					judgeval = canvas.toDataURL("image/png", quality);
                }
                if(zhival===0){
                    carregister.idCardFront = judgeval;
                }else if(zhival===1){
                    carregister.idCardBack = judgeval;
                }else if(zhival===2){
                    carregister.dLicenseFront = judgeval;
                }else if(zhival===3){
                    carregister.dLicenseBack = judgeval;
                }
				callback(judgeval,2,xrdiv);//必须通过回调函数返回，否则无法及时拿到该值
			}
        }
    }
// 判断有无车住身份模块
    var owneridentity = {
        states:0,    // 0代表没有车主身份,1代表有,2代表审核中。3代表刚刚注册成功，跳转到请稍等页面。4代表注册失败，跳转出重新注册页面
        ownerajax:function(){   // 页面一开始调用下,
            $.ajax({
                url:"//qckj.czgdly.com/bus/MobileWeb/buyTicket/isCarOwner.asp",
                type:"post",
                data:{
                    uid:nowusermsg.uid
                },
                success:function(data){
                    console.log("身份成功",data);
                    if(data.status===1 && data.result===1 ){
                        owneridentity.states = 1 ;
                    }else if(data.result=== 1 && data.status===-1 ){  // 审核未通过
                        owneridentity.states  = 4; 
                    }else if(data.result=== 1 && data.status=== 0){
                        owneridentity.states = 2 ;
                    }else if(data.result=== -1 && data.status===null ){
                        owneridentity.states = 0; 
                    }
                },
                error:function(data){
                    console.log("请求身份失败");
                    owneridentity.states = 0;
                }
            })
        }
    }
    
// 选择人数页操作模块
    var personnum = {
        iconstates:1,
        personnumber:0,   // 人数默认为0
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
// 定位功能模块
    function sfclocation(){
        // 定位功能  
        AMap.plugin('AMap.Geolocation', function() {
           var geolocation = new AMap.Geolocation({
               enableHighAccuracy: false, //是否使用高精度定位，默认:true
               timeout: 10000,          //超过10秒后停止定位，默认：5s
               buttonPosition:'RB',     //定位按钮的停靠位置
               buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
               zoomToAccuracy: true  //定位成功后是否自动调整地图视野到定位点
           });
           map.addControl(geolocation);
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
           //  定位功能函数 
       function onComplete(data) {
           // 定位得到数据，设置
           gaode.successdata = data;
            console.log("定位成功",data);

           
           // 存储数据
           fabuxiaoxi.dwsj = data; 
            // 定位地址名
            var locationval = "";
            if( data.addressComponent.township=== "" || data.addressComponent.township === undefined ){
                locationval =  data.addressComponent.street + data.addressComponent.streetNumber;
            }else if( data.addressComponent.street === "" || data.addressComponent.street  === undefined ){
                locationval = data.addressComponent.township  + data.addressComponent.streetNumber;
            }else if( data.addressComponent.streetNumber=== "" || data.addressComponent.streetNumber === undefined ){
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
   }
// 金额页函数模块
   var tramount = {
       amont:0,  // 设置一个默认的金额
       rendering:function(){    // 页面初始化函数
           $(".tramount-money").text(fabuxiaoxi.amoney);
           $(".tramount-ftinput").val(fabuxiaoxi.amoney);
           tramount.amont = fabuxiaoxi.amoney;
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
            var dis = AMap.GeometryUtil.distanceOfLine([p1,p2]);
            // 返回结果为米
            console.log("一共多少米",dis);
            fabuxiaoxi.routeMileage = (dis/1000).toFixed(1);
            console.log("距离一共多少公里",fabuxiaoxi.routeMileage);
            $(".mileage-price").text(fabuxiaoxi.routeMileage);
        // 钱数简单计算下
            if(fabuxiaoxi.amoney===0){
                var routelc = fabuxiaoxi.routeMileage;
                var carmoney = 15;
                if(routelc <= 5){
                    carmoney = 15;
                }else if(routelc>5 && routelc <=30){
                    carmoney = 15 + (routelc-5)*1;
                }else if(routelc>30 && routelc <=150){
                    carmoney = 15 + 25 + (routelc-30)*0.5;
                }else if(routelc>150){
                    carmoney = 15 + 25 + 60 + (routelc -150)*0.4;
                }
                fabuxiaoxi.amoney = carmoney.toFixed(1);
                $(".completed-pprice").text(fabuxiaoxi.amoney);
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
            fabuxiaoxi.personNum = 0;
            fabuxiaoxi.amoney = 0;
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
        runpassengerDiv:"<div class='circle clearfix' id='runpassengerDiv'><a href='javascript:;' id='arunpassengerDiv'  target='_parent' class='arunpassengerDivclass clearfix'><div class='left runpassengerleft  clearfix'><div class='time'><span class='data' id='rpsgdata'></span><div class='rq'><span class='hours' id='rpsghours'></span></div></div><div class='mdd clearfix'><div class='cfd' id='rpsgcfd'></div><span class='glyphicon glyphicon-arrow-right mdd-icon'></span><div class='df' id='rpsgdf'></div><div class='runpassengerDivuid' style='display:none' id='idrunpassengerDivuid'></div> </div></div></a><div class='right clearfix'><button  class='ricon left btn btn-success ' id='paymentbutton'>查看</button></div></div>",
        //全部行程中车主
        runvownerDiv:"<div class='circle clearfix' id='runvownerDiv'><a href='#ownshowdata' id='arunvownerDiv'   target='_parent'  class='arunvownerDivclass clearfix'><div class='left runvownerleft  clearfix' ><div class='time'><span class='data' id='rvdata'>14号</span><div class='rq'><span class='hours' id='rvdhours'></span></div></div><div class='mdd clearfix'><div class='cfd' id='rvdcfd'></div><span class='glyphicon glyphicon-arrow-right mdd-icon'></span><div class='df' id='rvdf'></div></div></div><input type='submit' class='ricon left btn btn-primary ' value='查看' style='margin-top:22px;'></div></a></div>",
        // 支付页的模板 
        paymentpage:'<a href="#payment" class="aqkpayment clearfix" id="pmaqkpayment"><div id="myorder-od" class="tjorder clearfix"><div class="tjorder-hd clearfix"> <div class="tjorder-hdleft clearfix"><span class="tjorder-hdlefticon iconfont iconkeche"></span><span id="myorder-oddistance"  class="tjorder-hdleftnr">市内</span></div><p id="myorder-odstatus" class="tjorder-hdright">出票成功</p></div><div  class="tjorder-ct clearfix"><span  id="myorder-oddpcity" class="tjorder-ctleft"></span><span class="tjorder-ctcenter">-</span><span  id="myorder-odarcity"  class="tjorder-ctright"></span></div><div class="tjorder-date clearfix"><div class="tjorder-dateleft clearfix"><span class="tjorder-dateleftts">出发时间:</span><span id="myorder-oddptime" class="tjorder-datelefttime"></span></div><div class="tjorder-dateright clearfix"><span class="tjorder-daterighticon">&yen;</span><span id="myorder-odprice" class="tjorder-daterightmoney"></span></div></div><div class="tjorder-date clearfix"><div class="tjorder-dateleft clearfix"><span class="tjorder-dateleftts">添加时间:</span><span id="myorder-odartime" class="tjorder-datelefttime"></span></div></div><div id="myorder-odbutton" class="tjorder-button clearfix"></div></div></a>',
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
        // 点击了，先隐藏，在进行效果展示 
    }
    // 切换路由的方法
    function hashChange(hashzhi){
        var locationHash = window.location.hash;
        console.log("路由值",locationHash);
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
            $("#address").text("想要去哪儿");
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
                    $("#address").text("想要去哪儿");
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
            }else if(locationHash =="#s" || locationHash =="#m"|| locationHash =="#time" ||
                locationHash == "#xxwz" ||locationHash == "#sxxwz"||locationHash == "#mxxwz" ||  
                locationHash =="#personnum" || val1[0] == "#personnum"){
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
                    $(".phdiconfyqdiv").outerHeight($(document.body).outerHeight()-$(".header").outerHeight()-40);
                    // 大的颜色变化
                    hashlycolorsz();
                    $(".hpassenger").css("color", "#e39f7a");
                    // 颜色的变化
                    hvownermyrun();
                    $(".hvownermypay").css("color","#5bc0de");

                    paymentpage(nowusermsg.uid,"Passenger",1);
                    $("#mypayidname").text("我的支付");
                    // 乘客隐藏掉那个
                    $("#balanceid").hide();

                }else if(val1[1]==="diver"){
                    // 我的订单页
                    $(".phdiconfyqdiv").outerHeight($(document.body).outerHeight()-$(".header").outerHeight()-188);
                    // 车主大的颜色变化
                    hashlycolorsz();
                    $(".hrun").css("color","#e39f7a");
                    // 颜色变化
                    hvownermyrun();
                    $(".hrucarpay").css("color","#5bc0de");
                    // 点击时车主时 调用渲染函数
                    owenerCash.owerPage(1);
                    $("#mypayidname").text("我的接单");
                    // 车主就显示
                    $("#balanceid").show();
                   
                }
                $(".paymentzy").show();
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
    function getPassenger(){
        $.ajax({
             url: sfcsj.passengerUrl,
            type: 'post',
            data:{
                cur:1,  // 默认取第一页 
                pushType:"Passenger",   // 乘客 
                uid:nowusermsg.uid, // id号 
                viewType:"self",        // 看自己
                pageSize:8,         // 首页的数量
                dateRange:"",      // 日期范围
                arCity:"",      // 到达城市 
                dpCity:"",      // 出发城市 
            },
             success: function (data) {
                 if(data.result>0){
                    sfcsj.passenger = data;
                    // 获取成功，但是数据暂时为空 
                    // 处理 乘客端数据的函数
                    setPassenger(data);
                    if ( data.page > 1 ){
                            // 获取到Uid后，乘客页添加滑动效果 
                        passengerNodeval.page = data.page;
                        hdpassengerNode();
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
    function getVowner(){
        $.ajax({
            url: sfcsj.vownerUrl,
            type: 'post',
            data:{
                cur:1,  // 默认取第一页 
                pushType:"Driver",   // 车主身份
                viewType:"self",        // 看自己
                uid:nowusermsg.uid, // id号 
                pageSize:8,         // 首页请求的数量
                dateRange:"",      // 日期范围，默认取一个月之内的 
                arCity:"",      // 到达城市 
                dpCity:""      // 出发城市 
            },
            success: function (data) {
                if ( data.result > 0 ) {
                    sfcsj.vowner = data ;
                    // 获取成功，但是数据暂时为空 
                
                    // setVowner() 处理车主端的数据 
                    setVowner(data);
                    if (data.page>1 ){
                        // 我的行程车主绑定的滑动效果
                        vownperNodeval.page = data.page;
                        hdvownperNode();
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
                    $("#cydstatedzt").text("失效");
                    var cydstatedzt = "cydstatedzt"+i;
                    $("#cydstatedzt").attr("id",cydstatedzt);
                }else if(passengerData[i].state === 0){
                    $("#cydstatedzt").text("发布");
                    var cydstatedzt = "cydstatedzt"+i;
                    $("#cydstatedzt").attr("id",cydstatedzt);
                    var cydstatedztcl = "#"+cydstatedzt;
                    $(cydstatedztcl).css('color',"#5cb85c");
                }else  if(passengerData[i].state === 1){
                    $("#cydstatedzt").text("完成");
                    var cydstatedzt = "cydstatedzt"+i;
                    $("#cydstatedzt").attr("id",cydstatedzt);
                    var cydstatedztcl = "#"+cydstatedzt;
                    $(cydstatedztcl).css('color',"#f0ad4e");
                }else if(passengerData[i].state === 2) {
                    $("#cydstatedzt").text("已被接单");
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
                    $("#cirstatedzt").text("失效");
                    var cirstatedzt = "cirstatedzt"+i;
                    $("#cirstatedzt").attr("id",cirstatedzt);
                }else if(vownerData[i].state === 0){
                    $("#cirstatedzt").text("发布");
                    var cirstatedzt = "cirstatedzt"+i;
                    $("#cirstatedzt").attr("id",cirstatedzt);
                    var cirstatedztcl = "#"+cirstatedzt;
                    $(cirstatedztcl).css('color',"#5cb85c");
                }else  if(vownerData[i].state === 1){
                    $("#cirstatedzt").text("完成");
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
            }else if(pushType ===""||pushType === undefined){
                successdattsxx="状态出错,请重新开始";
            }else if(departure.trim()==="" || departure===undefined || dLng ==="" || dLng===undefined || dLat===""||dLat===undefined){
                if(departure.trim()==="" || departure===undefined){
                    successdattsxx= "出发地出错,请重新选择出发地";
                }else if(dLng ==="" || dLng===undefined || dLat===""||dLat===undefined){
                    successdattsxx= "不能直接选择市名为出发地";
                }
            }else if(mdata.name.trim()==="" ||mdata.name.trim()===undefined || mdata.location.lng ==="" || mdata.location.lng===undefined || mdata.location.lat===""||mdata.location.lat===undefined){
                if(mdata.name.trim()==="" ||mdata.name.trim()===undefined){
                    successdattsxx= "目的地出错,请重新选择目的地";
                }else if(mdata.location.lng ==="" || mdata.location.lng===undefined || mdata.location.lat===""||mdata.location.lat===undefined){
                    successdattsxx= "不能直接选择市名为目的地";
                }
            }else if(fabuxiaoxi.mdtime===""||fabuxiaoxi.mdtime===undefined){
                successdattsxx= "您忘了选期望到达时间了";
            }else if(fabuxiaoxi.cftime===""||fabuxiaoxi.cftime===undefined){
                successdattsxx= "您忘了选出发时间了";
            }else if(fabuxiaoxi.personNum==="" || fabuxiaoxi.personNum ===undefined){
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

            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/madeFreeRideOrders/saveMadeFROrders.asp",
                data:{
                    uid	:nowusermsg.uid,        // 用户id  
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
                                    // 乘客发布时,支付成功的同时向后台发送数据
                                    showMessage1btn("发布成功,如需退款，请提前24小时取消订单","",0);
                                    // 数据成功后，在重新请求下页面,刷新数据，把刚刚取到的数据放在页面上给用户观看。
                                    window.location.href = "//qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/sfc.html"; 
                        }else if( pushType === "Driver" ){
                             // 用完时间要初始化,完成了在初始化。
                            // 用完要把用过的值初始化 
                            fabuxiaoxi.mddcity = "";    // 置空 
                            fabuxiaoxi.cfddata = "";    // 置空 
                            fabuxiaoxi.mmddata = "";    // 置空 
                            settleAccounts.rendertimes = 0 ;
                            // 数据成功后，在重新请求下页面,刷新数据，把刚刚取到的数据放在页面上给用户观看。
                            window.location.href = "//qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/sfc.html";   
                        }
                    }
                },
                error:function(data){
                    // 用完要把用过的值初始化 
                    fabuxiaoxi.mddcity = "";    // 置空 
                    fabuxiaoxi.cfddata = "";    // 置空 
                    fabuxiaoxi.mmddata = "";    // 置空 
                    settleAccounts.rendertimes = 0 ;
                    paymentModular.oldarcity = "";
                    paymentModular.olddpcity = "" ;
                    paymentModular.oldartime = "";
                    paymentModular.olddptime = "";
                    showMessage1btn("网络出错,请刷新在试!","",0);
                }
            })
        }
    }

// 支付页逻辑的实现 
    // 存储获取到的支付页的信息，供支付详情页掉欧阳 
 var paymentpageval = {
        result:{},  // 数据 
        chisu:0,    // 计算用户支付了几次 
        type:"passger"  // 请求类型
    }
    // 只有乘客才有支付表，车主不需要，车主只有接单表
    function paymentpage(uid,val,valzhi){
        $.ajax({
            type:"post",
            url:"//qckj.czgdly.com/bus/MobileWeb/madeFROViewPayments/queryPageMadeFROVPayments.asp",
            data:{
                cur:1, // 查看页码 
                uid:uid,
                dateRange:"",  // 查看日期，查看所有 
                utype:val,
                pageSize:8      // 首页
            },
            success:function(data){
                console.log("乘客支付信息表",data);
                paymentpageval.result = data ;
                console.log("支付信息",data);
                $(".phdiconfyq").empty();
               if(data.result>0){
                    for( var i = 0 ;i<data.obj.froViewPayments.length;i++){
                        paymentpageval.chisu++;
                        $(".phdiconfyq").append(sfcsj.paymentpage);
                    // 处理支付页面的数据 
                        paymentpcl(i,data,2);
                    }
                    if(valzhi == 1){
                        if (data.page > 1){
                            paymentzyval.page = data.page;
                            hdpaymentzy("Passenger");
                        }
                    }
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
        if( val === "" || val === null || val === undefined || val ===2){
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
                if (sj.price == null || undefined) {
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

            var val = paymentpageval.result.obj.froViewPayments[indexes];
            // 赋值
            // 支付数据
            if (val.payPrice == null || val.payPrice == undefined) {
                $("#details-price").hide();
            }else {
                $("#details-priceje").text(val.payPrice+"(已支付金额)");
                $("#details-pricetime").text(val.payDate);
                $("#details-price").show();
            }
            
            //退款信息
            if (val.refundPrice==null || val.refundPrice== undefined ){
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

            
                $("#details-oddNumber").hide();
           
                // 价格 
                $("#details-pricedh").text(val.price);
                // 单号
                $("#details-oddsz").text(val.vpNo);
                // 服务费比率
                $("#details-pricefeedata").text(val.feeRate+"%");
                $("#details-passenger-num").text(val.pnum);

            if ( nowusermsg.uid == val.puid && val.pushType =='Driver' ){
                    $("#details-paymoney").empty();
            }else {
                if(val.payState === 1){
                    jg ="已支付";
                    $("#details-passengerState").text(jg);

                    // 已支付则显示
                    $("#details-oddNumber").show();
                    if(Date.parse(new Date()) < (Date.parse(val.dpTime)+86400000)){
                        
                        // 没过规定时间  有取消和立即支付按钮
                        $("#details-paymoney").append('<div style="width:200px;height:100%;margin:0 auto;" class="clearfix"><span class="details-paymorebutton" id="details-payquxiao" style="margin:6px auto;display:block;">取消订单</span></div>');
                        // 取消操作
                        $("#details-payquxiao").bind("touch click",function(){
                            qxsfcxinxi(val.puid,val.froid,"已支付");
                        })
                        var details_payquxiao = "details-payquxiao"+1;
                        $("#details-payquxiao").attr("id",details_payquxiao);
                        
                        // 支付
                        $("#details-paymaypay").bind("touch click",function(){
                            paymentModule.payMoney(val.price,val.pnum);
                        })
                        var details_paymaypay = "details-paymaypay"+1;
                        $("#details-paymaypay").attr("id",details_paymaypay);
                    }else {
                        // 过了规定时间
                        $("#details-paymoney").append('<div class="details-paymontext">支付成功,等待上车</div>')
                    }
                }else if (val.payState === -1){
                    jg="已取消"
                    $("#details-paymoney").append('<div class="details-paymontext">已取消</div>');
                    $("#details-passengerState").text(jg);
                }else {
                    jg = "未支付";
                    $("#details-passengerState").text(jg);
                    $("#details-paymoney").append('<div style="width:200px;height:100%;margin:0 auto;" class="clearfix"><span class="details-paymorebutton" id="details-payquxiao">取消订单</span><span class="details-paymorebutton" id="details-paymaypay">立即支付</span></div>');
                    // 取消操作
                    $("#details-payquxiao").bind("touch click",function(){
                        qxsfcxinxi(val.puid,val.froid,"未支付");
                    })
                    var details_payquxiao = "details-payquxiao"+1;
                    $("#details-payquxiao").attr("id",details_payquxiao);
                    
                    // 支付
                    $("#details-paymaypay").bind("touch click",function(){
                        paymentModule.payMoney(val.price,val.pnum);
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
            var valtwo = owenerCash.cashResult.obj.froReceipts[indexes];
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
        url:"//qckj.czgdly.com/bus/MobileWeb/madeFROViewPayments/cancelFRROPayments.asp",
        type:"post",
        data:{
            uid:uid,
            id:id,
            source:"KBT"
        },
        success:function(data){
            console.log("取消支付数据",data);
            if( data.result === -1 ){
                $("#details-paymoney").empty();
                showMessage1btn("该订单不存在,请联系客服","",0);
                    // 操作成功，显示提示
                    $("#details-paymoney").text('<div class="details-paymontext">已取消发布,改订单未付钱</div>');
            }else {
                $("#details-paymoney").empty();
                showMessage1btn("取消成功,正在退款","",0);
                // 操作成功，显示提示
                $("#details-paymoney").text('<div class="details-paymontext">取消成功,正在退款</div>');
            };
        },
        error:function(data){
            console.log("退款失败",data);
            showMessage1btn("退款失败,请联系客服","",0);
        }
    })
} 
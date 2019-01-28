$(function(){
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
   /* 获取路由的值 */
   hqselectval();
   
   /* 初始化 */
   /* 初始化的数据 */
   $(".clickqxx").append(clickqxx);
   if(nowusermsg.valone == "sf=run"){
        $(".clickqxx").empty();
   }
})
/* 数据 */
    var clickqxx = "<div id='qxsfcxinxi'>取消发布</div>";

/* 页面初始化的数据 */
    var nowusermsg = {
        valone:'',
        uid:111,
        id:111,
        state:111
    }
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

        console.log(hashval,typeof nowusermsg.id,typeof nowusermsg.uid);
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
                rendering(data);
                /* 绑取消订单的事件 */
                $("#qxsfcxinxi").bind("touch click",function(){
                    qxsfcxinxi();
                })
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
                 $(".clickqxx").empty();
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
                        showMessage1btn("已取消发布","",0);
                        // 操作成功，显示提示
                        $(".sdstatusd").text("失效了");
                        $(".clickqxx").empty();
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

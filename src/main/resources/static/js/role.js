
var len=5;
var totalPages=1;
var setTotalCount=0;
$(function () {
    $.ajax({
        url:'queryKnowledgeByPage',
        type:'get',
        dataType:"JSON",

        success:function(data){
            totalPages=data.totalPages;
            len=data.size;
            setTotalCount=data.totalElements;
            pag();
            // for(var i in data.content){
            //     var id = data.content[i].id;
            //     var name = data.content[i].name;
            //     var describe = data.content[i].describe;
            //     var rulers = data.content[i].rulers;
            //     var hotWord = data.content[i].hotWord;
            //     var operator = data.content[i].operator;
            //     var operTime = timestampToTime((data.content[i].operTime + "").slice(0,10));
            //     var str2 = '';
            //     for(var j in rulers){
            //         var rId = rulers[j].id
            //         var column = rulers[j].column
            //         var value = rulers[j].value
            //         var cloumname='';
            //         switch (column){
            //             case 'INFOSOURCENAME':
            //                 cloumname = '来源名称';
            //                 break;
            //             case 'INFOBCNAME':
            //                 cloumname = '大类名称';
            //                 break;
            //             case 'INFOSCNAME':
            //                 cloumname = '小类名称';
            //                 break;
            //             case 'INFOZCNAME':
            //                 cloumname = '子类名称';
            //                 break;
            //             case 'STREETNAME':
            //                 cloumname = '街道名';
            //                 break;
            //         }
            //         // var str1 = cloumname + ":" + value + ";"
            //         var str1 = '<div style="display: inline-block; margin-left: 10px">'+cloumname + ":" + value + ';</div>'
            //         str2 = str2 + str1;
            //     }
            //     var str = '<tr><td>'+id+'</td><td>'+name+'</td><td>'+describe+'</td><td>'+str2+'</td><td>'+hotWord+'</td><td>'+operator+'</td><td>'+operTime+'</td><td><div class="am-btn-toolbar"><div class="am-btn-group am-btn-group-xs"><button type="button" id='+id+' class="am-btn am-btn-default am-btn-xs am-text-secondary btnedit"><span class="am-icon-pencil-square-o">编辑</span></button><button type="button" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only btndel" id='+ id +'><span class="am-icon-trash-o"></span>删除</button></div></div></td></td></tr>'
            //     $("#tUser").append(str)
            //     edit()
            // }
        },
        error:function(a){
            console.log(a);
        }
    });
});
$(function() {
    $("#chkAll").chkAll({
    });
    $(".btnAdd").click(function() {
        $.jq_Panel({
            title: "添加规则",
            iframeWidth: 500,
            iframeHeight: 300,
            url: "edit"
        });
    });

});
function edit(){
    $(".btnedit").click(function() {

        $.jq_Panel({
            title: "修改规则",
            iframeWidth: 500,
            iframeHeight: 300,
            url: "edit?editid=" + this.id
        });
        console.log(this.id)

    });
    $('.btndel').click(function() {
        var id = this.id;
        console.log(id)
        $.get('deleteKnowledge', {id: id}, function(data) {
            alert(data)
            parent.location.reload()
        })
    })
}
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D;
}


function  pag(){
    $('.box').paging({
        initPageNo: 1, // 初始页码
        totalPages: totalPages, //总页数
        totalCount: '合计' + setTotalCount + '条数据', // 条目总数
        slideSpeed: 600, // 缓动速度。单位毫秒
        jump: true, //是否支持跳转
        callback: function(page) { // 回调函数
            $.ajax({
                url:'queryKnowledgeByPage',
                type:'get',
                dataType:"JSON",
                data:{page:page-1},
                success:function(data){
                   console.log(data);
                   $('#tUser').children().remove();
                    for(var i in data.content){
                        var id = data.content[i].id;
                        var name = data.content[i].name;
                        var describe = data.content[i].describe;
                        var rulers = data.content[i].rulers;
                        var hotWord = data.content[i].hotWord;
                        var department = data.content[i].department;
                        var operator = data.content[i].operator;
                        var operTime = timestampToTime((data.content[i].operTime + "").slice(0,10));
                        var str2 = '';
                        for(var j in rulers){
                            var rId = rulers[j].id
                            var column = rulers[j].column
                            var value = rulers[j].value
                            var cloumname='';
                            switch (column){
                                case 'INFOSOURCENAME':
                                    cloumname = '来源名称';
                                    break;
                                case 'INFOBCNAME':
                                    cloumname = '大类名称';
                                    break;
                                case 'INFOSCNAME':
                                    cloumname = '小类名称';
                                    break;
                                case 'INFOZCNAME':
                                    cloumname = '子类名称';
                                    break;
                                case 'STREETNAME':
                                    cloumname = '街道名';
                                    break;
                            }
                            // var str1 = cloumname + ":" + value + ";"
                            var str1 = '<div style="display: inline-block; margin-left: 10px">'+cloumname + ":" + value + ';</div>'
                            str2 = str2 + str1;
                        }

                        var str = '<tr><td>'+id+'</td><td>'+name+'</td><td>'+describe+'</td><td>'+str2+'</td><td>'+hotWord+'</td><td>'+department+'</td><td>'+operator+'</td><td>'+operTime+'</td><td><div class="am-btn-toolbar"><div class="am-btn-group am-btn-group-xs"><button type="button" id='+id+' class="am-btn am-btn-default am-btn-xs am-text-secondary btnedit"><span class="am-icon-pencil-square-o">编辑</span></button><button type="button" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only btndel" id='+ id +'><span class="am-icon-trash-o"></span>删除</button></div></div></td></td></tr>'

                        $("#tUser").append(str)
                        edit()
                    }
                },
                error:function(a){
                    console.log(a);
                }
            });
        }
    });
}


/**
 * autor:bajiao
 * **/
$(function () {
    $("#btnsearch").click(function () {
        serchRole();
    });
});
var serchRole=function () {
    var name=$('#roleName').val();
    $('.box').paging({
        initPageNo: 1, // 初始页码
        totalPages: totalPages, //总页数
        totalCount: '合计' + setTotalCount + '条数据', // 条目总数
        slideSpeed: 600, // 缓动速度。单位毫秒
        jump: true, //是否支持跳转
        callback: function(page) { // 回调函数
            $.ajax({
                url:'searchByName?name='+name,
                type:'get',
                dataType:"JSON",
                data:{page:page-1},
                success:function(data){
                    console.log(data);
                    $('#tUser').children().remove();
                    for(var i in data.content){
                        var id = data.content[i].id;
                        var name = data.content[i].name;
                        var describe = data.content[i].describe;
                        var rulers = data.content[i].rulers;
                        var hotWord = data.content[i].hotWord;
                        var department = data.content[i].department;
                        var operator = data.content[i].operator;
                        var operTime = timestampToTime((data.content[i].operTime + "").slice(0,10));
                        var str2 = '';
                        for(var j in rulers){
                            var rId = rulers[j].id
                            var column = rulers[j].column
                            var value = rulers[j].value
                            var cloumname='';
                            switch (column){
                                case 'INFOSOURCENAME':
                                    cloumname = '来源名称';
                                    break;
                                case 'INFOBCNAME':
                                    cloumname = '大类名称';
                                    break;
                                case 'INFOSCNAME':
                                    cloumname = '小类名称';
                                    break;
                                case 'INFOZCNAME':
                                    cloumname = '子类名称';
                                    break;
                                case 'STREETNAME':
                                    cloumname = '街道名';
                                    break;
                            }
                            // var str1 = cloumname + ":" + value + ";"
                            var str1 = '<div style="display: inline-block; margin-left: 10px">'+cloumname + ":" + value + ';</div>'
                            str2 = str2 + str1;
                        }

                        var str = '<tr><td>'+id+'</td><td>'+name+'</td><td>'+describe+'</td><td>'+str2+'</td><td>'+hotWord+'</td><td>'+department+'</td><td>'+operator+'</td><td>'+operTime+'</td><td><div class="am-btn-toolbar"><div class="am-btn-group am-btn-group-xs"><button type="button" id='+id+' class="am-btn am-btn-default am-btn-xs am-text-secondary btnedit"><span class="am-icon-pencil-square-o">编辑</span></button><button type="button" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only btndel" id='+ id +'><span class="am-icon-trash-o"></span>删除</button></div></div></td></td></tr>'

                        $("#tUser").append(str)
                        edit()
                    }
                },
                error:function(a){
                    console.log(a);
                }
            });
        }
    });
};


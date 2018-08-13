
$(function(){

    var editId = getQueryString('editid')
    console.log(editId != null)
    var checkBoxs = $('.hot input[type="checkbox"]')
    var inputs = $('.hot input[text="text"]')
    console.log(inputs)
    if (editId != null && editId != "") {
        console.log('isedit')
        $.get('/knlg/queryKnowledge', {id: editId}, function(data) {
            console.log(data)
            $('#roleName').val(data.name)
            $('#dercribe').val(data.describe);
            $('#hotWord').val(data.hotWord);
            $('#department').val(data.department);
            $('#operator').val(data.operator);
            var checkBoxs = $('.hot input[type="checkbox"]')
            var inputs = $('.hot input[text="text"]')
            console.log(checkBoxs)
            for (var length = data.rulers.length, i = 0; i < length; i ++) {
                var item = data.rulers[i]
                switch (item.column){
                    case 'INFOSOURCENAME':
                        checkBoxs[0].click();
                        $(checkBoxs[0]).attr('cid', item.id);
                        $(inputs[0]).val(item.value);
                        break;
                    case 'INFOBCNAME':
                        checkBoxs[1].click();
                        $(inputs[1]).val(item.value);
                        $(checkBoxs[1]).attr('cid', item.id);

                        break;
                    case 'INFOSCNAME':
                        checkBoxs[2].click();
                        $(inputs[2]).val(item.value);
                        $(checkBoxs[2]).attr('cid', item.id);
                        break;
                    case 'INFOZCNAME':
                        checkBoxs[3].click();
                        $(inputs[3]).val(item.value);
                        $(checkBoxs[3]).attr('cid', item.id);
                        break;
                    case 'STREETNAME':
                        checkBoxs[4].click();
                        $(inputs[4]).val(item.value);
                        $(checkBoxs[4]).attr('cid', item.id);
                        break;
                }
            }
            data.rulers
        }, 'json')
    }

});
function checkData(item){
    var input = $(item).parent().children()[1];
    if($(item).prop('checked')){
        $(input).css('display',"inline-block");
    }else {
        $(input).css('display',"none");
    }
}
function Updata(){
    var checkbox=$('.hot').find(':checkbox');
    var hot=[];

    for(var i=0;i<checkbox.length;i++){
        if($(checkbox[i]).prop('checked')){
            var col = {
                column:$($(checkbox[i]).parent().children()[1]).attr('ziduan'),
                value:$($(checkbox[i]).parent().children()[1]).val()
            };
            console.log($(checkbox[i]).attr('cid'));
            if (getQueryString('editid') != null && getQueryString('editid') != "" && $(checkbox[i]).attr('cid')) {

                col.id = $(checkbox[i]).attr('cid')
            }
            hot.push(col);
        }
    }
    var name = $('#roleName').val();
    var describe = $('#dercribe').val();
    var hotWord = $('#hotWord').val();
    var department = $('#department').val();
    var operator = $('#operator').val();
    var data={
        name:name,
        describe:describe,
        hotWord:hotWord,
        department:department,
        operator:operator
    };
    if(hot.length>0){
        data.rulers=hot;
    }
    console.log(JSON.stringify(data));
    var url_post = "saveKnowledge"
    console.log(getQueryString('editid'))
    if (getQueryString('editid') != null && getQueryString('editid') != "") {
        url_post = "updateKnowledge";
        data.id = getQueryString('editid')
    }
    $.ajax({
        url: url_post,
        type:'post',
        data:{"data": JSON.stringify(data)},
        success:function(d){
            // $.jq_Panel_close();
            // window.location.href="/index";
            parent.location.reload();
            console.log(this);
        },
        error:function(a){
            console.log(a);
        }
    });
}
//获取url中的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); // 匹配目标参数
    var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
    if (result != null) {
        return decodeURIComponent(result[2]);
    } else {
        return null;
    }
}

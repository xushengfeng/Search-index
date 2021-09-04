search = { // 引擎列表
    "综合": {
        "谷歌": "https://www.google.com/search?q=%s",
        "百度": "https://www.baidu.com/s?wd=%s",
        "必应": "https://cn.bing.com/search?q=%s",
        "搜狗": "https://www.sogou.com/web?query=%s",
        "秘迹": "https://mijisou.com/?q=%s",
        "头条": "https://m.toutiao.com/search?keyword=%s",
        "神马": "https://yz.m.sm.cn/s?q=%s",
        "夸克": "https://quark.sm.cn/s?q=%s"
    },
    '图片': {
        "百度": "https://image.baidu.com/search/index?tn=baiduimage&word=%s",
        "必应": "https://cn.bing.com/images/search?q=%s"
    },
    '音乐': {
        "qq": "https://y.qq.com/portal/search.html#w=%s",
        "网易云": "https://music.163.com/#/search/m/?s=%s",
        "酷狗": "https://www.kugou.com/yy/html/search.html#searchType=song&searchKeyWord=%s",
        "虾米": "https://www.xiami.com/search?key=%s",
        "酷我": "http://www.kuwo.cn/search/list?key=%s"
    },
    '视频': {
        "bilibili": "https://search.bilibili.com/all?keyword=%s",
        "优酷": "https://so.youku.com/search_video/q_%s",
        "腾讯": "https://v.qq.com/x/search/?q=%s",
        "爱奇艺": "https://so.iqiyi.com/so/q_%s",
        "芒果": "https://so.mgtv.com/so/k-%s"
    },
    '社交': {
        "微信": "https://weixin.sogou.com/weixin?type=2&query=%s",
        "知乎": "https://www.zhihu.com/search?type=content&q=%s",
        "微博": "https://s.weibo.com/weibo?q=%s"
    },
    '开发': {
        "github": "https://github.com/search?q=%s",
        "archlinux": "https://wiki.archlinux.org/index.php?search=%s"
    },
    '购物': {
        "淘宝": "https://s.taobao.com/search?q=%s",
        "京东": "https://search.jd.com/Search?keyword=%s"
    },
    '翻译': {
        "en-cn": "https://translate.google.cn/#view=home&op=translate&sl=en&tl=zh-CN&text=%s",
        "cn-en": "https://translate.google.cn/#view=home&op=translate&sl=zh-CN&tl=en&text=%s"
    }
}
Stext = ''
for (i in search) {
    ii = "'" + i + "'"
    Stext += '<a onclick="choose(' + ii + ')"><div class="s">' + i + '</div></a>'
}
document.getElementById('S').innerHTML = Stext

Select = document.getElementById('mySelect');

function choose(chanse) {
    html = ''
    for (n in search[chanse]) {
        if (localStorage.indexEngine == n) {
            html += '<option selected value="' + search[chanse][n] + '">' + n + '</option>'
        } else {
            html += '<option value="' + search[chanse][n] + '">' + n + '</option>'
        }

    }
    Select.innerHTML = html
}
choose('综合');


// 搜索
function go() {
    var x = document.getElementById("mySelect").selectedIndex;
    var y = document.getElementById("mySelect").options;
    var text = document.getElementById("text").value;
    var re = '/^(f|ht){1}(tp|tps):\\/\\/([\\w-]+\\.)+[\\w-]+(\\/[\\w- ./?%&=]*)?/g';

    if (text.indexOf(re) != -1) {
        window.open('https://' + text)
    } else {
        window.open(y[x].value.replace('%s', text))
    }

    localStorage.indexEngine = y[x].innerHTML
}


// 快速删除
document.getElementById('text').oninput = () => {
    if (document.getElementById('text').value.indexOf('xxx') != -1) {
        document.getElementById('text').value = ''
    }
}


// 搜索建议
document.getElementById('text').oninput = () => {
    if (document.getElementById('text').value != '') {
        $.ajax({
            async: false,
            url: 'http://suggestion.baidu.com/su?wd=' + document.getElementById('text').value + '&json=1&p=3&cb=show_sg',
            type: "GET",
            dataType: 'jsonp',
            error: (data) => {
                show_sg()
            }
        });
    } else {
        document.getElementById('suggestion').innerHTML = ''
    }
}

// 搜索建议展示
function show_sg(suggestion_data) {
    var x = ''
    for (i in suggestion_data.s) {
        x += '<div class="sg_item" onclick="go_sg(&#39;' + suggestion_data.s[i] + '&#39;)">' + suggestion_data.s[i] + '</div>'
    }
    document.getElementById('suggestion').innerHTML = x
}

// 搜索建议跳转
function go_sg(link) {
    document.getElementById('text').value = link
    go()
}


// 快捷键
document.onkeyup = function (e) {
    var event = e || window.event;
    var key = event.which || event.keyCode || event.charCode;
    if (key == 13) { // enter搜索
        go()
    } else if (key == 38) { // 向上切引擎
        if ($("#mySelect option:selected").prev().val() != undefined) {
            $('#mySelect').val($("#mySelect option:selected").prev().val())
        } else {
            $('#mySelect').val($("#mySelect option").last().val())
        }
    } else if (key == 40) { // 向下切引擎
        if ($("#mySelect option:selected").next().val() != undefined) {
            $('#mySelect').val($("#mySelect option:selected").next().val())
        } else {
            $('#mySelect').val($("#mySelect option").first().val())
        }
    } else if (key == 191) { // /聚焦
        $("#text").focus();
    }
};
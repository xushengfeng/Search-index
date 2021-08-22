search = {
    "综合": {
        "谷歌": "https://www.google.com/search?q=",
        "百度": "https://www.baidu.com/s?wd=",
        "必应": "https://cn.bing.com/search?q=",
        "搜狗": "https://www.sogou.com/web?query=",
        "秘迹": "https://mijisou.com/?q=",
        "头条": "https://m.toutiao.com/search?keyword=",
        "神马": "https://yz.m.sm.cn/s?q=",
        "夸克": "https://quark.sm.cn/s?q="
    },
    '图片': {
        "百度": "https://image.baidu.com/search/index?tn=baiduimage&word=",
        "必应": "https://cn.bing.com/images/search?q="
    },
    '音乐': {
        "qq": "https://y.qq.com/portal/search.html#w=",
        "网易云": "https://music.163.com/#/search/m/?s=",
        "酷狗": "https://www.kugou.com/yy/html/search.html#searchType=song&searchKeyWord=",
        "虾米": "https://www.xiami.com/search?key=",
        "酷我": "http://www.kuwo.cn/search/list?key="
    },
    '视频': {
        "bilibili": "https://search.bilibili.com/all?keyword=",
        "优酷": "https://so.youku.com/search_video/q_",
        "腾讯": "https://v.qq.com/x/search/?q=",
        "爱奇艺": "https://so.iqiyi.com/so/q_",
        "芒果": "https://so.mgtv.com/so/k-"
    },
    '社交': {
        "微信": "https://weixin.sogou.com/weixin?type=2&query=",
        "知乎": "https://www.zhihu.com/search?type=content&q=",
        "微博": "https://s.weibo.com/weibo?q="
    },
    '开发': {
        "github": "https://github.com/search?q=",
        "archlinux": "https://wiki.archlinux.org/index.php?search="
    },
    '购物': {
        "淘宝": "https://s.taobao.com/search?q=",
        "京东": "https://search.jd.com/Search?keyword="
    },
    '翻译': {
        "en-cn": "https://translate.google.cn/#view=home&op=translate&sl=en&tl=zh-CN&text=",
        "cn-en": "https://translate.google.cn/#view=home&op=translate&sl=zh-CN&tl=en&text="
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



function go() {
    var x = document.getElementById("mySelect").selectedIndex;
    var y = document.getElementById("mySelect").options;
    var text = document.getElementById("text").value;
    var re = '/^(f|ht){1}(tp|tps):\\/\\/([\\w-]+\\.)+[\\w-]+(\\/[\\w- ./?%&=]*)?/g';

    if (text.indexOf(re) != -1) {
        window.open('https://' + text)
    } else {
        window.open(y[x].value + text)
    }

    localStorage.indexEngine = y[x].innerHTML
}

function get(url) {
    $.ajax({
        url: url,
        type: "GET",
        async: false,
        success: function (data) {
            window.data = data;
        }
    });
    return data;
}

document.getElementById('text').oninput = function () {
    if (document.getElementById('text').value.indexOf('xxx') != -1) {
        document.getElementById('text').value = ''
    }

    // list = get('http://suggestion.baidu.com/su?wd=' + document.getElementById('text').value + '&json=1&p=3&cb=boottomSuggestion').s
}
document.onkeyup = function (e) {
    var event = e || window.event;
    var key = event.which || event.keyCode || event.charCode;
    if (key == 13) {
        go()
    } else if (key == 38) {
        if ($("#mySelect option:selected").prev().val() != undefined) {
            $('#mySelect').val($("#mySelect option:selected").prev().val())
        } else {
            $('#mySelect').val($("#mySelect option").last().val())
        }
    } else if (key == 40) {
        if ($("#mySelect option:selected").next().val() != undefined) {
            $('#mySelect').val($("#mySelect option:selected").next().val())
        } else {
            $('#mySelect').val($("#mySelect option").first().val())
        }
    } else if (key == 32) {
        $("#text").focus();
    }
};
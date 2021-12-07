search = {
    // 引擎列表
    综合: {
        谷歌: "https://www.google.com/search?q=%s",
        百度: "https://www.baidu.com/s?wd=%s",
        必应: "https://cn.bing.com/search?q=%s",
        搜狗: "https://www.sogou.com/web?query=%s",
        秘迹: "https://mijisou.com/?q=%s",
        头条: "https://m.toutiao.com/search?keyword=%s",
        神马: "https://yz.m.sm.cn/s?q=%s",
        夸克: "https://quark.sm.cn/s?q=%s",
    },
    图片: {
        谷歌: "https://www.google.com/search?q=%s&tbm=isch",
        百度: "https://image.baidu.com/search/index?tn=baiduimage&word=%s",
        必应: "https://cn.bing.com/images/search?q=%s",
    },
    音乐: {
        qq: "https://y.qq.com/portal/search.html#w=%s",
        网易云: "https://music.163.com/#/search/m/?s=%s",
        酷狗: "https://www.kugou.com/yy/html/search.html#searchType=song&searchKeyWord=%s",
        虾米: "https://www.xiami.com/search?key=%s",
        酷我: "http://www.kuwo.cn/search/list?key=%s",
    },
    视频: {
        bilibili: "https://search.bilibili.com/all?keyword=%s",
        优酷: "https://so.youku.com/search_video/q_%s",
        腾讯: "https://v.qq.com/x/search/?q=%s",
        爱奇艺: "https://so.iqiyi.com/so/q_%s",
        芒果: "https://so.mgtv.com/so/k-%s",
    },
    社交: {
        微信: "https://weixin.sogou.com/weixin?type=2&query=%s",
        知乎: "https://www.zhihu.com/search?type=content&q=%s",
        微博: "https://s.weibo.com/weibo?q=%s",
    },
    开发: {
        github: "https://github.com/search?q=%s",
        archlinux: "https://wiki.archlinux.org/index.php?search=%s",
    },
    购物: {
        淘宝: "https://s.taobao.com/search?q=%s",
        京东: "https://search.jd.com/Search?keyword=%s",
    },
    翻译: {
        英译中: "https://translate.google.cn/#view=home&op=translate&sl=en&tl=zh-CN&text=%s",
        中译英: "https://translate.google.cn/#view=home&op=translate&sl=zh-CN&tl=en&text=%s",
        deepl中英: "https://www.deepl.com/translator#zh/en/%s",
        deepl英中: "https://www.deepl.com/translator#en/zh/%s",
    },
};
Stext = "";
for (i in search) {
    Stext += `<a onclick="choose('${i}')"><div class="s" id="${i}">${i}</div></a>`;
}
document.querySelector("#S").innerHTML = Stext;

Select = document.querySelector("#mySelect");

// 切换搜索项目
function choose(chanse) {
    $(".s").each(function () {
        this.style.color = "#0008";
    });
    $("#" + chanse).css("color", "#000");

    html = "";
    for (n in search[chanse]) {
        if (localStorage.indexEngine == n) {
            html += `<option selected value="${search[chanse][n]}">${n}</option>`;
        } else {
            html += `<option value="${search[chanse][n]}">${n}</option>`;
        }
    }
    Select.innerHTML = html;
    document.querySelector("#text").focus();
}
choose("综合");

// 搜索
function go() {
    var x = document.querySelector("#mySelect").selectedIndex;
    var y = document.querySelector("#mySelect").options;
    var text = document.querySelector("#text").value;
    //判断网址
    var re = new RegExp(
        /(\.com|\.edu|\.gov|\.int|\.mil|\.net|\.org|\.biz|\.info|\.pro|\.name|\.museum|\.coop|\.aero|\.xxx|\.idv|\.ac|\.ad|\.ae|\.af|\.ag|\.ai|\.al|\.am|\.an|\.ao|\.aq|\.ar|\.as|\.at|\.au|\.aw|\.az|\.ba|\.bb|\.bd|\.be|\.bf|\.bg|\.bh|\.bi|\.bj|\.bm|\.bn|\.bo|\.br|\.bs|\.bt|\.bv|\.bw|\.by|\.bz|\.ca|\.cc|\.cd|\.cf|\.cg|\.ch|\.ci|\.ck|\.cl|\.cm|\.cn|\.co|\.cr|\.cu|\.cv|\.cx|\.cy|\.cz|\.de|\.dj|\.dk|\.dm|\.do|\.dz|\.ec|\.ee|\.eg|\.eh|\.er|\.es|\.et|\.eu|\.fi|\.fj|\.fk|\.fm|\.fo|\.fr|\.ga|\.gd|\.ge|\.gf|\.gg|\.gh|\.gi|\.gl|\.gm|\.gn|\.gp|\.gq|\.gr|\.gs|\.gt|\.gu|\.gw|\.gy|\.hk|\.hm|\.hn|\.hr|\.ht|\.hu|\.id|\.ie|\.il|\.im|\.in|\.io|\.iq|\.ir|\.is|\.it|\.je|\.jm|\.jo|\.jp|\.ke|\.kg|\.kh|\.ki|\.km|\.kn|\.kp|\.kr|\.kw|\.ky|\.kz|\.la|\.lb|\.lc|\.li|\.lk|\.lr|\.ls|\.lt|\.lu|\.lv|\.ly|\.ma|\.mc|\.md|\.mg|\.mh|\.mk|\.ml|\.mm|\.mn|\.mo|\.mp|\.mq|\.mr|\.ms|\.mt|\.mu|\.mv|\.mw|\.mx|\.my|\.mz|\.na|\.nc|\.ne|\.nf|\.ng|\.ni|\.nl|\.no|\.np|\.nr|\.nu|\.nz|\.om|\.pa|\.pe|\.pf|\.pg|\.ph|\.pk|\.pl|\.pm|\.pn|\.pr|\.ps|\.pt|\.pw|\.py|\.qa|\.re|\.ro|\.ru|\.rw|\.sa|\.sb|\.sc|\.sd|\.se|\.sg|\.sh|\.si|\.sj|\.sk|\.sl|\.sm|\.sn|\.so|\.sr|\.st|\.sv|\.sy|\.sz|\.tc|\.td|\.tf|\.tg|\.th|\.tj|\.tk|\.tl|\.tm|\.tn|\.to|\.tp|\.tr|\.tt|\.tv|\.tw|\.tz|\.ua|\.ug|\.uk|\.um|\.us|\.uy|\.uz|\.va|\.vc|\.ve|\.vg|\.vi|\.vn|\.vu|\.wf|\.ws|\.ye|\.yt|\.yu|\.yr|\.za|\.zm|\.zw)($|\/)/,
        "g"
    );

    if (re.test(text)) {
        window.open("https://" + text);
    } else {
        window.open(y[x].value.replace("%s", text));
    }

    localStorage.indexEngine = y[x].innerHTML;
}

// 快速删除
document.querySelector("#text").oninput = () => {
    if (document.querySelector("#text").value.indexOf("xxx") != -1) {
        document.querySelector("#text").value = "";
    }
};

// 搜索建议
document.querySelector("#text").oninput = () => {
    if (document.querySelector("#text").value != "") {
        $.ajax({
            async: false,
            url: `http://suggestion.baidu.com/su?wd=${document.querySelector("#text").value}&json=1&p=3&cb=show_sg`,
            type: "GET",
            dataType: "jsonp",
            error: (data) => {
                show_sg();
            },
        });
    } else {
        document.querySelector("#suggestion").innerHTML = "";
    }
};

// 搜索建议展示
select_sg_i = -1;
function show_sg(suggestion_data) {
    select_sg_i = -1;
    var x = "";
    for (i in suggestion_data.s) {
        x += `<div class="sg_item" onclick="go_sg('${suggestion_data.s[i]}')">${suggestion_data.s[i]}</div>`;
    }
    document.querySelector("#suggestion").innerHTML = x;
}

// 搜索建议跳转
function go_sg(link) {
    document.querySelector("#text").value = link;
    go();
}

// 快捷键
document.onkeyup = function (e) {
    var key = e.key;
    if (key == "Enter") {
        // 搜索
        if (select_sg_i != -1) {
            document.querySelector("#text").value =
                document.querySelectorAll("#suggestion > div")[select_sg_i].innerText;
        }
        go();
    } else if (key == "/") {
        // 聚焦
        document.querySelector("#text").focus();
    }
    if (e.ctrlKey) {
        // 切引擎
        if (key == "ArrowUp") {
            if ($("#mySelect option:selected").prev().val() != undefined) {
                $("#mySelect").val($("#mySelect option:selected").prev().val());
            } else {
                $("#mySelect").val($("#mySelect option").last().val());
            }
        } else if (key == "ArrowDown") {
            if ($("#mySelect option:selected").next().val() != undefined) {
                $("#mySelect").val($("#mySelect option:selected").next().val());
            } else {
                $("#mySelect").val($("#mySelect option").first().val());
            }
        }
    } else {
        // 切建议
        if (key == "ArrowUp") {
            sg_c("up");
        } else if (key == "ArrowDown") {
            sg_c("down");
        }
    }
};

function sg_c(v) {
    document.querySelector("#text").blur();
    var select_sg_i_o = select_sg_i;
    var all = document.querySelectorAll("#suggestion > div").length;
    if (v == "up") {
        if (select_sg_i == -1) {
            select_sg_i = all - 1;
        } else {
            select_sg_i = select_sg_i - 1;
        }
    } else {
        select_sg_i = select_sg_i + 1;
        if (select_sg_i == all) select_sg_i = -1;
    }
    if (select_sg_i == -1) document.querySelector("#text").focus();
    document.querySelectorAll("#suggestion > div")[select_sg_i_o]?.classList.remove("sg_s");
    document.querySelectorAll("#suggestion > div")[select_sg_i]?.classList.add("sg_s");
}

document.querySelector("#text").onfocus = () => {
    document.querySelectorAll("#suggestion > div")[select_sg_i]?.classList.remove("sg_s");
    select_sg_i = -1;
};

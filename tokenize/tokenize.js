var regexp = {  //存放用到的正则表达式
    comma:/^\s*,\s*/,
    separator:/^\s*[\+>~]\s*|\s+/,
    rtrim:/\s+/g,
    tag:/^\s*([a-zA-Z]+)\s*/,
    class:/^\s*(\.[a-zA-Z]+)\s*/,
    child:/^\s*:((?:first|last)-child|nth-child\(([1-9]+)\))\s*/,
    attr:/^asdadawd$/,
    pseudo:/^asdasda$/,
    id:/^\s*(#[a-zA-Z])+\s*/
};

var filter = ['tag','class','child','attr','pseudo','id']; //存放第三次匹配的类型

function createCache() {  //创建缓存
    var keys = [];
    function cache(selector,tokens) {
        if(keys.length>100){
            delete cache[keys.shift()];
        }

        return cache[selector+' '] = tokens;
    }

    return cache;
}

var cache = createCache();

function tokenize(selector,parseOnly){
    var originSelector = selector;

    if(cache[selector+' ']){
        return cache[selector+' '];
    }

    var match; //通用，获得某一次exec的数组
    var tokens = []; //储存最后的解析数组;
    var token = [];  //储存单次解析数组;
    var matchs,value,tag;
    var len,i;

    tokens.push(token);
    while(selector){
        match = false;
        //第一部分：匹配逗号
        if((match = regexp.comma.exec(selector))&&match.index===0){
            token = [];
            tokens.push(token);
            selector = selector.slice(match[0].length);
        }
        //第二部分：匹配+~空格>
        else if((match = regexp.separator.exec(selector))&&match.index===0){
            value = match.shift();
            tag = value.replace(regexp.rtrim,' ');
            token.push({value:value,tag:tag});
            selector = selector.slice(value.length);
        }
        //第三部分：匹配剩余的标签
        else {
            len = filter.length;
            for(i=0;i<len;i++){
                if((match = regexp[filter[i]].exec(selector))&&match.index===0){
                    value = match.shift();
                    tag = match[0];
                    matchs = match;
                    token.push({value:value,tag:tag,matchs:match});
                    selector = selector.slice(value.length);
                    break;
                }
            }
        }

        if(!match){
            break;
        }
    }

    return parseOnly?
        selector.length:
        selector.length?
            false:
            cache(originSelector,tokens);
}

console.log(tokenize('div.apple p>#apple+em div:nth-child(9),div p+p:last-child'));
console.log(cache);
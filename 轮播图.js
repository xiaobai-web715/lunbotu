let ul = document.getElementsByTagName('ul')[0],
    dot = document.getElementsByClassName('dot')[0],
    li = document.getElementsByTagName('li'),
    ulPosition = parseFloat(ul.style.left),
    len = li.length,
    imgWidth = li[0].offsetWidth,
    //count1是用来计数正常轮播的
    count1 = 0,
    //count2是用来计数点击按钮的数值的
    count2 = 0,
    classNameChange = 0;
ul.style.width = imgWidth*len;
let timer = null;
let btuFl = document.getElementsByTagName('button')[0],
    btuFr = document.getElementsByTagName('button')[1];
// 创建圆点(重复图片要减去,所以要少创建一个)
for(var i = 0 ; i < len-1 ; i++){
    em = document.createElement('em');
    // em.innerText = i;
    // 向em标签中写入文本
    em.style.cursor = 'pointer'
    dot.appendChild(em);
}
var em = document.getElementsByTagName('em');
em[0].className = 'active';
// 点击button按钮触发事件
btuFl.addEventListener('click' , test1 , false);
btuFr.addEventListener('click' , test2 , false);
//左右按钮的公共事件
const public = (target) => {
    // 0--len-2的数量正好是图片数量减一张
    for(var k = 0 ; k < len - 1 ; k++){
        em[k].className = '';
    }
    em[target].className = 'active';
    // count2与count1始终保持一致,所以这里直接传入count2,将索引位count2的className变成active就可以了
    ul.style.left = ulPosition - target*imgWidth + 'px';
    //目前这里的修改想法是这里可以在点击左右按钮的时候先清除一下定时器任务,等移动完成之后再重启定时器函数
    timer = setInterval(fn , 4000)
}
function test1(){
    clearTimeout(timer)
    count2 --;
    if(count2 < 0){
        ul.style.transition = 'all 0s'
        count2 = len-2;
    }else{
        ul.style.transition = 'all 3s'
    }
    public(count2)  
}
function test2(){
    clearTimeout(timer)
    count2 ++;
    if(count2 == len - 1){
        ul.style.transition = 'all 0s'
        count2 = 0;  
    }else{
        ul.style.transition = 'all 3s'
    }
    public(count2)
}
//轮播逻辑
const fn = () => {
    //轮播逻辑使count1与count2始终保持一致
    count1 = count2;
    count1++;
    count2++;
    setTimeout(() => {
        for(let k = 0 ; k < len-1 ; k++){
            em[k].className = '';
        }
        //实现无缝轮播的话,后面需要加一张第一张图片,当count1计数到len-1的时候,已经到了最后一张重复的图片了,直接将样式改成第一个有就可以了
        if(count1 == len - 1){
            em[0].className = 'active';
        }else{
            em[count1].className = 'active';
        }
    } , 1000)
    ul.style.left = ulPosition - count1*imgWidth + 'px';
    ul.style.transition = 'all 3s'
    // 下面的if语句是防止count2一直累加，超过点击函数里面的if判断条件
    if(count2 == len - 1){
        count2 = 0;
     }
    if(count1 == len - 1 ){
       setTimeout(() => {
           ul.style.left = ulPosition - 0 + 'px';
           ul.style.transition = 'all 0s'
           count1 = 0;
       } , 3000)
    }
}
// 计时器事件
timer = setInterval(fn ,4000)
// 函数要写在事件绑定函数前面，要不然第一个em标签无法被绑上对应的函数
var switchOver = (target) =>{
    clearInterval(timer)
    //count2与点击的位置相对应
    count2 = target;
    for(var k = 0 ; k < len-1 ; k++){
        em[k].className = '';
    }
    em[count2].className = 'active';
    ul.style.left = ulPosition - count2*imgWidth + 'px';
    ul.style.transition = 'all 0s'
    timer = setInterval(fn ,4000)
} 
//因为最后一张是一个重复的图片,所以绑定事件的时候也是少一个(给小圆点绑定点击的事件监听函数)
for(let t = 0 ; t < len-1 ; t++){
    em[t].addEventListener('click' , switchOver.bind(null , t) , false);
}






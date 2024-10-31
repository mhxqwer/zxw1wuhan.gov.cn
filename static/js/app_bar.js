//导航栏更多部分点击隐藏或展示处理
function nav_more(){
    var more  = $('a.nav-botton .app-nav-bar-more-bg');
    if(more){
        if(more.css('display') === 'none'){
            more.css({'display': 'block'});
        }else{
            more.hide();
        }
    }
}
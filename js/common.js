requestComponents('NavBar', 'page-top')
requestComponents('FooterBar', 'page-bottom')
// 页面 DOM 结构加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    // 这里写你要执行的操作，比如：
    console.log('DOM 加载完成，可以操作元素了');
    // 页面滚动顶部动画
    let nav_bar_li = document.querySelectorAll('#nav-bar-box>li')
    let nav_bar = document.querySelector('#nav-bar-conrainer')
    let nav_bar_title = document.querySelector('#nav-bar-title')
    document.addEventListener('scroll', function (e) {
        if (window.scrollY > 200) {
            for (let index = 0; index < nav_bar_li.length; index++) {
                nav_bar_li[index].classList.add('nav-bar-animation-li')
            }
            nav_bar.classList.add('nav-bar-conrainer-animation')
            nav_bar_title.classList.add('nav-bar-title-animation')

        } else {
            for (let index = 0; index < nav_bar_li.length; index++) {
                nav_bar_li[index].classList.remove('nav-bar-animation-li')
            }
            nav_bar.classList.remove('nav-bar-conrainer-animation')
            nav_bar_title.classList.remove('nav-bar-title-animation')

        }
    })
});



function toggleClass(className, elementList, elementActive) {
    for (let index = 0; index < elementList.length; index++) {
        array[index].classList.remove(className)
    }
    elementActive.classList.add(className)
}

// 页面组件映射
function requestComponents(componentsName, showID) {
    const targetUrl = '../components/' + componentsName + '.html'; // 例如同域下的另一个页面

    // 发送请求获取目标页面HTML
    fetch(targetUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('请求失败');
            }
            return response.text(); // 获取HTML文本
        })
        .then(html => {
            // 将获取的HTML投射到当前页面
            const container = document.getElementById(showID);
            container.innerHTML = html;
            console.log('已加载目标页面内容');
        })
        .catch(error => {
            console.error('获取失败：', error);
        });
}


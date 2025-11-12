let pages = [
    'Home.html',
    'About.html',
    'PlantProtection.html',
    'Events.html',
    'Resources.html',
    'Links.html',
    'Membership.html',
    'Cart.html',
    'Login.html'
]

// 页面组件映射
function requestComponents(componentsName, showID) {
    // const targetUrl = '../components/' + componentsName + '.html'; // 例如同域下的另一个页面
    // const targetUrl = `https://ranxin109.github.io/PlantProtection/components/${componentsName}.html`
    // https://raw.githubusercontent.com/ranxin109/PlantProtection/refs/heads/master/components/NavBar.html
    const targetUrl = `https://raw.githubusercontent.com/ranxin109/PlantProtection/refs/heads/master/components/${componentsName}.html`

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


// 页面滚动顶部动画
function scrollAnation(activeElement) {
    let nav_bar_li = document.querySelectorAll('#nav-bar-box>li')
    let nav_bar = document.querySelector('#nav-bar-conrainer')
    let nav_bar_title = document.querySelector('#nav-bar-title')
    // 检查元素是否存在
    if (!nav_bar_li || !nav_bar || !nav_bar_title) {
        console.error('未找到导航栏元素，请检查选择器或组件是否加载');
        // scrollAnation()
    }
    document.addEventListener('scroll', function (e) {
        console.log(window.scrollY)
        if (window.scrollY > 100) {
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
}
requestComponents('NavBar', 'page-top')
requestComponents('FooterBar', 'page-bottom')
requestComponents('BgTitle', 'page-title')

setTimeout(function () {
    scrollAnation()
    toggleNav()
    toggleTranslate()
}, 500)

function reTitle(title, bgImage) {
    let BgTitle = document.querySelector('#BgTitle>h1')
    let BgImage = document.querySelector('#BgTitle')
    BgImage.style.backgroundImage = `url(${bgImage})`
    BgTitle.textContent = title
}

function toggleNav() {
    let nav = document.querySelector('#nav-bar-box')
    let nav_li = document.querySelectorAll('#nav-bar-box>li')
    for (let index = 0; index < nav_li.length; index++) {
        const element = nav_li[index];
        element.addEventListener('click', function (e) {
            e.preventDefault()
            console.log(e.currentTarget)
            location.href = `${e.currentTarget.dataset.nav}.html`
        })
    }
}
function toggleClass(className, elementList, elementActive) {
    for (let index = 0; index < elementList.length; index++) {
        elementList[index].classList.remove(className)
    }
    elementActive.classList.add(className)
}

function activeNav(index) {
    let nav_bar_li = document.querySelectorAll('#nav-bar-box>li')
    let nav_bar_li_list = [...nav_bar_li]
    nav_bar_li_list[index].classList.add('active')
}

function toggleTranslate() {
    let _translate = document.querySelector('#translate-language')
    let _translate_li = document.querySelectorAll('#translate-language>li')
    _translate.addEventListener('click', function (e) {
        if (e.target === this) return
        toggleClass('active', _translate_li, e.target)
    })

}
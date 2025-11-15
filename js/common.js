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
    mobile_nav()
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

let nav_data_list = [
    {
        name: 'Home',
        icon: 'fa-house'
    },
    {
        name: 'About',
        icon: 'fa-circle-info',
        children: [
            { name: 'Aims & Activities' },
            { name: 'Brief History of IAPPS' },
            { name: 'The IAPPS Board' }
        ]
    },
    {
        name: 'Plant Protection',
        icon: 'fa-comments',
        children: [
            {
                name: 'The International Plant Protection Congress (IPPC)'
            },
            {
                name: 'IAPPS Regional Seminars, Workshops, and Congresses'
            },
            {
                name: 'Other Plant Protection Meetings'
            }
        ]
    },
    {
        name: 'Events',
        icon: 'fa-leaf',
        children: [
            {
                name: 'Introduction',
                children: [
                    { name: 'Next Congress – Christchurch, New Zealand 2027' },
                    { name: 'Application details for hosting the IPPC 2031' }
                ]
            },
            {
                name: 'An Integrated Approach to Plant Protection',
                children: [
                    { name: 'Forthcoming Regional Seminars, Workshops, and Congresses' },
                    { name: 'Previous IAPPS Regional Seminars, Workshops, and Congresses' }
                ]
            },
            {
                name: 'Main Disciplines',
                children: [
                    { name: 'Forthcoming Meetings' },
                    { name: 'Previous Meetings' }
                ]
            }
        ]
    },
    {
        name: 'Resources',
        icon: 'fa-building-columns',
        children: [
            { name: 'Online News – GPPN' },
            { name: 'IAPPS Newsletter & Archive' },
            { name: 'Crop Protection Journal' },
            {
                name: 'Education and Training',
                children: [
                    { name: 'Plant Protection Stories – reports, news, and opinions on plant protection' },
                    { name: 'A Review of Digital Identification Tools for Plant Biosecurity' },
                    { name: 'Online identification keys for rice insect pests and natural enemies' },
                    { name: 'Guide to Plant Protection information' },
                ]
            }
        ]
    },
    {
        name: 'Links',
        icon: 'fa-link'
    },
    {
        name: 'Membership',
        icon: 'fa-people-group',
        children: [
            { name: 'Join IAPPS' },
            { name: 'Available Subscriptions' }
        ]
    },
    {
        name: 'Cart',
        icon: 'fa-cart-shopping'
    },
    {
        name: 'Login',
        icon: 'fa-user'
    }
]
function mobile_nav() {
    let mobile_nav_html = ''
    let menu_one_level = document.querySelector('#menu-one-level')
    for (let index = 0; index < nav_data_list.length; index++) {
        let two_level = ''
        let three_level = ''
        if (nav_data_list[index].children) {
            console.log(nav_data_list[index].children)
            two_level = ''
            for (let j = 0; j < nav_data_list[index].children.length; j++) {
                const element = nav_data_list[index].children[j];
                if (element.children) {
                    three_level = ''
                    element.children.forEach(three_element => {
                        three_level += `<li>${three_element.name}</li>`
                    })
                    two_level += `
                <li>
                    <div class="menu-title-box">
                        <p>${element.name}</p>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                    <ul class="menu-three-level">
                        ${three_level}
                    </ul>
                </li>
                `
                } else {
                    two_level += `<li>${element.name}</li>`
                }
            }
            mobile_nav_html += `
            <li data-nav="PlantProtection">
                        <div>
                            <i class="fa-solid ${nav_data_list[index].icon}"></i>
                            <p>${nav_data_list[index].name}</p>
                            <i class="fa-solid fa-caret-down"></i>
                        </div>
                        <ul class="menu-two-level">${two_level}</ul>
            </li>
            `
        } else {
            mobile_nav_html += `
        <li class="" data-nav="Home">
                        <div>
                            <i class="fa-solid ${nav_data_list[index].icon}"></i>
                            <p>${nav_data_list[index].name}</p>
                        </div>
                    </li>
        `
        }


    }
    menu_one_level.innerHTML = mobile_nav_html
    document.querySelector('#menu-one-level>:first-child').classList.add('active')
    let all_level_element_list = document.querySelector('#menu-one-level').querySelectorAll('*')
    let one_level_element_list = document.querySelectorAll('#menu-one-level>li')
    let one_level_menu = document.querySelector('#menu-one-level')
    one_level_element_list.forEach(item => {
        item.addEventListener('click', function (e) {
            if (!e.currentTarget.querySelector('ul')) {
                toggleClass('active', all_level_element_list, e.currentTarget)
                return
            }
            if ((e.target.tagName === 'LI') & !e.target.querySelector('ul')) {
                toggleClass('active', all_level_element_list, e.target)

            }
        })
    })
    let nav_mask = document.querySelector('#nav-bar-menu-btn')
    document.querySelector('#nav-mask>i').addEventListener('click', function () {
        one_level_menu.classList.toggle('active')
        nav_mask.classList.toggle('active')
    })
    nav_mask.addEventListener('click', function () {
        one_level_menu.classList.toggle('active')
        nav_mask.classList.toggle('active')
    })
}




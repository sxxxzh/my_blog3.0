// 处理移动端菜单
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // 点击导航链接时关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // 点击菜单外部时关闭菜单
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

// 检查用户登录状态
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const authButtons = document.querySelector('.auth-buttons');

    if (!authButtons) return;

    let user = null;
    try {
        const raw = localStorage.getItem('user');
        user = raw ? JSON.parse(raw) : null;
    } catch (e) {
        user = null;
    }

    if (token && user && user.name) {
        authButtons.innerHTML = `
            <span>欢迎，${user.name}</span>
            <button class="btn-outline" onclick="logout()">退出</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button id="loginBtn" class="btn-outline">登录</button>
            <button id="registerBtn" class="btn-primary">注册</button>
        `;
    }
}

// 退出登录
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    checkAuthStatus();

    // 绑定登录按钮事件
    document.getElementById('loginBtn')?.addEventListener('click', () => {
        window.location.href = '/login.html';
    });

    // 绑定注册按钮事件
    document.getElementById('registerBtn')?.addEventListener('click', () => {
        window.location.href = '/register.html';
    });
}); 

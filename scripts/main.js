// 1. 定义初始化函数
async function init() {
  try {
    // 加载导航栏
    const response = await fetch("./shared/navbar.html");
    const html = await response.text();
    document.getElementById("navbar").innerHTML = html;

    // 高亮当前链接
    const currentPath = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  } catch (error) {
    console.error("初始化失败:", error);
  }
  try {
    // 加载页脚
    const footerResponse = await fetch("./shared/footer.html");
    const footerHtml = await footerResponse.text();
    document.getElementById("footer").innerHTML = footerHtml;
  } catch (error) {
    console.error("页脚加载失败:", error);
  }
}

// 2. 执行初始化函数
init();

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// 技能条动画
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width")
          if (width) {
            entry.target.style.width = width
          }
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => observer.observe(bar))
}

// 页面加载完成后执行
document.addEventListener("DOMContentLoaded", () => {
  // 添加淡入动画
  const fadeElements = document.querySelectorAll(".fade-in")
  fadeElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`
  })

  // 初始化技能条动画
  animateSkillBars()

  // 导航栏滚动效果
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
    } else {
      navbar.style.background = "#fff"
      navbar.style.backdropFilter = "none"
    }
  })
})

// 表单提交处理
function handleFormSubmit(formId, successMessage) {
  const form = document.getElementById(formId)
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // 这里可以添加实际的表单提交逻辑
      // 例如发送到后端API或第三方服务

      // 显示成功消息
      alert(successMessage || "消息发送成功！")

      // 重置表单
      form.reset()
    })
  }
}

// 工具函数
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 响应式处理
function handleResize() {
  const navbar = document.querySelector(".navbar")
  const navMenu = document.querySelector(".nav-menu")

  if (window.innerWidth > 768) {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  }
}

window.addEventListener("resize", debounce(handleResize, 250))

// 项目筛选功能
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // 更新按钮状态
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // 筛选项目
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          card.style.display = "block"
          card.style.animation = "fadeIn 0.5s ease forwards"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // 项目卡片悬停效果
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

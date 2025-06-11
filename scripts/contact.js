// 联系表单处理
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // 获取表单数据
      const formData = new FormData(this)
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      }

      // 简单的表单验证
      if (!data.name || !data.email || !data.subject || !data.message) {
        alert("请填写所有必填字段")
        return
      }

      // 邮箱格式验证
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("请输入有效的邮箱地址")
        return
      }

      // 这里可以集成实际的邮件发送服务
      // 例如 EmailJS, Formspree, 或自己的后端API

      // 模拟发送过程
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML

      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...'
      submitButton.disabled = true
      emailjs.init("ptTMmq-1CI-2m1bFg")
      emailjs.send("service_ysp2b0p", "template_goh3lds", data)
        .then(() => {
          alert("消息发送成功！我会尽快回复您。")
          contactForm.reset()
        })
        .catch((error) => {
          console.error("发送失败：", error)
          alert("发送失败，请稍后再试。")
        })
        .finally(() => {
          submitButton.innerHTML = originalText
          submitButton.disabled = false
        })
    })
  }

  // 表单字段实时验证
  const inputs = document.querySelectorAll(".contact-form input, .contact-form textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })

    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        validateField(this)
      }
    })
  })

  function validateField(field) {
    const value = field.value.trim()

    // 移除之前的错误状态
    field.classList.remove("error")

    // 检查必填字段
    if (field.hasAttribute("required") && !value) {
      field.classList.add("error")
      return false
    }

    // 邮箱验证
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        field.classList.add("error")
        return false
      }
    }

    return true
  }
})

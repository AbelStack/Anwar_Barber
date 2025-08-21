// DOM Elements
const loadingScreen = document.getElementById("loading-screen")
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const scrollTopBtn = document.getElementById("scroll-top")
const contactForm = document.getElementById("contact-form")
const testimonialTrack = document.getElementById("testimonial-track")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")

// Simplified Loading Screen
window.addEventListener("load", () => {
  const progressFill = document.querySelector(".progress-fill")
  const progressPercentage = document.querySelector(".progress-percentage")
  let progress = 0

  // Smooth progress animation
  const progressInterval = setInterval(() => {
    progress += Math.random() * 10 + 5 // Random increment between 5-15
    if (progress > 100) progress = 100
    progressFill.style.width = progress + "%"
    progressPercentage.textContent = Math.floor(progress) + "%"
    if (progress >= 100) {
      clearInterval(progressInterval)
      // Hide loading screen after completion
      setTimeout(() => {
        loadingScreen.classList.add("hidden")
        document.body.style.overflow = "visible"
      }, 800)
    }
  }, 150)
})

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Scroll to top button
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible")
  } else {
    scrollTopBtn.classList.remove("visible")
  }
})

// Scroll to top functionality
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Gallery Filter Functionality
const filterBtns = document.querySelectorAll(".filter-btn")
const galleryItems = document.querySelectorAll(".gallery-item")
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"))
    // Add active class to clicked button
    btn.classList.add("active")
    const filterValue = btn.getAttribute("data-filter")
    galleryItems.forEach((item) => {
      if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
        item.style.display = "block"
        setTimeout(() => {
          item.style.opacity = "1"
          item.style.transform = "scale(1)"
        }, 10)
      } else {
        item.style.opacity = "0"
        item.style.transform = "scale(0.8)"
        setTimeout(() => {
          item.style.display = "none"
        }, 300)
      }
    })
  })
})

// Gallery Lightbox
galleryItems.forEach((item) => {
  item.addEventListener("click", function () {
    const img = this.querySelector("img")
    const title = this.querySelector("h4").textContent

    // Create lightbox
    const lightbox = document.createElement("div")
    lightbox.className = "lightbox"
    lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${title}">
                <div class="lightbox-caption">${title}</div>
            </div>
        `

    // Add lightbox styles
    lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `
    const lightboxContent = lightbox.querySelector(".lightbox-content")
    lightboxContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        `
    const lightboxImg = lightbox.querySelector("img")
    lightboxImg.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        `
    const lightboxClose = lightbox.querySelector(".lightbox-close")
    lightboxClose.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            z-index: 10001;
        `
    const lightboxCaption = lightbox.querySelector(".lightbox-caption")
    lightboxCaption.style.cssText = `
            color: white;
            margin-top: 1rem;
            font-size: 1.2rem;
            font-weight: 600;
        `
    document.body.appendChild(lightbox)

    // Fade in
    setTimeout(() => {
      lightbox.style.opacity = "1"
    }, 10)

    // Close lightbox
    const closeLightbox = () => {
      lightbox.style.opacity = "0"
      setTimeout(() => {
        document.body.removeChild(lightbox)
      }, 300)
    }

    lightboxClose.addEventListener("click", closeLightbox)
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox()
      }
    })

    // Close with Escape key
    document.addEventListener("keydown", function escapeHandler(e) {
      if (e.key === "Escape") {
        closeLightbox()
        document.removeEventListener("keydown", escapeHandler)
      }
    })
  })
})

// Testimonials Carousel
let currentSlide = 0
const slides = document.querySelectorAll(".testimonial-slide")
const dots = document.querySelectorAll(".dot")
const totalSlides = slides.length

function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))
  if (n >= totalSlides) currentSlide = 0
  if (n < 0) currentSlide = totalSlides - 1
  slides[currentSlide].classList.add("active")
  dots[currentSlide].classList.add("active")
}

function nextSlide() {
  currentSlide++
  showSlide(currentSlide)
}

function prevSlide() {
  currentSlide--
  showSlide(currentSlide)
}

// Navigation buttons
nextBtn.addEventListener("click", nextSlide)
prevBtn.addEventListener("click", prevSlide)

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index
    showSlide(currentSlide)
  })
})

// Auto-advance testimonials
setInterval(nextSlide, 5000)

const botToken = "8266055685:AAGPJMsPKz7Od3jsR3u7ElgfdLOEJeIbaI0"
const chatId = "5230396792"

contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const service = formData.get("service")
  const date = formData.get("date")
  const message = formData.get("message") || "ለጊዜው ምንም መልእክት የለም"

  // Updated basic validation to make email optional
  if (!name || !phone || !service || !date) {
    showNotification("Please fill in all required fields.", "error")
    return
  }

  // Email validation only if email is provided
  if (email && email.trim() !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address.", "error")
      return
    }
  }

  // Phone validation (allow +251 or 0 start)
  const phoneRegex = /^(\+251|0)\d{8,12}$/
  if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
    showNotification("Please enter a valid phone number starting with +251 or 0.", "error")
    return
  }

  // Date validation (must be future date)
  const selectedDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (selectedDate < today) {
    showNotification("Please select a future date.", "error")
    return
  }

  // Show loading state
  const submitBtn = this.querySelector(".submit-btn")
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...'
  submitBtn.disabled = true

  // Prepare Telegram message
  const serviceSelect = document.getElementById("service")
  const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text

  // Handle optional email in Telegram message
  const emailLine = email && email.trim() !== "" ? `*Email:* ${email}\n` : ""

  const text =
    `📅 *አዲስ ቀጠሮ*\n\n` +
    `*ስም:* ${name}\n` +
    emailLine +
    `*ስልክ:* ${phone}\n` +
    `*አገልግሎት:* ${serviceText}\n` +
    `*የሚፈልጉት ቀን:* ${date}\n` +
    `*መልእክት:* ${message}`

  const proxyUrl = "https://api.allorigins.win/raw?url="
  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
  const fullUrl = proxyUrl + encodeURIComponent(telegramUrl)

  // Send to Telegram bot using POST method
  fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown",
    }),
  })
    .then((response) => {
      console.log("[v0] Response status:", response.status)
      return response.json()
    })
    .then((data) => {
      console.log("[v0] Telegram API response:", data)
      if (data.ok) {
        // Show success notification after 2 seconds
        setTimeout(() => {
          showNotification(
            `እናመሰግናለን, ${name}! ያስያዙትን ቀጠሮ ተቀብለናል፡፡ ያስያዙትን ${serviceText.split(" - ")[0]} ቀጠሮ ለማረጋገጥ ወደዚህ ${phone} ስልክ ቁጥር እንደውላለን።`,
            "success",
          )
          // Reset form
          this.reset()
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
        }, 2000)
      } else {
        console.error("[v0] Telegram API error:", data)
        showNotification("Failed to send appointment. Please try again later.", "error")
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }
    })
    .catch((error) => {
      console.error("[v0] Network error:", error)
      const altProxyUrl = "https://corsproxy.io/?"
      const altFullUrl = altProxyUrl + encodeURIComponent(telegramUrl)

      fetch(altFullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ok) {
            setTimeout(() => {
              showNotification(`እናመሰግናለን, ${name}! ያስያዙትን ቀጠሮ ተቀብለናል፡፡`, "success")
              this.reset()
              submitBtn.innerHTML = originalText
              submitBtn.disabled = false
            }, 2000)
          } else {
            throw new Error("Alternative proxy also failed")
          }
        })
        .catch(() => {
          showNotification("Error sending appointment. Please try again later.", "error")
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
        })
    })
})

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Notification styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        background: ${type === "success" ? "#10B981" : type === "error" ? "#EF4444" : "#3B82F6"};
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `
  const notificationContent = notification.querySelector(".notification-content")
  notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    `
  document.body.appendChild(notification)

  // Slide in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 10)

  // Auto remove after 5 seconds
  const autoRemove = setTimeout(() => {
    removeNotification()
  }, 5000)

  // Manual close
  const removeNotification = () => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
    clearTimeout(autoRemove)
  }

  closeBtn.addEventListener("click", removeNotification)
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".service-card, .barber-card, .gallery-item, .info-card")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBackground = document.querySelector(".hero-background")
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`
  }
})

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Elite Barber Shop website loaded successfully!")
  const dateInput = document.getElementById("date")
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0] // Set minimum date and default value
    dateInput.setAttribute("min", today)
    dateInput.value = today
    dateInput.setAttribute("type", "date") // Force the date input to show the calendar picker
    dateInput.style.colorScheme = "light dark"
    dateInput.style.position = "relative" // Ensure the calendar icon is always visible
    dateInput.addEventListener("focus", function () {
      this.showPicker && this.showPicker()
    })
    // Make sure the date value is always visible
    dateInput.addEventListener("blur", function () {
      if (!this.value) {
        this.value = today
      }
    })
    // Add click handler to ensure calendar opens
    dateInput.addEventListener("click", function () {
      this.showPicker && this.showPicker()
    })
    // Prevent the input from being empty
    dateInput.addEventListener("change", function () {
      if (!this.value) {
        this.value = today
        showNotification("Please select a valid date.", "error")
      }
    })
  }

  // Add loading states to all buttons
  document.querySelectorAll(".btn, .service-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (this.getAttribute("href") && this.getAttribute("href").startsWith("#")) {
        return // Skip for anchor links
      }
      const originalText = this.innerHTML
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'
      setTimeout(() => {
        this.innerHTML = originalText
      }, 1000)
    })
  })
})

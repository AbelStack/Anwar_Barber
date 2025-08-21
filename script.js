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

  const progressInterval = setInterval(() => {
    progress += Math.random() * 10 + 5
    if (progress > 100) progress = 100

    progressFill.style.width = progress + "%"
    progressPercentage.textContent = Math.floor(progress) + "%"

    if (progress >= 100) {
      clearInterval(progressInterval)
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
  if (window.scrollY > 100) navbar.classList.add("scrolled")
  else navbar.classList.remove("scrolled")

  if (window.scrollY > 300) scrollTopBtn.classList.add("visible")
  else scrollTopBtn.classList.remove("visible")
})

// Scroll to top functionality
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  })
})

// Gallery Filter
const filterBtns = document.querySelectorAll(".filter-btn")
const galleryItems = document.querySelectorAll(".gallery-item")

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"))
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
        setTimeout(() => { item.style.display = "none" }, 300)
      }
    })
  })
})

// Gallery Lightbox
galleryItems.forEach((item) => {
  item.addEventListener("click", function () {
    const img = this.querySelector("img")
    const title = this.querySelector("h4").textContent
    const lightbox = document.createElement("div")
    lightbox.className = "lightbox"
    lightbox.innerHTML = `
      <div class="lightbox-content">
          <span class="lightbox-close">&times;</span>
          <img src="${img.src}" alt="${title}">
          <div class="lightbox-caption">${title}</div>
      </div>
    `
    lightbox.style.cssText = `
      position: fixed; top:0; left:0; width:100%; height:100%;
      background: rgba(0,0,0,0.9); display:flex; align-items:center; justify-content:center;
      z-index:10000; opacity:0; transition: opacity 0.3s ease;
    `
    const lightboxContent = lightbox.querySelector(".lightbox-content")
    lightboxContent.style.cssText = `position: relative; max-width:90%; max-height:90%; text-align:center;`
    const lightboxImg = lightbox.querySelector("img")
    lightboxImg.style.cssText = `max-width:100%; max-height:80vh; border-radius:10px; box-shadow:0 20px 40px rgba(0,0,0,0.5);`
    const lightboxClose = lightbox.querySelector(".lightbox-close")
    lightboxClose.style.cssText = `position:absolute; top:-40px; right:0; color:white; font-size:30px; cursor:pointer; z-index:10001;`
    const lightboxCaption = lightbox.querySelector(".lightbox-caption")
    lightboxCaption.style.cssText = `color:white; margin-top:1rem; font-size:1.2rem; font-weight:600;`

    document.body.appendChild(lightbox)
    setTimeout(() => { lightbox.style.opacity = "1" }, 10)

    const closeLightbox = () => { lightbox.style.opacity = "0"; setTimeout(()=>{document.body.removeChild(lightbox)},300) }
    lightboxClose.addEventListener("click", closeLightbox)
    lightbox.addEventListener("click", (e) => { if(e.target===lightbox) closeLightbox() })
    document.addEventListener("keydown", function escapeHandler(e) { if(e.key==="Escape"){ closeLightbox(); document.removeEventListener("keydown", escapeHandler) } })
  })
})

// Testimonials Carousel
let currentSlide = 0
const slides = document.querySelectorAll(".testimonial-slide")
const dots = document.querySelectorAll(".dot")
const totalSlides = slides.length

function showSlide(n){
  slides.forEach(s=>s.classList.remove("active"))
  dots.forEach(d=>d.classList.remove("active"))
  if(n>=totalSlides) currentSlide=0
  if(n<0) currentSlide=totalSlides-1
  slides[currentSlide].classList.add("active")
  dots[currentSlide].classList.add("active")
}
function nextSlide(){currentSlide++; showSlide(currentSlide)}
function prevSlide(){currentSlide--; showSlide(currentSlide)}
nextBtn.addEventListener("click", nextSlide)
prevBtn.addEventListener("click", prevSlide)
dots.forEach((dot,i)=>{dot.addEventListener("click",()=>{currentSlide=i; showSlide(currentSlide)})})
setInterval(nextSlide,5000)

// -----------------------------
// Contact Form with Telegram Proxy
// -----------------------------
contactForm.addEventListener("submit", function(e){
  e.preventDefault()
  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const service = formData.get("service")
  const date = formData.get("date")
  const message = formData.get("message") || "ለጊዜው መልእክት የለም"

  if(!name||!phone||!service||!date){ showNotification("Please fill in all required fields.","error"); return }

  const serviceSelect = document.getElementById("service")
  const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text
  const emailLine = email ? `*Email:* ${email}\n` : ""
  const text = `📅 *አዲስ ቀጠሮ*\n\n*ስም:* ${name}\n${emailLine}*ስልክ:* ${phone}\n*አገልግሎት:* ${serviceText}\n*የሚፈልጉት ቀን:* ${date}\n*መልእክት:* ${message}`

  const botToken = "8266055685:AAGPJMsPKz7Od3jsR3u7ElgfdLOEJeIbaI0"
  const chatId = "5230396792"

  fetch("/api/telegram",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({botToken, chatId, text})
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.ok){
      showNotification(`እናመሰግናለን, ${name}! ቀጠሮዎት ተቀብሏል።`,"success")
      this.reset()
    }else{
      showNotification("Failed to send appointment. Please try again.","error")
      console.error("Telegram error:", data)
    }
  })
  .catch(err=>{
    showNotification("Network error. Please try again later.","error")
    console.error(err)
  })
})

// -----------------------------
// Notification System
// -----------------------------
function showNotification(message,type="info"){
  const notification=document.createElement("div")
  notification.className=`notification ${type}`
  notification.innerHTML=`<div class="notification-content">
    <i class="fas ${type==="success"?"fa-check-circle":type==="error"?"fa-exclamation-circle":"fa-info-circle"}"></i>
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  </div>`
  notification.style.cssText=`position:fixed; top:100px; right:20px; max-width:400px; background:${type==="success"?"#10B981":type==="error"?"#EF4444":"#3B82F6"}; color:white; padding:1rem; border-radius:10px; box-shadow:0 10px 25px rgba(0,0,0,0.2); z-index:10000; transform:translateX(100%); transition: transform 0.3s ease;`
  const closeBtn=notification.querySelector(".notification-close")
  document.body.appendChild(notification)
  setTimeout(()=>{notification.style.transform="translateX(0)"},10)
  const autoRemove=setTimeout(()=>{removeNotification()},5000)
  function removeNotification(){notification.style.transform="translateX(100%)"; setTimeout(()=>{if(document.body.contains(notification))document.body.removeChild(notification)},300); clearTimeout(autoRemove)}
  closeBtn.addEventListener("click",removeNotification)
}

// -----------------------------
// Intersection Observer Animations & Hero Parallax
// -----------------------------
const observerOptions={threshold:0.1,rootMargin:"0px 0px -50px 0px"}
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity="1"
      entry.target.style.transform="translateY(0)"
    }
  })
},observerOptions)

document.addEventListener("DOMContentLoaded",()=>{
  const animateElements=document.querySelectorAll(".service-card, .barber-card, .gallery-item, .info-card")
  animateElements.forEach(el=>{
    el.style.opacity="0"
    el.style.transform="translateY(20px)"
    el.style.transition="opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  const dateInput=document.getElementById("date")
  if(dateInput){
    const today=new Date().toISOString().split("T")[0]
    dateInput.setAttribute("min",today)
    dateInput.value=today
    dateInput.setAttribute("type","date")
    dateInput.style.colorScheme="light dark"
    dateInput.style.position="relative"
    dateInput.addEventListener("focus",function(){this.showPicker&&this.showPicker()})
    dateInput.addEventListener("blur",function(){if(!this.value)this.value=today})
    dateInput.addEventListener("click",function(){this.showPicker&&this.showPicker()})
    dateInput.addEventListener("change",function(){if(!this.value){this.value=today; showNotification("Please select a valid date.","error")}})
  }

  document.querySelectorAll(".btn, .service-btn").forEach(btn=>{
    btn.addEventListener("click",function(e){
      if(this.getAttribute("href")&&this.getAttribute("href").startsWith("#")) return
      const originalText=this.innerHTML
      this.innerHTML='<i class="fas fa-spinner fa-spin"></i> Loading...'
      setTimeout(()=>{this.innerHTML=originalText},1000)
    })
  })

  console.log("Elite Barber Shop website loaded successfully!")
})

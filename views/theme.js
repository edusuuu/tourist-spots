

(() => {
    'use strict'
  
    const storedTheme = localStorage.getItem('theme')
    const preferredTheme = getPreferredTheme()
  
    function getPreferredTheme() {
      if (storedTheme) {
        return storedTheme
      }
  
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  
    function setTheme(theme) {
      if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyDarkTheme()
      } else if (theme === 'light') {
        applyLightTheme()
      } else if (theme === 'dark') {
        applyDarkTheme()
      }
    }
  
    function applyLightTheme() {
      document.documentElement.setAttribute('data-bs-theme', 'light')
      document.documentElement.style.backgroundColor = '#ffffff'
      document.documentElement.style.color = '#000000'

      const gallSec = document.querySelector('.GallSec');
      if (gallSec) {
        gallSec.style.backgroundColor = '#f5f5f5';
      }

      const conSec = document.querySelector('.contact');
      if (conSec) {
        conSec.style.backgroundColor = '#f5f5f5';
      }

      const spotTour = document.querySelectorAll('.TouristSpot');
      if (spotTour) {
        for (let i = 0; i < 10; i++) {
          spotTour.forEach(element => {
            element.style.color = '#515151';
          });
        }
      }
    }
  
    function applyDarkTheme() {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
      document.documentElement.style.backgroundColor = '#2D2D2D'
      document.documentElement.style.color = '#ffffff'
      
      const gallSec = document.querySelector('.GallSec');
      if (gallSec) {
        gallSec.style.backgroundColor = '#151413';
      }

      const conSec = document.querySelector('.contact');
      if (conSec) {
        conSec.style.backgroundColor = '#151413';
      }

      const spotTour = document.querySelectorAll('.TouristSpot');
      if (spotTour) {
        for (let i = 0; i < 10; i++) {
          spotTour.forEach(element => {
            element.style.color = 'white';
          });
        }
      }
    }
  
    setTheme(preferredTheme)
  
    function showActiveTheme(theme, focus = false) {
        const themeSwitcher = document.querySelector('#bd-theme')
  
        if (!themeSwitcher) {
          return
        }
    
        const themeSwitcherText = document.querySelector('#bd-theme-text')
        const activeThemeIcon = document.querySelector('.theme-icon-active use')
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
        const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')
    
        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
          element.classList.remove('active')
          element.setAttribute('aria-pressed', 'false')
        })
    
        btnToActive.classList.add('active')
        btnToActive.setAttribute('aria-pressed', 'true')
        activeThemeIcon.setAttribute('href', svgOfActiveBtn)
        const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
        themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)
    
        if (focus) {
          themeSwitcher.focus()
        }
    }
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme())
      }
    })
  
    window.addEventListener('DOMContentLoaded', () => {
      showActiveTheme(preferredTheme)
  
      document.querySelectorAll('[data-bs-theme-value]')
        .forEach(toggle => {
          toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value')
            localStorage.setItem('theme', theme)
            setTheme(theme)
            showActiveTheme(theme, true)
          })
        })
    })
  })()

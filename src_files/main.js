function Translate() {
    //initialization
    this.init = function (attribute, lng) {
      this.attribute = attribute;
      this.lng = lng;
      var resume = document.querySelectorAll("[id='download-button']");

      for (var i = 0; i < resume.length; i++)
        resume[i].href = '/docs/Joshua_Banon_CV_' + lng + ".pdf";
    }
    //translate 
    this.process = function () {
      _self = this;
      var xrhFile = new XMLHttpRequest();
      //load content data 
      xrhFile.open("GET", "https://joshbv6.github.io/json/" + this.lng + ".json", false);
      xrhFile.onreadystatechange = function () {
        if (xrhFile.readyState === 4) {
          if (xrhFile.status === 200 || xrhFile.status == 0) {
            var LngObject = JSON.parse(xrhFile.responseText);
            var allDom = document.getElementsByTagName("*");
            for (var i = 0; i < allDom.length; i++) {
              var elem = allDom[i];
              var key = elem.getAttribute(_self.attribute);
              if (key != null) {
                elem.innerHTML = LngObject[key];
              }
            }

          }
        }
      }
      xrhFile.send();
    }
  }

  function activewhats() {
    document.getElementById('whatsappsvg').classList.add("whatsappsvg");
    document.getElementById('contact-form__submit-button').addEventListener('mouseout', function () {
      document.getElementById('whatsappsvg').classList.remove("whatsappsvg");
    })
  }
  document.head = document.head || document.getElementsByTagName('head')[0];

  function setTheme(theme){
    button = 'swith_theme_button';
    if (window.screen.width <= 480) {
      button = 'swith_theme_button_mobile';
    }
    if (theme === 'dark') {
      document.getElementById(button).innerHTML = '&#9728;';
      document.getElementById('theme_css').href = './css/main_dark.css';
      document.getElementById('banner_img').src = './src_files/whitebg.jpg';
      document.getElementById('portrait').src = './assets/portrait1-removebgd.png';
      document.getElementById('portrait').style = 'opacity: 0.98;';
    } else {
      document.getElementById(button).innerHTML = '&#9790;';
      document.getElementById('theme_css').href = './css/main.css';
      document.getElementById('banner_img').src = './src_files/matrix.jpg';
      document.getElementById('portrait').src = './assets/portrait1.png';
      document.getElementById('portrait').style = 'opacity: 0.7;';
    }
  }

  function change_language(lang) {
    translate(lang, 'lng-tag');
    switch (lang) {
      case 'es':
        document.getElementById("esTranslator").style.display = "none";
        document.getElementById("enTranslator").style.display = "inline";
        break;
      case 'en':
        document.getElementById("enTranslator").style.display = "none";
        document.getElementById("esTranslator").style.display = "inline";
        break;
    }
  }

  function change_language_mobile(lang) {
    translate(lang, 'lng-tag');
    switch (lang) {
      case 'es':
        document.getElementById("esTranslator_mobile").style = "display: none !important";
        document.getElementById("enTranslator_mobile").style = "display: inline !important";
        break;
      case 'en':
        document.getElementById("enTranslator_mobile").style = "display: none !important";
        document.getElementById("esTranslator_mobile").style = "display: inline !important";
        break;
    }
  }

  function translate(lng, tagAttr) {
    var translate = new Translate();
    translate.init(tagAttr, lng);
    translate.process();
  }

  function whatsappsend() {
    var text = document.getElementById('whatstext').value;
    var whatsapurl = "https://api.whatsapp.com/send?phone=++34XXXXXXXXX&text=" + text;
    window.open(whatsapurl, '_blank');
  }


  document.addEventListener("DOMContentLoaded", function () {
    var preferredLanguage = navigator.language.substr(0, 2);
    var availableLanguages = ["es", "en"];

    if (!availableLanguages.includes(preferredLanguage)) {
      preferredLanguage = "en";
    }

    if (screen.width < 992) {
      change_language_mobile(preferredLanguage);
    } else {
      change_language(preferredLanguage);
    }
    translate(preferredLanguage, 'lng-tag');


    const slides = document.querySelectorAll(".carousel-slide");
    let currentSlide = 0;

    function showSlide(slideIndex) {
      slides.forEach(function (slide) {
        slide.classList.remove("active");
      });

      slides[slideIndex].classList.add("active");
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    // Set an interval to switch to the next slide every 3 seconds
    setInterval(nextSlide, 10000);

    // Show the initial slide
    showSlide(currentSlide);

    document.getElementById('whoami').addEventListener('click', function() {

          if(localStorage.getItem("writing") == 'true'){
              clearTimeout(localStorage.getItem("timeoutId"));
          }

          let timeoutId;
          
          localStorage.setItem("writing", false);

          var hiddenPre = document.getElementById('hidden-presentation').textContent;
          var hiddenPri = document.getElementById('hidden-privilege').textContent;

          var displayPre = document.getElementById('display-presentation');
          var displayPri = document.getElementById('display-privilege');
          var displayText = document.getElementById('display-text');

          var currentIndex = 0;
          var currentIndexPri = 0;
          var typingSpeed = 5; // Adjust the speed as desired

          displayText.style.display = 'inline'; // Make the text container visible

          displayPre.textContent = ''; // Clear any existing text
          displayPre.style.display = 'inline'; // Make the text container visible

          displayPri.textContent = ''; // Clear any existing text
          displayPri.style.display = 'inline'; // Make the text container visible

          function typeLetter(site) {
            localStorage.setItem("writing", true);
              if (currentIndex < hiddenPre.length) {
                  displayPre.innerHTML += hiddenPre[currentIndex];
                  currentIndex++;
                  timeoutId = setTimeout(typeLetter, typingSpeed);
                  localStorage.setItem("timeoutId", timeoutId);
              } else {
                typePrivileges()
              }
              
          }

          function typePrivileges(site) {
              if (currentIndexPri < hiddenPri.length) {
                  displayPri.innerHTML += hiddenPri[currentIndexPri];
                  currentIndexPri++;
                  timeoutId = setTimeout(typePrivileges, typingSpeed);
                  localStorage.setItem("timeoutId", timeoutId);
              } else {
                localStorage.clear();
              }
              
          }

          typeLetter();
      });
  });

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-2MCR6E9JR2');
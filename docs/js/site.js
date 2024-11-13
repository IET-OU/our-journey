/*!
  our-journey site | © The Open University (IET).
*/

function loadGoogleAnalytics() {
  const script = document.createElement('script');
  script.src = "https://www.googletagmanager.com/gtag/js?id=UA-3845152-24";
  script.async = true;
  document.head.appendChild(script);

  // Initialize Google Analytics after the script loads
  script.onload = function() {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
          window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'UA-3845152-24');
  };
}

function attachFooter() {
  document.addEventListener("DOMContentLoaded", function() {
    fetch("assets/footer.html")
        .then(response => response.text())
        .then(data => {
          const $footer = document.querySelector('footer, #site-footer');
          if ($footer) {
            $footer.innerHTML = data;
          }
        })
        .catch(error => console.error("Error loading footer:", error));
  });
}

(function () {
  loadGoogleAnalytics();
  attachFooter(); 
})();

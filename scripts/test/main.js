(() => {
  const header = document.querySelector(".gheader");
  const main = document.querySelector("main");

  window.addEventListener("scroll", throttle( handleGlobalScroll));

  initHeader(header);
  initMain(main);

  function handleGlobalScroll() {
    let headerHeight = header.offsetHeight;

    if (window.scrollY >= headerHeight) {
      header.classList.add("stuck");
    } else {
      header.classList.remove("stuck");
    }
  };

  /**
   * @param {HTMLElement} header 
   */
  function initHeader(header) {
    const forms = header.querySelector(".gforms");

    header.addEventListener("click", switchForms);

    initForms(forms);

    /**
     * @param {MouseEvent} event 
     */
    function switchForms(event) {
      event.stopPropagation();
      /**
       * @type HTMLButtonElement
       */
      const button = event.target;
      
      if (
        button.parentElement.classList.contains("gforms-switch")
      ) {
        forms.classList.toggle("shown");
      }
    };

    /**
     * 
     * @param {HTMLElement} forms 
     */
    function initForms(forms) {
      /**
       * @type HTMLFormElement
       */
      const authForm = forms.querySelector(".gauth");
      /**
       * @type HTMLFormElement
       */
      const searchForm = forms.querySelector(".gsearch");

      authForm.addEventListener("submit", handleLogin);
      searchForm.addEventListener("submit", performSearch);

      /**
       * @param {Event} event 
       */
      function handleLogin(event) {
        event.preventDefault();
      }
      /**
       * @param {Event} event 
       */
      function performSearch(event) {
        event.preventDefault();
      }
    }
  }

  /**
   * @param {HTMLElement} main 
   */
  function initMain(main) {
    const registrationSection = main.querySelector("section.registration");
    
    if (registrationSection) {
      initRegistration(registrationSection);
    }

    /**
     * @param {HTMLElement} section 
     */
    function initRegistration(section) {
      const registrationForm = section.querySelector("form");

      registrationForm.addEventListener("submit", handleReistration);

      /**
       * @param {Event} event 
       */
      function handleReistration(event) {
        event.preventDefault();
      }
    }
  }

  /**
   * @param {Function} callback 
   * @param {number} timer
   */
  function throttle(callback, timer = 500) {
    let lastTime = 0;

    return () => {
      let now = Date.now();

      if (now - lastTime >= timer) {
        callback();
        lastTime = now;
      }
    }
  }
})();
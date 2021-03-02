(() => {
  const { body: docBody } = document;
  /**
   * @type HTMLElement
   */
  const header = document.querySelector(".gheader");
  const main = document.querySelector("main");
  const pledgeForm = document.querySelector(".pledges");

  initHeader(header, docBody);
  initMain(main, pledgeForm);
  initPledgeForm(pledgeForm);

  /**
   * @param {HTMLElement} header 
   * @param {HTMLElement} body
   */
  function initHeader(header, body) {
    /**
     * @type HTMLButtonElement
     */
    const burger = header.querySelector(".gburger");
    const menu = header.querySelector(".burger-wrapper");

    burger.addEventListener("click", handleBurger);

    /**
     * @param {MouseEvent} event 
     */
    function handleBurger(event) {
      burger.classList.toggle("close");
      menu.classList.toggle("show");
      body.classList.toggle("modal");
    }
  }

  /**
   * @param {HTMLElement} main 
   * @param {HTMLFormElement} pledgeForm
   */
  function initMain(main, pledgeForm) {
    const detailsSection = main.querySelector("section.details");
    const heroSection = main.querySelector("section.hero");

    initHeroSection(heroSection, pledgeForm);
    initDetailsSection(detailsSection, pledgeForm);

    /**
     * @param {HTMLElement} section 
     * @param {HTMLFormElement} pledgeForm
     */
    function initHeroSection(section, pledgeForm) {
      const pledgeButton = section.querySelector(".pay-to-pay");
      const bookmarkButton = section.querySelector(".bookmark");
      const bookmarkSign = bookmarkButton.querySelector(".sign");

      pledgeButton.addEventListener("click", handlePledge);
      bookmarkButton.addEventListener("click", handleBookmark);

      function handlePledge() {
        pledgeForm.classList.toggle("show");
        pledgeForm.scrollIntoView();
      }

      function handleBookmark() {
        bookmarkButton.classList.toggle("marked");
        if (bookmarkButton.classList.contains("marked")) {
          bookmarkSign.textContent = "Bookmarked";
        } else {
          bookmarkSign.textContent = "Bookmark";
        }
      };
    }

    /**
     * @param {HTMLElement} section
     * @param {HTMLFormElement} pledgeForm
     * @param {NodeListOf<HTMLElement>} formTitles
     */
    function initDetailsSection(section, pledgeForm) {
      /**
       * @type HTMLElement
       */
      const tiers = section.querySelector(".tiers");

      tiers.addEventListener("click", handleTierChoice);

      /**
       * TODO: send info to modal;
       * @param {MouseEvent} event 
       */
      function handleTierChoice(event) {
        event.stopPropagation();
        /**
         * @type HTMLButtonElement
         */
        const button = event.target;
        const tier = button.closest(".tier");
        const title = tier.querySelector(".title").textContent;
        ;
        const pledge = findFormPledge(pledgeForm, title);
        /**
         * @type HTMLInputElement
         */
        const radio = pledge.querySelector(".reward");

        pledgeForm.classList.toggle("show");
        pledge.scrollIntoView();
        pledge.focus();
        radio.click();
      }
    };
    
    /**
     * @param {HTMLFormElement} pledgeForm 
     * @param {string} title 
     * @returns {HTMLElement}
     */
    function findFormPledge(pledgeForm, title) {
      const formTitles = pledgeForm.querySelectorAll(".title");
      let pledge;

      for (const formTitle of formTitles) {
        if (formTitle.textContent === title) {
          pledge = formTitle.closest(".pledge");
          break;
        }
      }

      return pledge;
    }
  }

  /**
   * @param {HTMLFormElement} form 
   */
  function initPledgeForm(form) {
    const closeButton = form.querySelector(".close > button");
    const pledges = form.querySelector(".pledge-choices");
    const confirmation = form.querySelector(".confirmation");
    const confInput = confirmation.querySelector("input");
    const successModal = form.querySelector(".success");
    const successButton = successModal.querySelector(".pay-to-pay");
    /**
     * @type HTMLSpanElement
     */
    const successTitle = successModal.querySelector(".title");

    closeButton.addEventListener("click", handleClosing);
    form.addEventListener("input", appendConfirmation);
    form.addEventListener("submit", handlePledge);
    successButton.addEventListener("click", acceptSuccess); 

    function handleClosing() {
      form.classList.toggle("show");
    };

    /**
     * @param {Event} event 
     */
    function appendConfirmation(event) {
      event.stopPropagation();
      /**
       * @type HTMLInputElement
       */
      const input = event.target;
      const pledge = input.closest(".pledge");

      confInput.value = input.value;
      
      pledge.appendChild(confirmation);

      if (!confirmation.classList.contains("appended")) {
        confirmation.classList.add("appended");
      }
    }
    
    /**
     * @param {Event} event 
     */
    function handlePledge(event) {
      event.preventDefault();

      /**
       * @type HTMLInputElement
       */
      const money = event.target.elements["currency"];
      /**
       * @type HTMLElement
       */
      const pledge = money.closest(".pledge");
      const title = pledge.querySelector(".title").textContent;
      
      successTitle.textContent = title;

      pledges.classList.toggle("hide")
      successModal.classList.toggle("show");
      successModal.scrollIntoView();
    }

    /**
     * @param {MouseEvent} event 
     */
    function acceptSuccess(event) {
      form.classList.toggle("show");
    }
  }

})();
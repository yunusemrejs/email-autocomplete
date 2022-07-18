(() => {

  this.EmailAutocomplete = function (input, options) {
    this.input = input;
    this.options = options;
    this.init();
  }

  EmailAutocomplete.prototype.init = function () {
    this.createInputValueSizeSpan();
    this.createSuggestionSpan();
    this.input.addEventListener('keyup', this.onKeyUp.bind(this));
    this.input.addEventListener('blur', this.blur.bind(this));
  }

  EmailAutocomplete.prototype.createInputValueSizeSpan = function () {
    const inputStyle = getComputedStyle(this.input);
    this.inputSizeSpan = document.createElement('span');
    this.inputSizeSpan.classList.add('email-autocomplete-input-size');
    this.input.parentNode.appendChild(this.inputSizeSpan);

    const inputSizeSpanStyles = {
      'position': 'absolute',
      'top': '-9999px',
      'visibility': 'hidden',
      'display': 'inline-block',
      'paddingLeft': inputStyle.paddingLeft,
      'fontSize': inputStyle.fontSize,
      'fontFamily': inputStyle.fontFamily,
      'fontWeight': inputStyle.fontWeight,
      'fontStyle': inputStyle.fontStyle,
      'lineHeight': inputStyle.lineHeight,
      'letterSpacing': inputStyle.letterSpacing,
    }
    Object.assign(this.inputSizeSpan.style, inputSizeSpanStyles);
  }

  EmailAutocomplete.prototype.createSuggestionSpan = function () {
    const inputStyle = getComputedStyle(this.input);
    this.suggestionSpan = document.createElement('span');
    this.suggestionSpan.classList.add('email-autocomplete-suggestion-span');

    const suggestionSpanStyles = {
      'display': 'none',
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'cursor': 'pointer',
      'backgroundColor': this.options.suggestionSpanBackgroundColor || 'black',
      'color': this.options.suggestionSpanColor || 'white',
      'fontSize': inputStyle.fontSize,
      'fontFamily': inputStyle.fontFamily,
      'fontWeight': inputStyle.fontWeight,
      'fontStyle': inputStyle.fontStyle,
      'lineHeight': inputStyle.lineHeight,
      'letterSpacing': inputStyle.letterSpacing,
    }

    Object.assign(this.suggestionSpan.style, suggestionSpanStyles);
    this.input.parentNode.appendChild(this.suggestionSpan);


    this.suggestionSpan.addEventListener('click', this.onSuggestionItemClick.bind(this));
  }

  EmailAutocomplete.prototype.getSuggestionFieldLeftOffset = function () {
    return this.inputSizeSpan.offsetWidth + 4;
  }


  EmailAutocomplete.prototype.isEmail = function (email) {
    if (email.indexOf('@') > -1) {
      return true;
    }
  }

  EmailAutocomplete.prototype.getDomain = function (email) {
    return email.split('@')[1].toLowerCase();
  }

  EmailAutocomplete.prototype.onKeyUp = function (e) {
    this.suggestionSpan.style.display = 'none';
    this.hasSuggestion = false;
    this.suggestionSpan.innerHTML = '';
    this.inputSizeSpan.innerHTML = this.input.value;
    let value = this.input.value;

    if (value.length === 0) {
      return;
    }

    if (!this.isEmail(value)) {
      return;
    }

    let domain = this.getDomain(value);

    if (domain.length === 0) {
      return;
    }

    // Get the email autocomplete suggestions
    this.getAutocompleteSuggestion(domain);
  }

  EmailAutocomplete.prototype.getAutocompleteSuggestion = function (domain) {
    this.suggestionSpan.style.display = 'none';
    this.suggestionSpan.innerHTML = '';

    this.hasSuggestion = false;

    this.options.autoCompleteList.forEach(autoCompleteListItem => {
      if (autoCompleteListItem.startsWith(domain)) {
        this.setSuggestionSpanValue(domain, autoCompleteListItem)
        this.hasSuggestion = true;
      }
    });

    if (this.hasSuggestion == false) {
      return;
    }

    this.suggestionSpan.style.display = 'block';
    this.setSuggestionSpanPosition();
  }

  EmailAutocomplete.prototype.onSuggestionItemClick = function (e) {
    if (value === null) {
      return;
    }

    let value = e.target.getAttribute('data-value');
    this.confirmSuggestion(value);
  }

  EmailAutocomplete.prototype.confirmSuggestion = function (value) {
    let email = this.input.value.split('@')[0] + '@' + value;

    this.input.value = email;

    this.suggestionSpan.style.display = 'none';
    this.suggestionSpan.innerHTML = '';
  };

  EmailAutocomplete.prototype.setSuggestionSpanValue = function (domain, autoCompleteListItem) {
    let suggestionText = autoCompleteListItem.substring(domain.length);

    this.suggestionSpan.setAttribute('data-value', autoCompleteListItem);
    this.suggestionSpan.innerHTML = suggestionText;
  }

  EmailAutocomplete.prototype.setSuggestionSpanPosition = function () {
    let topPosition = this.input.offsetHeight / 2 - this.suggestionSpan.offsetHeight / 2;
    this.suggestionSpan.style.transform = 'translateY(' + topPosition + 'px) translateX(' + this.getSuggestionFieldLeftOffset() + 'px)';
  }

  EmailAutocomplete.prototype.blur = function () {

    if (this.hasSuggestion == true) {
      this.confirmSuggestion(this.suggestionSpan.getAttribute('data-value'));
    }
  }
})();
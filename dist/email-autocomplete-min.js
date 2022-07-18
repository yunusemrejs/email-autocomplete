class EmailAutocomplete{constructor(a,b){this.input=a,this.options=b,this.init()}init(){this.createInputValueSizeSpan(),this.createSuggestionSpan(),this.input.addEventListener("keyup",this.onKeyUp.bind(this)),this.input.addEventListener("blur",this.blur.bind(this))}createInputValueSizeSpan(){let a=getComputedStyle(this.input);this.inputSizeSpan=document.createElement("span"),this.inputSizeSpan.classList.add("email-autocomplete-input-size"),this.input.parentNode.appendChild(this.inputSizeSpan);let b={position:"absolute",top:"-9999px",visibility:"hidden",display:"inline-block",paddingLeft:a.paddingLeft,fontSize:a.fontSize,fontFamily:a.fontFamily,fontWeight:a.fontWeight,fontStyle:a.fontStyle,lineHeight:a.lineHeight,letterSpacing:a.letterSpacing};Object.assign(this.inputSizeSpan.style,b)}createSuggestionSpan(){let a=getComputedStyle(this.input);this.suggestionSpan=document.createElement("span"),this.suggestionSpan.classList.add("email-autocomplete-suggestion-span");let b={display:"none",position:"absolute",top:"0",left:"0",cursor:"pointer",backgroundColor:this.options.suggestionSpanBackgroundColor||"black",color:this.options.suggestionSpanColor||"white",fontSize:a.fontSize,fontFamily:a.fontFamily,fontWeight:a.fontWeight,fontStyle:a.fontStyle,lineHeight:a.lineHeight,letterSpacing:a.letterSpacing};Object.assign(this.suggestionSpan.style,b),this.input.parentNode.appendChild(this.suggestionSpan),this.suggestionSpan.addEventListener("click",this.onSuggestionItemClick.bind(this))}getSuggestionFieldLeftOffset(){return this.inputSizeSpan.offsetWidth+4}isEmail(a){return -1!=a.indexOf("@")}getDomain(a){return a.split("@")[1].toLowerCase()}onKeyUp(){this.suggestionSpan.style.display="none",this.hasSuggestion=!1,this.suggestionSpan.innerHTML="",this.inputSizeSpan.innerHTML=this.input.value;let a=this.input.value;if(0===a.length||!this.isEmail(a))return;let b=this.getDomain(a);0!==b.length&&this.getAutocompleteSuggestion(b)}getAutocompleteSuggestion(a){this.suggestionSpan.style.display="none",this.suggestionSpan.innerHTML="",this.hasSuggestion=!1,this.options.autoCompleteList.some(b=>{if(b.startsWith(a))return this.setSuggestionSpanValue(a,b),this.hasSuggestion=!0,!0}),!1!=this.hasSuggestion&&(this.suggestionSpan.style.display="block",this.setSuggestionSpanPosition())}onSuggestionItemClick(a){if(null===b)return;let b=a.target.getAttribute("data-value");this.confirmSuggestion(b)}confirmSuggestion(a){let b=this.input.value.split("@")[0]+"@"+a;this.input.value=b,this.suggestionSpan.style.display="none",this.suggestionSpan.innerHTML=""}setSuggestionSpanValue(b,a){let c=a.substring(b.length);this.suggestionSpan.setAttribute("data-value",a),this.suggestionSpan.innerHTML=c}setSuggestionSpanPosition(){let a=this.input.offsetHeight/2-this.suggestionSpan.offsetHeight/2;this.suggestionSpan.style.transform="translateY("+a+"px) translateX("+this.getSuggestionFieldLeftOffset()+"px)"}blur(){!0==this.hasSuggestion&&this.confirmSuggestion(this.suggestionSpan.getAttribute("data-value"))}}
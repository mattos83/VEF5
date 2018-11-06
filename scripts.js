const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');
  
 

  text.init(form, items);
});

const text = (() => {
  let items;  

  function init(_form, _items) {
    items = _items;

    _form.addEventListener('submit', formHandler); 

    let allCheckboxes = items.querySelectorAll('.item__checkbox');
    //alert("allCheckboxes length is " + allCheckboxes.length);
    for (let i = 0; i < allCheckboxes.length; i++) {
      allCheckboxes[i].addEventListener('change', finish);
    }

    let allButtons = document.querySelectorAll('.item__button');
    for (let i = 0; i < allButtons.length; i++) {
    	allButtons[i].addEventListener('click', deleteItem);
    }

    let allTexts = document.querySelectorAll('.item__text');
    for (let i = 0; i < allTexts.length; i++) {
    	allTexts[i].addEventListener('click', edit);
    }
    
    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    // Verður að vera eitthvað í textaboxinu
    const inputText = document.querySelector('.form__input');
    if(inputText.value == "")
    {
        return;
    }
 
  let newLi = document.createElement("li");
  newLi.classList.add("item");
 
  let checkbox = document.createElement("INPUT");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("item__checkbox");
  checkbox.addEventListener('change', finish);
  newLi.appendChild(checkbox); 
 
  let span = document.createElement('SPAN');
  span.innerHTML = inputText.value;
  // Heinsum textaboxið
  inputText.value = "";
  span.classList.add("item__text");
  newLi.appendChild(span);
 
  let button = document.createElement("BUTTON");
  button.setAttribute("type", "button");
  button.appendChild(document.createTextNode("Eyða"));
  button.classList.add("form__button");
  button.addEventListener('click', deleteItem);
  newLi.appendChild(button);
 
  const items = document.querySelector('.items');
  items.appendChild(newLi);

    e.preventDefault();
    
   // console.log('halló heimur');
  }

  // event handler fyrir það að klára færslu
  function finish(e) {      
    
    //    alert('finish clicked : ' + e.currentTarget.parentNode.nodeName);
    e.currentTarget.parentNode.classList.toggle("item--done");
    e.preventDefault(); 
  }

  // event handler fyrir það að breyta færslu
  function edit(e) { 

    var text = e.target.innerHTML;
    //alert("text is " + e.target.innerHTML);
    //alert('edit clicked : ' + e.currentTarget.nodeName);
 
    if(e.currentTarget.nodeName == "SPAN")
    {
        // current element is a span, we need to replace it with INPUT
 
        var inputbox = document.createElement("INPUT");
        inputbox.setAttribute("type", "text");
        inputbox.setAttribute("value", e.target.innerHTML);
        inputbox.classList.add("form__input");
        e.currentTarget.replaceWith(inputbox);
        inputbox.focus();
        inputbox.addEventListener('focusout', edit);
    }
    else if (e.currentTarget.nodeName == "INPUT")
    {
        // current element is an input, we need to replace it with SPAN
        var span = document.createElement('SPAN');
        span.innerHTML = e.target.value;
        span.classList.add("item__text");
        e.currentTarget.replaceWith(span);
        span.addEventListener('click', edit);  
      }

  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.currentTarget.parentNode.remove(); 
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {

      
  }

  return {
    init: init
  }
})();
let htmlArea = document.querySelector('.language-html');
let css = document.querySelector('.language-css');
let js = document.querySelector('.language-js');

let templates = localStorage ? Object.keys(localStorage) : [];

if (localStorage.getItem('editor')) {
  const {htmlArea: htmlContent, js: jsContent, css: cssContent} = JSON.parse(localStorage.getItem('editor'));
  htmlArea.value = htmlContent;
  js.value = jsContent;
  css.value = cssContent;
}

let intervalId = '';
function startInterval() {
  intervalId = setInterval(function () {
    const editor = {
      htmlArea: htmlArea.value,
      css: css.value,
      js: js.value,
    };
    localStorage.setItem('editor', JSON.stringify(editor));
  }, 1000);
}
function stopInterval() {
  clearInterval(intervalId);
}

console.log();

function compile() {
  startInterval();
  const iFrameCode = document.querySelector('.code');
  const code = iFrameCode.contentWindow.document;
  document.body.onkeyup = function () {
    code.open();
    code.writeln(htmlArea.value + '<style>' + css.value + '</style>' + '<script>' + js.value + '</script>');
    code.close();
  };
  // stopInterval();
}
compile(); // TODO: ctrl + s yada RUN butonu ile çalıştırılabilir.

function fillDropdown() {
    let dropdownSaveElement = document.querySelector('.dropdown-save-element');
    let newTempleteItem = document.querySelector('.new-templete-item');
    let selectbox = document.querySelector('.selectbox');
    dropdownSaveElement.addEventListener('click', () => {
      if(newTempleteItem.value ==''){
        alert ('Lütfen templete adı giriniz');
      }
      const option = new Option(newTempleteItem.value, newTempleteItem.value);
      selectbox.add(option, undefined);
      newTempleteItem.value = '';
      newTempleteItem.focus();
    });
  }
  fillDropdown();

const accordionTitle = document.querySelector('.accordion-title');
const accordionContent = document.querySelector('.code-editor-area');
const iFrameCode = document.querySelector('.code');
accordionTitle.addEventListener('click', () => {
  accordionContent.classList.toggle('active');
  iFrameCode.classList.toggle('active');
});
htmlArea.addEventListener('click', () => {
  html.classList.toggle('bigger');
  css.classList.remove('bigger');
  js.classList.remove('bigger');
});
css.addEventListener('click', () => {
  css.classList.toggle('bigger');
  html.classList.remove('bigger');
  js.classList.remove('bigger');
});
js.addEventListener('click', () => {
  js.classList.toggle('bigger');
  html.classList.remove('bigger');
  css.classList.remove('bigger');
});
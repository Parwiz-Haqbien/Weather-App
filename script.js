var searchValue = document.querySelector('#searchbox');
searchValue.addEventListener('keypress' , setFunc);
function setFunc(e) {
  if(e.keypress ==13) {
      console.log('Enter Pressed!!')
  }
}
'use strict';

const btnExport = document.getElementById('export-btn');
var mydata = [];
//chức năng export file
function exportData() {
  let data = JSON.parse(localStorage.getItem('petArr'));
  let fileName = 'my-dowload.json';
  var json = JSON.stringify(data),
    blob = new Blob([json], { type: 'text/plain;charset=utf-8' }),
    url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
}

//chức năng import file
function importData() {
  var myinput = document.querySelector('input[type="file');
  if (myinput.value) {
    var fileReader = new FileReader();
    fileReader.onload = function () {
      var stringData = fileReader.result;
      console.log(stringData);
      mydata = JSON.parse(stringData);
      saveToStorage('petArr', mydata);
      alert('Import thành công!');
    };
    fileReader.readAsText(myinput.files[0], 'UTF-8');
  } else {
    alert('Chưa chọn file!');
  }
}

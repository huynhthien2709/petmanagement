'use strict';

//2. Lưu dữ liệu dưới LocalStorage

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  if (key != null && localStorage.getItem(key) != null) {   
    return JSON.parse(localStorage.getItem(key));
  } else return [];
}


// a. Lấy dữ liệu Breed từ LocalStorage và hiển thị trong bảng
const breedArr2 = getFromStorage('breedArr');

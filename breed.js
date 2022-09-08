'use strict';

let breedArr = [];
const submit = document.getElementById('submit-btn');
const breedInput = document.getElementById('input-breed');
const typeInput = document.getElementById('input-type');
const tableBodyEl = document.getElementById('tbody');

breedArr = getFromStorage('breedArr');

renderTableDataBreed(breedArr);

function renderTableDataBreed(breedArr) {
  tableBodyEl.innerHTML = '';
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `
		<th scope="row">${i}</th>
		<td>${breedArr[i].breedName}</td>
		<td>${breedArr[i].breedType}</td>
		<td><button type="button" class="btn btn-danger" onclick="deletePet('${breedArr[i].breedName}')">Delete</button>
		</td>`;
    tableBodyEl.appendChild(row);
  }
}

//b. Thêm Breed

submit.addEventListener('click', function () {
  const dataBreed = {
    breedName: breedInput.value,
    breedType: typeInput.value,
  };
  const valiDataBreed = validDataBreed(dataBreed);

  function validDataBreed() {
    let isvaliDataBreed = false;
    if (dataBreed.breedName == '') {
      alert('Vui lòng điền thông tin Breed');
      return isvaliDataBreed;
    }
    if (dataBreed.breedType === 'Select Type') {
      alert('Vui lòng chọn thông tin Type');
      return isvaliDataBreed;
    }
    return (isvaliDataBreed = true);
  }
  if (valiDataBreed) {
    breedArr.push(dataBreed);
    saveToStorage('breedArr', breedArr);
    renderTableDataBreed(breedArr);
    clearBreed();
  }
});
function clearBreed() {
  breedInput.value = '';
  typeInput.value = 'Select Type';
}
// c. Xóa breed

function deletePet(breedname) {
  if (confirm('Are you sure?')) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breedname === breedArr[i].breedName) {
        breedArr.splice(i, 1);
        saveToStorage('breedArr', breedArr);
        renderTableDataBreed(breedArr);
      }
    }
  }
}

// /* Rules */
// class PersonBuilder {
//   constructor(firstName = 'No name', { age, lastName, occupation, hobby } = {}) {
//     this.firstName = firstName
//     this.age = age
//     this.lastName = lastName
//     this.occupation = occupation
//     this.hobby = hobby
//   }
// }





/* Tool */
const FormToObject = {
  createObjectFromForm(formElements) {
    const obj = {};
    Object.values(formElements).forEach((input, i) => {
      const attrName = input.getAttribute('name');
      if (attrName) {
        if (input.value) obj[attrName] = input.value;
        input.value = '';
      }
    });
    return obj
  },
  submit(id, func) {
    document.getElementById(id).addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof(func) === 'function') func(this.createObjectFromForm(e.target.elements));
    });
  }
}





// /* Execute Code */
// const outputArray = [];
//
// function renderRecordedData(arr) {
//   let html = '<ul>';
//   arr.forEach((item, i) => {
//     html += `<li style="margin: 15px 0"><ul>`;
//     Object.entries(item).forEach((attr, i) => {
//       if (attr[1]) html += `<li>${attr[0]}: ${attr[1]}</li>`;
//     });
//     html += `</ul></li>`;
//   });
//   html += '</ul>';
//   document.getElementById('output').innerHTML = html;
// }
//
// function addItemToArrayAndRender(obj) {
//   outputArray.push(obj);
//   renderRecordedData(outputArray);
// }
//
//
//
// FormToObject.submit('form', addItemToArrayAndRender);
// FormToObject.submit('secondForm', (obj) => console.log(obj));
// FormToObject.submit('six', (obj) => alert(obj.six));

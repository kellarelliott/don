let replaceButton = document.getElementById('trigger');

replaceButton.addEventListener('click', findAndReplace);


function findAndReplace() {

  let target = document.getElementById('targetContainer');
  target.innerHTML = '';

  const divClass = document.getElementsByClassName('bar')

  let tallestHeight = divClass[0].offsetHeight;
  let tallestDiv;
  let length = divClass.length;

  //for loop to find the tallest div
  for (i = 1; i < length; i++) {
    if (divClass[i].offsetHeight > tallestHeight) {
      tallestDiv = divClass[i];
    }
  }
  //clone tallest div
  let clone = tallestDiv.cloneNode(true);
  //append clone
  target.appendChild(clone);
  //style clone
  clone.style.height = tallestDiv.offsetHeight + 'px';

}

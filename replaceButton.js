let replaceButton = document.getElementById('trigger');

replaceButton.addEventListener('click', findAndReplace);


function findAndReplace() {

  let target = document.getElementById('targetContainer');
  target.innerHTML = '';

  const divClass = document.getElementsByClassName('bar')

  let tallestHeight = divClass[0].offsetHeight;
  let tallestDiv;
  let length = divClass.length;


  for (i = 1; i < length; i++) {
    if (divClass[i].offsetHeight > tallestHeight) {
      tallestDiv = divClass[i];
    }
  }

  let clone = tallestDiv.cloneNode(true);

  target.appendChild(clone);

  clone.style.height = tallestDiv.offsetHeight + 'px';

}

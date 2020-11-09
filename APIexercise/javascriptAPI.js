let key = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=81154ab211fa427385692bcdbfb3dfaf';




getNews();



async function getNews() {
  try {
    let response = await fetch(key);
    let data = await response.json();
    let articles = data.articles;
    let container = document.getElementById('container');

    container.innerHTML =
      articles.map(function (article) {
        if (article.author === null) {
          article.author = 'Author Not Provided';
        }
        let articleInformation =
          "<div class='article'>" + "<h2 class='title'>" + article.title + '</h2>' +
          "<div class='author'>" + article.author + '</div>' +
          "<button class='readMoreButton'> Read More </button>" +
          "<p class='none'>" + article.description + '</p></div>'
        return articleInformation

      })
        .join('')
    addClick();
    sameID();
  } catch (err) {
    console.err(err);
  }
}


function addClick() {

  let readMoreButton = document.getElementsByClassName('readMoreButton')

  for (i = 0; i < readMoreButton.length; i++) {
    readMoreButton[i].addEventListener('click', clickedButton)
  }

  function clickedButton(e) {

    let id = e.target.attributes.id.value;
    let descriptionIdNum = id.replace('button', 'description');
    let descriptionShowing = document.getElementById(descriptionIdNum);

    if (descriptionShowing.className === 'none') {
      descriptionShowing.className = 'description';
    } else {
      descriptionShowing.className = 'none'
    }



  }
}

function sameID() {
  let readMoreButton = document.getElementsByClassName('readMoreButton')

  let description = document.getElementsByClassName('none')

  for (i = 0; i < readMoreButton.length; i++) {
    readMoreButton[i].setAttribute('id', 'button' + `${i}`);
    description[i].setAttribute('id', 'description' + `${i}`);
  }
}




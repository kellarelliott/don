getCases();





async function getCases() {
  try {
    let url = 'https://api.covidtracking.com/v1/states/current.json';
    let response = await fetch(url);
    let data = await response.json();
    let container = document.getElementById('container');

    container.innerHTML = '<table id="table"><tr><th id="stateHeader" class="tableHeader" onclick="sortTable(0)">State<span class="arrow"><span class="down"></span></span></th><th id="deathsHeader" class="tableHeader"  onclick="sortTable(1)">Deaths<span class="arrow"></span></th><th id="positiveHeader" class="tableHeader" onclick="sortTable(2)">Positive Cases<span class="arrow"></span></th><th id="negativeHeader" class="tableHeader" onclick="sortTable(3)">Negative Cases<span class="arrow"></span></th><th id="totalHeader" class="tableHeader" onclick="sortTable(4)">Total Cases<span class="arrow"></span></th></tr>' +
      data.map(function (item) {
        if (item.deathConfirmed === null) {
          item.deathConfirmed = '-99'
            ;
        }
        let tableRow =
          '<tr>' +
          `<td class='cell'>${item.state}</td>` +
          `<td class='cell'>${item.deathConfirmed}</td>` +
          `<td class='cell'>${item.positive}</td>` +
          `<td class='cell'>${item.negative}</td>` +
          `<td class='cell'>${item.total}</td>` + '</tr>'
        return tableRow
      })
        .join('') + '</table>';


  } catch (err) {
    console.log(err)
  }
  addClick();
}

function addClick() {
  let tableHeaders = document.getElementsByClassName('tableHeader');

  for (i = 0; i < tableHeaders.length; i++) {

    tableHeaders[i].addEventListener('click', sortTable);
  }

}



function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("table");

  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;


    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];

      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (n !== 0) {
        if (dir == "asc") {

          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      } else {
        if (dir == "desc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "asc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }

    }
    if (shouldSwitch) {
      header = rows[0]
      headerArray = header.getElementsByClassName('arrow');
      if (dir === 'asc') {
        for (q = 0; q < headerArray.length; q++) {
          if (q === n) {
            header.getElementsByClassName('arrow')[n].innerHTML = '<span class="up"></span>'
          } else if (q !== n) {
            headerArray[q].innerHTML = '';
          }
        }
      } else if (dir === 'desc') {
        for (q = 0; q < headerArray.length; q++) {
          if (q === n) {
            header.getElementsByClassName('arrow')[n].innerHTML = '<span class="down"></span>'
          } else if (q !== n) {
            headerArray[q].innerHTML = '';
          }
        }
      }
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}


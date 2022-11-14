let tableData = document.getElementById("tableData");
const paginationWrapper = document.querySelector(".pagination");
let mainData = [];
//fetching Data
fetch("https://hub.dummyapis.com/employee?noofRecords=60&idStarts=1")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    mainData = data;
    renderPostList(data);
  });
//code to render pagination
function pageLoaded() {
  let totalValue = document.getElementById("showPages").value;
  var selected_page = [];
  var perpage = 10;
  var start = perpage * (totalValue - 1) + 1;
  var end = start + perpage - 1;
  for (i = start - 1; i < end; i++) {
    selected_page.push(mainData[i]);
  }
  renderPostList(selected_page);
}
//loading code

// render data in table
const renderPostList = (selected_page) => {
  tableData.innerHTML = "";
  selected_page.map((element) => {
    let showData = `<tr>
        <td>${element.id}</td>
        <td>${element.firstName}</td>
        <td>${element.lastName}</td>
        <td>${element.age}</td>
        <td>${element.email}</td>
        <td><img src="${element.imageUrl}" alt="error" height=50 width=50></td>
        </tr>`;
    tableData.innerHTML += showData;
  });
};
//code to search data
const searchedValue = () => {
  let myInput = document.getElementById("myinput").value.toLowerCase();
  let tr = tableData.getElementsByTagName("TR");
  for (i = 0; i <= tr.length; i++) {
    let td = tr[i].getElementsByTagName("TD");
    tr[i].style.display = "none";
    for (j = 0; j < td.length; j++) {
      if (td[j].innerHTML.toLowerCase().includes(myInput)) {
        tr[i].style.display = "";
        continue;
      }
    }
  }
};

//code to sort table data
const sortTableData = (n) => {
  let tbody, rows, x, y;
  tbody = document.getElementById("tableData");
  rows = [...tbody.rows];
  tbody.innerHTML = "";
  rows.sort((a, b) => {
    x = a.getElementsByTagName("TD")[n].innerHTML.toLowerCase();
    y = b.getElementsByTagName("TD")[n].innerHTML.toLowerCase();
    return (x-y) || (x < y ? -1 : 1);
  });
  rows.map((rows) => {
    tbody.appendChild(rows);
  });
};

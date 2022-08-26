function clickHandler(tableRow) {
    var fields = tableRow.getElementsByTagName("td"); 
    let tabularData = {
        id: tableRow.getElementsByTagName("td")[0].innerHTML,
        name: tableRow.getElementsByTagName("td")[1].innerHTML,
        lastUsed: tableRow.getElementsByTagName("td")[2].innerHTML,
        duration: tableRow.getElementsByTagName("td")[3].innerHTML,
        quantity: tableRow.getElementsByTagName("td")[4].innerHTML,
    };
    var jsonString = JSON.stringify(tabularData);
    document.getElementById("table-selection").setAttribute("value", jsonString);

    alert(jsonString);
}

function getClickHandler(tableRow) {
    return function() {
        clickHandler(tableRow)
    }
}

function AddTableEventHandler() {
    var table = document.getElementById("historical-table");
    var rows = table.getElementsByTagName("tr");
    
    for(i = 1; i < rows.length; i++) {
        table.rows[i].onclick = getClickHandler(table.rows[i]); 
    }
}
window.onload = AddTableEventHandler(); 
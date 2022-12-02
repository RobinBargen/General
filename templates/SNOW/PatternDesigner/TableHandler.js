var Variable = {
   isDefined: function(variable) {
      return !(typeof variable === 'undefined' || variable === null);
   }
}


var TableHandler = {
   initialize: function() {
      this.TABULAR_VALUES = {
         KEY: 0,
         VALUE: 1
         }
   },
   __getKeyValuePairs: function(table, rowNumber) {
      if(!table) throw "No key value pairs exist for non-existent table."
      var data = table.get(rowNumber).toString().replace("{", "").replace("}", "");
      var keyValuePairs = data.split(",");
      return keyValuePairs;
   },
   __extractTabularData: function(table, indexToExtract, rowNumber) {
      var extractedValues = [];
      var keyValuePairs = this.__getKeyValuePairs(table, rowNumber);
      
      for (var i = 0; i < keyValuePairs.length; i++) {
         var value = JSON.stringify(keyValuePairs[i]).split("=")[indexToExtract].split('"').join('').trim();
         extractedValues.push(value);
      }
      return extractedValues; 
   },
   __buildTableFields: function(keys, values) {
      var tableRows = new Packages.java.util.ArrayList();
      
      for (var row = 0; row < values.length; row++) {
         var tableRow = new Packages.java.util.HashMap();
         for (var col = 0; col < keys.length; col++) {
            tableRow.put(keys[col], values[row][col]);
         }
         tableRows.add(tableRow);
      }
      
      return tableRows;
   },
   getKeys: function(table) {
      this.initialize();
      return this.__extractTabularData(table, this.TABULAR_VALUES.KEY, 0);
   },
   getValues: function(table) {
      this.initialize();
      var values = [];
      var numberOfRows = table.size();
      for (var row = 0; row < numberOfRows; row++) {
         values.push(this.__extractTabularData(table, this.TABULAR_VALUES.VALUE, row));
      }
      return values;
   },
   addColumn: function(table, columnPosition, columnName) {
      this.initialize();
      var keys = this.getKeys(table);
      var values = this.getValues(table);
      
      var numberOfColumns = Variable.isDefined(keys) ? keys.length : 0;
      var numberOfRows = Variable.isDefined(values) ? values.length : 0;
      
      if ((columnPosition > -1) && (numberOfColumns <= numberOfColumns + 1)) {
         keys.splice(columnPosition, 0, columnName);
         for (var row = 0; row < numberOfRows; row++) {
            values[row].splice(columnPosition, 0, "");
         }
      }
      return this.__buildTableFields(keys, values);
   },
   updateTable: function(table, keys, values) {
      if (parseInt(this.getKeys(table).length) != parseInt(keys.length)) throw "Number of columns in table is modified. Number of columns can't be altered."
      if (this.getKeys(table).toString() != keys.toString()) throw "Column names (keys) have been modified. Column names can't be modified."
      return this.__buildTableFields(keys, values);
   },
};


/*
// Example on how to use:
var versionNumber = "";
try {
   var iseVersionTable = CTX.getAttribute("ISE_version_data");
   for (var i = 0; i < iseVersionTable.size(); i++) {
      var attributeLabel = iseVersionTable.get(i).get("attribute_labels");
      var attributeValue = iseVersionTable.get(i).get("attribute_values");
      if(attributeLabel == "version") {
         versionNumber = attributeValue;
      }
   }
   
   var nodeData = CTX.getAttribute("node_data");
   var keys = [];
   var values = [];
   if (nodeData) {
     var nodeData = TableHandler.addColumn(nodeData, 4, "u_software_version");
     var keys = TableHandler.getKeys(nodeData);
     var values = TableHandler.getValues(nodeData);
     
     for (var row = 0; row < values.length; row++) {
        for (var col = 0; col < keys.length; col++) {
           if(JSON.stringify(keys[col]).includes( "u_software_version")) {
              values[row][col] = versionNumber;
           }
        }  
     }

     nodeData = TableHandler.updateTable(nodeData, keys, values);
       CTX.setAttribute("node_data", nodeData);
   }
} catch (error) {
   ms.log("error: " + error.message);
}
$version = versionNumber;

*/

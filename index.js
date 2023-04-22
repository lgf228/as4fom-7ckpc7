const SERVICE_URI =
  'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/';
var datas = new ej.data.DataManager({
  adaptor: new ej.data.CustomDataAdaptor({
    

    getData: function (option) {
      
      var query = JSON.parse(option.data);
      var take = query.take;
      var skip = query.skip;
      var url = SERVICE_URI + '?$count=true';
      if (skip) {
        url = url + '&$skip=' + skip;
      }
      if (take) {
        url = url + '&$top=' + take;
      }
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          request = ej.base.extend({}, option, { httpRequest: xhttp });
          if (
            (xhttp.status >= 200 && xhttp.status <= 299) ||
            xhttp.status === 304
          ) {
            var datatemp = JSON.parse(xhttp.responseText);
            var gridData = {
              result: datatemp.value,
              count: datatemp['@odata.count'],
            };
            console.log(gridData);
            option.onSuccess(gridData, request);
          } else {
            option.onFailure(request);
          }
        }
      };
      xhttp.open('GET', url, true);
      xhttp.send();
    },
  }),
});
var grid = new ej.grids.Grid({
  dataSource: datas,
  enableInfiniteScrolling: true,
  height: 300,
  columns: [
    {
      field: 'OrderID',
      headerText: 'Order ID',
      width: 120,
      textAlign: 'Right',
    },
    { field: 'CustomerID', headerText: 'Customer Name', width: 150 },
    {
      field: 'OrderDate',
      headerText: 'Order Date',
      width: 130,
      format: 'yMd',
      textAlign: 'Right',
    },
    { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right' },
    {
      field: 'ShippedDate',
      headerText: 'Shipped Date',
      width: 140,
      format: 'yMd',
      textAlign: 'Right',
    },
    { field: 'ShipCountry', headerText: 'Ship Country', width: 150 },
  ],
});
grid.appendTo('#Grid');

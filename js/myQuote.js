var myQuote = {

	yqlURL: "http://query.yahooapis.com/v1/public/yql?q=",
	dataFormat: "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
	symbol: "",
	stockStats: "",

	init: function() {
	
		//Sumbit click handler:
		$("#submit").click(function() {
			
			//Get the ticker from the form:
			myQuote.symbol = $("#ticker").val();
			
			//Get the stock data from YQL, return a jQuery Deferred:
			var $d = myQuote.getStockData();

			//After retrieving the JSON data, populate the list view:
			$d.success( function (json, textStatus, jqXHR) { 
				
				//Build the <li> items for the listview:
				var ulist = myQuote.buildStats(json); 

				//Reload the listview:
				myQuote.populateListview(ulist); 
				
			} );

		});

	},
	
	getStockData: function() {
	
		//Build the URL to pass to YQL:
		var realtimeQ = myQuote.yqlURL+"select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + myQuote.symbol + "%22)%0A%09%09&"+ myQuote.dataFormat;	
		
		//Using a jQuery Deferred object, get the json data:
		var $defer = $.ajax({
			url : realtimeQ,
			data : '{}',
			dataType: 'json'
		}).success(function (json, textStatus, jqXHR) { 
		}).error(function () { alert('ERROR!'); });

		//Return the jQuery deferred obj:
		return $defer;
	},
	
	buildStats: function(json) {

		var o = json.query.results.quote;
	
		var list = $('<ul/>').attr({
  			'data-role': 'listview',
  			'data-inset': 'true',
  			'id': 'myKeyStatsList',
  			'data-divider-theme': 'f',
  			'data-theme': 'f'
		});
    
		list.append("<li data-role='list-divider'>Stock Data</li>");
		list.append("<li>" + o.Name + " (" + o.StockExchange + ":" + o.Symbol + ")</li>");
		list.append("<li>Ask Price <span class='ui-li-count'>$" + valueOrDefault(o.AskRealtime,0) + "</span></li>");
		list.append("<li data-role='list-divider'>Dividend Data</li>");
		list.append("<li>Dividend Yield <span class='ui-li-count'>" + valueOrDefault(o.DividendYield, 0) + "%</span></li>");
		list.append("<li>Dividend per Share <span class='ui-li-count'>$" + valueOrDefault(o.DividendShare) + "</span></li>");
		list.append("<li>Ex-Dividend Date <span class='ui-li-count'>" + valueOrDefault(o.ExDividendDate) + "</span></li>");
		list.append("<li>Dividend Pay Date <span class='ui-li-count'>" + valueOrDefault(o.DividendPayDate) + "</span></li>");			
		list.append("<li data-role='list-divider'>Ratios</li> ");
		list.append("<li>EPS <span class='ui-li-count'>" + valueOrDefault(o.EarningsShare) + "</span></li>");
		list.append("<li>EBITDA <span class='ui-li-count'>" + valueOrDefault(o.EBITDA) + "</span></li>");
		list.append("<li>Price/Sales <span class='ui-li-count'>" + valueOrDefault(o.PriceSales) + "</span></li>");
		list.append("<li>Price/Book <span class='ui-li-count'>" + valueOrDefault(o.PriceBook) + "</span></li>");
		list.append("<li>Price/Earnings <span class='ui-li-count'>" + valueOrDefault(o.PERatio) + "</span></li>");
		list.append("<li>PEG <span class='ui-li-count'>" + valueOrDefault(o.PEGRatio) + "</span></li>");
		list.append("<li>Short <span class='ui-li-count'>" + valueOrDefault(o.ShortRatio) + "</span></li>");
		
		return list;

	},	
	
	populateListview: function(list) {

		//Reload the listview:
		$("#divStatsList").empty();
		
		list.appendTo($("#divStatsList")).listview();

	}
	
	
}	//END: myQuote


//Function to return a blank if a value is null.
function valueOrDefault(val, def) {
    if (def == undefined) def = "N/A";
    return val == undefined ? def : val;
}
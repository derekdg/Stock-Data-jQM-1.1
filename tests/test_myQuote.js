describe("Testing myQuote methods", function() {
  
	it("Test myQuote object literal is defined", function () {
		expect(myQuote).toBeDefined();
	});
		
	it("Testing valueOrDefault function", function() {
    
		//Test a valid value passed in comes back out:
		expect(valueOrDefault(2)).toEqual(2);
		
		//Test an undefined value with NO default goes in, N/A comes out:
		expect(valueOrDefault(undefined)).toEqual('N/A');
		
		//Test an undefined value with a default goes in, the default comes out:
		expect(valueOrDefault(undefined, 'Not Applicable')).toEqual('Not Applicable');

	}); 
  
	it("Test the getStockData() YQL call is working properly", function() {
  	
		//Set the ticker to be used in the YQL URL:
		myQuote.symbol = "MSFT";
		
		//Call the method to retrieve data:
		var $d = myQuote.getStockData();

		//When the ajax call is complete, check the status:
		$d.complete( function(jqXHR, textStatus) {
			expect(textStatus.toLowerCase()).toEqual("success");
		});			
  
	});

});

describe("Testing the buildStats unordered list", function() {

	///////////////////////////////////////////////
	//Mock data (using MSFT as an example here): //
	///////////////////////////////////////////////
	var list;		
	var $tst = $.parseJSON('{"query":{"count":1,"created":"2012-04-16T21:11:32Z","lang":"en-US","results":{"quote":{"symbol":"MSFT","Ask":"31.10","AverageDailyVolume":"49525600","Bid":"31.09","AskRealtime":"31.10","BidRealtime":"31.09","BookValue":"7.65","Change_PercentChange":"+0.265 - +0.86%","Change":"+0.265","Commission":null,"ChangeRealtime":"+0.265","AfterHoursChangeRealtime":"N/A - N/A","DividendShare":"0.72","LastTradeDate":"4/16/2012","TradeDate":null,"EarningsShare":"2.759","ErrorIndicationreturnedforsymbolchangedinvalid":null,"EPSEstimateCurrentYear":"2.69","EPSEstimateNextYear":"3.02","EPSEstimateNextQuarter":"0.65","DaysLow":"30.77","DaysHigh":"31.19","YearLow":"23.65","YearHigh":"32.95","HoldingsGainPercent":"- - -","AnnualizedGain":null,"HoldingsGain":null,"HoldingsGainPercentRealtime":"N/A - N/A","HoldingsGainRealtime":null,"MoreInfo":"cnsprmiIed","OrderBookRealtime":null,"MarketCapitalization":"260.7B","MarketCapRealtime":null,"EBITDA":"29.992B","ChangeFromYearLow":"+7.425","PercentChangeFromYearLow":"+31.40%","LastTradeRealtimeWithTime":"N/A - <b>31.075</b>","ChangePercentRealtime":"N/A - +0.86%","ChangeFromYearHigh":"-1.875","PercebtChangeFromYearHigh":"-5.69%","LastTradeWithTime":"Apr 16 - <b>31.075</b>","LastTradePriceOnly":"31.075","HighLimit":null,"LowLimit":null,"DaysRange":"30.77 - 31.19","DaysRangeRealtime":"N/A - N/A","FiftydayMovingAverage":"31.8686","TwoHundreddayMovingAverage":"28.4096","ChangeFromTwoHundreddayMovingAverage":"+2.6654","PercentChangeFromTwoHundreddayMovingAverage":"+9.38%","ChangeFromFiftydayMovingAverage":"-0.7936","PercentChangeFromFiftydayMovingAverage":"-2.49%","Name":"Microsoft Corpora","Notes":null,"Open":"30.99","PreviousClose":"30.81","PricePaid":null,"ChangeinPercent":"+0.86%","PriceSales":"3.59","PriceBook":"4.03","ExDividendDate":"Feb 14","PERatio":"11.17","DividendPayDate":"Jun 14","PERatioRealtime":null,"PEGRatio":"1.45","PriceEPSEstimateCurrentYear":"11.45","PriceEPSEstimateNextYear":"10.20","Symbol":"MSFT","SharesOwned":null,"ShortRatio":"1.60","LastTradeTime":"4:00pm","TickerTrend":"&nbsp;==-+==&nbsp;","OneyrTargetPrice":"34.00","Volume":"38117816","HoldingsValue":null,"HoldingsValueRealtime":null,"YearRange":"23.65 - 32.95","DaysValueChange":"- - +0.86%","DaysValueChangeRealtime":"N/A - N/A","StockExchange":"NasdaqNM","DividendYield":"2.34","PercentChange":"+0.86%"}}}}');

	//Before each test, call the buildStats method to build the unordered list to test with:
	beforeEach(function() {
		list = myQuote.buildStats($tst);
	});
	
	it("Test the unordered list is well formed", function() {
		
			///////////////////
			//Test the list: //
			///////////////////
			
			//Expect the unordered list object to be defined:
			expect(list).toBeDefined();
			
			//Expect that it is a jQuery object:
			expect(list.jquery).toBeDefined();
			
			//Expect the length of unordered list to be one:
			expect(list.length).toBe(1);
			
			//Expect that it is an unordered list:
			expect(list[0].nodeName.toLowerCase()).toBe('ul');
	
	}); 
		
	it("Test the unorderd list contains the correct number of items", function() {
			
			///////////////////
			//Test the list: //
			///////////////////
			
			//Expect that there are 16 children in the unordered list:
			expect(list.children().length).toBe(16);
			
			//Expect the children are all list items:
			expect(list.children('li').length).toBe(list.children().length);
	
	}); 	

	it("Test that the list is properly built", function() {

			///////////////////
			//Test the list: //
			///////////////////
			
			//Expect the list contains "MSFT"
			expect(list.children().eq(1).html()).toContain($tst.query.results.quote.Symbol);
	
	});


});  
  

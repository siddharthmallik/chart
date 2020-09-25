function loadWorldWideStats(){
    console.log('loadWorldWideStats called');
    am4core.useTheme(am4themes_animated);

    var chart = am4core.create("worldwide", am4charts.XYChart);
    chart.data = generateChartData();

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    var viewSeries = chart.series.push(new am4charts.LineSeries());
    viewSeries.name = "Views";
    viewSeries.dataFields.valueY = "visits";
    viewSeries.dataFields.openValueY = "shares";
    viewSeries.dataFields.dateX = "date";
    viewSeries.strokeWidth = 1;
    viewSeries.tooltipText = "Visits: {valueY.value}, Shares: {openValueY.value}";

    var shareSeries = chart.series.push(new am4charts.ColumnSeries());
    shareSeries.name = "Shares";
    shareSeries.dataFields.valueY = "shares";
    shareSeries.dataFields.dateX = "date";

    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(viewSeries);

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = viewSeries;

    chart.legend = new am4charts.Legend();

}

function loadTop5Countries(){
    console.log('loadTop5Countries called');
    var chart = am4core.create("top5Countries", am4charts.PieChart3D);

    chart.data = [{
        "country":"India",
        "value": 500
    },{
        "country":"Germany",
        "value": 301
    },{
        "country":"France",
        "value": 250
    },{
        "country":"Australia",
        "value": 165
    },{
        "country":"USA",
        "value": 140
    }];

    var pieSeries = chart.series.push(new am4charts.PieSeries3D());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#4a2abb");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    chart.innerRadius = am4core.percent(30);

    chart.legend = new am4charts.Legend();
} 


function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 356);
    var visits = 500;
    var shares = 100;
    for (var i = 0; i < 356; i++) {
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);
        visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
        shares += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
        chartData.push({
            date: newDate,
            visits: visits,
            shares: shares
        });
    }
    return chartData;
}

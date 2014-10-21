$(document).ready(function() {
    $('#fullpage').fullpage({
    	resize: true,
    	sectionsColor: ['#fffcf5', '#26ae5f', '#3498db', '#f5e653'],
    	anchors: ['page1','page2','page3','page4'],
    	loopHorizontal: false,
    	afterLoad: function(anchorLink, index){
            //using index
            if(index == 3){
                $('#slide_footer').css('display', 'block');
            }
        },
        onLeave: function(index, nextIndex, direction){
            //after leaving section 2
            if(index == 3)
            {
                $('#slide_footer').css('display', 'none');
            }
        },
        afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){

            if(index == 3 && slideIndex == 0)
            {
            	$('#pixel_gal').css('right', '40%');
            	$('#time_period').html('2012.02');
            }

            if(index == 3 && slideIndex == 1){
            	$('#pixel_gal').css('right', '20%');
	            $('#time_period').html('2012.02-2013.05');
            }
            if(index == 3 && slideIndex == 2)
            {
            	$('#pixel_gal').css('right', '0');
	            $('#time_period').html('2013.05-2014.05');
            }
            if(index == 3 && slideIndex == 3)
            {
            	$('#pixel_gal').css('right', '-20%');
 	            $('#time_period').html('2013.05-2014.07');
            }
            if(index == 3 && slideIndex == 4)
            {
            	$('#pixel_gal').css('right', '-40%');
 	            $('#time_period').html('2013.07-2014.10');
            }

        }
    });
	

	function drawChart(func, data, options,elem)
	{

		//Get the context of the canvas element we want to select	
		var ctx = document.getElementById(elem).getContext("2d");
		var myNewChart = new Chart(ctx);
		var f = myNewChart[func];
		f.call(myNewChart, data, options);
	}

	//slide 1
	var data_0 = {
		labels : ["PS","HTML","CSS","JS","PHP","CodeIgniter"],
		datasets : [
			{
				fillColor : "rgba(241, 196, 15,1)",
				strokeColor : "rgba(243, 156, 18,1)",
				data : [70,60,55,70,65,60]
			}
		]
	}

	var options_0 = {
		showTooltips: false,
		//Boolean - If we show the scale above the chart data			
		scaleOverlay : false,
		
		//Boolean - If we want to override with a hard coded scale
		scaleOverride : false,
		
		//** Required if scaleOverride is true **
		//Number - The number of steps in a hard coded scale
		scaleSteps : null,
		//Number - The value jump in the hard coded scale
		scaleStepWidth : null,
		//Number - The scale starting value
		scaleStartValue : null,

		//String - Colour of the scale line	
		scaleLineColor : "rgba(0,0,0,.0)",
		
		//Number - Pixel width of the scale line	
		scaleLineWidth : 0,

		//Boolean - Whether to show labels on the scale	
		scaleShowLabels : false,
		
		//Interpolated JS string - can access value
		scaleLabel : "<%=value%>",
		
		//String - Scale label font declaration for the scale label
		scaleFontFamily : "'Helvetica'",
		
		//Number - Scale label font size in pixels	
		scaleFontSize : 14,
		
		//String - Scale label font weight style	
		scaleFontStyle : "normal",
		
		//String - Scale label font colour	
		scaleFontColor : "#fff",	
		
		///Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : false,
		
		//String - Colour of the grid lines
		scaleGridLineColor : "rgba(0,0,0,.0)",
		
		//Number - Width of the grid lines
		scaleGridLineWidth : 1,	

		//Boolean - If there is a stroke on each bar	
		barShowStroke : false,
		
		//Number - Pixel width of the bar stroke	
		barStrokeWidth : 2,
		
		//Number - Spacing between each of the X value sets
		barValueSpacing : 5,
		
		//Number - Spacing between data sets within X values
		barDatasetSpacing : 1,
		
		//Boolean - Whether to animate the chart
		animation : true,

		//Number - Number of animation steps
		animationSteps : 60,
		
		//String - Animation easing effect
		animationEasing : "easeOutQuart",

		//Function - Fires when the animation is complete
		onAnimationComplete : null
	};
	drawChart('Bar', data_0, options_0,'myChart');

	//slide 2
	var data_1 = {
		labels : ["Jenkins","Shell","Python","JAVA/MAVEN","前端"],
		datasets : [
			{
				fillColor : "rgba(241, 196, 15,1)",
				strokeColor : "rgba(243, 156, 18,1)",
				data : [200,50,150,100,100]
			}
		]
	}

	drawChart('Bar', data_1, options_0,'myChart1');
	//slide 3
	var data_2 = {
		labels: ["C++", "Mysql", "PgSql", "前端", "shell"],
		datasets : [
			{
				fillColor : "rgba(241, 196, 15,1)",
				strokeColor : "rgba(243, 156, 18,1)",
				data : [200,150,100,50,80]
			}
		]
	};
	drawChart('Bar', data_2, options_0,'myChart2');

	//slide 4
	var data_3  = {
				labels: ["linux", "Mysql", "Shell", "C++", "情商"],
		datasets : [
			{
				fillColor : "rgba(241, 196, 15,1)",
				strokeColor : "rgba(243, 156, 18,1)",
				data : [200,100,100,50,250]
			}
		]
	}
	drawChart('Bar', data_3, options_0,'myChart3');

	$('.img_show').on('click', function(){
		var order = $(this).attr('img-order');
		var dom_id = '#work'+ order;
		var area = [$(dom_id + ' img').attr('width'), $(dom_id + ' img').attr('height')]; 
		var i = $.layer({
	    	type : 1,
	    	title : false,
	    	fix : false,
	    	offset:['50px' , ''],
	    	area : area,
	    	page : {dom : dom_id}
		});
	});
});
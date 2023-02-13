# Bar-Chart
Bar chart project for Lighthouse Labs 

##About
This code provides a customizable bar chart implementation using JavaScript/jQuery, HTML, and CSS. The chart can be displayed in either a stacked or non-stacked version and offers many range of options for customization.
Users can set the chart's width and height, adjust the position of the values, choose colors for the bars and labels, and set the spacing between bars and labels. Additionally, users can specify a chart title with font and size options.

##Screenshots
![Simple Bar Chart](/assets/img/simple bar chart.png)
![Stacked Bar Chart](/assets/img/stacked bar chart.png)

#Usage
##Setup
Simply save barchart.js and barchart.css into your project. Place the following lines in your page's <head>:
  ```
  <link rel="stylesheet" href="barchart.css">
  <script src="barchart.js"></script>
  ```
  Call the following function from within <script> tag in your HTML file and the chart will render into the DOM element specified. Do not forget to use $(document).ready().
  ```
  <script>
    $(document).ready(
    drawBarChart(data, options, element)
    )
  </script>
  ```
There are some exampls in the index.html file that commented out, It can be used for your purposes.
  
##Parameters
  ###Data
  data must be given as an array of objects, each object representing a single column of data.
  Each data object within the array has the following properties:
  For creating a simple bar (only one value):
  *```value``` (number): the data amount
  *```label``` (String): Label to be applied under the column (x-axis)
  For creating a stacked bar(multiple values):
  *```value``` (array of numbers): each bar has a multiple values that stored in an array, the numbers in the array should be in order(bottom to top in a bar)
  *```label``` (String): Label to be applied under the column (x-axis)

  Y-axis is automatically generated based on the data given (maximum value)
  
  ###Options
  The options object has the following properties:

  *```stackedBarChart```: A boolean value indicating whether the chart should be stacked or simple. If you want to draw stacked bar chart, set the value to true,        otherwise set the value to false.
  *```chartWidth```: A string(default: "100") indicating the width of the chart, in rems.
  *```chartHeight```: A string(default: "40") indicating the height of the chart, in rems.
  *```positionOfValues```: A string(default: "center") indicating the position of the values in the bar(top, center, bottom)
  *```barColor```: A string(default: "#fbc74e") indicating the color of the bars. It can be a name (eg. 'red') or 'hsl()', '#hex', etc
  *```barWidth```: A string(default: "7") indicating the width of the bars, in rems.
  *```labelColor```: A string(default: "#f8f8f8") indicating the color of the labels.
  *```barSpacing```: A string(default: "space-around") indicating the spacing between bars(options: start, end, space-between, space-around)
  *```barChartTitle```: A string indicating the title of the chart.
  *```titleColor```: A string(default: "#f8f8f8") indicating the color of the title.
  *```titleSize```: A string(default: "3") indicating the size of the title, in rems.
   options for stacked bar chart:
  *```colBarColors```: An array of strings(default: ["#006778", "#0093AB", "#00AFC1", "#FFD124"]) indicating the color of each stack in a bar in a stacked bar chart.    The strings must be in order(bottom to top)
  *```labelsPerBar```: An array of strings(default: ["A", "B", "C", "D"]) indicating the labels for each stack in a bar in a stacked bar chart. The strings must be      in order(bottom to top)
  *```colBarValuePosition```: A string(default: "center") indicating the position of the values for each stack in a bar in a stacked bar char(top, center, bottom)
  
  ###Element
  Id of the element where the chart will be rendered into ie. element = '#barchart' will render to ```<div id:"barchart"></div>```
  
  ##External resources
  https://www.w3schools.com/
  https://jquery.com/
  https://developer.mozilla.org/en-US/

  
 

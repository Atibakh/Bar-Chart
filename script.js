const defaultHeight = 40;
let values = [];
let labels = [];
let total = [];
let max = 0;

function createBarchart(element) {
  const barchartHTML = `
    <div class="bar-title"></div>
      <div class="stackedLabels"></div>
      <section class="barchart">
        <div class="tick-box"></div>
        <div class="grid-box"></div>
        <div class="bar-box"></div>
        <div class="space"></div>
        <div class="label-box"></div>
      </section>
    `;

  $(element).append(barchartHTML);
}

function objectOfOptions(object) {
  //width and height of the barchart
  $(".barchart").css(
    "grid-template-columns",
    `max-content ${object.chartWidth}rem`
  );
  $(".barchart").css(
    "grid-template-rows",
    `${object.chartHeight}rem max-content`
  );

  // space between bars and labels
  if (object.barSpacing === "start") {
    $(".bar-box").css("justify-content", "flex-start");
    $(".label-box").css("justify-content", "flex-start");
  } else if (object.barSpacing === "end") {
    $(".bar-box").css("justify-content", "flex-end");
    $(".label-box").css("justify-content", "flex-end");
  } else {
    $(".bar-box").css("justify-content", `${object.barSpacing}`);
    $(".label-box").css("justify-content", `${object.barSpacing}`);
  }

  // title and font and size of the title
  $(".bar-title").text(object.barChartTitle);
  $(".bar-title").css("color", object.titleColor);
  $(".bar-title").css("font-size", object.titleSize);
}

function gridNumbers(a) {
  $(".grid-box").prepend(`
    <div class="grid grid-${a}"></div>
    `);
}

function tickNumbers(b) {
  $(".tick-box").prepend(`
      <div class="tick tick-${b}">${b}</div>
      `);
}

function optionPerBar(labels, colors) {
  for (let i = 0; i < colors.length; i++) {
    const labelsHtml = `
      <div class="eachLabel">
          <div class="color-${[i]}"></div>
          <div class="label-${labels[i]}">${labels[i]}</div>
        </div>
      `;
    $(".stackedLabels").append(labelsHtml);
    $(`.color-${[i]}`).css({
      "background-color": colors[i],
      width: "1.3rem",
      height: "1.3rem",
      "margin-right": "0.5rem",
    });
  }
}

function separateValuesFromLabels(data) {
  data.forEach((ob) => {
    values.push(ob.value);
    labels.push(ob.label);
  });
}

function estimateTotalNumber(values) {
  for (let i = 0; i < values.length; i++) {
    let sum = values[i].reduce((a, b) => a + b, 0);
    total.push(sum);
  }
}

function maxValue(array) {
  max += Math.max(...array);
}

//base function
function drawBarChart(data, object, element) {
  //insert html barchart
  createBarchart(element);
  //customize object options
  objectOfOptions(object);
  //separate numbers from values
  separateValuesFromLabels(data);
  // estimate total Number each bar in stacked version
  if (object.stackedBarChart) {
    estimateTotalNumber(values);
  }
  // look for the largest value (loop over the values array)
  if (object.stackedBarChart) {
    maxValue(total);
  } else {
    maxValue(values);
  }
  // see what renge the max is and assign a new max
  if (max < 10) {
    max = 10;
    for (let i = 0; i <= max - 1; i++) {
      // create grids based on the largest number
      gridNumbers(i);
      //create tick element based on gird
      tickNumbers(i);
    }
  } else if (max < 20) {
    max = 20;
    for (let i = 0; i <= max - 2; i += 2) {
      gridNumbers(i);
      tickNumbers(i);
    }
  } else if (max < 50) {
    max = 50;
    for (let i = 0; i <= max - 5; i += 5) {
      gridNumbers(i);
      tickNumbers(i);
    }
  } else if (max < 100) {
    max = 100;
    for (let i = 0; i <= max - 10; i += 10) {
      gridNumbers(i);
      tickNumbers(i);
    }
  } else if (max < 200) {
    max = 200;
    for (let i = 0; i <= max - 20; i += 20) {
      gridNumbers(i);
      tickNumbers(i);
    }
  } else {
    for (let i = 0; i <= max - 50; i += 50) {
      gridNumbers(i);
      tickNumbers(i);
    }
  }

  //1.loop over the numbers and labels array
  for (let i = 0; i < values.length; i++) {
    const barType = object.stackedBarChart ? "s-bar" : "bar";
    const barHtml = `
        <div class="${barType} ${barType}-${i + 1}"><span class="value value-${
      i + 1
    }">
        </span></div>
      `;
    const labelHtml = `
        <div class="label label-${i + 1}">${labels[i]}</div>
      `;

    $(".bar-box").append(barHtml);
    $(".label-box").append(labelHtml);
    const height = object.stackedBarChart ? total[i] : values[i];
    const setHeight =
      object.chartHeight === "" ? defaultHeight : object.chartHeight;
    const barHeight = ((height * setHeight) / max).toFixed(2);
    $(`.${barType}-${i + 1}`).animate(
      {
        height: `${barHeight}rem`,
      },
      1500
    );

    //label properties
    $(".label").css("color", object.labelColor);
    $(".label").css("width", `${object.barWidth}rem`);

    // simple bar properties
    if (!object.stackedBarChart) {
      $(".bar").css("background-color", object.barColor);
      $(`.value-${i + 1}`).html(values[i]);
      $(`.${barType}`).css("width", `${object.barWidth}rem`);

      if (object.positionOfValues === "bottom") {
        $(".bar").css("align-items", "flex-end");
      } else {
        $(".bar").css("align-items", object.positionOfValues);
      }
    }

    //loop over each bar arrays
    if (object.stackedBarChart) {
      for (let n = 0; n < values[i].length; n++) {
        const barEachData = `
          <div class="col c-${[i]}-${[n]}"><span class="s-value s-value-${[
          i,
        ]}-${[n]}">
          </span></div>
          `;
        $(`.s-bar-${i + 1}`).prepend(barEachData);
        $(`.c-${[i]}-${[n]}`).css(
          "height",
          `${values[i][n] * (setHeight / total[i])}rem`
        );
        $(`.c-${[i]}-${[n]}`).css("background-color", object.colBarColors[n]);
        $(`.s-value-${[i]}-${[n]}`).html(values[i][n]);
        if (object.colBarValuePosition === "bottom") {
          $(".col").css("align-items", "flex-end");
        } else {
          $(".col").css("align-items", object.colBarValuePosition);
        }
      }
    }
  }
  if (object.stackedBarChart) {
    $(".stackedLabels").css("display", "flex");
    optionPerBar(object.labelsPerBar, object.colBarColors);
  }
}

// object;
const options = {
  stackedBarChart: false,
  chartWidth: 100,
  chartHeight: 30,
  positionOfValues: "center",
  colBarValuePosition: "center",
  barColor: "",
  barWidth: 7,
  labelColor: "",
  barSpacing: "space-around",
  barChartTitle: "Untitled Bar",
  titleColor: "",
  titleSize: 30,
  colBarColors: ["#006778", "#0093AB", "#00AFC1", "#FFD124"],
  labelsPerBar: ["A", "B", "C", "D"],
};

function showLoader() {
    var loader = document.createElement("div");
    loader.classList.add("loader");
    document.getElementById("plot-div").appendChild(loader);
  }
  
  function hideLoader() {
    var loader = document.querySelector(".loader");
    if (loader) {
      loader.parentNode.removeChild(loader);
    }
  }
  
  function calculateRoots(a, b, c) {
    var discriminant = b * b - 4 * a * c;
    if (discriminant > 0) {
      var sqrt = Math.sqrt(discriminant);
      var x1 = (-b + sqrt) / (2 * a);
      var x2 = (-b - sqrt) / (2 * a);
      return { x1: x1, x2: x2 };
    } else if (discriminant === 0) {
      var x = -b / (2 * a);
      return { x1: x, x2: x };
    } else {
      return { x1: "NaN", x2: "NaN" };
    }
  }
  
  function plotQuadratic(a, b, c) {
    showLoader();
  
    var x = Array.from({ length: 21 }, (_, i) => i - 10);
    var y = x.map((i) => a * Math.pow(i, 2) + b * i + c);
  
    var trace = {
      x: x,
      y: y,
      mode: "lines",
      type: "scatter",
      line: {
        color: "blue",
      },
    };
  
    var data = [trace];
  
    var layout = {
      title: "Quadratic Equation Plot",
      xaxis: {
        title: "X-axis",
        gridcolor: "lightgray",
        showgrid: true,
      },
      yaxis: {
        title: "Y-axis",
        gridcolor: "lightgray",
        showgrid: true,
      },
      plot_bgcolor: "#000",
      paper_bgcolor: "#000",
      font: {
        color: "#fff",
      },
    };
  
    Plotly.newPlot("plot-div", data, layout).then(function () {
      hideLoader();
    });
  
    var roots = calculateRoots(a, b, c);
  
    var rootsDiv = document.getElementById("roots-div");
    if (!rootsDiv) {
      rootsDiv = document.createElement("div");
      rootsDiv.id = "roots-div";
      document.body.appendChild(rootsDiv);
    }
    rootsDiv.innerHTML = `
      <div class="result">
        <p>Root X1: ${roots.x1}</p>
        <p>Root X2: ${roots.x2}</p>
      </div>
    `;
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      var a = parseInt(document.getElementById("a").value);
      var b = parseInt(document.getElementById("b").value);
      var c = parseInt(document.getElementById("c").value);
  
      plotQuadratic(a, b, c);
    });
  });
  
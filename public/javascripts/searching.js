function tryEnter(event) {
  if (event.keyCode == 13) {
    searching();
    event.preventDefault();
  };
};



function searching() {
  console.log("bla")
  $("#output").html("");
  var myinput = document.getElementById("in").value;
  console.log(myinput)
//  var arr = myinput.split(" ");
//  myinput = arr.join("%20");

  var address = "/search/?location="+myinput
  console.log(address);
  $.get(address, function(data) {

    produceResult(data.businesses);

  });

};


function produceResult(results) {
  //  var results = data.query.search;
  console.log(results)
  results.forEach(function(result) {

    var mainDiv = document.getElementById("output")

    var mydiv = document.createElement("div");
    mydiv.className = "searchResult";
    var title = document.createElement("h2");
    var titleTxt = document.createTextNode(result.name);
    var extract = document.createElement("p")
    extract.innerHTML = result.snippet_text;
    //   var extractTxt = document.createTextNode(result.snippet);
    mainDiv.appendChild(mydiv);
    mydiv.appendChild(title);
    title.appendChild(titleTxt);
    mydiv.appendChild(extract);
    //mydiv.appendChild(extractTxt);
  });
};

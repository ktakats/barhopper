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
  var mainDiv = document.getElementById("output");
  results.forEach(function(result) {

    var mydiv = document.createElement("div");
    mydiv.className = "searchResult";

    var imsp=document.createElement("span");
    var im=document.createElement("img");
    im.className="resultimg";
    im.src=result.image_url;
    imsp.appendChild(im);

    var rsvp=document.createElement("button");
    rsvp.type="button";
    rsvp.value="RSVP";
    rsvp.id="rsvp";
    rsvp.innerHTML="RSVP";


    var textsp=document.createElement("span");
    textsp.className="textsp";
    var title = document.createElement("h2");
    title.innerHTML=result.name;

    var link=document.createElement("a");
    link.href=result.url;
    link.appendChild(title);

    var rating=document.createElement("img");
    rating.src=result.rating_img_url_small;
    rating.setAttribute('style', 'padding-left: 5px; margin-top: -5px');
    title.appendChild(rating);

    var extract = document.createElement("p");
    extract.setAttribute('style', 'text-align: left; font-style: italic; position: relative')
    extract.innerHTML = "\"" +result.snippet_text+ "\"";
    //   var extractTxt = document.createTextNode(result.snippet);
    mainDiv.appendChild(mydiv);
    mydiv.appendChild(imsp);
    textsp.appendChild(link);
    textsp.appendChild(extract);
    mydiv.appendChild(textsp);
    mydiv.appendChild(rsvp)
    //mydiv.appendChild(extractTxt);
  });
};

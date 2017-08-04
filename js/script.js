
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

    var streetStr = $('#street').val();
    var cityStr =$('#city').val();
    var address = streetStr +', ' + cityStr;
    $greeting.text('So, you want to live at ' + address + '?');
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+address+ ' ';
    $body.append('<img class="bgimg" src=" '+streetviewUrl+' ">');


    var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
nytimesUrl += '?' + $.param({
  'api-key': "09fb3bfd089d48d1877eebffe71566cf",
  'q': cityStr
});
$.ajax({
  url: nytimesUrl,
  method: 'GET',
}).done(function(result) {
  console.log(result);
 var articles =result.response.docs;
    console.log(articles);
   for (var i=0; i<articles.length; i++) {
    var article = articles[i];
        $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">' +article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');}



}).fail(function(err) {
    console.log("error");
 throw err;
});



    $nytHeaderElem.text('New York Times Articles About ' + cityStr);

 var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +cityStr+ '&format=json&callback=wikiCallbackFunction';

            $.ajax(wikiUrl, {
                dataType: "jsonp",
                success: function(response) {
                var articleList = response[1];
                    for (var i=0; i<articleList.length; i++){
                    var articleStr = articleList[i];

                        console.log(articleStr);
                    var url = 'http://en.wikipedia.org/wiki/' +articleStr;
                        $wikiElem.append('<li><a href="'+url+'">'+articleStr+'</a></li>');

                    }

                }
            });


    return false;




};

$('#form-container').submit(loadData);

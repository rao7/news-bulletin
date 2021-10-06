"use strict";
var newsBulletin = {
  newsCount: 0,
  newsLength: 0,
  newsArray: [],
  country: "us",
  category: "general",
  apiKey: "4122d7a5d08e45cf8be1b49d75f4f533",
  fetchNews: function(country, category) {
    $.ajax({
      url:
        "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json",
      crossDomain: true,
      type: "GET",
      dataType: "json",
      success: function(result) {
        if (result.status == "ok") {
            newsBulletin.newsArray = result.articles;
            newsBulletin.newsArray.unshift({title:"Hello, and welcome to news headlines."});
            newsBulletin.newsArray.push({title:"that's all for now, good bye! "});
          newsBulletin.newsLength = result.articles.length;
          newsBulletin.showNews(result.articles); //show news
        } else {
          console.log(result.status);
        }
      }
    });
  },
  showNews: function(newz) {
    $.each(newz, function(i, sources) {
      $("#scrollNews p").append(
        "&nbsp;<span>&bull; " + sources.title + "&nbsp; </span>&nbsp;"
      );
    });

    this.tickerNews();
      if(!('speechSynthesis' in  window)){
           alert("sorry your browser does't support voice synthesis");
      }
      else{
      newsBulletin.newsHeadlines(newsBulletin.newsArray);
      }
    //this.greetings();
  },
  
  unspeak: function() {
    $(".mouth")
      .removeClass("hello")
      .removeClass("speak");
  },
  newsHeadlines: function(sayNews) {
  
    var countSpk  = 0;
     

    if (sayNews.length >= countSpk) {
       
     if(sayNews.length != 0 ){
      var newsStr = sayNews[countSpk].title;
     var voices2 = window.speechSynthesis.getVoices();
      var msg2 = new SpeechSynthesisUtterance(newsStr);
      msg2.pitch = 0.6;
      msg2.lang = "en-IN";
      
      msg2.voice = voices2[0];
        
      window.speechSynthesis.speak(msg2);
        if(sayNews[countSpk].urlToImage != null && sayNews[countSpk].urlToImage !=''){
      $(".newz").html('<img src="' + sayNews[countSpk].urlToImage + '" />');
        }
      
        if(newsBulletin.newsLength == sayNews.length){ $(".mouth").addClass("hello"); 
          }
        else { $(".mouth").addClass("speak");}
       
      msg2.onend = function() {
        newsBulletin.unspeak();
          
        //console.log(sayNews[countSpk].title);
        sayNews.shift();
        setTimeout(newsBulletin.newsHeadlines(sayNews),2000);
      };
        
        }
        else {
             $(".newz").html('<h2>Thanks! for Watching .</h2>').children('h2').css('text-align','center');
        }
    }
  },

  tickerNews: function() {
    var tickerWidth = $("#scrollNews p").width();

    var scrollLeft = function() {
     
      $("#scrollNews p").animate(
        {
          "margin-left": -tickerWidth * (newsBulletin.newsLength + 0.4)
        },
        newsBulletin.newsLength * 6 * 1000,
        "linear",
        function() {
          resetNplay();
        }
      );
    };
    var resetNplay = function() {
      $("#scrollNews p")
        .css({ opacity: "0", "margin-left": "0" })
        .css("opacity", "1");
      scrollLeft();
    };
    scrollLeft();
  }
};

$(document).ready(function() {
  newsBulletin.fetchNews(newsBulletin.country , newsBulletin.category);
});

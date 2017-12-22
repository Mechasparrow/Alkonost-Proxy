const feedparser = require('feedparser-promised');


module.exports = {
 
  getFeed: function (feed_url) {
    
    //Feed Promise ; Returns object form of the rss feed
    
    var feed_promise = new Promise (function (resolve, reject) {

      var feed_object = {
         meta_info: {},
         items: []
      }
      
      feedparser.parse(feed_url).then (function (items) {
      
        //Set the meta info of the feed_object
        
        var meta_info = {
          title: "",
          description: "",
          link: "",
          image: ""
        }
        
        Object.keys(meta_info).forEach(function (key) {
          meta_info[key] = items[0].meta[key];
          
          if (key == "image") {
           meta_info[key] = items[0].meta[key].url; 
          }
        });
        
        
        feed_object.meta_info = meta_info
        
        items.forEach(function (item) {
          
          var article = {
             title: "",
             description: "",
             summary: "",
             link: "",
             author: ""
          }
          
          Object.keys(article).forEach(function (key) {
            article[key] = item[key];
          });
          
          feed_object.items.push(article);
        });
        
        resolve(feed_object);
        
      }).catch (function (error) {
        console.log(error);
        reject(error);
      });
    });
    
    return feed_promise;
    
  } 
}
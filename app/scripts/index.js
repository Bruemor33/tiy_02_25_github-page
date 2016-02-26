console.log("Hello World!");

var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');
var githubtoken = require('./githubtoken.js').token;
var usersUrl = 'https://api.github.com/users/Bruemor33';
var userReopUrl = 'https://api.github.com/users/Bruemor33/repos';

if(typeof(githubtoken) !== "undefined"){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken,
    }
  });
}

$('.nav-tabs').click(function(){
  $(this).addClass('.active');
});


function getRepos(){
  $.ajax(userReopUrl).done(function(data){
    console.log(data);
    $.each(data, function(index, repo){
      var repoContext = {
        repoName: repo.name,
        updatedAt: repo.updated_at,
        lang: repo.language,
        starGaze: repo.stargazers_count,
        forking: repo.forks_count
      };
      var source = $('#repo-page').html();
      var template = handlebars.compile(source);
      var html = template(repoContext);
      $('#repositories').append(html);
    });
  });
};
getRepos();

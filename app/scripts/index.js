console.log("Hello World!");

var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');
var githubtoken; //
var moment = require('moment');
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


function getRepos(){ //create the function to make a get request to the repo url of github's api
  $.ajax(userReopUrl).done(function(data){ //the actual get request
    console.log(data); //log the data to the console in order to find what I need
    $.each(data, function(index, repo){ //run a loop through the data needed in order to push every repo to the page
      var repoContext = { //create a visual list of each data item you want to place within your handlebars template
        repoName: repo.name,
        updatedAt: repo.updated_at,
        lang: repo.language,
        starGaze: repo.stargazers_count,
        forking: repo.forks_count,
        repoUrl: repo.html_url
      };
      var source = $('#repo-page').html(); //where our handlebars script begins, or resides in our html
      var template = handlebars.compile(source); //the compile magic of our template
      var html = template(repoContext); //pulling out data into the template
      repo.updatedAt = moment(repoContext.updatedAt).startOf('minute').fromNow().append(html); //not really sure on where to place this.
      $('#repositories').append(html); //appending our data to the placeholder div in our html layout.

    });
  });
};
getRepos(); //function called

function getProfile(){ //since I am just pulling profile information, there is no need to run a loop function.
  $.ajax(usersUrl).done(function(data){
    console.log(data)
      var profileContent = { //profile content needed to populate the template
        profilePic: data.avatar_url,
        fullName: data.name,
        userName: data.login,
        userEmail: data.email,
        joinedAt: data.created_at
      };
      var source = $('#profile-page').html();
      var template = handlebars.compile(source);
      var html = template(profileContent);
      $('#profile-sidebar').append(html);
  });
};
getProfile(); //function called

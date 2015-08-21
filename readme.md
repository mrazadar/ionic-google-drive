Ionic-google-drive mobile Application
=========
Getting Started
---------------

Step-1: (Setup Project)
=======
After you have cloned this repo, run the ionic installer to set up your machine
with the necessary dependencies to run and test this app:

     ```bash

     $ cd ionic-google-drive
     $ sudo npm install -g cordova ionic gulp
     $ npm install
     $ gulp install
     $ bower install

     ```

------------------
Step-2: (Configure Plugins)
=======
Then, make sure you have following plugins installed


com.ionic.keyboard 1.0.4 "Keyboard"
cordova-plugin-inappbrowser 1.0.1-dev "InAppBrowser"

------------------


Step-3: (Set up google-application on https://console.developers.google.com)
=======

Create a new project E.g. 'google-drive-test'

open this 'google-drive-test' project. 

Goto APIs & auth -> Credentials
 
 Move to 2nd Tab on top 'OAuth consent screen' 
 provide a 'Product Name' for your app E.g. "Google Drive Test App 2.0" and hit 'save' button. 

Move back to 1st Tab 'Credentials' on top and click 'Add credentials' button to get a client Id for your application. 

 Select 'OAuth 2.0 client ID' option.
 Select 'Web-application' option.
 Put a redirect-uri for your application e.g. 'http://localhost/callback/'
  
  Note: Authorized-redirect-uri can be any page where google can redirect user after login. 
    If you're implementing a purely Javascript based application where you don't have a backend. you can put any valid URL 
    like 'http:localhost/callback/', this redirect-uri must match with the redirect-uri of your call. 
     

 Click 'Create' button and you'll have 'client_id for your app. :)

 Finally, you just need to enable google-drive api for your app;
    Goto: APIs & auth -> APIs
    and in search type 'drive', Now hit the 'Drive API' option.
    press the 'Enable API' button on top and you're done.

    There you go :)

-------------

Step-4: (Authorize with Google and access google-drive-files)
==============

 You just need to call the 'authenticate' method of 'Drive' factory inside drive.js. (This will open goolge-authentication form inside in-app browser plugin)
 
    this.authenticateViaGoogle = function (user) {
       var defer = $q.defer();
       var client_id = "452884761284-bark5bkplgau1vcj8re88ok6r2vg3l48.apps.googleusercontent.com";//web-app
       var scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/userinfo.email'];
  
       Drive.authenticate(client_id, scopes, {redirect_uri: 'http://localhost/callback/'})
           .then(function (response) {
             if (response) {
               //console.log("UserInfo: " + JSON.stringify(response));
               token = response.access_token;
               gapi.auth.setToken(response);
               //email= response.authResponse.email;
               authenticated = true;
               defer.resolve('authenticated');
             }
           },
           function (error) {
             console.log("" + error);
             defer.reject('de-authenticated');
           });
       return defer.promise;
    };
   
   
    Note: how we're passing exactly same 'redirect-uri' in the authorize call. 
 
 once you receive response-token-object. You can use access_token for your authorization scheme.
 
 Lastly, you just need to set this response/token in 'gapi' javascript client library, to accommodate any further calls using gapi library

 like this : gapi.auth.setToken(response);

 You can see in drive.js how we're loading 'google-drive' client to use with the 'gapi' javascript client library.
 
 There you go!! 
 
 Now we can simply access our google-drive by using the drive client. 
 
 
     Drive.readFiles().then(function (files) {
       $scope.files = files;
       console.log("FileRead: success.");
     }, function () {
       console.log("FileRead: error.");
     });

 'Drive.readFiles' will read all files from google-drive.
  
  Similarly 'Drive' factory currently supports these methods.. 
  
      ///read all files
      
      Drive.readFiles().then(function (files) {
             $scope.files = files;
             console.log("FileRead: success.");
           }, function () {
             console.log("FileRead: error.");
           });
           
      ///load a single file against Id..
      
      Drive.loadFile($scope.file_id).then(function (response) {
        $scope.file = response;
        var fpath = $scope.file.metadata.title;
        $scope.file.metadata.title = fpath.substring(fpath.lastIndexOf('/') + 1, fpath.lastIndexOf('.'));
        $scope.file_content = $scope.file.content;
      }, function (error) {
         console.log(error);
      });
      
      ///save file
      
      Drive.saveFile($scope.file.metadata, $scope.file.content).then(function (result) {
        console.log("FileSaved: successfully.");
        $state.go('directory');
      }, function (err) {
        console.log("FileSaved: error.");
      });
      
      ///delete file
      
      Drive.deleteFile(file.id).then(function (resp) {
        $scope.files.splice($scope.files.indexOf(file), 1);
        console.log("file deleted successfully.")
      }, function (error) {
        console.log(error);
      });
      
      
      You can still implement whatever you want inside Drive factory.. 
      
      It's pretty Simple.. :)
      
      
      
      
  
 

angular.module('app', [])
  .controller('Controller', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
    $scope.lastArtist = '';
    $scope.stage = '';
    var spotifyUrl = "https://api.spotify.com/v1/me/player/currently-playing";
    var refreshInterval = 5;
    console.log("Access token: " + access_token)
    $scope.showPlayer = "Show";
    $scope.conjunction = "is";
    $scope.togglePlayer = function() {
      $scope.showPlayer = $scope.showPlayer == "Hide" ? "Show" : "Hide"
    }

    function update() {
      console.log("Updating");
      $http({
        method: 'GET',
        url: spotifyUrl,
        headers: {
          "Accept": "Accept: application/json",
          // "Authorization": 'Bearer BQDVFH6sP9x9-Maj5HhPx27c2ju8T-vewg5GoJeFf6cm13tAF261mwiGSBmfQBqtxfr9v2jNSN4AwlF07InpXoX3MQTy_S3Yj3aWCA2zRfOu4b2_9hdKeOecgiTmejFYx9mThK47Khl2SDm4zIbgptlz57PNK-B7KJx9xHYzw-9-ioON6RWVBXEgrVC-nXKczPTv_2OpwMbGW510gyXytG1rXNuzufePjKloJdYyWTUFrj5I2Dd-ZYP4Hv8Bl9bRD4hqxL9rP92C2EuZpJUbEClIoTBdlNXZVt6kMMmNgnJiZskpmhimeYrfbaPHVypwyHao'
          "Authorization": 'Bearer ' + access_token
        }
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log("OK!")
        var info = response.data.item
        var artists = info.artists
        var requestArtist = "";
        $scope.fullArtist = ""
        for (var i in artists) {
          $scope.fullArtist += artists[i].name + ", "
        }
        $scope.fullArtist = $scope.fullArtist.substring(0, $scope.fullArtist.length - 2);
        $scope.artist = artists[0].name
        if($scope.artist[$scope.artist.length -1] == 's') {
          $scope.conjunction = "are";
        }
        $scope.song = info.name
        $scope.album = info.album.name
        console.log("Artist: " + $scope.artist + ", lastArtist: " + $scope.lastArtist)
        if($scope.artist.trim() !== $scope.lastArtist.trim()) {
          console.log("Artist changed!");
          $http({
            method: 'GET',
            url: "/api/act/" + $scope.artist
          }).then(function successCallback2(response2) {
            console.log("API OK! " + JSON.stringify(response2))
            $scope.stage = response2.data.stage
            $scope.time = response2.data.time
            $scope.day = response2.data.day
          }, function errorCallback(response2) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("API Error! " + response2)
          });
        }
        $scope.lastArtist = $scope.artist;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("Error! " + response)
      });
    }

    $interval(update, refreshInterval * 1000);

  }])

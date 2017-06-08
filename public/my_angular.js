angular.module('app', [])
  .controller('Controller', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
    var spotifyUrl = "https://api.spotify.com/v1/me/player/currently-playing";
    console.log("Access token: " + access_token)
    $scope.showPlayer = "Show";
    $scope.togglePlayer = function() {
      $scope.showPlayer = $scope.showPlayer == "Hide" ? "Show" : "Hide"
    }
    function update() {
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
        $scope.song = info.name
        $scope.album = info.album.name
        console.log("Artist: " + $scope.artist)
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
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("Error! " + response)
      });
    }

    $interval(update, 3000);

  }])

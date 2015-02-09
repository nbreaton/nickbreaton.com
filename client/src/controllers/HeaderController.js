app.controller("HeaderController", function ($scope, $location, $rootScope, SiteInfo) {
  $scope.pageButtons = [
    new PageButton("About", "/"),
    // new PageButton("Skills", "/skills/"),
    // new PageButton("Portfolio", "/portfolio/"),
    // new PageButton("Hire", "/hire/"),
    new PageButton("Contact", "/contact/"),
    // new PageButton("Blog", "/blog/"),
  ];

  $scope.socialButtons = [
    new SocialButton("github.svg", "https://github.com/nbreaton/"),
  ];

  $scope.title = SiteInfo.nameIntro + " " + SiteInfo.name;
  $scope.positition = SiteInfo.jobTitle;
  $scope.subtitle = SiteInfo.moto;


  $scope.toggleDrop = function () {
    $scope.dropActive = !$scope.dropActive;

  }

  $scope.dropActive = false;

  function activateCurrentLink () {
    $rootScope.htmlTitle = SiteInfo.name;

    for (var i = 0; i < $scope.pageButtons.length; i++) {
      var button = $scope.pageButtons[i];
      if (button.link == $location.path()) {
        $scope.pageButtons[i].active = true;
        $rootScope.htmlTitle = button.name + " | " + $rootScope.htmlTitle;
      } else {
        $scope.pageButtons[i].active = false;
      }
    }
  }

  activateCurrentLink();

  $scope.$on('$routeChangeStart', activateCurrentLink);

  function PageButton (name, link) {
    this.active = false;
    this.name = name;
    this.link = link;
  }

  function SocialButton (resourceLink, pageLink) {
    var location = "/static/img/icons/";
    this.image = location + resourceLink;
    this.cssImage = "url('" + this.image + "')";
    this.link = pageLink;
  }
});

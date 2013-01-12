define(['player'], function(player) {
  describe("PlayerView", function() {
    var playerView;
    beforeEach(function() {
      playerView = new player.PlayerView();
    });

    afterEach(function() {
    // console.log("After");
    });

    it("should initialize some properties on the view object", function() {
      expect(playerView.$duration).toBeTruthy();
      expect(playerView.$time).toBeTruthy();
      expect(playerView.$volumeRange).toBeTruthy();
    });

  });
});
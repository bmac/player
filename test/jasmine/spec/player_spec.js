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

    it("should have a play button", function() {
      expect(playerView.$('.play').text()).tobe('|>');
    });

    describe("when a timeupdate event is triggered", function() {
      beforeEach(function() {
        playerView = new player.PlayerView();
        audio.currentTime = 0;
        playerView.$duration.val('0');
        playerView.$time.val('');
      });

      it("should update the position of the range slider", function() {
        var audio = playerView.audio;
        audio.currentTime = audio.duration / 2;
        expect(playerView.$duration.val()).toBe('0');
        $(audio).trigger('timeupdate');
        expect(playerView.$duration.val()).toBe('50');        
      });

      it("should update value of the time input", function() {
        var audio = playerView.audio;
        $(audio).trigger('timeupdate');
        expect(playerView.$time.val()).toBe('0:00');        
        audio.currentTime = audio.duration / 2;
        $(audio).trigger('timeupdate');
        expect(playerView.$time.val()).toBe('2:15');        
        });

    });


  });
});
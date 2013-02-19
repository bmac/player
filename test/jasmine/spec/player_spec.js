define(['player'], function(player) {
    describe("PlayerView", function() {
        var playerView;
        var reset_audio_element = function(playerView) {
            playerView.audio.currentTime = 0;
            playerView.$duration.val('0');
            playerView.$time.val('');
        };
        beforeEach(function() {
            playerView = new player.PlayerView();
            reset_audio_element(playerView);
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
            expect(playerView.$('.play').text()).toBe('|>');
        });

        describe("when a timeupdate event is triggered", function() {
            beforeEach(function() {
                playerView = new player.PlayerView();
                reset_audio_element(playerView);
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
                audio.currentTime = 0;
                $(audio).trigger('timeupdate');
                expect(playerView.$time.val()).toBe('0:00');
                audio.currentTime = audio.duration / 2;
                $(audio).trigger('timeupdate');
                expect(playerView.$time.val()).toBe('2:15');
            });

        });

        it("changing the volumn slider should update the volume", function() {
            var audio = playerView.audio;

            expect(audio.volume).toBe(1);
	    playerView.$volumeRange.val(0.5).trigger('change');
            expect(audio.volume).toBe(0.5);
        });

	it("should update value of the volume slider", function() {
            var audio = playerView.audio;
	    audio.volume = 0.5;
	    expect(playerView.$volumeRange.val()).toBe('0.5');
        });

	it("should allow the user to skip forward by 30 seconds", function() {
            var audio = playerView.audio;
	    audio.currentTime = 0;
	    playerView.$('.skip[data-skip-delta=30]').click();
	    expect(audio.currentTime).toBe(30);
        });

	// it("should show the pause html when playing", function() {
        //     var audio = playerView.audio;
	//     audio.play();
	//     expect(playerView.$('.play').html()).toBe(playerView.PAUSE_HTML);
        // });

	it("should show the play html when paused", function() {
            var audio = playerView.audio;
	    audio.pause();
	    expect(playerView.$('.play').html()).toBe(playerView.PLAY_HTML);
        });

    });
});
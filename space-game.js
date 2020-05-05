// space-game.js
// don't forget to validate at jslint.com

/*jslint devel: true, browser: true */
/*global window Audio Image*/

(function () {
    "use strict";

    const SPACE_KEYCODE = 32;
    const RIGHTARROW_KEYCODE = 39;
    const LEFTARROW_KEYCODE = 37;
    const UPARROW_KEYCODE = 38;

    var _left_key_down = false; //in game for multiple keys at once
    var _right_key_down = false;
    var _up_key_down = false;

    //change 1 and 2
    var lvl1 = true;
    var lvl2 = false;

    // spacegame global functions



    // shortcut function to make code more readable
    function byID(e) {
        return document.getElementById(e);
    }

    function Ship(image_file) {

        var _left = 300;
        var _top = 640;
        var _width = 63;
        var _height = 72;
        var _img = document.createElement("img");
        var i = 0;
        var audio = new Audio("mp3/okejbra.mp3");

        var my = {
            left: _left,
            top: _top,
            width: _width,
            height: _height,
            img: _img,
            jump: true,
            yv: 0
        };

        _img.src = image_file;

        my.left = function (value) {
            if (value === undefined) {
                return _left;
            }
            _left = value;

            return my;
        };

        my.top = function (value) {
            if (value === undefined) {
                return _top;
            }
            _top = value;

            return my;
        };

        my.width = function (value) {
            if (value === undefined) {
                return _width;
            }
            _width = value;

            return my;
        };

        my.height = function (value) {
            if (value === undefined) {
                return _height;
            }
            _height = value;

            return my;
        };

        my.img = function (value) {
            if (value === undefined) {
                return _img;
            }
            _img = value;

            return my;
        };

        my.boundaryCheck = function () {

            if (_left < 0) {
                _left = 0;
            }

            //top check
            if (_top < 0) {
                _top = 0;
            }
            if (_left + _width > byID("gameboard").clientWidth) {
                _left = byID("gameboard").clientWidth - _width;
            }
            //bottom check
            if (_top + _height > byID("gameboard").clientHeight) {
                my.yv = 0;
                my.jump = false;
                _top = byID("gameboard").clientHeight - _height;
            }
        };

        my.platform = function () {
            var a = _left > 600 && _left < 840 && _top < 555 && _top > 540;
            var b = _left > 1000 && _left < 1240 && _top < 555 && _top > 540;
            var c = _left > 1095 && _left < 1245 && _top < 275 && _top > 265;
            var d = _left > 840 && _left < 995 && _top < 255 && _top > 245;
            var e = _left > 575 && _left < 745 && _top < 255 && _top > 245;
            var f = _left > 90 && _left < 480 && _top < 255 && _top > 245;
            var t = _left > 750 && _left < 980 && _top < 605 && _top > 590;
            var p = _top + _height > byID("gameboard").clientHeight;
            var y = _left > 1250 && _left < 1700 && _top < 605 && _top > 590;
            if (lvl1 === true && lvl2 === false) {
          //platform1
                if (_left > 200 && _left < 440 && _top < 655 && _top > 640) {
                    _top = 640;
                    my.yv = 0;
                    my.jump = false;
                } else if (a) {
                    _top = 540;
                    my.yv = 0;
                    my.jump = false;
                } else if (b) {

                    _top = 540;
                    my.yv = 0;
                    my.jump = false;

                } else if (c) {

                    _top = 265;
                    my.yv = 0;
                    my.jump = false;

                } else if (d) {

                    _top = 245;
                    my.yv = 0;
                    my.jump = false;

                } else if (e) {

                    _top = 245;
                    my.yv = 0;
                    my.jump = false;

                } else if (f) {

                    _top = 245;
                    my.yv = 0;
                    my.jump = false;

                    if (_left > 130 && _left < 210) {
                        _left = 50;
                        _top = 400;
                        lvl1 = false;
                        lvl2 = true;
                    } else if (p) {
                        my.jump = false;
                        my.yv = 0;
                        _left = 300;
                        _top = 640;
                        lvl1 = true;
                        lvl2 = false;
                    }

                } else {
                    my.jump = true;
                }
            } else if (lvl2 === true) {
              //level2
                if (_left > -10 && _left < 440 && _top < 605 && _top > 590) {
                    _top = 590;
                    my.yv = 0;
                    my.jump = false;
                } else if (t) {

                    _top = 590;
                    my.yv = 0;
                    my.jump = false;
                } else if (y) {
                    _top = 590;
                    my.yv = 0;
                    my.jump = false;

                    if (_left > 1500 && _left < 1620) {
                        my.jump = false;
                        my.yv = 0;
                        _left = 300;
                        _top = 640;
                        lvl1 = true;
                        lvl2 = false;

                    }


                } else if (_top + _height > byID("gameboard").clientHeight) {
                    my.jump = false;
                    my.yv = 0;
                    _left = 300;
                    _top = 640;
                    lvl1 = true;
                    lvl2 = false;
                } else {
                    my.jump = true;
                }
            }

        };

        my.drawplatforem = function () {

        };

        my.navigate = function (keys, pressed) {
          if (RIGHTARROW_KEYCODE && i < 1) {
            audio.volume = 0.1;
            audio.loop = true;
            audio.play();
            i = 1;
          }

            switch (keys) {
            case RIGHTARROW_KEYCODE:
                _right_key_down = pressed;
                _img.src = "images/playerflip.png";
                break;
            case LEFTARROW_KEYCODE:
                _left_key_down = pressed;
                _img.src = "images/player.png";
                break;
            case UPARROW_KEYCODE:
                _up_key_down = pressed;
                break;
            }

            my.boundaryCheck();
        };

        my.moveShip = function (paused) {
            if (!paused) {
                if (_right_key_down) {
                    _left += 5;
                }
                if (_left_key_down) {
                    _left -= 5;
                }
                if (_up_key_down && my.jump === false) {
                    my.yv = -17;
                    my.jump = true;
                }
                if (my.jump === true) {
                    my.yv += 0.5;
                    _top += my.yv;
                    my.yv *= 0.999;
                }
            }
            my.platform();
            my.boundaryCheck();

        };


        return my;
    }


    // Constructor for Game object
    function Game() {


        // is the game paused?
        var _game_paused = false;

        // player ship
        var _player_ship = new Ship("images/player.png");



        var my = {
            game_paused: _game_paused,
            player_ship: _player_ship
        };

        my.game_paused = function (value) {
            if (value === undefined) {
                return _game_paused;
            }
            _game_paused = value;

            return my;
        };

        my.player_ship = function (value) {
            if (value === undefined) {
                return _player_ship;
            }
            _player_ship = value;

            return my;
        };


        var door = new Image();
        var spikes = new Image();
        var pause = new Image();

        spikes.src = "images/spikes.png";
        door.src = "images/door.png";
        pause.src = "";


        // METHODS
        my.displayPoints = function () {


            if (lvl1 === true) {
                gcontext.clearRect(0, 0, u_width, u_height);
                gcontext.clearRect(0, 0, 2000, 3000);
                gcontext.drawImage(door, 150, 148);
                gcontext.drawImage(pause, 0, 0);


                gcontext.fillStyle = "#6e6e6e";

            //platform1
                gcontext.clearRect(250, 710, 200, 30);
                gcontext.fillRect(250, 710, 200, 30);

            //platfrom2
                gcontext.clearRect(650, 610, 200, 30);
                gcontext.fillRect(650, 610, 200, 30);

            //platfrom3
                gcontext.clearRect(1050, 610, 200, 30);
                gcontext.fillRect(1050, 610, 200, 30);

            //platfrom4
                gcontext.clearRect(1150, 335, 100, 30);
                gcontext.fillRect(1150, 335, 100, 30);

            //platfrom5
                gcontext.clearRect(900, 313, 100, 30);
                gcontext.fillRect(900, 313, 100, 30);

            //platfrom6
                gcontext.clearRect(650, 313, 100, 30);
                gcontext.fillRect(650, 313, 100, 30);

                gcontext.clearRect(120, 313, 375, 30);
                gcontext.fillRect(120, 313, 375, 30);

            } else if (lvl2 === true) {
                gcontext.clearRect(0, 0, u_width, u_height);

                gcontext.drawImage(door, 1550, 495);
                gcontext.drawImage(spikes, 0, 840);
                gcontext.drawImage(pause, 0, 0);
                gcontext.fillStyle = "#6e6e6e";
                gcontext.fillRect(30, 660, 415, 30);

                gcontext.fillRect(800, 660, 190, 30);

                gcontext.fillRect(1300, 660, 400, 30);



            }

        };


        my.clearObjects = function () {
            //remove ships from canvas
            gcontext.clearRect(
                _player_ship.left(),
                _player_ship.top(),
                _player_ship.width(),
                _player_ship.height()
            );
        };

        my.drawObjects = function () {
            //redraw player ship ship on canvas
            gcontext.drawImage(
                _player_ship.img(),
                _player_ship.left(),
                _player_ship.top()
            );

        };


        my.checkKeys = function () {

            document.addEventListener("keydown", function (key_event) {
                if (key_event.which === SPACE_KEYCODE) {
                    pause.src = "images/pause.png";
                    _right_key_down = false;
                    _left_key_down = false;
                    _up_key_down = false;
                    if (_game_paused) {


                        _game_paused = false;
                        //$("#pause").remove();
                    } else {

                        _game_paused = true;
                        //var pause = $("<div>", {
                        //    id: "pause"
                        //});
                        //$("body").prepend(pause);
                    }
                } else if (!_game_paused) {
                    pause.src = "";
                    my.clearObjects();

                    //update player ship position based on keys
                    _player_ship.navigate(key_event.which, true);
                    my.displayPoints();
                    my.drawObjects();
                }
            });
        };
        my.releaseKeys = function () {
            document.addEventListener("keyup", function (key_event) {
                if (!_game_paused) {
                    my.displayPoints();
                    my.clearObjects();

                    //update player ship position based on keys
                    _player_ship.navigate(key_event.which, false);

                    my.displayPoints();
                    my.drawObjects();
                }
            });
        };

        my.checkResize = function () {
            window.addEventListener("resize", function () {
                var u_width = byID("universe").clientWidth;
                gcontext.canvas.width = u_width;
                var u_height = byID("universe").clientHeight;
                gcontext.canvas.height = u_height;
                _player_ship.boundaryCheck();
            });
        };

            //ground collision

        my.play = function () {
            my.clearObjects();
            _player_ship.moveShip(_game_paused);
            my.displayPoints();
            my.drawObjects();
        };
        return my;
    }


    // spacegame global gameboard canvas context variable
    var gcontext = byID("gameboard").getContext("2d");

    // gameboard canvas
    var u_width = byID("universe").clientWidth;
    gcontext.canvas.width = u_width;
    var u_height = byID("universe").clientHeight;
    gcontext.canvas.height = u_height;

    var game = new Game();

    game.checkResize();
    game.checkKeys();
    game.releaseKeys();
    setInterval(game.play, 1);
}());

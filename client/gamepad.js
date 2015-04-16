/**
 * VirtualGamepad
 */

(function() {

	VirtualGamepad = function(target, settings) {
		this.settings = $.extend({}, settings);
		this.target = target;
		this.initialize();
		this.render();
	};


	VirtualGamepad.prototype = {

		initialize: function() {

			this.canvas = document.createElement("canvas");
			this.context = this.canvas.getContext("2d");
			this.target.appendChild(this.canvas);

			window.addEventListener("resize", function() {
				this.resize();
			}.bind(this));

			// events
			this.events = {

				tap: function(e) {
					e.preventDefault();
					e.stopPropagation();

					this.detect(e.offsetX, e.offsetY);

				}.bind(this),

			};

			this.canvas.addEventListener("mouseup", this.events.tap); 
			this.canvas.addEventListener("touchend", this.events.tap);

			this.resize();
		},


		resize: function(width, height) {

			this.canvas.width = width || this.target.offsetWidth;
			this.canvas.height = height || this.target.offsetHeight;

			// set dimensions
			this.d = {
				sw: Math.floor(this.canvas.width / 2),
				sh: this.canvas.height,

			};

			// initialize sections
			this.s = {

				// (the pad) 
				pad: {
					width: this.d.sw,
					height: this.d.sh,
					top: 0,
					left: 0,
					draw: function(c) {

						var s = this.height * 0.8,
							x = this.left + Math.round((width - s) / 2),
							y = this.top + Math.round((height - s) / 2);

						c.rect(x, y, s, s);
						c.stroke();

					}
				}

			}


			this.render();
		},

		render: function() {

			this.s.pad.draw(this.context);


		},

		detect: function(x, y) {

			var dx = Math.floor((x - this.cx) / this.cs), 
				dy = Math.floor((y - this.cy) / this.cs);

			if(dx >= 0 && dx < this.width && dy >= 0 && dy < this.height) {

				this.toggle(dx, dy);
			}
		},
	};


	return VirtualGamepad;

})();
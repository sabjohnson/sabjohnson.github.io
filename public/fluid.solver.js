/**
 * Copyright (c) 2009 Oliver Hunt <http://nerget.com>
 * With changes copyright (c) 2011 Nick Kwiatek <http://nkwiatek.com>
 * http://opensource.org/licenses/MIT
 * Based on http://www.dgp.toronto.edu/people/stam/reality/Research/pdf/GDC03.pdf
 */

define(function() {

  var FluidField = function() {

    function addFields(x, s, dt) {
      var i = size - 1; do {
        x[i] += dt * s[i]
      } while (i--);
    }

    // second slowest function
    function set_bnd(b, x) {

      // small caching optimizations
      var lastRow = height * rowSize;
      var maxEdge = (height + 1) * rowSize;
      var maxWidth = (width + 1);

      if (b===1) {
        for (var i = 1; i <= width; i++) {
          x[i] =  x[i + rowSize];
          x[i + maxEdge] = x[i + lastRow];
        }

        for (var j = 1; i <= height; i++) {
        var jRow = j * rowSize;
          x[jRow] = -x[1 + jRow];
          x[maxWidth + jRow] = -x[width + jRow];
        }
      } else if (b === 2) {
        for (var i = 1; i <= width; i++) {
          x[i] = -x[i + rowSize];
          x[i + maxEdge] = -x[i + lastRow];
        }

        for (var j = 1; j <= height; j++) {
          var jRow = j * rowSize;
          x[jRow] =  x[1 + jRow];
          x[maxWidth + jRow] =  x[width + jRow];
        }
      } else {
        for (var i = 1; i <= width; i++) {
          x[i] =  x[i + rowSize];
          x[i + maxEdge] = x[i + lastRow];
        }

        for (var j = 1; j <= height; j++) {
         var jRow = j * rowSize;
          x[jRow] =  x[1 + jRow];
          x[maxWidth + jRow] =  x[width + jRow];
        }
      }
      x[0]                = 0.5 * (x[1] + x[rowSize]);
      x[maxEdge]          = 0.5 * (x[1 + maxEdge] + x[lastRow]);
      x[maxWidth]         = 0.5 * (x[width] + x[maxWidth + rowSize]);
      x[maxWidth+maxEdge] = 0.5 * (x[width + maxEdge] + x[maxWidth + lastRow]);
    }

    // this function is INCREDIBLY slow
    function lin_solve(b, x, x0, a, c) {
      if (a === 0 && c === 1) {
        for (var j=1 ; j<=height; j++) {
          var currentRow = j * rowSize;
          ++currentRow;
          var i = width - 1; do {
            x[currentRow] = x0[currentRow];
            ++currentRow;
          } while (i--);
        }
        set_bnd(b, x);
      } else {
        var invC = 1 / c;
        for (var k=0 ; k<iterations; k++) {
          for (var j=1 ; j<=height; j++) {
            var lastRow = (j - 1) * rowSize;
            var currentRow = j * rowSize;
            var nextRow = (j + 1) * rowSize;
            var lastX = x[currentRow];
            ++currentRow;

            var i = width; do {
              lastX = x[currentRow] = (x0[currentRow] + a*(lastX+x[++currentRow]+x[++lastRow]+x[++nextRow])) * invC;
            } while (i-- > 1)
          }
          set_bnd(b, x);
        }
      }
    }

    function diffuse(b, x, x0, dt) {
      var a = 0;
      lin_solve(b, x, x0, a, 1 + 4*a);
    }

    function lin_solve2(x, x0, y, y0, a, c) {
      if (a === 0 && c === 1) {
        for (var j=1 ; j <= height; j++) {
          var currentRow = j * rowSize;
          ++currentRow;
          for (var i = 0; i < width; i++) {
            x[currentRow] = x0[currentRow];
            y[currentRow] = y0[currentRow];
            ++currentRow;
          }
        }
        set_bnd(1, x);
        set_bnd(2, y);
      } else {
        var invC = 1/c;
        for (var k=0 ; k<iterations; k++) {
          for (var j=1 ; j <= height; j++) {
            var lastRow = (j - 1) * rowSize;
            var currentRow = j * rowSize;
            var nextRow = (j + 1) * rowSize;
            var lastX = x[currentRow];
            var lastY = y[currentRow];
            ++currentRow;
            for (var i = 1; i <= width; i++) {
              lastX = x[currentRow] = (x0[currentRow] + a * (lastX + x[currentRow] + x[lastRow] + x[nextRow])) * invC;
              lastY = y[currentRow] = (y0[currentRow] + a * (lastY + y[++currentRow] + y[++lastRow] + y[++nextRow])) * invC;
            }
          }
          set_bnd(1, x);
          set_bnd(2, y);
        }
      }
    }

    function diffuse2(x, x0, y, y0, dt) {
      var a = 0;
      lin_solve2(x, x0, y, y0, a, 1 + 4 * a);
    }

    function advect(b, d, d0, u, v, dt) {
      var Wdt0 = dt * width;
      var Hdt0 = dt * height;
      var Wp5 = width + 0.5;
      var Hp5 = height + 0.5;
      for (var j = 1; j<= height; j++) {
        var pos = j * rowSize;
        for (var i = 1; i <= width; i++) {
          var x = i - Wdt0 * u[++pos];
          var y = j - Hdt0 * v[pos];
          if (x < 0.5)
            x = 0.5;
          else if (x > Wp5)
            x = Wp5;
          var i0 = x | 0;
          var i1 = i0 + 1;
          if (y < 0.5)
            y = 0.5;
          else if (y > Hp5)
            y = Hp5;
          var j0 = y | 0;
          var j1 = j0 + 1;
          var s1 = x - i0;
          var s0 = 1 - s1;
          var t1 = y - j0;
          var t0 = 1 - t1;
          var row1 = j0 * rowSize;
          var row2 = j1 * rowSize;
          d[pos] = s0 * (t0 * d0[i0 + row1] + t1 * d0[i0 + row2]) + s1 * (t0 * d0[i1 + row1] + t1 * d0[i1 + row2]);
        }
      }
      set_bnd(b, d);
    }

    function project(u, v, p, div) {
      var h = -0.5 / Math.sqrt(width * height);
      for (var j = 1 ; j <= height; j++ ) {
        var row = j * rowSize;
        var previousRow = (j - 1) * rowSize;
        var prevValue = row - 1;
        var currentRow = row;
        var nextValue = row + 1;
        var nextRow = (j + 1) * rowSize;
        for (var i = 1; i <= width; i++ ) {
          div[++currentRow] = h * (u[++nextValue] - u[++prevValue] + v[++nextRow] - v[++previousRow]);
          p[currentRow] = 0;
        }
      }
      set_bnd(0, div);
      set_bnd(0, p);

      lin_solve(0, p, div, 1, 4 );
      var wScale = 0.5 * width;
      var hScale = 0.5 * height;
      for (var j = 1; j<= height; j++ ) {
        var prevPos = j * rowSize - 1;
        var currentPos = j * rowSize;
        var nextPos = j * rowSize + 1;
        var prevRow = (j - 1) * rowSize;
        var nextRow = (j + 1) * rowSize;

        for (var i = 1; i<= width; i++) {
          u[++currentPos] -= wScale * (p[++nextPos] - p[++prevPos]);
          v[currentPos]   -= hScale * (p[++nextRow] - p[++prevRow]);
        }
      }
      set_bnd(1, u);
      set_bnd(2, v);
    }

    function dens_step(x, x0, u, v, dt) {
      addFields(x, x0, dt);
      diffuse(0, x0, x, dt );
      advect(0, x, x0, u, v, dt );
    }

    function vel_step(u, v, u0, v0, dt) {
      addFields(u, u0, dt );
      addFields(v, v0, dt );
      var temp = u0; u0 = u; u = temp;
      var temp = v0; v0 = v; v = temp;
      diffuse2(u,u0,v,v0, dt);
      project(u, v, u0, v0);
      var temp = u0; u0 = u; u = temp;
      var temp = v0; v0 = v; v = temp;
      advect(1, u, u0, u0, v0, dt);
      advect(2, v, v0, u0, v0, dt);
      project(u, v, u0, v0 );
    }
    var uiCallback = function(d,u,v) {};

    function Field(dens, u, v) {
      // Just exposing the fields here rather than using accessors is a measurable win during display (maybe 5%)
      // but makes the code ugly.
      this.setDensity = function(x, y, d) {
         dens[(x + 1) + (y + 1) * rowSize] = d;
      }
      this.getDensity = function(x, y) {
         return dens[(x + 1) + (y + 1) * rowSize];
      }

      this.setVelocity = function(x, y, xv, yv) {
         u[(x + 1) + (y + 1) * rowSize] = xv;
         v[(x + 1) + (y + 1) * rowSize] = yv;
      }
      this.getXVelocity = function(x, y) {
         return u[(x + 1) + (y + 1) * rowSize];
      }
      this.getYVelocity = function(x, y) {
         return v[(x + 1) + (y + 1) * rowSize];
      }
      this.width = function() { return width; }
      this.height = function() { return height; }

      // NK -- sorry Oliver, exposing them anyway
      this.rawDensityArray = dens;
      this.rowSize = function() { return rowSize; }
    }

    function queryUI(d, u, v) {
      var i = size - 1; do {
        u[i] = v[i] = d[i] = 0.0;
      } while (i--);

      uiCallback(new Field(d, u, v));
    }

    this.update = function () {
      queryUI(dens_prev, u_prev, v_prev);
      vel_step(u, v, u_prev, v_prev, dt);
      dens_step(dens, dens_prev, u, v, dt);
      displayFunc(new Field(dens, u, v));
    }
    this.setDisplayFunction = function(func) {
      displayFunc = func;
    }

    this.iterations = function() { return iterations; }
    this.setIterations = function(iters) {
      if (iters > 0 && iters <= 100)
         iterations = iters;
    }
    this.setUICallback = function(callback) {
      uiCallback = callback;
    }
    var iterations = 10;
    var visc = 0.5;
    var dt = 0.1;
    var dens;
    var dens_prev;
    var u;
    var u_prev;
    var v;
    var v_prev;
    var width;
    var height;
    var rowSize;
    var size;
    var displayFunc;
    function reset() {
      rowSize = width + 2;
      size = (width+2)*(height+2);
      dens = new Array(size);
      dens_prev = new Array(size);
      u = new Array(size);
      u_prev = new Array(size);
      v = new Array(size);
      v_prev = new Array(size);
      for (var i = 0; i < size; i++)
        dens_prev[i] = u_prev[i] = v_prev[i] = dens[i] = u[i] = v[i] = 0;
    }
    this.reset = reset;
    this.setResolution = function (hRes, wRes) {
      var res = wRes * hRes;
      if (res > 0 && res < 1000000 && (wRes != width || hRes != height)) {
        width = wRes;
        height = hRes;
        reset();
        return true;
      }
      return false;
    }
  }

  return FluidField;

});


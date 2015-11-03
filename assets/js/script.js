/**
 * A little 9-grid-loader
 * @author Xin Wang <wangx6@gmail.com>
 * @date 03/11/2015
 */
(function() {
    var Loading = function(conf) {
        this.width = conf.width;
        this.height = conf.height;
        this.track = [];
        this.curBlk = null;
        this.wrap = document.getElementsByClassName('loading')[0];
        this.map = [[],[],[]];
        this.init();
    };

    Loading.prototype.init = function() {
        var me = this;

        me.initMap();
        me.initTrack();
        me.moveBlk(this, 7);
        //me.changeColor(me);
    };

    /**
     * Init the mapping for all the blocks
     */
    Loading.prototype.initMap = function() {
	    var me = this,
	        i = 0, j;

		for(; i < 3; i++) {
		    for(j = 0; j < 3; j++) {
		        if(i === 0 && j === 0) {continue;}
		        me.wrap.appendChild( me.map[i][j] = me.createBlk( {r: i, c: j} ));
		    }
		}
		
		return me.map;
	};
  
    /**
     * An extra featurn - change the color of the block
     */
    Loading.prototype.changeColor = function(scope) {
        var me = scope,
            r, g, b;

        setTimeout(function() {
          r = Math.floor((Math.random() * 255)).toString(16);
          g = Math.floor((Math.random() * 255)).toString(16);
          b = Math.floor((Math.random() * 255)).toString(16);
          scope.wrap.style['background-color'] = '#' + r + g + b;
          scope.changeColor(scope);
        }, 2000);
    };
	
	Loading.prototype.initTrack = function() {
	    var me = this,
	        path = [{r: 0, c: 0}, {r:0, c:1 }, {r:0, c:2 }, {r:1, c:2 }, {r:2, c:2 }, {r:2, c:1 }, {r:2, c:0 }, {r:1, c:0 }];
    
	    for(var i = 0; i < path.length; i++) {
	        var pos = path[i];
	        me.track.push({
	            dom: pos.r === 0 && pos.c === 0 ? null : me.map[pos.r][pos.c],
	            pos: path[i],
	        });
	    }
	    
	    this.curBlk = me.track[me.track.length - 1];
	    return me.track;
	};
	
    /**
     * Create the block
     */
	Loading.prototype.createBlk = function( pos ) {
		 var dom = document.createElement('div');
		 dom.className = 'app__loading__blk';
		 dom.style.top = (pos.r * 20) + 'px';
		 dom.style.left = (pos.c * 20) + 'px';
		 //dom.innerHTML = pos.r + ' ' + pos.c;
		 return dom;
	};
	
    /**
     * Move the block
     * @todo need to use transform instead of top
     * @param {}
     */
    Loading.prototype.moveBlk = function(scope, startIndex) {
        var me = scope;
        var nextIndex, nextTrack;
        var preIndex, preTrack;
        var curTrack;
        
        preIndex = startIndex === 0 ? 7 : startIndex - 1;
        nextIndex = startIndex === 7 ? 0 : startIndex + 1;
        
        curTrack = me.track[startIndex];
        preTrack = me.track[preIndex];
        nextTrack = me.track[nextIndex];
        
        setTimeout(function() {
            curTrack.dom.style.top = (nextTrack.pos.r * 20) + 'px';
            curTrack.dom.style.left = (nextTrack.pos.c * 20) + 'px';
            me.swapDom(curTrack, nextTrack);
            me.moveBlk(me, preIndex);
        }, 200);
    };
    
    /**
     * Swap the dom
     */
    Loading.prototype.swapDom = function(o1, o2) {
        o2.dom = o1.dom;
        o1.dom = null;
    };
	
	var conf = { width: 150, height: 150 };
	var loading = new Loading(conf);

})();


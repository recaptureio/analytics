/**
 * IE detection taken from https://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
 * @method ie
 * @return {Integer} The ie version number or -1
 */
exports.ie = function ie() {
  var rv = -1; // Return value assumes failure.

  if (navigator.appName == 'Microsoft Internet Explorer') {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null) {
      rv = parseFloat( RegExp.$1 );
    }
  } else if (navigator.appName == 'Netscape') {
    if (navigator.appVersion.indexOf('Trident') === -1) {
      rv = 12;
    } else {
      rv = 11;
    }
  }

  return rv > -1;
}

exports.transitionEvent = function transitionEvent() {
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  }

  for(t in transitions){
    if( el.style[t] !== undefined ){
      return transitions[t];
    }
  }
}

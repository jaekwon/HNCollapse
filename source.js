(function() {
/**
 *  Comment Collapse Bookmarklet
 *  Jae Kwon 2011
 *  MIT License
 **/

if (window.HNCOLLAPSE) {
  window.HNCOLLAPSE = true;
  return; 
}

function collapse(cells, startIndex, atIndent) {
  var thisCell = jQuery(cells[startIndex]);
  var children = jQuery();
  var numDescendants = 0;
  for (var i=startIndex; i<cells.length; i++) {
    var cell = jQuery(cells[i]);
    if (cell.data('indent') == atIndent) {
      cell.find('td:eq(2)').each(function(x, td) {
        jQuery(td).find('p:last>font').append(" ", collapse(cells, i+1, atIndent +1));
        children = children.add(cell);
      });
    } else if (cell.data('indent') < atIndent) {
      break;
    }
    numDescendants += 1;
  }
  if (children.length > 0 && atIndent > 0) {
    children.hide();
    if (children.length < numDescendants) {
      var expand = jQuery(' <u><a href="#">'+ numDescendants +' comments ('+children.length+')</a></u>');
    } else {
      var expand = jQuery(' <u><a href="#">'+ numDescendants +' comments</a></u>');
    }
    expand.click(function(e) {
      expand.remove();
      children.show();
      return false;
    });
    return expand;
  } else {
    return null;
  }
}


function onLoad() {
  var cells = jQuery('table:eq(3)>tbody>tr>td>table>tbody>tr');
  cells.each(function(i, cell) {
    var width_px = jQuery(cell).find('>td>img').css('width');
    var width = Number(width_px.substr(0,width_px.length-2));
    var indent = width/40;
    jQuery(cell).data('indent', indent);
  });
  jQuery(document.body).append(collapse(cells, 0, 0));
}


var headID = document.getElementsByTagName("head")[0];
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.onload=function() { onLoad(); };
newScript.src = '//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js';
headID.appendChild(newScript);

})();

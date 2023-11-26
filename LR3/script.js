var tab;
var tabContent;

window.onload = function() {
    tabContent = document.getElementsByClassName('tabContent');
    tab = document.getElementsByClassName('tab');
    hideTabsContent(1);
}

function hideTabsContent(a) {
    for (var i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add("hide");
        tab[i].classList.remove('whiteborder');
    }
}

document.getElementById('tabs').onclick = function(event) {
    var target = event.target;
    if (target.className == 'tab') {
        for (var i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
}

function showTabsContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

function generate() {
  var rtl = document.getElementById('rtl').value;
  var rtr = document.getElementById('rtr').value;
  var rbr = document.getElementById('rbr').value;
  var rbl = document.getElementById('rbl').value;

  var alignSelf = document.getElementById('alignSelf').value;
  var flexFlow = document.getElementById('flexFlow').value;

  var container = document.getElementById('container');
  container.style.borderRadius = rtl + "px " + rtr + "px " + rbr + "px " + rbl + "px";
  container.style.alignSelf = alignSelf;
  container.style.flexFlow = flexFlow;


  var items = document.querySelectorAll('.item');
  items.forEach(function(item) {
    item.style.alignSelf = alignSelf;
  });

  var cssCode = document.getElementById('cssCode');
  cssCode.value = "border-radius: " + rtl + "px " + rtr + "px " + rbr + "px " + rbl + "px;\n";
  cssCode.value += "align-self (container): " + alignSelf + ";\n";
  cssCode.value += "flex-flow (container): " + flexFlow + ";\n";

  var ttl = document.getElementById('ttl');
  var ttr = document.getElementById('ttr');
  var tbr = document.getElementById('tbr');
  var tbl = document.getElementById('tbl');

  ttl.value = rtl;
  ttr.value = rtr;
  tbr.value = rbr;
  tbl.value = rbl;
}
generate();



$.load = function (epId, cb) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', epId + '/slides.json', true);

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(this.responseText));
    }
  };
  xhr.send();
}

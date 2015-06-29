function bso(){ //jshint ignore:line
  if (!location.hash) location.hash = '#title'
  else bso.go(location.hash.slice(1))
}

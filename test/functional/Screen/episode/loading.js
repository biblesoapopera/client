bso.load = function(id, cb){
  //never return callback
  //this test will show the loading screen forever
}

bso.transition(new bso.getScreen('episode/1'), 'instant');

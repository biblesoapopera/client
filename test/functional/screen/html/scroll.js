$.load = function(id, cb){
  setTimeout(function(){
    cb({
      slides: [
        {
          type: 'html',
          content: '<p>HTML slide 1</p><p>lots of content ... Sed ut perspiciatis unde omnis iste natus error sit vol' +
            'uptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritati' +
            's et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit as' +
            'pernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciu' +
            'nt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed qu' +
            'ia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim' +
            'ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea ' +
            'commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil mol' +
            'estiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>'
        },
        {
          type: 'html',
          content: '<p>HTML slide 2</p>'
        }
      ]
    })
  },0)
}

$();

location.hash = 'episode/1/0';

var refreshButton = document.querySelector('.refresh');
var refreshClick$ = Rx.Observable.fromEvent(refreshButton, 'click');

var request$ = refreshClick$.startWith('startup click').map( () => {
  var randomOffset = Math.floor(Math.random()*500);
  return `https://api.github.com/users?since=${randomOffset}`;
});

var response$ = request$.flatMap( (requestUrl) => {
  return Rx.Observable.fromPromise($.getJSON(requestUrl));
});

var suggestUser = function (response$) {
  return response$
    .map(function(listUsers) {
      return listUsers[Math.floor(Math.random()*listUsers.length)];
    })
    .merge(
      refreshClick$.map(function(){ return null; })
    )
    .startWith(null);
};

var suggestion1Stream = suggestUser(response$);
var suggestion2Stream = suggestUser(response$);
var suggestion3Stream = suggestUser(response$);
// response$
suggestion1Stream.subscribe((response) => {
  console.log(response);
});

suggestion2Stream.subscribe((response) => {
  console.log(response);
});

suggestion3Stream.subscribe((response) => {
  console.log(response);
});

loadComponents();

var path = window.location.pathname;
var page = path.split("/").pop();
console.log( page );
console.log( page.split(".").pop() );

import { loacom } from "./exports.js";

loacom();

let path = window.location.pathname;
let page = path.split("/").pop();
console.log( page );
console.log( page.split(".").pop() );

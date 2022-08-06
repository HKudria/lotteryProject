import React from "react";
import { createRoot } from 'react-dom/client';
import Editor from "./components/editor";

const root = createRoot(document.getElementById('root'));
root.render(<Editor />);

//parse array from php api using foreach in jquery
//show all html file from site catalog
// function getPageList(){
//    $("h1").remove();
//     $.get("./api", data=>{
//         data.forEach(file => {
//             $("body").append(`<h1>${file}</h1>`)
//         })
//     },"JSON");
// }

//call function to show all html pages
// getPageList();


//search button on page and processed click
//when button was pushed down we send request to php page and check if page is exist else create new page
// $("button").click(()=>{
//     $.post("./api/createNewPage.php", {
//         "name" : $("input").val()
//     }, ()=>{
//         getPageList();
//     })
//         .fail(()=> {
//             alert("The page already exists!");
//         })
// });
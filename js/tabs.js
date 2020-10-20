function openFile(event, fileName, repname) {
    let i;

    //Hide all elements with class="tabcontent"
    let tabcontent = document.getElementsByClassName("content_" + repname);
    for(i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    //Remove active class from all elements with class="tablinks"
    let tablinks = document.getElementsByClassName("link_" + repname);
    for(i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    //Show content of current tab and add active class to tab
    let codeblock = document.getElementById(fileName);
    console.log(codeblock);
    codeblock.style.display = "block";
    event.currentTarget.className += " active";

}

//Set default tab as active
function setDefault() {
    const containers = document.getElementsByClassName("tab");

    for (let container of containers) {
        container.getElementsByTagName("button").item(0).click()
    }
}

document.addEventListener("DOMContentLoaded", setDefault, false);
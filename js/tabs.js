function openFile(event, fileName) {
    let i;

    //Hide all elements with class="tabcontent"
    let tabcontent = document.getElementsByClassName("tabcontent");
    for(i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    //Remove active class from all elements with class="tablinks"
    let tablinks = document.getElementsByClassName("tablinks");
    for(i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    //Show content of current tab and add active class to tab
    document.getElementById(fileName).style.display = "block";
    event.currentTarget.className += " active";
}

//Set default tab as active
function setDefault() {
    document.getElementsByClassName("tablinks").item(0).click();
}

document.addEventListener("DOMContentLoaded", setDefault, false);
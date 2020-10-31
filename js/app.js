// Check for existing links in local storage
if (localStorage.getItem("ZoomLinkArray") == null) {
    var links_array = [];
} else {
    var links_array = JSON.parse(localStorage.getItem("ZoomLinkArray"));
}


$(document).ready(displayLink());

// adding link and name to the website
const addLink = () => {
    var passCheck = true;
    var link = $("#zoomLink_input").val();
    var name = $("#zoomLink_name").val();
    // add the info into an object
    if (link != "" && name != "") {
        for (var i = 0; i < links_array.length; i++) {
            var nameCheck = links_array[i].Name;
            var linkCheck = links_array[i].Link;
            if (name == nameCheck) {
                alert("This name already exist!")
                passCheck = false;
            }
            else if (link == linkCheck) {
                alert("This link already exist!")
                passCheck = false;
            }
        }
        if (passCheck) {
            var link_obj =
            {
                "Name": '',
                "Link": ''
            };

            link_obj["Name"] = name;
            link_obj["Link"] = link;

            // push obj into an array
            links_array.push(link_obj);

            // adds array to local storage
            localStorage.setItem("ZoomLinkArray", JSON.stringify(links_array));
        }
    }
    else {
        alert("Please enter both Zoom Link and Course Name")
    }
    location.reload();
}


function displayLink() {
    // delete all link
    for (var i = 0; i < links_array.length; i++) {
        var name = links_array[i].Name;
        var link = links_array[i].Link;

        var element = `
        <div class="grp">
        <li>
            <a href="${link}" target="_blank">${link}</a>
            <button type="button" class="close" arialabel="Close" id="${i}"
                onclick="removeLink(this.id)" style="display: none;"><span ariahidden="true">x</span>
            </button>
        </li>
        </div>`
        
        $("#display").append(element);
    }
}

let editButtonState = false

$("#edit").click(() => {
    if (editButtonState === false) {
        editButtonState = true
        $("#edit").text("Save")

        $(".grp").each(function (i) {
            // change link border to orange
            $(this).css('border-color', "orange");
            // Display close icon
            $(".close").show();
        });
    } else {
        editButtonState = false
        $("#edit").text("Edit")

        $(".grp").each(function (i) {
            // change link border to orange
            $(this).css('border-color', "black");
            // Display close icon
            $(".close").hide();
        });
        location.reload();
    }
})


const removeLink = (idValue) => {
    // console.log(idValue);
    links_array.splice(idValue, 1);
    localStorage.setItem("ZoomLinkArray", JSON.stringify(links_array));
    $(".grp")[idValue].remove();

    $(".grp").each(function (i) {
        $(".grp")[i]
    });
}


const updateLink = () => {

}
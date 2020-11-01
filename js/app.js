// Check for existing links in local storage
if (localStorage.getItem("ZoomLinkArray") == null) {
    var links_array = [];
} else {
    var links_array = JSON.parse(localStorage.getItem("ZoomLinkArray"));
}


$(document).ready(displayLink());

// Regex to check if link is valid
const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const regex = new RegExp(expression);

// adding link and name to the website
const addLink = () => {
    var passCheck = true;
    var link = $("#zoomLink_input").val();
    var name = $("#zoomLink_name").val();
    $("#unfilledFields").slideUp("fast")
    // add the info into an object
    if (link != "" && name != "" && link.match(regex)) {
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
        $("#unfilledFields").slideDown("fast")
        return
    }
    location.reload();
}


function displayLink() {
    // Show "Nothing to show here" if there is really nothing to show :/
    if (links_array.length === 0) {
        $("#nothingToShow").fadeIn()
    }
    // delete all link
    for (var i = 0; i < links_array.length; i++) {
        var name = links_array[i].Name;
        var link = links_array[i].Link;

        var element = `
        <div class="grp">
        <li>
            <div class="box">
                <div class="columns is-vcentered">
                <div class="column">
                    <p class="has-text-weight-bold">${name}</p>
                    <a href="${link}" target="_blank" class="has-text-black"><small>${link}</small></a>
                </div>
                <div class="column has-text-right">
                    <button type="button" class="button close is-small is-danger" arialabel="Close" id="${i}"
                    onclick="removeLink(this.id)" style="display: none;"><span class="icon is-small"><i class="fas fa-times"></i></span>
                    </button>
                </div>
            </div>
        </li>
        </div>`

        $("#display").append(element);
    }
}

let editButtonState = false

$("#edit").click(() => {
    if (editButtonState === false) {
        editButtonState = true
        // Change inner text
        $("#edit #text").html("Save")

        // Change colour of button
        $("#edit").addClass("is-dark")
        $("#edit").removeClass("is-light")

        // Change icon
        $("#edit #icon").removeClass("fas fa-edit")
        $("#edit #icon").addClass("fas fa-save")

        $(".grp").each(function (i) {
            // change link border to orange
            $(this).css('border-color', "orange");
            // Display close icon
            $(".close").show();
        });
    } else {
        editButtonState = false
        // Change inner text
        $("#edit #text").html("Edit list")

        // Change colour of button
        $("#edit").addClass("is-light")
        $("#edit").removeClass("is-dark")

        // Change icon
        $("#edit #icon").removeClass("fas fa-save")
        $("#edit #icon").addClass("fas fa-edit")

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
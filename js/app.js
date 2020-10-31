    // class containing all the links
    var grps = document.getElementsByClassName("grp");
    var close = document.getElementsByClassName("close");

    // Check for existing links in local storage
      if (localStorage.getItem("ZoomLinkArray") == null){
        var links_array = [];
      }
      else{
        var links_array = JSON.parse(localStorage.getItem("ZoomLinkArray"));
      }


      // adding link and name to the website
      function addLink(){
        var passCheck = true;
        var link = document.getElementById("zoomLink_input").value;
        var name = document.getElementById("zoomLink_name").value;
        // add the info into an object
        if (link != "" && name != "") {
          for (var i = 0; i < links_array.length; i++) {
            var nameCheck = links_array[i].Name;
            var linkCheck = links_array[i].Link;
            if (name == nameCheck){
              alert("This name already exist!")
              passCheck = false;
            }
            else if (link == linkCheck){
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
            localStorage.setItem("ZoomLinkArray",JSON.stringify(links_array));
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

          var textNode = document.createTextNode(name);
          var textNode_remove = document.createTextNode("Remove Link");

          var div = document.createElement("div");
          div.setAttribute("class", "grp");
          var li = document.createElement("li");
          // Set href link
          var a = document.createElement("a");
          a.setAttribute("href", link);
          a.setAttribute("target", "_blank")
          a.appendChild(textNode);
          li.appendChild(a);
          // Create close button
          var span = document.createElement("span");
          span.setAttribute("ariaHidden", "true");
          span.innerText = "x"
          var btn = document.createElement("button");
          btn.setAttribute("type", "button");
          btn.setAttribute("class", "close");
          btn.setAttribute("ariaLabel", "Close");
          btn.setAttribute("id", i);
          btn.setAttribute("onclick", "removeLink(this.id)")
          btn.appendChild(span);
          // button hidden by default
          btn.style.display = "none";
          li.appendChild(btn);
          div.appendChild(li);
          var display = document.getElementById("display").appendChild(div);
        }
      }


      function edit(){
        // Edit the links
        if (document.getElementById("edit").innerText == "Edit"){
          // onclick change button text to "save"
          document.getElementById("edit").innerText = "Save";
          for(var i = 0; i < grps.length; i++){
            // change link border to orange
            grps[i].style.borderColor = "orange";
            // Display close icon
            close[i].style.display = "block";
          }
        }
        // Save the edits
        else{
          // onclick change button text to "Edit"
          document.getElementById("edit").innerText = "Edit";
          for(var i = 0; i < grps.length; i++){
            // change link border to orange
            grps[i].style.borderColor = "black";
            // Display close icon
            close[i].style.display = "none";
          }
          location.reload();
        }
      }


      function removeLink(idValue){
        console.log(idValue);
        links_array.splice(idValue, 1);
        localStorage.setItem("ZoomLinkArray", JSON.stringify(links_array));
        grps[idValue].remove();
        for (var i = 0; i<grps.length; i++){
          grps[i]
        }
      }


      function updateLink(){

      }

      displayLink();
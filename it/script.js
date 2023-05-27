// Fuck you

let initiatives_arr = [];

function Initiative(uuid, is_player, is_edit, init_num, display_name, max_hp, current_hp) {
    this.uuid = uuid;
    this.is_player = is_player;
    this.is_edit = is_edit;
    this.init_num = init_num;
    this.display_name = display_name;
    this.max_hp = max_hp;
    this.current_hp = current_hp;
}

let addinit = document.getElementById("add");
let initiatives_elem = document.getElementById("initiatives");

function edit_initiative(e, uuid) {
    console.log("edit: " + uuid)
}

function reorder_initiative(e, uuid) {
    console.log("reorder: " + uuid)
}

function confirm_initiative(e, uuid) {
    console.log("confirm: " + uuid)
}

function delete_initiative(e, uuid) {
    let init_item = initiatives_arr.find(initiatives_arr => initiatives_arr.uuid === uuid);
    initiatives_arr.splice(initiatives_arr.indexOf(init_item), 1);
    update_html();
}

function update_html() {
    while (initiatives_elem.hasChildNodes()) {
        initiatives_elem.removeChild(initiatives_elem.firstChild);
    }

    for (let i = 0; i < initiatives_arr.length; i++) {
        let init_div = document.createElement("div");
        init_div.className = "inits";

        if (initiatives_arr[i].is_edit == true) {

            let player_temp = document.createElement("p");
            player_temp.innerText = "Player: " + initiatives_arr[i].is_player;
            init_div.appendChild(player_temp);

            let init_temp = document.createElement("p");
            init_temp.innerText = "Initiative: " + initiatives_arr[i].init_num;
            init_div.appendChild(init_temp);

            let name_temp = document.createElement("p");
            name_temp.innerText = "Name: " + initiatives_arr[i].display_name;
            init_div.appendChild(name_temp);

            let hp_temp = document.createElement("p")
            hp_temp.innerText = "HP: " + initiatives_arr[i].current_hp + "/" + initiatives_arr[i].max_hp
            init_div.appendChild(hp_temp);

            let buttons_div = document.createElement("div");
            buttons_div.className = "flex";
            
            let confirm_btn = document.createElement("button");
            let confirm_img = document.createElement("img");
            confirm_img.src = "assets/done.png";
            confirm_btn.appendChild(confirm_img);
            confirm_btn.addEventListener("click", confirm_initiative.bind(null, event, initiatives_arr[i].uuid))
            buttons_div.appendChild(confirm_btn);

            let delete_btn = document.createElement("button");
            let delete_img = document.createElement("img");
            delete_img.src = "assets/clear.png";
            delete_btn.appendChild(delete_img);
            delete_btn.addEventListener("click", delete_initiative.bind(null, event, initiatives_arr[i].uuid))
            buttons_div.appendChild(delete_btn);

            let reorder_btn = document.createElement("button");
            let reorder_img = document.createElement("img");
            reorder_img.src = "assets/reorder.png"
            reorder_btn.appendChild(reorder_img);
            reorder_btn.addEventListener("click", reorder_initiative.bind(null, event, initiatives_arr[i].uuid))
            buttons_div.appendChild(reorder_btn);

            init_div.appendChild(buttons_div);
            
        } else {

            let player_temp = document.createElement("p");
            player_temp.innerText = "Player: " + initiatives_arr[i].is_player;
            init_div.appendChild(player_temp);

            let init_temp = document.createElement("p");
            init_temp.innerText = "Initiative: " + initiatives_arr[i].init_num;
            init_div.appendChild(init_temp);

            let name_temp = document.createElement("p");
            name_temp.innerText = "Name: " + initiatives_arr[i].display_name;
            init_div.appendChild(name_temp);

            let hp_temp = document.createElement("div");
            hp_temp.className = "flex";
            let hp_input = document.createElement("input");
            hp_input.style.textAlign = "right"; 
            hp_input.setAttribute('value', initiatives_arr[i].current_hp);
            hp_temp.innerHTML = "HP: "
            hp_temp.appendChild(hp_input);
            hp_temp.innerHTML += "/" + initiatives_arr[i].max_hp
            init_div.appendChild(hp_temp);

            let buttons_div = document.createElement("div");
            buttons_div.className = "flex";
            
            let edit_btn = document.createElement("button");
            let edit_img = document.createElement("img");
            edit_img.src = "assets/edit.png";
            edit_btn.appendChild(edit_img);
            edit_btn.addEventListener("click", edit_initiative.bind(null, event, initiatives_arr[i].uuid))
            buttons_div.appendChild(edit_btn);

            let delete_btn = document.createElement("button");
            let delete_img = document.createElement("img");
            delete_img.src = "assets/clear.png";
            delete_btn.appendChild(delete_img);
            delete_btn.addEventListener("click", delete_initiative.bind(null, event, initiatives_arr[i].uuid))
            buttons_div.appendChild(delete_btn);

            let reorder_btn = document.createElement("button");
            let reorder_img = document.createElement("img");
            reorder_img.src = "assets/reorder.png"
            reorder_btn.appendChild(reorder_img);
            reorder_btn.addEventListener("click", reorder_initiative.bind(null, event, initiatives_arr[i].uuid))
            buttons_div.appendChild(reorder_btn);

            init_div.appendChild(buttons_div);

        }

        initiatives_elem.appendChild(init_div);
    }
}

function addinit_func() {
    initiatives_arr.push(new Initiative(self.crypto.randomUUID(), true, false, 20, "Test", 10, 10));
    update_html();
}

addinit.addEventListener("click", addinit_func);
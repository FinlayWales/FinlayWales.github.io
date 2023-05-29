// Fuck you

let initiatives_arr = [];

function Initiative(uuid, is_player, is_edit, init_num, display_name, max_hp, current_hp, notes_open, notes) {
    this.uuid = uuid;
    this.is_player = is_player;
    this.is_edit = is_edit;
    this.init_num = init_num;
    this.display_name = display_name;
    this.max_hp = max_hp;
    this.current_hp = current_hp;
    this.notes_open = notes_open;
    this.notes = notes;
}

function edit_initiative(e, uuid) {
    let init_item = initiatives_arr.find(initiatives_arr => initiatives_arr.uuid === uuid);
    initiatives_arr[initiatives_arr.indexOf(init_item)].is_edit = true;
    update_html();
}

function reorder_initiative(e, uuid) {
    console.log("reorder: " + uuid)
}

function confirm_initiative(e, uuid) {
    let init_item = initiatives_arr.find(initiatives_arr => initiatives_arr.uuid === uuid);
    initiatives_arr[initiatives_arr.indexOf(init_item)].is_edit = false;
    update_html();
}

function delete_initiative(e, uuid) {
    let init_item = initiatives_arr.find(initiatives_arr => initiatives_arr.uuid === uuid);
    initiatives_arr.splice(initiatives_arr.indexOf(init_item), 1);
    update_html();
}

function initiative_notes(e, uuid) {
    let init_item = initiatives_arr.find(initiatives_arr => initiatives_arr.uuid === uuid);
    // ^= toggles boolean
    initiatives_arr[initiatives_arr.indexOf(init_item)].notes_open ^= true;
    update_html();
}

function update_html() {
    while (initiatives_elem.hasChildNodes()) {
        initiatives_elem.removeChild(initiatives_elem.firstChild);
    }

    for (let i = 0; i < initiatives_arr.length; i++) {
        let parent_div = document.createElement("div");
        parent_div.className = "initparent";
        let init_div = document.createElement("div");
        init_div.className = "inits";
        init_div.style.fontSize = "25px";

        if (initiatives_arr[i].is_edit == true) {

            let player_temp = document.createElement("div");
            player_temp.className = "flex";
            let player_input = document.createElement("input");
            let player_img = document.createElement("div");
            player_input.className = "checkbox";
            player_input.setAttribute('type', 'checkbox');
            player_input.checked = initiatives_arr[i].is_player;
            player_input.addEventListener("input", function () {initiatives_arr[i].is_player = player_input.checked});
            player_temp.innerHTML = "Player? "
            player_temp.appendChild(player_input);
            init_div.appendChild(player_temp);

            let init_temp = document.createElement("div");
            init_temp.classinit = "flex";
            let init_input = document.createElement("input");
            init_input.style.fontSize = "25px";
            init_input.setAttribute('value', initiatives_arr[i].init_num);
            init_input.addEventListener("input", function () {initiatives_arr[i].init_num = parseInt(init_input.value)});
            init_temp.innerHTML = "Initiative: "
            init_temp.appendChild(init_input);
            init_div.appendChild(init_temp);

            let name_temp = document.createElement("div");
            name_temp.className = "flex";
            let name_input = document.createElement("input");
            name_input.style.fontSize = "25px";
            name_input.setAttribute('value', initiatives_arr[i].display_name);
            name_input.addEventListener("input", function () {initiatives_arr[i].display_name = name_input.value});
            name_temp.innerHTML = "Name: "
            name_temp.appendChild(name_input);
            init_div.appendChild(name_temp);

            let hp_temp = document.createElement("div");
            hp_temp.classhp = "flex";
            let hp_input = document.createElement("input");
            hp_input.style.fontSize = "25px";
            hp_input.setAttribute('value', initiatives_arr[i].max_hp);
            hp_input.addEventListener("input", function () {initiatives_arr[i].max_hp = parseInt(hp_input.value)});
            hp_temp.innerHTML = "HP: "
            hp_temp.appendChild(hp_input);
            init_div.appendChild(hp_temp);
            
        } else {

            let player_temp = document.createElement("img");
            if (initiatives_arr[i].is_player == true) {
                player_temp.src = "assets/p.png";
            } else {
                player_temp.src = "assets/e.png";
            }
            init_div.appendChild(player_temp);

            let init_temp = document.createElement("div");
            init_temp.innerText = "Initiative: " + initiatives_arr[i].init_num;
            init_div.appendChild(init_temp);

            let name_temp = document.createElement("div");
            name_temp.innerText = "Name: " + initiatives_arr[i].display_name;
            init_div.appendChild(name_temp);

            let curhp_temp = document.createElement("div");
            curhp_temp.className = "flex";
            let curhp_input = document.createElement("input");
            curhp_input.style.textAlign = "right";
            curhp_input.style.fontSize = "25px";
            curhp_input.setAttribute('value', initiatives_arr[i].current_hp);
            curhp_input.addEventListener("input", function () {initiatives_arr[i].current_hp = parseInt(curhp_input.value)});

            // Reason for this horribleness: https://stackoverflow.com/questions/2684956/addeventlistener-gone-after-appending-innerhtml
            let curhp_front = document.createElement("div");
            let curhp_back = document.createElement("div");
            curhp_front.style.whiteSpace = "pre"
            curhp_back.style.whiteSpace = "pre"

            curhp_front.innerHTML = "HP: ";
            curhp_back.innerHTML = " / " + initiatives_arr[i].max_hp;

            curhp_temp.appendChild(curhp_front);
            curhp_temp.appendChild(curhp_input);
            curhp_temp.appendChild(curhp_back);

            init_div.appendChild(curhp_temp);

        }

        let buttons_div = document.createElement("div");
        buttons_div.className = "flex";
        
        if (initiatives_arr[i].is_edit == true) {

            let confirm_btn = document.createElement("button");
            let confirm_img = document.createElement("img");
            confirm_img.src = "assets/done.png";
            confirm_btn.appendChild(confirm_img);
            confirm_btn.addEventListener("click", confirm_initiative.bind(null, event, initiatives_arr[i].uuid))
            buttons_div.appendChild(confirm_btn);

        } else {

            let edit_btn = document.createElement("button");
            let edit_img = document.createElement("img");
            edit_img.src = "assets/edit.png";
            edit_btn.appendChild(edit_img);
            edit_btn.addEventListener("click", edit_initiative.bind(null, event, initiatives_arr[i].uuid))
            buttons_div.appendChild(edit_btn);

        }

        let notes_btn = document.createElement("button");
        let notes_img = document.createElement("img");
        notes_img.src = "assets/notes.png";
        notes_btn.appendChild(notes_img);
        notes_btn.addEventListener("click", initiative_notes.bind(null, event, initiatives_arr[i].uuid))
        buttons_div.appendChild(notes_btn);

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
        parent_div.appendChild(init_div);

        if (initiatives_arr[i].notes_open == true) {
            let notes_input = document.createElement("textarea");
            notes_input.style.fontSize = "15px";
            notes_input.style.width = "100%";
            notes_input.style.resize = "none";
            notes_input.style.height = "10em";
            notes_input.style.marginTop = "20px";
            notes_input.value = initiatives_arr[i].notes;
            notes_input.addEventListener("input", function () {initiatives_arr[i].notes = notes_input.value});
            parent_div.appendChild(notes_input);
        }

        initiatives_elem.appendChild(parent_div);

    }
}

function addinit_func() {
    initiatives_arr.push(new Initiative(self.crypto.randomUUID(), true, true, 0, "", 0, 0, false, ""));
    update_html();
}

function sortinit_func() {
    initiatives_arr.sort((a, b) => {
        return b.init_num - a.init_num;
    });
    update_html();
}

function clearinit_func() {
    initiatives_arr = [];
    update_html();
}

let initiatives_elem = document.getElementById("initiatives");
let addinit = document.getElementById("add");
let sortinit = document.getElementById("sort");
let clearinit = document.getElementById("clear");

addinit.addEventListener("click", addinit_func);
sortinit.addEventListener("click", sortinit_func);
clearinit.addEventListener("click", clearinit_func);

let initiatives_arr = [];

let turn_index = 0;
let round_counter = 1;

function Conditions(blinded, charmed, deafened, frightened, grappled, incapacitated, invisible, paralyzed, petrified, poisoned, prone, restrained, stunned, unconscious, exhaustion_level) {
    this.blinded = blinded;
    this.charmed = charmed;
    this.deafened = deafened;
    this.frightened = frightened;
    this.grappled = grappled;
    this.incapacitated = incapacitated;
    this.invisible = invisible;
    this.paralyzed = paralyzed;
    this.petrified = petrified;
    this.poisoned = poisoned;
    this.prone = prone;
    this.restrained = restrained;
    this.stunned = stunned;
    this.unconscious = unconscious;
    this.exhaustion_level = exhaustion_level;
}

function Initiative(uuid, is_player, is_edit, init_num, display_name, max_hp, current_hp, ac_num, conditions_obj, notes_open, notes) {
    this.uuid = uuid;
    this.is_player = is_player;
    this.is_edit = is_edit;
    this.init_num = init_num;
    this.display_name = display_name;
    this.max_hp = max_hp;
    this.current_hp = current_hp;
    this.ac_num = ac_num;
    this.conditions_obj = conditions_obj;
    this.notes_open = notes_open;
    this.notes = notes;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function edit_initiative(e, uuid) {
    let init_item = initiatives_arr.find(initiatives_arr => initiatives_arr.uuid === uuid);
    initiatives_arr[initiatives_arr.indexOf(init_item)].is_edit = true;
    update_html();
}

function reorder_initiative(e) {
    let reorder_item = initiatives_arr[e.oldIndex];
    initiatives_arr.splice(e.oldIndex, 1);
    initiatives_arr.splice(e.newIndex, 0, reorder_item);
}

function confirm_initiative(e, uuid) {
    let init_item = initiatives_arr.find(initiatives_arr => initiatives_arr.uuid === uuid);
    initiatives_arr[initiatives_arr.indexOf(init_item)].is_edit = false;
    if (initiatives_arr[initiatives_arr.indexOf(init_item)].current_hp == null) {
        initiatives_arr[initiatives_arr.indexOf(init_item)].current_hp = initiatives_arr[initiatives_arr.indexOf(init_item)].max_hp;
    }
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
        if (i == turn_index) {
            parent_div.style.border = "3px solid red";
        } else {
            parent_div.style.border = "none";
        }
        let init_div = document.createElement("div");
        init_div.className = "inits";
        init_div.style.fontSize = "25px";

        if (initiatives_arr[i].is_edit == true) {

            let player_temp = document.createElement("div");
            player_temp.className = "init-subitem";
            let player_input = document.createElement("input");
            player_input.setAttribute('type', 'checkbox');
            player_input.checked = initiatives_arr[i].is_player;
            player_input.addEventListener("input", function () {initiatives_arr[i].is_player = player_input.checked});
            player_temp.innerHTML = "Player? "
            player_temp.appendChild(player_input);
            init_div.appendChild(player_temp);

            let ac_temp = document.createElement("div");
            ac_temp.className = "init-subitem";
            let ac_input = document.createElement("input");
            ac_input.className = "init-inputs";
            ac_input.setAttribute('value', initiatives_arr[i].ac_num);
            ac_input.addEventListener("input", function () {initiatives_arr[i].ac_num = parseInt(ac_input.value)});
            ac_temp.innerHTML = "AC: "
            ac_temp.appendChild(ac_input);
            init_div.appendChild(ac_temp);

            let init_temp = document.createElement("div");
            init_temp.className = "init-subitem";
            let init_input = document.createElement("input");
            init_input.className = "init-inputs";
            init_input.setAttribute('value', initiatives_arr[i].init_num);
            init_input.addEventListener("input", function () {initiatives_arr[i].init_num = parseInt(init_input.value)});
            init_temp.innerHTML = "Initiative: "
            init_temp.appendChild(init_input);
            init_div.appendChild(init_temp);

            let name_temp = document.createElement("div");
            name_temp.className = "init-subitem";
            let name_input = document.createElement("input");
            name_input.className = "init-inputs";
            name_input.setAttribute('value', initiatives_arr[i].display_name);
            name_input.addEventListener("input", function () {initiatives_arr[i].display_name = name_input.value});
            name_temp.innerHTML = "Name: "
            name_temp.appendChild(name_input);
            init_div.appendChild(name_temp);

            let hp_temp = document.createElement("div");
            hp_temp.className = "init-subitem";
            let hp_input = document.createElement("input");
            hp_input.className = "init-inputs";
            hp_input.setAttribute('value', initiatives_arr[i].max_hp);
            hp_input.addEventListener("input", function () {initiatives_arr[i].max_hp = parseInt(hp_input.value)});
            hp_temp.innerHTML = "HP: "
            hp_temp.appendChild(hp_input);
            init_div.appendChild(hp_temp);
            
        } else {

            let player_temp = document.createElement("img");
            player_temp.className = "init-subitem";
            if (initiatives_arr[i].is_player == true) {
                player_temp.src = "assets/player.png";
            } else {
                player_temp.src = "assets/enemy.png";
            }

            if (initiatives_arr[i].current_hp <= 0) {
                //dead
                parent_div.style.backgroundImage = "linear-gradient(#B0B0B0, #3F3F3F)";
            } else if (initiatives_arr[i].current_hp <= initiatives_arr[i].max_hp / 2) {
                //bloodied
                parent_div.style.backgroundImage = "linear-gradient(#B0B0B0 0%, #B0B0B0 25%, #ca7575 70%, #e53b3b 100%)";
            } else {
                //chillin
                parent_div.style.backgroundImage = "none";
            }
            init_div.appendChild(player_temp);

            let ac_temp = document.createElement("div");
            ac_temp.className = "init-subitem";
            ac_temp.innerText = "AC: " + initiatives_arr[i].ac_num;
            init_div.appendChild(ac_temp);

            let init_temp = document.createElement("div");
            init_temp.className = "init-subitem";
            init_temp.innerText = "Initiative: " + initiatives_arr[i].init_num;
            init_div.appendChild(init_temp);

            let name_temp = document.createElement("div");
            name_temp.className = "init-subitem";
            name_temp.innerText = "Name: " + initiatives_arr[i].display_name;
            init_div.appendChild(name_temp);

            let curhp_temp = document.createElement("div");
            curhp_temp.className = "init-subitem";
            let curhp_input = document.createElement("input");
            curhp_input.className = "init-inputs";
            curhp_input.style.textAlign = "right";
            curhp_input.style.fontSize = "25px";
            curhp_input.setAttribute("type", "number");
            curhp_input.setAttribute('value', initiatives_arr[i].current_hp);
            curhp_input.addEventListener("input", function () {
                initiatives_arr[i].current_hp = parseInt(curhp_input.value);
                // set icon source again so it gets updates on hp input, rather than only when update_html is called.
                // avove is actually redundant in every case except initial creation as input event hasn't fired yet.
                if (initiatives_arr[i].current_hp <= 0) {
                    player_temp.src = "assets/dead.png";
                } else if (initiatives_arr[i].is_player == true) {
                    player_temp.src = "assets/player.png";
                } else {
                    player_temp.src = "assets/enemy.png";
                }

                if (initiatives_arr[i].current_hp <= 0) {
                    //dead
                    parent_div.style.backgroundImage = "linear-gradient(#B0B0B0, #3F3F3F)";
                } else if (initiatives_arr[i].current_hp <= initiatives_arr[i].max_hp / 2) {
                    //bloodied
                    parent_div.style.backgroundImage = "linear-gradient(#B0B0B0 0%, #B0B0B0 25%, #ca7575 70%, #e53b3b 100%)";
                } else {
                    //chillin
                    parent_div.style.backgroundImage = "none";
                }
            });

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
        reorder_btn.className = "reorderbtn";
        let reorder_img = document.createElement("img");
        reorder_img.src = "assets/reorder.png"
        reorder_btn.appendChild(reorder_img);
        buttons_div.appendChild(reorder_btn);

        init_div.appendChild(buttons_div);
        parent_div.appendChild(init_div);

        if (initiatives_arr[i].notes_open == true) {
            let conditions_temp = document.createElement("div");
            conditions_temp.className = "flex";
            conditions_temp.style.marginTop = "20px";
            conditions_temp.style.justifyContent = "space-between";

            for (let [key, value] of Object.entries(initiatives_arr[i].conditions_obj)) {
                if (key == "exhaustion_level") {
                    let condition_input = document.createElement("input");
                    condition_input.setAttribute("type", "number");
                    condition_input.setAttribute("min", "0");
                    condition_input.setAttribute("max", "6");
                    condition_input.style.width = "2em"
                    condition_input.value = value;
                    condition_input.addEventListener("input", function () {initiatives_arr[i].conditions_obj[key] = parseint(condition_input.value)})

                    let condition_label = document.createElement("label");
                    condition_label.style.fontSize = "15px";
                    condition_label.innerHTML = "Exhaustion";
                    condition_label.appendChild(condition_input);
                    conditions_temp.appendChild(condition_label);
                } else {
                    let condition_input = document.createElement("input");
                    condition_input.setAttribute("type", "checkbox");
                    condition_input.checked = value;
                    condition_input.addEventListener("input", function () {initiatives_arr[i].conditions_obj[key] = condition_input.checked})

                    let condition_label = document.createElement("label");
                    condition_label.style.fontSize = "15px";
                    condition_label.innerHTML = capitalizeFirstLetter(key);
                    condition_label.appendChild(condition_input);
                    conditions_temp.appendChild(condition_label);
                }
            }
            parent_div.appendChild(conditions_temp);

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
    new Sortable(initiatives_elem, {
        animation: 150,
        handle: ".reorderbtn",
        onEnd: reorder_initiative
    });
}

function nextturn_func() {
    if (turn_index >= initiatives_arr.length - 1) {
        turn_index = 0;
        round_counter += 1;
        round_display.innerText = "Round " + round_counter;
    } else {
        turn_index += 1;
    }
    update_html();
}

function editround_func() {
    if (round_is_edit== true) {
        round_edit.src = "assets/edit.png";
        round_display.innerText = "Round " + round_counter;
        round_is_edit = false;
    } else {
        round_display.innerText = "Round ";
        round_edit.src = "assets/done.png";
        let round_input = document.createElement("input");
        round_input.setAttribute("type", "number");
        round_input.setAttribute("min", "0");
        round_input.style.width = "2.5em";
        round_input.value = round_counter;
        round_input.addEventListener("input", function () {round_counter = parseInt(round_input.value)});
        round_display.appendChild(round_input);
        round_is_edit = true;
    }
}

function addinit_func() {
    initiatives_arr.push(new Initiative(self.crypto.randomUUID(), true, true, 0, "", 0, null, 0, new Conditions(false, false, false, false, false, false, false, false, false, false, false, false, false, false, 0), false, ""));
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

let round_display = document.getElementById("round");
let round_edit = document.getElementById("editround");
let round_is_edit = false;

let nextturn = document.getElementById("nextturn");
let addinit = document.getElementById("add");
let sortinit = document.getElementById("sort");
let clearinit = document.getElementById("clear");

round_edit.addEventListener("click", editround_func);

nextturn.addEventListener("click", nextturn_func);
addinit.addEventListener("click", addinit_func);
sortinit.addEventListener("click", sortinit_func);
clearinit.addEventListener("click", clearinit_func);

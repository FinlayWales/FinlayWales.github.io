// Its getting there. Need to think on it.

let initiatives_arr = [];

let template = `
<div class="inits" id="tempinit">
    <div>
        <input name="player" id="player" type="checkbox" />
        <label for="player">Player?</label>
        <input placeholder="Initiative" id="initnum" />
        <input placeholder="Name" id="nametext" />
        <input placeholder="Max HP" id="hpnum" />
    </div>
    <div>
        <button><img src="assets/done.png" alt="Done" title="Done" id="done_btn" /></button>
        <button><img src="assets/reorder.png" alt="Reorder" title="Reorder" id="reorder" /></button>
    </div>
</div>
`

let curedit_flag = false;
let uidcounter = 0;
let addinit = document.getElementById("add");
let initiatives_elem = document.getElementById("initiatives");

function createelem_func(player, initnum, nametext, hpnum, uid) {
    let template = `
    <div class="inits">
        <div>
            <input name="player" id="player` + uid + `" type="checkbox" />
            <label for="player` + uid + `">Player?</label>
            <p>` + initnum + `</p>
            <p>` + nametext + `</p>
            <p>` + hpnum + `</p>
        </div>
        <div>
            <button><img src="assets/edit.png" alt="Edit" title="Edit" id="edit` + uid + `" /></button>
            <button><img src="assets/reorder.png" alt="Reorder" title="Reorder" id="reorder` + uid + `" /></button>
        </div>
    </div>
    `
    return template;
}

function confirminit_func() {
    document.getElementById("tempinit").remove();
    let playercheck = document.getElementById("player");
    let initnum = document.getElementById("initnum");
    let nametext = document.getElementById("nametext");
    let hpnum = document.getElementById("hpnum");
    initiatives_arr += {
        uid: uidcounter,
        player: playercheck.value,
        initiative: initnum.value,
        name: nametext.value,
        maxhp: hpnum.value,
        position: 0
    }
    uidcounter += 1;

    //initiatives_arr.sort(function (a, b) {return a.initiative - b.initiative});
    for (let i = 0; i < initiatives_arr.length; i++) {
        initiatives_elem.innerHTML += createelem_func(initiatives_arr[i].player, initiatives_arr[i].initiative, initiatives_arr[i].name, initiatives_arr[i].maxhp, initiatives_arr[i].uid);
    }
}

function addinit_func() {
    if (curedit_flag == false) {
        curedit_flag = true;
        initiatives_elem.innerHTML = template + initiatives_elem.innerHTML;
        let done_btn = document.getElementById("done_btn");
        let reorder = document.getElementById("reorder");
        done_btn.addEventListener("click", confirminit_func);
    }
}

addinit.addEventListener("click", addinit_func);
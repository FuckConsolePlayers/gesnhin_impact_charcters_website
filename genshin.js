var body = document.getElementsByTagName("body");
var elem;
const visions = new Map();
visions.set('Cryo', 'https://mundogenshinimpact.com/wp-content/uploads/3_Genshin-%C2%BFQue-es-la-resonancia-elemental.png');
visions.set('Pyro', 'https://mundogenshinimpact.com/wp-content/uploads/Genshin-%C2%BFQue-es-la-resonancia-elemental.png');
visions.set('Geo','https://mundogenshinimpact.com/wp-content/uploads/1_Genshin-%C2%BFQue-es-la-resonancia-elemental.png');
visions.set('Electro','https://mundogenshinimpact.com/wp-content/uploads/5_Genshin-%C2%BFQue-es-la-resonancia-elemental.png');
visions.set('Anemo','https://mundogenshinimpact.com/wp-content/uploads/4_Genshin-%C2%BFQue-es-la-resonancia-elemental.png');
visions.set('Dendro','https://mundogenshinimpact.com/wp-content/uploads/6_Genshin-%C2%BFQue-es-la-resonancia-elemental.png');
visions.set('Hydro','https://mundogenshinimpact.com/wp-content/uploads/2_Genshin-%C2%BFQue-es-la-resonancia-elemental.png');
const nations = new Map();
nations.set('Mondstadt','https://static.wikia.nocookie.net/gensin-impact/images/c/c4/Viewpoint_The_City_of_Wind.png/revision/latest?cb=20210415173019');
nations.set('Inazuma','https://static.wikia.nocookie.net/gensin-impact/images/6/6e/Tenshukaku.png/revision/latest?cb=20210709174037');
nations.set('Liyue','https://static.wikia.nocookie.net/gensin-impact/images/f/f9/Harbor.png/revision/latest?cb=20200915170645');
const nations_icons = new Map();
nations_icons.set('Mondstadt','https://static.wikia.nocookie.net/gensin-impact/images/8/80/Emblem_Mondstadt.png/revision/latest/scale-to-width-down/256?cb=20201116194623');
nations_icons.set('Inazuma','https://static.wikia.nocookie.net/gensin-impact/images/9/9e/Emblem_Inazuma.png/revision/latest/scale-to-width-down/350?cb=20210610232013');
nations_icons.set('Liyue','https://static.wikia.nocookie.net/gensin-impact/images/f/f8/Emblem_Liyue.png/revision/latest/scale-to-width-down/256?cb=20201116194654');
var array = [];
$.ajax({

    url: 'https://api.genshin.dev/characters',

    method: 'get',

    dataType: 'json',

    data: $(this).serialize(),

    success: function(data){
        data.forEach(element => {
            $.ajax({

                url: 'https://api.genshin.dev/characters/'+element,
            
                method: 'get',
            
                dataType: 'json',
            
                data: $(this).serialize(),
            
                success: function(data){
                    array.push(data);

                    elik = document.createElement("div");
                    elik.setAttribute("class",'container');

                    el = document.createElement("div");
                    el.setAttribute("class",'panel-default');

                    elem = document.createElement("img");
                    elem.setAttribute("class",'panel-body');
                    elem.setAttribute("src",visions.get(data.vision));
                    elem.setAttribute("width","32");
                    elem.setAttribute("height","32");
                    elem.setAttribute("align","left");
                    el.appendChild(elem);

                    elem = document.createElement("h2");
                    elem.innerText = " Name of the character: "+data.name;
                    elem.setAttribute("id",data.name);
                    elem.setAttribute("onclick",'show("'+data.name+'")');
                    elem.setAttribute("class",'panel-heading');
                    el.appendChild(elem);
                    //$("#lol")[0].appendChild(elem);

                    elem = document.createElement("h3");
                    elem.innerText = "Weapon of the character: "+data.weapon;
                    elem.setAttribute("class",'panel-body');
                    el.appendChild(elem);

                    try{
                        if(nations_icons.get(data.nation) != undefined){
                            elem = document.createElement("img");
                            elem.setAttribute("class",'panel-body');
                            elem.setAttribute("src",nations_icons.get(data.nation));
                            elem.setAttribute("width","32");
                            elem.setAttribute("height","32");
                            elem.setAttribute("align","left");
                            el.appendChild(elem);
                        }
                    }
                    catch{

                    }

                    elem = document.createElement("h3");
                    elem.innerText = "Nation of the character: "+data.nation;
                    elem.setAttribute("class",'panel-body');
                    elem.setAttribute("onclick",'show_nation("'+data.nation+'")');
                    el.appendChild(elem);

                    elem = document.createElement("p");
                    elem.setAttribute("class",'panel-footer');
                    if(data.description != ""){
                        elem.innerText = "Description: "+data.description;
                    }
                    else{
                        elem.innerText = "There is no description of this character";
                    }
                    el.appendChild(elem);
                    elik.appendChild(el);
                    $("#lol")[0].appendChild(elik);
                }
            });
        });
    }
});
var temp;
var temp_character;
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        search();
    }
});
function show_nation(s){
    if(s == "Unknown"){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: ' the nation of this character is unknown'
          })
    }
    else{
          Swal.fire({
            title: s,
            imageUrl: nations.get(s),
            imageWidth: 400,
            imageHeight: 200,
          })
    }
}
function find(search){
    var s = 0;
    var el;
    var found;
    while(search != el){
        el = array[s].name;
        found = array[s];
        s = s+1;
    }
    return found;
}
function exist(search){
    var answer = false;
    array.forEach(element => {
        if(search == element.name){
            answer = true;
        }
    });
    return answer;
}
function show(s){
    temp = [];
    var d = find(s);
    temp_character = d;
    var a = "";
    var count = 0;
    d.skillTalents.forEach(element => {
        a = a + '<h1 onclick="show_attack(temp['+count+'],temp_character)">Name of the attack: '+element.name+'</h1>'+'\n';
        temp.push(element.name);
        a = a + '<h2>Unlock: '+element.unlock+'</h2>'+'\n';
        a = a + '<p>Description: '+element.description+'</p>'+'\n';
        count++;
    });
    let timerInterval;
    Swal.fire({
        html: a,
        timer: 25000,
        timerProgressBar: false,
        willClose: () => {
          clearInterval(timerInterval)
        }
      })
}
function search(){
    var query = document.getElementById("search_input");
    var query_value = query.value;
    var char = query_value.charAt(0).toUpperCase();
    query_value = char+query_value.substring(1);
    if(query_value != "" && query_value != null && query_value != undefined){
        if(exist(query_value)){
            var e = document.getElementById(query_value);
            e.scrollIntoView();
        }
        else{
            query.value = "";
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: 'wrong character name'
              })
        }
    }
}
function show_attack(search,character){
    var found = character;
    var s = 0;
    var el;
    var founded;
    var temp_html = "";
    while(search != el){
        el = found.skillTalents[s].name;
        founded = found.skillTalents[s];
        s = s+1;
    }
    if(founded.upgrades != undefined && founded.upgrades != null){
        temp_html = "<h1>Upgrades</h1>\n"
        founded.upgrades.forEach(element => {
            temp_html = temp_html + '<h2>'+element.name+' - ';
            temp_html = temp_html + element.value+'</h2>'+'\n';
        });
        if(temp_html != ""){
            let timerInterval;
            Swal.fire({
                html: temp_html,
                timer: 10000,
                timerProgressBar: false,
                willClose: () => {
                  clearInterval(timerInterval)
                }
              })
        }
    }
    else{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: search+' does not have upgrades'
          })
    }
}

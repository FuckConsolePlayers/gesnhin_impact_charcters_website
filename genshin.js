var body = document.getElementsByTagName("body");
var elem;
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


                    elem = document.createElement("h2");
                    elem.innerText = "Name of the character: "+data.name;
                    elem.setAttribute("onclick",'show("'+data.name+'")');
                    elem.setAttribute("class",'panel-heading');
                    el.appendChild(elem);
                    //$("#lol")[0].appendChild(elem);

                    elem = document.createElement("h3");
                    elem.innerText = "Weapon of the character: "+data.weapon;
                    elem.setAttribute("class",'panel-body');
                    el.appendChild(elem);
                    //$("#lol")[0].appendChild(elem);

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

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
    var d = find(s);
    var a = "";
    d.skillTalents.forEach(element => {
        a = a + '<h1 onclick="show_attack("'+element.name+'")" >Name of the attack: '+element.name+'</h1>'+'\n';
        console.log(a);
        a = a + '<h2>Unlock: '+element.unlock+'</h2>'+'\n';
        a = a + '<p>Description: '+element.description+'</p>'+'\n';
    });
    let timerInterval;
    Swal.fire({
        html: a,
        timer: 10000,
        timerProgressBar: false,
        willClose: () => {
          clearInterval(timerInterval)
        }
      })
}
function show_attack(s){
    console.log(s);
}
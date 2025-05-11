function buttonClick(btn, typeCoffee){
    loadCoffeeInfo(typeCoffee)

    const activeBtn = document.querySelector("button.btnAct")
    activeBtn.classList.remove("btnAct")
    activeBtn.classList.add("btnInact")
    btn.classList.remove("btnInact")
    btn.classList.add("btnAct")
}

async function loadCoffeeInfo(typeCoffee){
    const res = await fetch(`https://api.sampleapis.com/coffee/${typeCoffee}`)
    const data = await res.json()
    const body = document.getElementById("coffee").tBodies[0]

    body.innerHTML = ""
    for(el of data){
        const newRow = body.insertRow(-1)
        let ingredients =""
        for(ing of el.ingredients){
            ingredients += "<li>" + ing + "</li>"
        }


        newRow.innerHTML = 
          `<td class="title">${el.title}</td>
           <td>${el.description}</td>
           <td>
            <ul>${ingredients}</ul>
           </td>
           <td><img src="${el.image}"/></td>
           <td class="money">${el.price}</td>
           <td><input type="number" value="0" min="0" max="100"/></td>
           <!--<td class="int">${el.totalSales}</td>-->`
    
    }

    document.addEventListener('blur', function(event) {
        if (event.target.tagName === 'INPUT' && event.target.type === 'number') {
            if (event.target.value < 0) {
                event.target.value = 0
            } else if (event.target.value > 100) {
                event.target.value = 100
            }
        }
      }, true);

}

loadCoffeeInfo("hot")


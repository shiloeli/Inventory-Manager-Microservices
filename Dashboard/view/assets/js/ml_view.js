
socket.on('data-to-chart1',(data,data2) =>{
    var optionList2 = document.getElementById('barValue2').options;
        data2.forEach(option =>{
            let opt = document.createElement("option")
            opt.text = option
            optionList2.add(opt)
        })
    })


async function getModel(){
    var taste = document.getElementById('tasteValue').value
    var city = document.getElementById('barValue2').value
    var date = document.getElementById('dateValue').value

    var val = `עבור סניף: ${city}, לטעם: ${taste}, בתאריך: ${date},
    עונה: סתיו, חג: לא, גודל הישוב: גדול, 
    סוג האוכלוסיה: מעורב, פעוטים: 7%, ילדים: 15%, בוגרים: 47%, מבוגרים: 8%, עמידה: 20%, זהב: 3%`
    const h2 = document.getElementById("modelAns")
    var element = document.createElement("span");
    element.innerHTML = val
    h2.replaceChildren(element)
    // taste = String(taste)
    // city = String(city)
    // date = String(date)
    // let citySales = {};
    // let stores = [];
    // citySales.stores = stores;
    // let store = {
    //     taste,
    //     city,
    //   }
    // await citySales.stores.push(store)

    // socket.emit("ans-model",citySales);
    // socket.on("ans-model", (ans)=>{
    //     console.log(ans)
    // })

}


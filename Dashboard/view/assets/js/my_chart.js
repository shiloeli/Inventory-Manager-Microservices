const ctx = document.getElementById('myChart').getContext('2d');
const earning = document.getElementById('earning').getContext('2d');


socket.on('data-to-chart1',(data,data2) =>{
    var optionList = document.getElementById('barValue').options;
        data2.forEach(option =>{
            let opt = document.createElement("option")
            opt.text = option
            optionList.add(opt)
        })

    for(let i=0; i<5; i++){
        const table = document.getElementById(`img${i+1}`)
        var element = document.createElement("span");
        element.innerHTML = data[i]
        table.appendChild(element)

    }
    


    var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['שוקולד', 'וניל', 'תות', 'לימון', 'חלבה'],
            datasets: [{
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
            }]
        },
        options: {
            responsive: true,
        }
    });
});

var myChart2 = new Chart(earning, {
    type: 'bar',
    data: {
        labels: ['שוקולד', 'וניל', 'תות', 'לימון', 'חלבה'],
        datasets: [{
            label: 'כמות',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        }]
    },
    options: {
        responsive: true,
    }
});




 async function insertStockStore(barValue){
    socket.emit("ans-city-data",barValue.value);
    socket.on("ans-city-data", (ans)=>{
        console.log(ans)
        myChart2.config.data.datasets[0].data = ans
        myChart2.update() 
    })

 }






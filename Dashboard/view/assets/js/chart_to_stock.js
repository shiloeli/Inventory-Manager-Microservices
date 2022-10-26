const ctx = document.getElementById('myChart2').getContext('2d');

socket.on('data-to-chart2',(data) =>{
  

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['שוקולד', 'וניל', 'תות', 'לימון', 'חלבה'],
            datasets: [{
                label: 'כמות',
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
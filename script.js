window.onload = function(){
    const ctx = document.getElementById('grafico1');
    
    valores = [10, 20, 16, 7, 15];
    valores2 = [8, 18, 13, 5, 18];

    var g1 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
            datasets: [
                {
                    label: 'Venda',
                    data: valores,
                    borderWidth: 1
                },
                {
                    label: 'Compras',
                    data: valores2,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Bar Chart'
              }
            }
          }
    });    

    document.getElementById("alt").onclick = function(){

        valores = [5, 6, 8, 26, 15];
        g1.options.plugins.title.text = 'new title';
        g1.data.datasets[0].data = valores;
        g1.update();

        setTimeout(()=>{

            //transforma o canvas em base64   
            var canvas = document.getElementById('grafico2');
            var dataURL = canvas.toDataURL();
            document.getElementById("imgRet").src = dataURL;
            
            var doc = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                //format: 'letter'
            });
            doc.setFont('helvetica');
            doc.setFontSize(40);
            doc.text('Imprimindo Gráfico em PDF!', 50, 70);
            doc.addImage(dataURL, 'PNG', 50, 100, 510, 255);//base64 (é obrigatorio)
            doc.addPage();
            doc.text('Nova Página!', 50, 70);
            doc.setTextColor(255,255,0);
            doc.text('What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 50, 70);
            doc.setTextColor("#000");
            doc.fromHTML("<style>h1{background:red;}</style>");
            doc.fromHTML("<h1>Hoje</h1>",50,70);
            doc.fromHTML("<h3>Hoje</h3>");
            doc.addPage();

            //copia tabela do html 
            source = document.getElementById('customers').innerHTML;
            doc.fromHTML("<style>td{padding: 60px;}</style>"+source,30,30);
            

            var body = [
                [1, 'GIZMORE...', 75000, '2021'],
                [2, 'Realme', 25000, '2022'],
                [3, 'Oneplus', 30000, '2023'],
            ]
            doc.setLineWidth(2);
            doc.text(200, 40, "Product detailed report");
     doc.autoTable({
         body: body,
         startY: 200,
         head:[['SL.No', 'Product Name', 'Price', 'Model']],
         foot:[[' ', 'Price total', '130000', '  ']],
         headStyles :{
            lineWidth: 1,
            fillColor: [30, 212, 145],
            textColor: [255,255,255],
               
         },
         footStyles :{
            textColor: [255, 255, 255],
            lineWidth: 0,//espeçura das linhas entre as celulas
        },
         theme: 'grid',
         columnStyles: {
             0: {
                 halign: 'right',
                 cellWidth: 50,
                 fillColor: [232, 252, 245],
                },
             1: {
                 halign: 'left',
                 cellWidth: 300,
                 fillColor: [232, 252, 245],
                },
             2: {
                 halign: 'right',
                 cellWidth: 50,
                 fillColor: [232, 252, 245],
                },
             3: {
                 halign: 'center',
                 cellWidth: 50,
                 fillColor: [232, 252, 135],
                }
         },
        })

        doc.autoTable({
            html:'#tab_customers',
            startY: 300,
            bodyStyles: {minCellHeight: 30},
            columnStyles: {
                0: { cellWidth: 100  },
                1: { cellWidth: 230 },
                2: { cellWidth: 100  },
                3: { cellWidth: 100  }
                //para encaixar em uma folha a4 o total tem que ser 530 
            },
            //theme: 'plain' //tema basico limpo so os dados
            //theme:'striped'
            //theme:'grid'
        })

        doc.setDrawColor(255, 0, 255);
        doc.setLineWidth(4);//espessura da linha 
        doc.line(30, 30, 410, 30); // horizontal line
        doc.line(30, 0, 30, 100); // vertical line

            //abre em nova guia
            window.open(doc.output('bloburl'), '_blank');

            //faz download
            doc.save('pdf_com_js.pdf');

            //abre em um iframe
            document.getElementById('main-iframe').src = doc.output('bloburl');

            doc.close();

            //nao funciona no edge
            //window.print();

            //abre em nova janela
            //let windowOpen = window.open(doc.output('bloburl'), '','heigth=700,width=700');
            //windowOpen.print(); //abre impressao

            /*let win = window.open(doc.output('bloburl'),'','heigth=700,width=700');
            win.document.write("<style>h1{background:red;print-color-adjust: exact !important;-webkit-print-color-adjust:exact !important;}</style>");
            win.document.write("<h1>Hoje</h1>");
            win.document.write("<h3>Hoje</h3>");
            win.print();
            win.close();*/        

        },1000);


    }

  //------------------------------------------------  
    const ctx2 = document.getElementById('grafico2');

    new Chart(ctx2, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Vendas',
                    data: {                    
                        January: 10,
                        February: 20,
                        March:16,
                        April:7,
                        Maio:15
                    }
                },{
                    label: 'Compras',
                    data: {                                       
                        January: 7,
                        February: 10,
                        March:10,
                        April:8,
                        Maio:16
                    }
                },
                {
                    label: 'Estimativa de Vendas',
                    data: {                                       
                        January: 9,
                        February: 18,
                        March:18,
                        April:10,
                        Maio:16
                    }
                },                
                {
                    label: 'Estimativa de Compras',
                    data: {                                       
                        January: 7,
                        February: 8,
                        March:16,
                        April:6,
                        Maio:10
                    }
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Line Chart'
              }
            }
          }
    });    
    //--------------------------------------
    const ctx3 = document.getElementById('grafico3');
    
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
            datasets: [
                {
                    label: 'Venda',
                    data: [10, 20, 16, 7, 15],
                    borderWidth: 1
                },
                
                {
                    label: 'Compras',
                    data: [6,8,2,7,9],
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y'
        }
    });
      
    //--------------------------------------
    const ctx4 = document.getElementById('grafico4');
    
    data = {
        datasets: [{ data: [10, 20, 30] }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    };

    new Chart(ctx4, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Pie Chart'
                }
            }
        }
    });
    //-------------------------------------
    const ctx5 = document.getElementById('grafico5');
    new Chart(ctx5, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Pie Chart'
                }
            }
        }
    });
}
//transforma o canvas em base64   
var canvas = document.getElementById('grafico1');
var dataURL = canvas.toDataURL();
document.getElementById("imgRet").src = dataURL;

var doc = new jsPDF({ 
    orientation: 'landscape', 
    unit: 'px', 
    /*format: 'letter'*/ 
});

doc.setFont('helvetica');
doc.setFontSize(40);
doc.text('Imprimindo Gráfico em PDF!', 50, 70);

//o primeiro parametro de addImage tem que ser base64 obrigatoriamente
doc.addImage(dataURL, 'PNG', 50, 100, 510, 255);
doc.addPage();
doc.text('Nova Página!', 50, 70);
doc.setTextColor(255,255,0);
doc.text('What is Lorem Ipsum?...', 50, 70);
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
    [3, 'Oneplus', 30000, '2023']
]

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
        lineWidth: 0,//espessura das linhas entre as celulas
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
        1: { cellWidth: 230  },
        2: { cellWidth: 100  },
        3: { cellWidth: 100  }
        //para encaixar em uma folha a4 o total tem que ser 530
        //obs: orientação landscape
    },
    //theme: 'plain' //tema basico limpo so os dados
    //theme:'striped'
    //theme:'grid'
})

doc.setDrawColor(255, 0, 255);//cor da linha
doc.setLineWidth(4);//espessura da linha (SetLineWidth(float width))
doc.line(30, 30, 410, 30); // horizontal line  
doc.line(30, 2, 30, 100); // vertical line

//abre em nova guia
window.open(doc.output('bloburl'), '_blank');

//faz download
doc.save('pdf_com_js.pdf');

//abre em um iframe
document.getElementById('main-iframe').src = doc.output('bloburl');

doc.close();
var canvas = $('#my_canvas');
var canvasJS = document.getElementById('my_canvas');
var ctx = canvasJS.getContext('2d');
var canvasPosition = {
    x: canvas.offset().left,
    y: canvas.offset().top
};

function createUnuverse() {
    for(var i=0;i<80;i++){
        for(var j=0;j<80;j++){
            ctx.strokeRect(i*10, j*10, 10, 10);
        }
    }
}
createUnuverse();

function Galaxy(myX,myY,boole){
    this.X=myX;
    this.Y=myY;
    this.checked1=boole;
}


var cells=createCellsField();

function createCellsField () {
    var array=[];
    for(var i=0;i<80;i++){
        var interiorArray=[];
        for(var j=0;j<80;j++){
            interiorArray.push(new Galaxy(i*10,j*10,0));

        }
        array.push(interiorArray);
    }
    return array;
}

function GodsFinger(width,height) {
    var buf1=(width%100)%10,
        buf2=(height%100)%10;
        width-=buf1;
        height-=buf2;
        if((cells[height/10][width/10].checked1)) {


            ctx.clearRect(width, height, 10, 10);

            cells[height/10][width/10].checked1=0;
            ctx.strokeRect(width, height, 10, 10);
        }else{

            ctx.fillRect(width, height, 10, 10);
            cells[height/10][width/10].checked1=1;

        }
}


function coordinateOfNeighborLivingGalaxy(I,J) {
    var ng=[];
    if(I-1>=0){
        ng.push(new Array(I-1,J));

    }
    if(I+1<=79){
        ng.push(new Array(I+1,J));
    }

    if(J-1>=0){
        ng.push(new Array(I,J-1));
    }
    if(J+1<=79){
        ng.push(new Array(I,J+1));
    }
    if(I-1>=0&&J-1>=0){
        ng.push(new Array(I-1,J-1));
    }
    if(I+1<=79&&J+1<=79){
        ng.push(new Array(I+1,J+1));
    }
    if(I+1<=79&&J-1>=0){
        ng.push(new Array(I+1,J-1));
    }
    if(I-1>=0&&J+1<=79){
        ng.push(new Array(I-1,J+1));
    }
    //$('.block1').append( ng.length+"<br>" );
    for(j=0;j<8;j++){
        for(var i=0;i<ng.length;i++){
            if(cells[ng[i][0]][ng[i][1]].checked1==0){
                ng.splice(i,1);
                // $('.block1').append( ng.length+"<br>" );
            }
        }}

    return ng;
}


canvas.on('click', function(e) {

    clearInterval(timerId);
  

    var mouse = {
        x: e.pageX - canvasPosition.x,
        y: e.pageY - canvasPosition.y
    }

    GodsFinger(mouse.x,mouse.y);

});





function step1() {

    var bufarray=[];
    var bufarray2=[];

    for(var i=0;i<80;i++) {
        for (var j = 0; j < 80; j++) {
            if(cells[i][j].checked1==0&&coordinateOfNeighborLivingGalaxy(i,j).length==3){
                bufarray.push(new Array(i,j));
            }else{
                if(cells[i][j].checked1==1&&(coordinateOfNeighborLivingGalaxy(i,j).length>3||coordinateOfNeighborLivingGalaxy(i,j).length<2)){
                    bufarray2.push(new Array(i,j));
                }

            }
        }
    }

    for(var i=0;i<bufarray.length;i++){
        ctx.fillRect(bufarray[i][1]*10, bufarray[i][0]*10, 10, 10);
        cells[bufarray[i][0]][bufarray[i][1]].checked1=1;
    }

    for(var i=0;i<bufarray2.length;i++){
        ctx.clearRect(bufarray2[i][1]*10, bufarray2[i][0]*10, 10, 10);
        cells[bufarray2[i][0]][bufarray2[i][1]].checked1=0;
        ctx.strokeRect(bufarray2[i][1]*10, bufarray2[i][0]*10, 10, 10);
    }

}

var timerId;

function start () {
   timerId=setInterval(step1,500);
}

function stopfun() {
    clearInterval(timerId);
}
class Satellite{
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;

        this.body= Bodies.rectangle(this.x, this.y, this.w, this.h);
        this.img=  obImg= loadImage("nasa.gif");
    }

    display(){
        let pos = this.body.position;
        push();
        rectMode(CENTER);
        imageMode(CENTER);
        noStroke();
        fill(148,127,146);
        //rect(pos.x,pos.y, this.w, this.h);
        image(this.img, pos.x, pos.y, this.w, this.h);
        pop();
    }

}
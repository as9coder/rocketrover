class Bound{
    constructor(x,y,w,h){

        let stat= {
            isStatic: true
        }

        this.x= x;
        this.y= y;
        this.w= w;
        this.h= h;

        this.body= Bodies.rectangle(x,y,w,h,stat);
        World.add(world, this.body);
    }
    show(){
        let pos = this.body.position;
        push();
        rectMode(CENTER);
        noStroke();
        fill(148,127,146);
        rect(pos.x,pos.y, this.w, this.h);
        pop();
    }

}
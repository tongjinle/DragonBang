/**
 * Viewport
 */
class Viewport {
    width:number;
    height:number;
    constructor(width:number,height:number) {
        this.width = width;
        this.height = height;
    }
    
    // 坐标是否在视口中
    isIn(x:number,y:number){
        return x>=0 && x<=this.width && y>=0 && y<=this.height;
    }
    
    
}
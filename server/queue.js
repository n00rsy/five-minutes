

class Queue { 
    constructor() { 
        this.items = []; 
    } 
                  
    
    enqueue(element){
        this.items.push(element)
    } 
    
    dequeue(){
        //don't dequeue the last message
        if(this.items.length==1) return this.items;
        return this.items.shift();
    }

    peek(){
        if(this.isEmpty()) return null;
        return this.items[0];
    }

    isEmpty(){
        return this.items.length==0
    }
    
    printQueue(){
        for(var i =0;i<this.items.length;i++){
            console.log(this.items[i])
        }
        console.log()
    }
} 

module.exports = Queue
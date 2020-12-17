class Food {
    constructor() {
      this.image = loadImage("images/Milk.png");
      //rani
      this.foodStock = 0;
      this.lastFed;
    }
  
    getFoodStock() {
      // var foodRef = database.ref('Food');
      // foodRef.on("value", function(data){
      //   foodStock = data.val();
      // });
      //rani
      return this.foodStock;
    }
  
    updateFoodStock(stock) {
      // database.ref('/').update({
      //     foodStock:stock
      // });
      //rani
      this.foodStock = stock;
    }
  
    deductFood() {
      //rani
      if (this.foodStock > 0) {
        this.foodStock = this.foodStock - 1;
      }
    }
  
    //rani
    getFedTime(lastFed) {
      this.lastFed = lastFed;
    }
  
    display() {
      var x = 80,
        y = 205; //edited
  
      imageMode(CENTER);
      //rani
      if (this.foodStock != 0) {
        for (var i = 0; i < this.foodStock; i++) {
          if (i % 10 == 0) {
            x = 80;
            y = y + 45;
          }
  
          image(this.image, x, y, 50, 50);
          x = x + 30;
        }
      }
    }
  }
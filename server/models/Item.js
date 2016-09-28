function Item(name, avatar) {
  this.name = name;
  this.avatar = avatar;
}

var bread = new Item('Bread', 'assets/bread.png');
bread.id = 1;

var carrot = new Item('Carrot', 'assets/carrot.png');
carrot.id = 2;

var diamond = new Item('Diamond', 'assets/diamond.png');
diamond.id = 3;

Item.getBread = function() {
  return bread;
};
Item.getCarrot = function() {
  return carrot;
};
Item.getDiamond = function() {
  return diamond;
};
Item.getById = function(id) {
  switch(id) {
    case 1:
      return Item.getBread();
    case 2:
      return Item.getCarrot();
    case 3:
      return Item.getDiamond();
    default:
      return Item.getBread();
  }
};


module.exports = Item;
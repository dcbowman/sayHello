module.exports = function Cart(guestTable){
	this.person= guestTable.items;

	this.add = function(name, id){
		var storedPerson = this.person[id];
		if (!storedPerson){
			storedPerson = this.items[id] = {table = table};
		};

	this.generateArray = function(){
		var arr =[];
		for (var id in this.person){
			arr.push(this.person[id]);
		}
		return arr;
	}
	};

};
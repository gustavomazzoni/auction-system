var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Auction = require('../../models/Auction');

describe('Auction', function() {

	describe('#addBid()', function() {

		it('should throw an Error when new bid is lower than winning bid.', function() {
			var auction = {
				minimumBid: 50,
				winningBid: {
					bid: 100
				}
			};
			var player = {
				username: 'userName',
				coins: 1000
			};
			var bid = 99;
		  	
		  	try {
		  		Auction.addBid(auction, player, bid);
		  	} catch(err) {
		  		expect(err.message).to.equal('Bid not placed. There is a higher bid.');
		  	}
		});

		it('should throw an Error when player doesnt have the money.', function() {
			var auction = {
				minimumBid: 50,
				winningBid: {
					bid: 390
				}
			};
			var player = {
				username: 'userName',
				coins: 400
			};
			var bid = 401;
		  	
		  	try {
		  		Auction.addBid(auction, player, bid);
		  	} catch(err) {
		  		expect(err.message).to.equal('Bid not placed. You dont have this amount of coins.');
		  	}
		});

	});
  
});
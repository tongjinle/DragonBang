/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../model/speed.ts" />


describe('test', () => {
	it('sync', () => {
		var a;
		a = 100;
		expect(a).toBe(100);
	});


	it('async', (done: DoneFn) => { 
		var a;
		a = 100;
		done();

		expect(a).toBe(100);
	}, 1000);
});
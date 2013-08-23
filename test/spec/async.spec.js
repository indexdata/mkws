/* Copyright (c) 2013 IndexData ApS. http://indexdata.com
 *
 * async check
 *
 */
describe("Asynchronous check", function () {
    it("contains spec with an expectation", function () {
        expect(true).toBe(true);
    });

    // Asynchronous part
    it("check running search", function () {
        var max_time = 1;
        var timer = 0;

        function found(time, none) {
            setTimeout(function () {
                timer = time;
            }, time * 1000);
        }

        runs(function () {
            // check hit counter after N seconds
            found(0, true);
            found(0.2);
            found(0.4);
            found(0.5);
            found(0.7);
            found(max_time);
        });

        waitsFor(function () {
            // console.log("waits for ... " + timer);
            return timer == max_time ? true : false;
        }, "The Value should be N seconds", max_time * 1000);

        runs(function () {
            expect(timer).toEqual(max_time);
        });

    });
});

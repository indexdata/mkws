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
    it("simple check", function () {
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


    it("double async check", function () {
        var max_time = 0.5;
        var timer = 0;

        function found(time, none) {
            setTimeout(function () {
                timer = time;
            }, time * 1000);
        }

        runs(function () {
            found(0);
            found(0.2);
            found(max_time - 0.1);
        });

        waitsFor(function () {
            return timer == max_time - 0.1 ? true : false;
        }, "The Value should be N seconds", max_time * 1000);

        runs(function () {
            expect(timer <= max_time).toBeTruthy();
        });

        timer = 0;
        runs(function () {
            found(0.1);
            found(max_time);
        });

        waitsFor(function () {
            // console.log("waits for ... " + timer);
            return timer == max_time ? true : false;
        }, "The Value should be N seconds", max_time * 1000);

        runs(function () {
            expect(timer <= max_time).toBeTruthy();
        });
    });

});

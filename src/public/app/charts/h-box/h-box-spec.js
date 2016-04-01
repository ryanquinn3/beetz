/**
 * Created by ryanquinn on 3/23/16.
 */
import test from 'blue-tape';
import hBoxPlot, { UNIT } from './h-box';

/* Utility functions*/
let setupCanvas = () => {
    let baseElem = document.createElement('div');
    baseElem.id = 'base';
    baseElem.style.height = '158px';
    baseElem.style.width = '490px';
    baseElem.style.border = '1px solid black';
    document.querySelector('body').appendChild(baseElem);
    return baseElem;
};

let teardownCanvas = () => {
    document.getElementById('base').remove();
};

let endTest = (assert) => {
    teardownCanvas();
    assert.end();
};

/* Tests */
test('tick marks', (assert) => {
    let canvas = setupCanvas();

    let chartOptions = {
        min: 1,
        max: 6,
        unit: UNIT.MILLIONS
    };

    let data = {
        min: {
            value: 1
        },
        max: {
            value: 6
        },
        lowerQuartile: {
            value: 2
        },
        upperQuartile: {
            value: 4
        }
    };

    hBoxPlot(canvas, chartOptions, data);
    let tickLength = document.getElementsByClassName('tick').length;
    assert.equal(tickLength, 21, 'have the correct number');
    endTest(assert);
});


test('top labels', (assert) => {

    let canvas = setupCanvas();

    hBoxPlot(canvas, {}, {
        max: 6,
        min: 1
    });

    let topLabels = document.getElementsByClassName('top-label');
    let numLabels = topLabels.length;
 //   assert.equal(numLabels, 6, 'correct number of labels');
    // test the content

    endTest(assert);
});

test('bottom labels', (assert) => {

    let canvas = setupCanvas();


    hBoxPlot(canvas, {

    }, {
        max: 6,
        min: 1,
        lowerQuartile: 2,
        upperQuartile: 4
    });
    endTest(assert);
});


test('invalid args', (assert) => {

    let canvas = setupCanvas();

    assert.throws(
        () => {    hBoxPlot(canvas, {}, { invalidArgs: 10 }); },
        'does not accept invalid arguments'
    );

    assert.throws(
        () => { hBoxPlot(canvas, {}, { mean: [10, 20]})},
        'requires value if object'
    );

    assert.throws(
        () => { hBoxPlot(canvas, {}, {mean: 'string'}) },
        'throws if string passed in data'
    );

    assert.doesNotThrow(
        () => { hBoxPlot(canvas, {}, {lowerQuartile: 20, upperQuartile: {value: 10, label: 'upper'}})},
        null,
        'does not throw for valid arguments'
    );

    endTest(assert);
});

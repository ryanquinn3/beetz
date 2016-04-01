import d3 from 'd3';

/*
 * open issues:
 *  spacing of ticks
 *
 *
 *
 *
 */

const goldColor = '#E5BF00';
const yellowBgColor = '#FFEE99';

export const UNIT = {
    MULTIPLE: 'multiple',
    PERCENT: 'percent',
    MILLIONS: 'millions',
    THOUSANDS: 'thousands',
    NO_UNIT: 'none'
};

const unitStringConverter = (input, unit) => {
    switch(unit) {
        case UNIT.MULTIPLE:
            return `${input}X`;
        case UNIT.PERCENT:
            return `${input}%`;
        case UNIT.MILLIONS:
            return `$${input}M`;
        case UNIT.THOUSANDS:
            return `$${input}K`;
        case UNIT.NO_UNIT:
            return `${input}`
    }
};

const validDataFields = ['min', 'lowerQuartile', 'mean', 'median', 'upperQuartile', 'max', 'marker'];
const orderedDataFields = ['min', 'lowerQuartile', 'median', 'upperQuartile', 'max'];
const requiredDataFields = ['lowerQuartile', 'median', 'upperQuartile'];

const defaultLabels = {
    min: 'Min.',
    lowerQuartile: '25th Percentile',
    median: 'Median',
    mean: 'Average',
    upperQuartile: '75th Percentile',
    max: 'Max'
};


const processDataFields = (data) => {
    /* Validate all keys are good */
    Object.keys(data).forEach((field) => {
       if(validDataFields.indexOf(field) === -1) {
           throw new Error(`Invalid field provided to data valid keys are [${validDataFields.join(', ')}]`)
       }
    });

    let cleanedData = {};
    /* Ensure format and proper data types */
    Object.keys(data).forEach( (field) => {
        if(typeof(data[field])  === 'number'){
            cleanedData[field] = {
                value: data[field],
                label: defaultLabels[field]
            }
        } else if(typeof data[field] === 'object' && !Array.isArray(data[field])){
            if(typeof data[field].value === 'undefined'){
                throw new Error(`Must have value specified for field: ${field}`)
            }
            cleanedData[field] = {
                value: data[field].value,
                label: data[field].label || defaultLabels[field]
            }
        } else {
            throw new Error(`Invalid input type for field ${field}. Must be object or number.`);
        }
    });

    /* Ensure required fields are present */
    requiredDataFields.forEach( (field) => {
       if( typeof cleanedData[field] === 'undefined'){
            throw new Error(`Missing required field. Required fields are ${requiredDataFields.join(', ')}`);
       }
    });

    //All fields should be properly formed, with required fields present

    /* Check if numbers make sense */
    let orderedUserInput = [];
    orderedDataFields.forEach( (field) => {
        if(typeof cleanedData[field] !== 'undefined') {
            orderedUserInput.push(cleanedData[field].value);
        }
    });

    orderedUserInput.forEach( (value, i) => {
        if(i < orderedUserInput.length -1  && value > orderedUserInput[i+1]){
            throw new Error(`Data values do not make sense. Ensure proper order of data points.`)
        }
    });







    return cleanedData;
};

const validateChartOptions = (opts) => {
    if(typeof(opts) !== 'object'){
        throw new Error('chartOptions are required');
    }
    const requiredFields = ['upperLimit', 'lowerLimit', 'unit'];
    requiredFields.forEach( (field) => {
        if(typeof(opts[field]) === 'undefined'){
            throw new Error(`chartOptions must have fields ${requiredFields.join(', ')}`);
        }
    });
};

/**
 *
 */
export default function(elem, chartOptions, data){

    data = processDataFields(data);
    validateChartOptions(chartOptions);


    const canvasHeight = elem.offsetHeight;
    const canvasWidth = elem.offsetWidth;

    const margin = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    };


    const chartWidth = canvasWidth - margin.left - margin.right;
    const chartHeight = canvasHeight - margin.top - margin.bottom;

    let { lowerLimit:min, upperLimit:max }  = chartOptions;

    const baseSVGAttributes = {
        width: canvasWidth,
        height: canvasHeight
    };

    let baseSVG = createShape('svg', d3.select(elem), baseSVGAttributes);

    let scale = d3.scale.linear().domain([min, max]).range([0, chartWidth]);

    let axis = d3.svg.axis()
        .scale(scale)
        .ticks(22)
        .tickSize(chartHeight)
        .orient('top')
        .tickFormat((d) => unitStringConverter(d, chartOptions.unit));

    baseSVG.append('rect')
        .attr({
            'height': chartHeight,
            'width': chartWidth,
            'class': 'chart-bg',
            'fill': yellowBgColor,
            'opacity': .8,
            'transform': `translate(${margin.left}, ${margin.top})`
        });


    let lowerQ = scale(data.lowerQuartile.value);
    let upperQ = scale(data.upperQuartile.value);

    let midQWidth = upperQ - lowerQ;

    const startAnimationProps = {
        width: 0,
        transform: `translate(${margin.left + (chartWidth/2)}, ${margin.top})`
    };

    const endAnimationProps = {
        width: midQWidth,
        transform: `translate(${margin.left + lowerQ}, ${margin.top})`
    };



    baseSVG.append('rect')
        .attr({
            height: chartHeight,
            fill: goldColor
        })
        .attr(startAnimationProps)
        .transition()
        .ease('elastic')
        .duration(750)
        .delay(250)
        .attr(endAnimationProps);

     baseSVG.append('g')
        .attr('class', 'tick')
        .attr('transform', `translate(${margin.left}, ${margin.top + chartHeight})`)
        .call(axis);

    baseSVG.selectAll('.tick line')
        .attr('dy', -10)
        .attr('stroke', '#C6B354')
        .attr('stroke-opacity', .7);


    baseSVG.selectAll('path')
        .attr('class', 'hidden');


    baseSVG.selectAll('.tick text')
        .attr('dy', -10);


    baseSVG.selectAll('text')
        .text( function(d, i, elm) {
            d3.select(this).attr('class', 'tick-text');
            if(d.toString().indexOf('.') !== -1){
                return null;
            }
            this.parentNode.children[0].setAttribute('stroke-opacity',1);
          /*  d3.select(this.parentNode.children[0])
                .transition()
                .delay(1000)
                .duration(600)
                .attr('stroke-width', 1.3);*/

            return unitStringConverter(d, chartOptions.unit);
        });




    Object.keys(data).forEach( (key) => {
        if(key === 'median') return;
        let metric = data[key];
        let drawX = scale(metric.value);
        makeMarker(drawX, metric);
    });

    if(data.median) {
        drawMedianLine(data.median);
        createMedianRect(data.median);
    }

    baseSVG.select('text').style('color', '#4A4A4A');

    function makeMarker(drawX, dataPoint){
        var group = baseSVG.append('g')
        //    .attr('transform', `translate(${drawX}, ${margin.top})`);
            .attr('opacity',0)

        group.append('line')
            .attr({
                'x1': 0,
                'x2':0,
                'y1': 0,
                'y2': chartHeight + 10,
                'stroke': 'black',
                'stroke-width': '1.5',
                'stroke-opacity': 1
            });

        group.append('circle')
            .attr({
                'cx': 0,
                'cy': chartHeight + 10,
                'r': 2,
                'fill': 'black'
            });

        group.append('text')
            .text(dataPoint.label)
            .attr({
                'y': chartHeight + 25,
                'x': 0,
                'font-size': '10',
                'text-anchor': 'middle'
            });

        group.attr('transform', `translate(${drawX + margin.left}, ${margin.top})`);
        group.transition().duration(600).attr('opacity', 1);
        group.select('text').call(insertLinebreaks);
    }

    function drawMedianLine(medianObj){
        let group = baseSVG.append('g');
        let xVal = scale(medianObj.value);
        group.append('line')
            .attr({
                x1: 0,
                x2: 0,
                y1: 0,
                y2: chartHeight,
                stroke: 'white',
                'stroke-width':1.5,
                'stroke-opacity':1
            });

        group.attr('transform', `translate(${xVal + margin.left}, ${margin.top})`);
    }

    function createMedianRect(medianObj){
        let medianGroup = baseSVG.append('g')
            .attr('opacity', 0);

        let drawMid = scale(medianObj.value);

        let rectWidth = 55;
        let rectHeight = chartHeight / 2;

        medianGroup.append('rect')
            .attr({
                height: rectHeight,
                width: rectWidth,
                rx: 5,
                ry: 5,
                fill: 'white'
            });

        medianGroup.append('text')
            .text(unitStringConverter(medianObj.value, chartOptions.unit))
            .attr({
                y: (rectHeight/3) + 3,
                x: rectWidth/2,
                'font-size': '12',
                'text-anchor': 'middle'
            });

        medianGroup.append('text')
            .text(medianObj.label)
            .attr({
                y: (rectHeight*3)/4,
                x: rectWidth/2,
                'font-size': '12',
                'text-anchor': 'middle'
            });


        let translateX = margin.left + drawMid - (rectWidth/2);
        medianGroup.attr('transform', `translate(${translateX} , ${margin.top + (chartHeight/4)})`);
        medianGroup.transition().duration(600).attr('opacity', 1);
    }


}

function createShape(shape, parent, attrs){
    let rect = parent.append(shape);
    Object.keys(attrs).forEach( (key) => {
       rect.attr(key, attrs[key]);
    });
    return rect;
}

function insertLinebreaks() {
    var el = this;
    var words = el.text().split(' ');
    el.text('');
    words.forEach( (word, i) => {
        let tspan = el.append('tspan')
            .text(word)
            .attr({
                'font-size': el.attr('font-size'),
                'text-anchor': 'middle',
                'x': el.attr('x')
            });
        if(i) {
            tspan.attr('dy', 10);
        }
    });
}

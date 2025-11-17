"use strict";
const constants_1 = require('./constants');
function degreeToDirection(num) {
    var val = Math.floor((num / 22.5) + .5);
    return constants_1.WIND_DIRECTIONS[(val % 16)];
}
exports.degreeToDirection = degreeToDirection;
function describeWindSpeed(speed) {
    if (speed < 0.3) {
        return 'calm';
    }
    else if (speed >= 0.3 && speed < 1.6) {
        return 'light air';
    }
    else if (speed >= 1.6 && speed < 3.4) {
        return 'light breeze';
    }
    else if (speed >= 3.4 && speed < 5.5) {
        return 'gentle breeze';
    }
    else if (speed >= 5.5 && speed < 8) {
        return 'moderate breeze';
    }
    else if (speed >= 8 && speed < 10.8) {
        return 'fresh breeze';
    }
    else if (speed >= 10.8 && speed < 13.9) {
        return 'strong breeze';
    }
    else if (speed >= 13.9 && speed < 17.2) {
        return 'moderate gale';
    }
    else if (speed >= 17.2 && speed < 20.8) {
        return 'gale';
    }
    else if (speed >= 20.8 && speed < 24.5) {
        return 'strong gale';
    }
    else if (speed >= 24.5 && speed < 28.5) {
        return 'storm';
    }
    else if (speed >= 28.5 && speed < 32.7) {
        return 'violent storm';
    }
    else if (speed >= 32.7 && speed < 42) {
        return 'hurricane force';
    }
    return 'super typhoon';
}
exports.describeWindSpeed = describeWindSpeed;
function describeHumidity(humidity) {
    if (humidity >= 0 && humidity <= 40) {
        return 'very dry';
    }
    else if (humidity >= 40 && humidity <= 70) {
        return 'dry';
    }
    else if (humidity >= 85 && humidity <= 95) {
        return 'humid';
    }
    return 'very humid';
}
exports.describeHumidity = describeHumidity;
function describeTemperature(temp) {
    var celsius = calcCelsius(temp);
    if (celsius < 3) {
        return 'very cold';
    }
    else if (celsius >= 3 && celsius < 8) {
        return 'cold';
    }
    else if (celsius >= 8 && celsius < 15) {
        return 'cool';
    }
    else if (celsius >= 15 && celsius < 23) {
        return 'mild';
    }
    else if (celsius >= 23 && celsius < 28) {
        return 'warm';
    }
    else if (celsius >= 28 && celsius < 32) {
        return 'hot';
    }
    return 'very hot';
}
exports.describeTemperature = describeTemperature;
function calcCelsius(value) {
    // OpenWeatherMap may return temperatures in Kelvin (older/default) or in Celsius
    // If value looks like Kelvin (> 200), convert to Celsius, otherwise assume it's already Celsius
    if (typeof value === 'number' && value > 200) {
        return value - 273.15;
    }
    return value;
}
exports.calcCelsius = calcCelsius;
function calcCelsiusAsString(value) {
    const c = calcCelsius(value);
    // Protect against undefined/null
    if (c === undefined || c === null || Number.isNaN(c)) return '';
    return c.toFixed(2);
}
exports.calcCelsiusAsString = calcCelsiusAsString;
//# sourceMappingURL=tools.js.map
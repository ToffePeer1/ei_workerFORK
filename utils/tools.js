function bigNumberToString(number, decimals, strLen) {
    var letters = {
        0: '', 3: 'k', 6: 'M', 9: 'B', 12: 'T', 15: 'q', 18: 'Q', 21: 's',
        24: 'S', 27: 'o', 30: 'N', 33: 'd', 36: 'U', 39: 'D', 42: 'Td',
        45: 'qd', 48: 'Qd', 51: 'sd', 54: 'Sd', 57: 'Od', 60: 'Nd', 63: 'V',
        66: 'uV', 69: 'dV', 72: 'tV', 75: 'qV', 78: 'QV', 81: 'sV', 84: 'SV',
        87: 'OV', 90: 'NV', 93: 'tT'
    }

    if (isNaN(number))
        return 'NaN';

    if (!Number.isFinite(number))
        return 'Inf';

    if (number < 0)
        return '-' + bigNumberToString(-number, decimals, strLen);

    if (number == 0)
        return "0"
    if (number < 1000) {
        let numStr = String(number.toFixed(decimals)).slice(0, strLen ?? 3)
        if (numStr.charAt((strLen ?? 3) - 1) == ".") numStr = numStr.replace(".", "")
        return numStr
    }

    let power = 0
    while (number >= 10) { number /= 10; power++ }
    while (!letters[power]) { number *= 10; power-- }

    if (strLen) {
        let numStr = String(number.toFixed(decimals)).slice(0, strLen)
        if (numStr.charAt(strLen - 1) == ".") numStr = numStr.replace(".", "")
        return numStr + letters[power]
    } else
        return String(number.toFixed(decimals)) + letters[power]
}

function convertGrade(gradeId) {
    const grade_nums = { 0: 'UNKNOWN', 1: 'C', 2: 'B', 3: 'A', 4: 'AA', 5: 'AAA', 6: 'ANY' };
    return grade_nums[gradeId ?? 0];
}

function getEggName(num) {
    switch (num) {
        case 1: return "EDIBLE";
        case 2: return "SUPERFOOD";
        case 3: return "MEDICAL";
        case 4: return "ROCKET_FUEL";
        case 5: return "SUPER_MATERIAL";
        case 6: return "FUSION";
        case 7: return "QUANTUM";
        case 8: return "IMMORTALITY";
        case 9: return "TACHYON";
        case 10: return "GRAVITON";
        case 11: return "DILITHIUM";
        case 12: return "PRODIGY";
        case 13: return "TERRAFORM";
        case 14: return "ANTIMATTER";
        case 15: return "DARK_MATTER";
        case 16: return "AI";
        case 17: return "NEBULA";
        case 18: return "UNIVERSE";
        case 19: return "ENLIGHTENMENT";
        case 100: return "CHOCOLATE";
        case 101: return "EASTER";
        case 102: return "WATERBALLOON";
        case 103: return "FIREWORK";
        case 104: return "PUMPKIN";
        case 200: return "CUSTOM";
        default: return "UNKNOWN";
    }
}

function getDimension(num) {
    switch (num) {
        case 0: return "INVALID";
        case 1: return "EARNINGS";
        case 2: return "AWAY_EARNINGS";
        case 3: return "INTERNAL_HATCHERY_RATE";
        case 4: return "EGG_LAYING_RATE";
        case 5: return "SHIPPING_CAPACITY";
        case 6: return "HAB_CAPACITY";
        case 7: return "VEHICLE_COST";
        case 8: return "HAB_COST";
        case 9: return "RESEARCH_COST";
        default: return "UNKNOWN";
    }
}

function getBuffLevel(maxFarmReached) {
    if (maxFarmReached >= 10000000000) return 4;
    if (maxFarmReached >= 1000000000) return 3;
    if (maxFarmReached >= 100000000) return 2;
    if (maxFarmReached >= 10000000) return 1;
    return NaN; // return NaN if no level has been reached
}

async function createAuthHash(message, env) {
    const magic = env.MAGIC;
    const data = new Uint8Array(message.length + magic.length);
    data.set(message, 0);
    data[env.INDEX % message.length] = env.MARKER;
    for (let i = 0; i < magic.length; i++) {
        data[message.length + i] = magic.charCodeAt(i);
    }
    const hashBuffer = await crypto.subtle.digest('SHA-256', data.buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

module.exports = { bigNumberToString, convertGrade, getEggName, getDimension, getBuffLevel, createAuthHash };
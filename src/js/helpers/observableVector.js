// observableVector.js

export default function observableVector(initial, onChange, prefix) {
    prefix = prefix || "";
    var property = prefix || "value";
    var v = initial || [];

    v.add = (val) => {
        v.push(val);
        onChange(`${prefix}-add`, { [property]: val });
    };

    v.remove = (val) => {
        v.splice(v.indexOf(val), 1);
        onChange(`${prefix}-remove`, { [property]: val });
    };

    return v;
}

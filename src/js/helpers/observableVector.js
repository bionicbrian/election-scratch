// observableVector.js

export default function observableVector(initial, onChange, prefix) {
    prefix = prefix || "";
    return {
        add(val) {
            this._values.push(val);
            onChange(`${prefix}-add`, val);
        },
        remove(val) {
            this._values.splice(this._values.indexOf(val), 1);
            onChange(`${prefix}-remove`, val);
        },
        values: initial || [],
        get val() {
            return this._values;
        }
    };
}

/* jslint nomen: true, bitwise: true */
/* global Sk: true */

const uuidv4 = require("uuid").v4;

/**
 * Return the current susp. It is the one that has a $tmps property. If it doesn't, look into its child.
 *
 * @param {object} susp The suspension.
 *
 * @returns object|null
 */
const getCurrentSusp = function(susp) {
    if (susp.hasOwnProperty("$tmps")) {
        return susp;
    }
    if (susp.hasOwnProperty("child")) {
        return getCurrentSusp(susp.child);
    }

    return null;
};

/**
 * @namespace Sk.builtin
 */

/**
 * Register a promise reference.
 *
 * @param susp The suspension.
 */
Sk.builtin.registerPromiseReference = function(susp) {
    const currentSusp = getCurrentSusp(susp);

    if (currentSusp) {
        const __selfArgName = currentSusp._argnames[0];

        if (currentSusp.$tmps[__selfArgName] && currentSusp.$tmps[__selfArgName].hasOwnProperty("_uuid")) {
            window.currentPythonRunner._debugger.registerPromiseReference(currentSusp.$tmps[__selfArgName]);
        }
    }
};

/**
 * Register the parent reference of one of its child.
 *
 * @param parent The parent.
 * @param child  The child.
 */
Sk.builtin.registerParentReferenceInChild = function(parent, child) {
    if (!child || !parent || !child.hasOwnProperty("_uuid") || !parent.hasOwnProperty("_uuid")) {
        return;
    }

    if (!child.hasOwnProperty("_parents")) {
        child._parents = {};
    }

    child._parents[parent._uuid] = parent;
};

/**
 * Changes recursively all the references of an object.
 * At first call, parent is the object and obj is undefined.
 *
 * @param clonedReferences The already cloned references.
 * @param $loc             The internal skulpt $loc or $gbl.
 * @param parent           The object's parent.
 * @param obj              The object.
 * @param cycle            Whether a cycle has been detected.
 *
 * @return {object} The references correspondences with key uuid and value the object.
 */
Sk.builtin.changeReferencesRec = function (clonedReferences, $loc, parent, obj, cycle) {
    if (!clonedReferences.hasOwnProperty(parent._uuid)) {
        clonedReferences[parent._uuid] = parent.clone(obj, clonedReferences);

        if (parent.hasOwnProperty("$d")) {
            clonedReferences[parent.$d._uuid] = parent.$d;
        }
    }

    const parentClone = clonedReferences[parent._uuid];

    if ($loc.hasOwnProperty("__refs__")) {
        if ($loc.__refs__[parentClone._uuid]) {
            const parentRefs = $loc.__refs__[parentClone._uuid];
            for (let idx in parentRefs) {
                $loc[parentRefs[idx]] = parentClone;
            }
        }
    }

    if (!cycle && parentClone._parents) {
        for (let parentUuid in parentClone._parents) {
            if (clonedReferences.hasOwnProperty(parentUuid)) {
                parentClone._parents[parentUuid] = clonedReferences[parentUuid];
            }

            const parentParent = parentClone._parents[parentUuid];

            let cycle = false;
            if (clonedReferences.hasOwnProperty(parentParent._uuid) && parentParent === clonedReferences[parentParent._uuid]) {
                cycle = true;
            }

            Sk.builtin.changeReferencesRec(clonedReferences, $loc, parentParent, parentClone, cycle);
        }
    }
};

/**
 * Initializes the persistent infos for a list.
 *
 * @param list   The list.
 * @param values The values of the list.
 * @param uuid   The uuid if it is a clone, or undefined.
 */
Sk.builtin.listInitPersistent = function(list, values, uuid) {
    // Sets the UUID.
    list._ref_uuid = uuidv4();
    if (uuid === undefined) {
        list._uuid = uuidv4();

        /*
         * Set the parents.
         *
         * If uuid is provided, then it is a clone and the parents are
         * copied during the clone.
         */

        list._parents = {};
        for (let idx in values) {
            const element = values[idx];

            Sk.builtin.registerParentReferenceInChild(list, element);
        }
    } else {
        list._uuid = uuid;
    }
};

/**
 * Updates references within a list.
 *
 * @param newReferences The set of new references {UUID: Object}.
 */
Sk.builtin.list.prototype["updateReferencesInside"] = function(newReferences) {
    const toChange = {};

    for (let it = Sk.abstr.iter(this), k = it.tp$iternext(); k !== undefined; k = it.tp$iternext()) {
        if (k.hasOwnProperty("_uuid") && newReferences.hasOwnProperty(k._uuid)) {
            toChange[it.$index - 1] = newReferences[k._uuid];
        }
    }

    for (let idx in toChange) {
        Sk.abstr.objectSetItem(this, parseInt(idx), toChange[idx], true);
    }
};

/**
 * Clones a list. Used when an element is put or updated.
 *
 * @param newElementValue The new element put or updated.
 */
Sk.builtin.list.prototype["clone"] = function(newElementValue) {
    const thisInKeys = [];
    let items = [];
    for (let it = Sk.abstr.iter(this), k = it.tp$iternext(); k !== undefined; k = it.tp$iternext()) {
        if (newElementValue.hasOwnProperty("_uuid") && k.hasOwnProperty("_uuid") && newElementValue._uuid === k._uuid) {
            items.push(newElementValue);
        } else if (k.hasOwnProperty("_uuid") && k._uuid === this._uuid) {
            thisInKeys.push(it.$index - 1);

            items.push(this);
        } else {
            items.push(k);
        }
    }

    const clone = new Sk.builtin.list(items, this._uuid);

    // If the list contains itself, update those references.
    for (let idx in thisInKeys) {
        Sk.abstr.objectSetItem(clone, thisInKeys[idx], clone, true);
    }

    clone._parents = this._parents;

    for (let it = Sk.abstr.iter(clone), k = it.tp$iternext(); k !== undefined; k = it.tp$iternext()) {
        Sk.builtin.registerParentReferenceInChild(clone, k);
    }

    Sk.builtin.registerParentReferenceInChild(clone, newElementValue);

    return clone;
};


/**
 * Clones a dict. Used when an element is put or updated.
 *
 * @param newElementValue The new element put or updated.
 */
Sk.builtin.dict.prototype["clone"] = function(newElementValue) {
    const clone = new Sk.builtin.dict([], this._uuid);
    const thisInKeys = [];
    for (let it = Sk.abstr.iter(this), k = it.tp$iternext(); k !== undefined; k = it.tp$iternext()) {
        let v = this.mp$subscript(k);
        if (v === undefined) {
            v = null;
        }

        if (v && newElementValue && newElementValue.hasOwnProperty("_uuid") && v.hasOwnProperty("_uuid") && newElementValue._uuid === v._uuid) {
            clone.mp$ass_subscript(k, newElementValue);
        } else if (v && v.hasOwnProperty("_uuid") && v._uuid === this._uuid) {
            thisInKeys.push(k);

            clone.mp$ass_subscript(k, this);
        } else {
            clone.mp$ass_subscript(k, v);
        }
    }

    // If the dict contains itself, update those references.
    for (let idx in thisInKeys) {
        clone.mp$ass_subscript(thisInKeys[idx], clone);
    }

    clone._parents = this._parents;

    for (let it = Sk.abstr.iter(this), k = it.tp$iternext(); k !== undefined; k = it.tp$iternext()) {
        let v = this.mp$subscript(k);
        if (v === undefined) {
            v = null;
        }

        Sk.builtin.registerParentReferenceInChild(clone, v);
    }

    Sk.builtin.registerParentReferenceInChild(clone, newElementValue);

    return clone;
};

/**
 * Updates references within a dict.
 *
 * @param newReferences The set of new references {UUID: Object}.
 */
Sk.builtin.dict.prototype["updateReferencesInside"] = function(newReferences) {
    const toChange = [];

    for (let it = Sk.abstr.iter(this), k = it.tp$iternext(); k !== undefined; k = it.tp$iternext()) {
        let v = this.mp$subscript(k);
        if (v === undefined) {
            v = null;
        }

        if (v && newReferences && v.hasOwnProperty("_uuid") && newReferences.hasOwnProperty(v._uuid)) {
            toChange.push({
                key: k,
                value: newReferences[v._uuid]
            });
        }
    }

    for (let idx in toChange) {
        this.mp$ass_subscript(toChange[idx].key, toChange[idx].value);
    }
};


Sk.builtin.object.prototype["clone"] = function(newElementValue, clonedReferences) {
    const newObject = Object.create(this);

    // New reference id.
    newObject._ref_uuid = uuidv4();

    // Copy the _uuid now because it has to be copied before "$d".
    newObject._uuid = this._uuid;

    for (let idx in this) {
        if (idx === "_ref_uuid") {
            // Ignore.
        } else if (idx === "$d") {
            if (!clonedReferences || !clonedReferences.hasOwnProperty(newObject.$d._uuid)) {
                newObject.$d = newObject.$d.clone(newElementValue);
                Sk.builtin.registerParentReferenceInChild(newObject, newObject.$d);
            } else {
                // If the internal dict has already been cloned, just copy it.
                newObject.$d = clonedReferences[newObject.$d._uuid];
            }
        } else {
            newObject[idx] = this[idx];
        }
    }

    return newObject;
};

/**
 * Updates references within an object.
 *
 * @param newReferences The set of new references {UUID: Object}.
 */
Sk.builtin.object.prototype["updateReferencesInside"] = function(newReferences) {
    if (this.hasOwnProperty("$d") && newReferences.hasOwnProperty(this.$d._uuid)) {
        this.$d = newReferences[this.$d._uuid];
    }
};

Sk.builtin.str.prototype["clone"] = function() {
    return new Sk.builtin.str(this.v);
};

/**
 * Changes all the references of an object.
 *
 * @param clonedReferences The already cloned references.
 * @param $loc             The internal skulpt $loc or $gbl.
 * @param obj              The object.
 *
 * @return {object} The references correspondences with key uuid and value the object.
 */
Sk.builtin.changeReferences = function (clonedReferences, $loc, obj) {
    return Sk.builtin.changeReferencesRec(clonedReferences, $loc, obj, undefined, false);
};

Sk.exportSymbol("Sk.builtin.registerParentReferenceInChild", Sk.builtin.registerParentReferenceInChild);
Sk.exportSymbol("Sk.builtin.changeReferences", Sk.builtin.changeReferences);

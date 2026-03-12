class Point {
    constructor(x, y) {
        this.type = 'point';
        this.x = x;
        this.y = y;
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }

    toString() {
        return `${this.x},${this.y}`;
    }
}

class Line {
    constructor(points = []) {
        this.type = 'line';
        this.points = points.map(p => new Point(p[0], p[1]));
    }

    equals(other) {
        if (this.points.length !== other.points.length) return false;

        const thisPoints = this.points.map(p => p.toString()).sort();
        const otherPoints = other.points.map(p => p.toString()).sort();

        return thisPoints.every((val, i) => val === otherPoints[i]);
    }

    toString() {
        return this.points.map(p => p.toString()).sort().join('|');
    }
}

class Figure {
    constructor(elements = []) {
        this.elements = { points: [], lines: [] };
        this.addElements(elements);
    }

    addElements(elements = []) {
        elements.forEach(e => {
            if (e.type === 'point') this.addPoint(e.x, e.y);
            else if (e.type === 'line') this.addLine(e.points.map(p => [p.x, p.y]));
        });
    }

    addPoint(x, y) {
        const newPoint = new Point(x, y);
        if (!this.elements.points.some(p => p.equals(newPoint))) {
            this.elements.points.push(newPoint);
            this.sortPoints();
        }
    }

    addLine(points = []) {
        const newLine = new Line(points);
        if (!this.elements.lines.some(l => l.equals(newLine))) {
            this.elements.lines.push(newLine);
            this.sortLines();
        }
    }

    sortPoints() {
        this.elements.points.sort((a, b) => (a.x - b.x) || (a.y - b.y));
    }

    sortLines() {
        this.elements.lines.sort((a, b) => {
            const aStr = a.toString();
            const bStr = b.toString();
            return aStr > bStr ? 1 : aStr < bStr ? -1 : 0;
        });
    }

    toJSON() {
        return JSON.stringify(this.elements);
    }

    fromJSON(data = '{}', add = false) {
        let obj = JSON.parse(data);
        if (!add) {
            this.elements = { points: [], lines: [] };
        }
        (obj.points || []).forEach(p => this.addPoint(p.x, p.y));
        (obj.lines || []).forEach(l => this.addLine(l.points.map(p => [p.x, p.y])));
    }

    deleteAll() {
        this.elements.points = [];
        this.elements.lines = [];
    }
}

let f = new Figure();
f.addPoint(10, 20);
f.addPoint(10, 10);
f.addPoint(10, 20);
f.addLine([[10, 20], [30, 40]]);
f.addLine([[30, 40], [10, 20]]);
console.log(f.toJSON());
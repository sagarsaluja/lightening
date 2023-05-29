import { getRandomInt } from "./util.js";


export class Node {
    constructor(location, context) {
        this.left = null;
        this.right = null;
        this.parent = null;
        this.location = location;
        this.context = context;
        this.id = Math.floor(Math.random() * 1000);
        this.fillStyle = this.getFillStyle(location);

    }
    getFillStyle(location) {
        const normalizedPosition = location.y / window.innerHeight;
        const w = Math.round((1 - normalizedPosition) * 255);
        const b = Math.round(normalizedPosition * 255);
        const hexW = w.toString(16).padStart(2, '0');
        const hexB = b.toString(16).padStart(2, '0');

        return `#${hexB}${hexB}${hexW}`;
    }
    addLeft(node) {
        this.left = node;
    }
    addRight(node) {
        this.right = node;
    }
    addParent(location) {
        if (location.y === 0) {
            return;
        }
        this.parent = new Node(this.getRandomLocationForParent(location), this.context);
        if (this.parent.location.x > this.location) this.parent.left = this;
        else this.parent.right = this;

        return this.parent;
    }
    getRandomLocationForParent(location) {
        const dir = Math.random() > 0.5 ? 1 : -1;
        const newLocation = { x: location.x + dir, y: location.y -= 1 }
        return newLocation.x >= 0 && newLocation.y >= 0 ? newLocation : this.getRandomLocationForParent(location);
    }
    draw() {
        this.context.fillStyle = this.fillStyle;
        this.context.fillRect(this.location.x, this.location.y, 1, 1);
    }
    addNodes(N, parent) {
        console.log(`adding ${N} nodes to ${parent}`);
        if (N === 0) return;
        if (Math.random() > 0.5 && parent.location.x - 1 >= 0) {
            const newNode = new Node({ x: parent.location.x - 1, y: parent.location.y + 1 }, this.context);
            parent.addLeft(newNode);
            this.addNodes(N - 1, newNode);
        }
        else {
            const newNode = new Node({ x: parent.location.x + 1, y: parent.location.y + 1 }, this.context);
            parent.addRight(newNode);
            this.addNodes(N - 1, newNode);
        }
    }
    drawTree(root) {
        root.draw();
        setTimeout(() => {
            if (!root.left) {
                if (Math.random() > 0.99 && root.location.x > 0) {
                    let newNodeLeft = new Node({ x: root.location.x - 1, y: root.location.y + 1 }, this.context)

                    this.addNodes(getRandomInt(50, 100), newNodeLeft);
                    root.left = newNodeLeft;
                }
            }
            if (root.left) {
                this.drawTree(root.left);
            }
            if (!root.right) {
                if (Math.random() > 0.99) {
                    let newNodeRight = new Node({ x: root.location.x + 1, y: root.location.y + 1 }, this.context);
                    this.addNodes(getRandomInt(50, 100), newNodeRight);
                    root.right = newNodeRight;
                }
            }
            if (root.right) {
                this.drawTree(root.right);
            }
        }, 3);
    }
}
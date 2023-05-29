import { Node } from "./Tree.js"
/** @type {HTMLCanvasElement} */


const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("load", () => {
    context.fillStyle = "white";
    context.width = canvas.width;
    context.height = canvas.height;
    window.addEventListener("click", (e) => {

        const end = new Node({ x: e.x, y: e.y }, context);
        // end.draw();
        let parent, root;
        const addParents = (currNode) => {

            if (currNode.location.y === 0) {
                root = currNode;
                return;
            }
            parent = currNode.addParent(currNode.location);
            // parent.draw();
            addParents(parent);
        }
        addParents(end);
        console.log("Root", root);
        root.drawTree(root);
    });

})
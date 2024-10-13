// script.js

// Define individual coordinates as separate variables
let element1StartX = 120, element1StartY = 100, element1EndX = 0, element1EndY = -60; // element 1
let element2StartX = 0, element2StartY = 100, element2EndX = 120, element2EndY = 0; // element 2
let element3StartX = 0, element3StartY = 100, element3EndX = 120, element3EndY = -60; // element 3
let element4StartX = 120, element4StartY = 40, element4EndX = -120, element4EndY = -40; // element 4
let element5StartX = 0, element5StartY = 100, element5EndX = 0, element5EndY = -100; // element 5

let node1X = 120, node1Y = 100;
let node2X = 120, node2Y = 40;
let node3X = 0,   node3Y = 100;
let node4X = 0,   node4Y = 0;

let FA = -240;
let RA = 0;

// Update node positions
function updateNodePositions() {
    // Get the positions from the table DOM and convert to numbers
    node1X = parseFloat(document.getElementById('x1').value);
    node2X = parseFloat(document.getElementById('x2').value);
    node3X = parseFloat(document.getElementById('x3').value);
    node4X = parseFloat(document.getElementById('x4').value);
    
    node1Y = 100 - parseFloat(document.getElementById('y1').value);
    node2Y = 100 - parseFloat(document.getElementById('y2').value);
    node3Y = 100 - parseFloat(document.getElementById('y3').value);
    node4Y = 100 - parseFloat(document.getElementById('y4').value);

    FA = -parseFloat(document.getElementById('FA').value);
    RA = -parseFloat(document.getElementById('RollerSupportAngle').value);

    // Update paths and nodes after values change
    updatePaths();
    updateNodes();
}

// Construct path strings using the variables
function constructPaths() {
    return {
        element1: `m ${element1StartX} ${element1StartY} l ${element1EndX} ${element1EndY}`,
        element2: `m ${element2StartX} ${element2StartY} l ${element2EndX} ${element2EndY}`,
        element3: `m ${element3StartX} ${element3StartY} l ${element3EndX} ${element3EndY}`,
        element4: `m ${element4StartX} ${element4StartY} l ${element4EndX} ${element4EndY}`,
        element5: `m ${element5StartX} ${element5StartY} l ${element5EndX} ${element5EndY}`
    };
}

// Function to update the paths
function updatePaths() {
    const pathValues = {
        element1: `m ${node1X} ${node1Y} l ${node2X - node1X} ${node2Y - node1Y}`, // Connect node1 to node2
        element2: `m ${node1X} ${node1Y} l ${node3X - node1X} ${node3Y - node1Y}`, // Connect node1 to node3
        element3: `m ${node2X} ${node2Y} l ${node3X - node2X} ${node3Y - node2Y}`, // Connect node2 to node3
        element4: `m ${node2X} ${node2Y} l ${node4X - node2X} ${node4Y - node2Y}`, // Connect node2 to node4
        element5: `m ${node3X} ${node3Y} l ${node4X - node3X} ${node4Y - node3Y}`  // Connect node3 to node4

        
    };

    document.getElementById('element1').setAttribute('d', pathValues.element1);
    document.getElementById('element2').setAttribute('d', pathValues.element2);
    document.getElementById('element3').setAttribute('d', pathValues.element3);
    document.getElementById('element4').setAttribute('d', pathValues.element4);
    document.getElementById('element5').setAttribute('d', pathValues.element5);
}

function updateNodes() {

    const compValue = {
        farce: `m ${node1X + 7} ${node1Y}  l 25 0 m 0 0 l -5 4 m 5 -4 l -5 -4`, // Connect node1 to node2
        rolly: `m ${node3X} ${node3Y} l -8 8 m 8 -8 l -8 -8 m 0 -2 l 0 20 m 0 -2.5 a 1 1 0 0 0 -5 0 a 1 1 0 0 0 5 0 m 0 -5 a 1 1 0 0 0 -5 0 a 1 1 0 0 0 5 0 m 0 -5 a 1 1 0 0 0 -5 0 a 1 1 0 0 0 5 0 m 0 -5 a 1 1 0 0 0 -5 0 a 1 1 0 0 0 5 0`,
        fixy:  `m ${node4X} ${node4Y} l -8 8 m 8 -8 l -8 -8 m 0 -2 l 0 20 m 0 -1 l -3 -3 m 3 3 m 0 -5 l -3 -3 m 3 3 m 0 -5 l -3 -3 m 3 3 m 0 -5 l -3 -3 m 3 3`
    }

    document.getElementById('node1').setAttribute('cx', node1X);
    document.getElementById('node2').setAttribute('cx', node2X);
    document.getElementById('node3').setAttribute('cx', node3X);
    document.getElementById('node4').setAttribute('cx', node4X);

    document.getElementById('node1').setAttribute('cy', node1Y);
    document.getElementById('node2').setAttribute('cy', node2Y);
    document.getElementById('node3').setAttribute('cy', node3Y);
    document.getElementById('node4').setAttribute('cy', node4Y);

    document.getElementById('force').setAttribute('d', compValue.farce); 
    document.getElementById('force').style.transform = `rotate(${FA}deg)`;
    document.getElementById('force').style.transformOrigin = `${(node1X)/2}% ${(node1Y)/1.5}%`;

    document.getElementById('rollerSupport').setAttribute('d', compValue.rolly); 
    document.getElementById('fixedSupport').setAttribute('d', compValue.fixy); 
    document.getElementById('rollerSupport').style.transform = `rotate(${RA}deg)`;
    document.getElementById('rollerSupport').style.transformOrigin = `${(node3X)/2}% ${(node3Y)/1.5}%`;

}

function tableSelection(selection){
    switch (selection){
        case 1 :
            try { document.getElementById('Coordinates').classList.add('selected');      } catch (error) {}
            try { document.getElementById('node-coordinates').classList.toggle('hidden');} catch (error) {}
            try { document.getElementById('element-connections').classList.add('hidden');} catch (error) {}
            try { document.getElementById('Global-stiffness-matrix').classList.add('hidden');} catch (error) {}
            try { document.getElementById('Elements').classList.remove('selected');      } catch (error) {}
            try { document.getElementById('Global-Matrix').classList.remove('selected'); } catch (error) {}
            break;
        case 2 :
            try { document.getElementById('Elements').classList.add('selected');            } catch (error) {}
            try { document.getElementById('element-connections').classList.toggle('hidden');} catch (error) {}
            try { document.getElementById('node-coordinates').classList.add('hidden');      } catch (error) {}
            try { document.getElementById('Global-stiffness-matrix').classList.add('hidden');   } catch (error) {} 
            try { document.getElementById('Coordinates').classList.remove('selected');      } catch (error) {} 
            try { document.getElementById('Global-Matrix').classList.remove('selected');    } catch (error) {}  
            break;
        case 3 : 
            try { document.getElementById('Global-Matrix').classList.add('selected');       } catch (error) {}  
            try { document.getElementById('Global-stiffness-matrix').classList.toggle('hidden');} catch (error) {} 
            try { document.getElementById('node-coordinates').classList.add('hidden');      } catch (error) {}   
            try { document.getElementById('element-connections').classList.add('hidden');   } catch (error) {}  
            try { document.getElementById('Coordinates').classList.remove('selected');      } catch (error) {}   
            try { document.getElementById('Elements').classList.remove('selected');         } catch (error) {}   
            break;
        default :
            break;
    }
};

document.getElementById('reload').addEventListener('click', updateNodePositions);
document.getElementById('Coordinates').addEventListener('click', () => tableSelection(1));
document.getElementById('Elements').addEventListener('click', () => tableSelection(2));
document.getElementById('Global-Matrix').addEventListener('click', () => tableSelection(3));

// Call the function to update the paths when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    updatePaths();
    updateNodes();
});

document.addEventListener('click', () => {
    updatePaths();
    updateNodes();
    updateNodePositions();
});

setInterval(updateNodePositions, 10);

document.getElementById('resetTruss').addEventListener('click', () => {
    location.reload();
}); // reset     

document.getElementById('w').addEventListener('click', () => {
    const event = new KeyboardEvent('keydown', {
        key: 'w',
        code: 'KeyW',
        charCode: 0,
        keyCode: 87, // W key code
        bubbles: true
    });
    document.dispatchEvent(event);
})

document.getElementById('a').addEventListener('click', () => {
    const event = new KeyboardEvent('keydown', {
        key: 'a',
        code: 'KeyA',
        charCode: 0,
        keyCode: 65, // A key code
        bubbles: true
    });
    document.dispatchEvent(event);
});

document.getElementById('s').addEventListener('click', () => {
    const event = new KeyboardEvent('keydown', {
        key: 's',
        code: 'KeyS',
        charCode: 0,
        keyCode: 83, // S key code
        bubbles: true
    });
    document.dispatchEvent(event);
});

document.getElementById('d').addEventListener('click', () => {
    const event = new KeyboardEvent('keydown', {
        key: 'd',
        code: 'KeyD',
        charCode: 0,
        keyCode: 68, // D key code
        bubbles: true
    });
    document.dispatchEvent(event);
});

// Event listener for 'keydown' events
document.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "W") {
        console.log("W key was pressed!");
        // Call the function for 'W'
    } else if (event.key === "s" || event.key === "S") {
        console.log("S key was pressed!");
        // Call the function for 'S'
    } else if (event.key === "d" || event.key === "D") {
        console.log("D key was pressed!");
        // Call the function for 'D'
    }
});

let node1 = document.getElementById('node1')
let node2 = document.getElementById('node2')
let node3 = document.getElementById('node3')
let node4 = document.getElementById('node4')

node1.addEventListener('click', () => {
    node1.classList.toggle('activeNode');

    node2.classList.remove('activeNode');
    node3.classList.remove('activeNode');
    node4.classList.remove('activeNode');
});
node2.addEventListener('click', () => {
    node2.classList.toggle('activeNode')

    node1.classList.remove('activeNode');
    node3.classList.remove('activeNode');
    node4.classList.remove('activeNode');
});
node3.addEventListener('click', () => {
    node3.classList.toggle('activeNode');

    node1.classList.remove('activeNode');
    node2.classList.remove('activeNode');
    node4.classList.remove('activeNode');
});
node4.addEventListener('click', () => {
    node4.classList.toggle('activeNode')

    node1.classList.remove('activeNode');
    node2.classList.remove('activeNode');
    node3.classList.remove('activeNode');
});

const selectedNoodle = () => {
    const activeNode = document.querySelector('.activeNode');
    if (!activeNode) {
        return null;
    }
    const activeNodeId = activeNode.id; 
    const activeNodeIndex = nodes.findIndex(node => node.id === activeNodeId);
    return activeNodeIndex !== -1 ? activeNodeIndex : null;
};

// asdkljasldjsakfjsladfjlkasdjflkjsdlkfjaslkjflkasjdlfkjaskld

const nodes = [
    { id: "node1", xInput: "x1", yInput: "y1" },
    { id: "node2", xInput: "x2", yInput: "y2" },
    { id: "node3", xInput: "x3", yInput: "y3" },
    { id: "node4", xInput: "x4", yInput: "y4" }
];

document.addEventListener("keydown", (event) => {
    const key = event.key;
    let selectedNode = nodes[selectedNoodle()];

    if (key === "w" || key === "W") {
        updateNodePositionBlock(selectedNode, 5);
    } else if (key === "s" || key === "S") {
        updateNodePositionBlock(selectedNode, -5);
    } else if (key === "a" || key === "A") {
        updateNodePositionInline(selectedNode, -5);
    } else if (key === "d" || key === "D") {
        updateNodePositionInline(selectedNode, 5);
    }
});

function updateNodePositionBlock(node, dy) {
    // Get current position
    const nodeElement = document.getElementById(node.id);
    const xInput = document.getElementById(node.xInput);
    const yInput = document.getElementById(node.yInput);

    // Update position
    let newY = 100 - parseFloat(nodeElement.getAttribute("cy")) + dy;

    // Update the SVG node position
    nodeElement.setAttribute("cy", newY);

    // Update the input fields
    yInput.value = newY;
}

function updateNodePositionInline(node, dx) {
    // Get current position
    const nodeElement = document.getElementById(node.id);
    const xInput = document.getElementById(node.xInput);

    // Update position
    let newX = parseFloat(nodeElement.getAttribute("cx")) + dx;

    // Update the SVG node position
    nodeElement.setAttribute("cx", newX);

    // Update the input fields
    xInput.value = newX;
}


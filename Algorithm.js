const rl = require("readline-sync");

// ===================== STACK IMPLEMENTATION ===================== //
class StackDemo {
    run() {
        let stack = [];

        const n = rl.questionInt("How many elements to push? ");

        for (let i = 0; i < n; i++) {
            let val = rl.questionInt(`Enter value ${i + 1}: `);
            stack.push(val);
        }

        console.log("Stack:", stack);

        if (stack.length > 0) {
            console.log("Popped:", stack.pop());
        }
        console.log("Stack Now:", stack);
    }
}


// ===================== QUEUE IMPLEMENTATION ===================== //
class QueueDemo {
    run() {
        let queue = [];

        const n = rl.questionInt("How many elements to enqueue? ");

        for (let i = 0; i < n; i++) {
            let val = rl.questionInt(`Enter value ${i + 1}: `);
            queue.push(val);
        }

        console.log("Queue:", queue);

        if (queue.length > 0) {
            console.log("Dequeued:", queue.shift());
        }

        console.log("Queue Now:", queue);
    }
}


// ===================== SORTING (BUBBLE + QUICK SORT) ===================== //
class SortingDemo {

    bubbleSort(arr) {
        let n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    let t = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = t;
                }
            }
        }
    }

    partition(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                let t = arr[i];
                arr[i] = arr[j];
                arr[j] = t;
            }
        }

        let t = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = t;

        return i + 1;
    }

    quickSort(arr, low, high) {
        if (low < high) {
            let pi = this.partition(arr, low, high);

            this.quickSort(arr, low, pi - 1);
            this.quickSort(arr, pi + 1, high);
        }
    }

    run() {
        const n = rl.questionInt("Enter array size: ");

        let arr = [];
        for (let i = 0; i < n; i++) {
            arr.push(rl.questionInt(`Enter number ${i + 1}: `));
        }

        let bubble = [...arr];
        let quick = [...arr];

        this.bubbleSort(bubble);
        this.quickSort(quick, 0, quick.length - 1);

        console.log("Bubble Sort Result:", bubble);
        console.log("QuickSort Result:", quick);
    }
}


// ===================== TREE + TRAVERSALS ===================== //
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}

class TreeDemo {
    constructor() {
        this.root = null;
    }

    insert(node, value) {
        if (value < node.data) {
            if (node.left === null) node.left = new Node(value);
            else this.insert(node.left, value);
        } else {
            if (node.right === null) node.right = new Node(value);
            else this.insert(node.right, value);
        }
    }

    inorder(n) {
        if (n) {
            this.inorder(n.left);
            process.stdout.write(n.data + " ");
            this.inorder(n.right);
        }
    }

    preorder(n) {
        if (n) {
            process.stdout.write(n.data + " ");
            this.preorder(n.left);
            this.preorder(n.right);
        }
    }

    postorder(n) {
        if (n) {
            this.postorder(n.left);
            this.postorder(n.right);
            process.stdout.write(n.data + " ");
        }
    }

    run() {
        const n = rl.questionInt("How many nodes to insert? ");

        for (let i = 0; i < n; i++) {
            let val = rl.questionInt(`Enter value ${i + 1}: `);

            if (this.root === null)
                this.root = new Node(val);
            else
                this.insert(this.root, val);
        }

        process.stdout.write("Inorder:   ");
        this.inorder(this.root);
        console.log();

        process.stdout.write("Preorder:  ");
        this.preorder(this.root);
        console.log();

        process.stdout.write("Postorder: ");
        this.postorder(this.root);
        console.log("\n");
    }
}


// ===================== GRAPH (USER INPUT) ===================== //
class Graph {
    constructor() {
        this.adj = new Map();
    }

    addEdge(u, v) {
        if (!this.adj.has(u)) this.adj.set(u, []);
        this.adj.get(u).push(v);
    }

    printGraph() {
        for (let [key, value] of this.adj.entries()) {
            console.log(`${key} -> ${value.join(", ")}`);
        }
    }
}

class GraphDemo {
    run() {
        const g = new Graph();

        const e = rl.questionInt("How many edges? ");

        for (let i = 0; i < e; i++) {
            let u = rl.questionInt(`Enter edge ${i + 1} (u): `);
            let v = rl.questionInt(`Enter edge ${i + 1} (v): `);

            g.addEdge(u, v);
        }

        console.log("Graph (Adjacency List):");
        g.printGraph();
    }
}


// ===================== MAIN MENU SYSTEM ===================== //
function main() {
    let choice;

    do {
        console.log("\n===== DATA STRUCTURES & ALGORITHMS DEMO =====");
        console.log("1. Stack");
        console.log("2. Queue");
        console.log("3. Sorting (Bubble + QuickSort)");
        console.log("4. Binary Tree Traversals");
        console.log("5. Graph (Adjacency List)");
        console.log("6. Exit");

        choice = rl.questionInt("Choose an option: ");

        switch (choice) {
            case 1: new StackDemo().run(); break;
            case 2: new QueueDemo().run(); break;
            case 3: new SortingDemo().run(); break;
            case 4: new TreeDemo().run(); break;
            case 5: new GraphDemo().run(); break;
            case 6: 
                console.log("Exiting...");
                break;
            default:
                console.log("Invalid choice!");
        }

    } while (choice !== 6);
}

main();

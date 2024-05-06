export class Node {

    #id
    #headline
    #note
    #children_ids
    #parent_id

    static #next_id = 1;
    static #all_nodes = [];
    static #tree;

    constructor (id, headline, note, children_ids, parent_id) {
        this.#id = id;
        this.#headline = headline;
        this.#note = note;
        this.#children_ids = children_ids;
        this.#parent_id = parent_id;
    }

    static create(data) {
        let id = Node.#next_id++;

        // if (data.children_ids == undefined){
        //     data.children_ids = [];
        // }
        // else{
        //     for (let child_id of data.children_ids){
        //         let child = Node.findByID(child_id);
        //         if (child){
        //             child.addParent(id);
        //         }
        //     }
        // }
        // if (id === 1){
        //     data.parent_id = [];
        // }
        // else{
        //     if (data.parent_id == undefined ){
        //     data.parent_id = [1];
        //     }
        //     else {
        //         data.parent_id = [data.parent_id];
        //     }

        // let parent = Node.findByID(data.parent_id);
        // if (parent) {
        //     parent.addChildren(id);
        // } 
        // }
        
            
        let n = new Node(id, data.headline, data.note, data.children_ids, data.parent_id);
        Node.#all_nodes.push(n);

        return n;
    
    }

    static getAllNodes() {
        // console.log("node.mjs", Node.#all_nodes);
        return Node.#all_nodes;

        // let tree = [];
        // let visited = new Array(Node.#all_nodes.length).fill(false);
        // let queue = [];

        // let root_id = 1; 
        // queue.push(root_id);
        // visited[root_id] = true;
        // // let count = 0;
        // // while (count ++ !== Node.#all_nodes.length) {
        // while (queue.length !== 0) {

        //     let curr_node_id = queue.shift();
        //     let curr_node = Node.findByID(curr_node_id);

        //     tree.push(curr_node_id);

        //     if (curr_node.#children_ids.length > 0){
        //         for (const child_id of curr_node.#children_ids || []) {
        //             if (!visited[child_id]) {
        //                 queue.push(child_id);
        //                 visited[child_id] = true;
        //             }
        //         }
        //     }
        // }
        // return tree; 
    }

    static getAllIDsByDepth(id, depth) {

        if (!this.tree) {
            this.tree = [];
        }
        let queue = [Node.#all_nodes.find((n) => n.getID() == id)];
        let level = 0;

        while (queue.length > 0 && level <= depth) {
            let currentLevelSize = queue.length;

            for (let i = 0; i < currentLevelSize; i++) {
            let currentNode = queue.shift();
            this.tree.push(currentNode.getID());

            for (const child_id of currentNode.#children_ids) {
                queue.push(Node.#all_nodes.find((n) => n.getID() == child_id));
            }
            }

            level++;
        }

        return this.tree;
        }
    

    static findByID(id) {
        return Node.#all_nodes.find((n) => n.getID() == id);
    }

    static findByIDByDepth(id, depth) {
        let node = Node.#all_nodes.find((n) => n.getID() == id)
        let children = [];
        
        if (depth == 0) {
            return { id: node.getID(), headline: node.getHeadline(), note: node.getNote(), children_ids: node.getChildren()};
        }

        for (const child_id of node.#children_ids) {
            let child = Node.findByIDByDepth(child_id, depth - 1);
            if (child) {
                children.push(child);
            } 
        }
        
        return { id: node.getID(), headline: node.getHeadline(), note: node.getNote(), children: children };
    }

    static findParents(id){
        let node = Node.#all_nodes.find((n) => n.getID() == id);
        return node.getParents();
    }

    static deleteNode(id){
        // let node = Node.#all_nodes.find((n) => n.getID() == id);
        // // let isCycle = false
        // // let cycle = [];
        // for (let child_id of node.getChildren()){
        //     let child = Node.#all_nodes.find((n) => n.getID() == child_id);
        //     // cycle.push(child_id);
        //     child.removeParent(id);
        // }
        // console.log(id);
        console.log(Node.#all_nodes);
        Node.#all_nodes = Node.#all_nodes.filter((n) => n.getID() != id);
        console.log(Node.#all_nodes);
    }

    json() {
        return{
            id: this.#id,
            headline: this.#headline,
            note: this.#note,
            children_ids: this.#children_ids,
            parent_id: this.#parent_id
        }
    }

    getID() {
        return this.#id;
    }

    getHeadline(){
        return this.#headline;
    }

    getNote(){
        return this.#note;
    }

    getChildren(){
        return this.#children_ids;
    }

    getParents(){
        return this.#parent_id;
    }

    setHeadline(new_headline) {
        this.#headline = new_headline;
    }
    setNote(new_note) {
        this.#note = new_note;
    }
    setChildren(new_children) {
        this.#children_ids = new_children;
    }
    addChildren(more_children){
        this.#children_ids.push(more_children);
    }
    addParent(new_parent){
        this.#parent_id.push(new_parent);
    }
    removeParent(id){
        this.#parent_id = this.#parent_id.filter((n) => n != id)
    }
    
}
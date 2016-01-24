export default class Todo {

    constructor(id, text, createdAt, completedAt) {
        this.id = id;
        this.text = text;
        this.createdAt = createdAt;
        this.completedAt = completedAt;
    }

    getId(){
        return this.id;
    }

    getText(){
        return this.text;
    }

    getCreatedAt(){
        return this.createdAt;
    }

    getCompletedAt(){
        return this.completedAt;
    }
}

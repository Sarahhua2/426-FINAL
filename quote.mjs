export class Quote {

    #id
    #text
    #author

    static #next_id = 1;
    static #all_quotes = [];


    constructor (id, text, author) {
        this.#id = id;
        this.#text = text;
        this.#author = author;
    }

    static create(data) {
        let id = Quote.#next_id++;

        let q = new Quote(id, data.text, data.author);
        Quote.#all_quotes.push(q);

        return q;
    }

    static getAllQuotes(){
        return Quote.#all_quotes;
    }

    static deleteQuote(id){
        console.log(Quote.#all_quotes);
        console.log(id);
        Quote.#all_quotes = Quote.#all_quotes.filter((q) => q.getID() != id);
        console.log(Quote.#all_quotes);
    }

    json() {
        return{
            id: this.#id,
            text: this.#text, 
            author: this.#author
        }
    }

    getID() {
        return this.#id;
    }
}

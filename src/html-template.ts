'use strict';

class HtmlTemplate {
    constructor(private author: string, private quote: string) { }

    render() {
        return `<p><q>${this.quote}</q>, ${this.author}</p>`
    }
}

export default HtmlTemplate
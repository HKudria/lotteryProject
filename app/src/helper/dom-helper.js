export default class DOMHelper {

    static wrapTextNodes(dom) {
        const body = dom.body;
        let textNodes = [];
        const findAllTextElement = (element) => {
            element.childNodes.forEach(node => {
                if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
                    textNodes.push(node)
                } else {
                    findAllTextElement(node)
                }
            })
        }

        findAllTextElement(body)

        textNodes.forEach((node, index) => {
            const wrapper = dom.createElement("text-editor");
            node.parentNode.replaceChild(wrapper, node);
            wrapper.appendChild(node);
            wrapper.setAttribute("nodeId", index);
        });

        return dom
    }

    static wrapImages(dom) {
        dom.body.querySelectorAll('img').forEach((img, index) => {
            img.setAttribute('editableimgid', index);
        })
        return dom
    }

    static unwrapImages(dom) {
        dom.body.querySelectorAll('[editableimgid]').forEach((img, index) => {
            img.removeAttribute('editableimgid');
        })
    }

    static unwrapTextNodes(dom){
        dom.body.querySelectorAll("text-editor").forEach(element => {
            element.parentNode.replaceChild(element.firstChild, element);
        })
    }

    static serializedDOMtoString(dom) {
        const serializer = new XMLSerializer();
        return serializer.serializeToString(dom);
    }

    static parseStrToDOM(str) {
        const parser = new DOMParser();
        return parser.parseFromString(str, "text/html");
    }
}
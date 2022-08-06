import "../../helper/iFrameLoader"
import axios from "axios";
import React, {Component} from "react";

export default class Editor extends Component {
    constructor() {
        super();
        this.currentPage = 'index.html';
        this.state = {
            pageList: [],
            newPageName: ""
        }
        this.createNewPage = this.createNewPage.bind(this)
    }

    componentDidMount() {
        this.init(this.currentPage);
    }

    init(page) {
        this.iframe = document.querySelector('iframe');
        this.open(page);
        this.loadPageList();
    }

    open(page){
        this.currentPage = `../${page}`;
        this.iframe.load(this.currentPage,()=>{
            const body = this.iframe.contentDocument.body;
            let textNodes = [];
            const findAllTextElement = (element) => {
                element.childNodes.forEach(node => {
                    if(node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length>0) {
                        textNodes.push(node)
                    } else {
                        findAllTextElement(node)
                    }
                })
            }

            findAllTextElement(body)

            textNodes.forEach(node => {
               const wrapper = this.iframe.contentDocument.createElement('text-editor');
               node.parentNode.replaceChild(wrapper, node);
               wrapper.appendChild(node);
               wrapper.contentEditable = "true";
            });

            }
        )
    }
    loadPageList(){
        axios
            .get("./api")
            .then(res => this.setState({pageList: res.data}))
    }

    createNewPage() {
        axios
            .post("./api/createNewPage.php", {"name": this.state.newPageName})
            .then(this.loadPageList())
            .catch(()=>{alert('page is exist!')});
    }

    deletePage(page){
        axios
            .post("./api/deletePage.php", {"name": page})
            .then(this.loadPageList())
            .catch(()=>{alert('page isn\'t exist!')});
    }

    render() {
        // const {pageList} = this.state;
        // const pages= pageList.map((page,key) => {
        //     return (
        //         <h1 key={key}>{page}
        //             <a href="#"
        //             onClick={() => this.deletePage(page)}>(x)</a>
        //         </h1>
        //     )
        // })
        return (
            <iframe src={this.currentPage} frameBorder="0"/>
            // <>
            //     <input
            //         onChange={(e)=> {this.setState({newPageName: e.target.value})}}
            //         type="text"/>
            //     <button onClick={this.createNewPage}>Create page</button>
            //     {pages}
            // </>
        );
    }

}
import "../../helper/iFrameLoader"
import DOMHelper from "../../helper/dom-helper";
import axios from "axios";
import React, {Component} from "react";
import EditorText from "../editor-text";
import UIkit from 'uikit';
import Spinner from "../spinner";
import ConfirmModal from "../confirm-modal";
import ChooseModal from "../choose-modal";

export default class Editor extends Component {
    constructor() {
        super();
        this.currentPage = 'index.html';
        this.state = {
            pageList: [],
            newPageName: "",
            loading: true
        }
        this.createNewPage = this.createNewPage.bind(this)
        this.isLoading = this.isLoading.bind(this);
        this.isLoaded = this.isLoaded.bind(this);
        this.save = this.save.bind(this);
        this.init = this.init.bind(this);
    }

    componentDidMount() {
        this.init(null, this.currentPage);
    }

    init(e, page) {
        if(e){
            e.preventDefault();
        }
        this.isLoading();
        this.iframe = document.querySelector('iframe');
        this.open(page, this.isLoaded);
        this.loadPageList();
    }

    open(page, cb) {
        this.currentPage = page;

        axios
            .get(`../${page}?rnd=${Math.random()}`)
            .then(res => DOMHelper.parseStrToDOM(res.data))
            .then(DOMHelper.wrapTextNodes)
            .then(dom => {
                this.virtualDom = dom;
                return dom;
            })
            .then(DOMHelper.serializedDOMtoString)
            .then(html => axios.post("./api/saveTempPage.php", {html}))
            .then(() => this.iframe.load("../gsdfetewtgg46643.html"))
            .then(() => axios.post("./api/deleteTempPage.php"))
            .then(() => this.enableEditing())
            .then(() => this.injectStyles())
            .then(cb);
    }

    save(onSuccess, onError) {
        this.isLoading()
        const newDom = this.virtualDom.cloneNode(this.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        const html = DOMHelper.serializedDOMtoString(newDom);
        axios
            .post("./api/savepage.php", {pageName: this.currentPage, html})
            .then(onSuccess)
            .catch(onError)
            .finally(this.isLoaded);
    }

    enableEditing() {
        this.iframe.contentDocument.body.querySelectorAll("text-editor").forEach(element => {
            const id = element.getAttribute("nodeid");
            const virtualElement = this.virtualDom.body.querySelector(`[nodeid="${id}"]`)
            new EditorText(element, virtualElement)
        });
    }

    injectStyles() {
        const style = this.iframe.contentDocument.createElement("style");
        style.innerHTML = `
            text-editor:hover {
                outline: 3px solid orange;
                outline-offset: 8px;
            }
            text-editor:focus {
                outline: 3px solid red;
                outline-offset: 8px;
            }
        `;
        this.iframe.contentDocument.head.appendChild(style);
    }


    loadPageList() {
        axios
            .get("./api/pageList.php")
            .then(res => this.setState({pageList: res.data}))
    }

    createNewPage() {
        axios
            .post("./api/createNewPage.php", {"name": this.state.newPageName})
            .then(this.loadPageList())
            .catch(() => {
                alert('page is exist!')
            });
    }

    deletePage(page) {
        axios
            .post("./api/deletePage.php", {"name": page})
            .then(this.loadPageList())
            .catch(() => {
                alert('page isn\'t exist!')
            });
    }

    isLoading() {
        this.setState({
            loading: true
        })
    }

    isLoaded() {
        this.setState({
            loading: false
        })
    }


    render() {
        const {loading, pageList} = this.state;
        let spinner;

        loading ? spinner = <Spinner active/> : spinner = <Spinner />

        return (
            <>
                <iframe src={this.currentPage} frameBorder="0"/>

                {spinner}

                <div className="panel">
                    <button className="uk-button uk-button-primary uk-margin-small-right" uk-toggle="target: #modal-open">Open</button>
                    <button className="uk-button uk-button-primary" uk-toggle="target: #modal-save">Save</button>
                </div>

                <ConfirmModal target={'modal-save'} method={this.save} />
                <ChooseModal target={'modal-open'} data={pageList} redirect={this.init}/>

            </>
        );
    }

}
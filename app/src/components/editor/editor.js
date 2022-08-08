import "../../helper/iFrameLoader"
import DOMHelper from "../../helper/dom-helper";
import axios from "axios";
import React, {Component} from "react";
import EditorText from "../editor-text";
import UIkit from 'uikit';
import Spinner from "../spinner";
import ConfirmModal from "../confirm-modal";
import ChooseModal from "../choose-modal";
import Panel from "../panel";
import EditorMeta from "../editor-meta";
import EditorImages from "../editor-images";
import Login from "../login";

export default class Editor extends Component {
    constructor() {
        super();
        this.currentPage = 'index.html';
        this.state = {
            pageList: [],
            backupsList: [],
            newPageName: "",
            loading: true,
            auth: false,
        }
        this.isLoading = this.isLoading.bind(this);
        this.isLoaded = this.isLoaded.bind(this);
        this.save = this.save.bind(this);
        this.init = this.init.bind(this);
        this.login = this.login.bind(this);
        this.restoreBackup = this.restoreBackup.bind(this);
    }

    componentDidMount() {
        this.checkAuth()

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.auth !== prevState.auth) {
            this.init(null, this.currentPage);
        }
    }

    checkAuth() {
        axios
            .get("./api/checkAuth.php")
            .then(res => {
                this.setState({
                    auth: res.data.auth
                })
            })
    }

    login(pass) {
        if (pass.length > 5) {
            axios
                .post("./api/login.php", {"password": pass})
                .then(res => {
                    this.setState({
                        auth: res.data.auth
                    })
                })
        }
    }

    init(e, page) {
        if (e) {
            e.preventDefault();
        }
        if (this.state.auth) {
            this.isLoading();
            this.iframe = document.querySelector('iframe');
            this.open(page, this.isLoaded);
            this.loadPageList();
            this.loadBackupList();
        }
    }

    open(page, cb) {
        this.currentPage = page;

        axios
            .get(`../${page}?rnd=${Math.random()}`)
            .then(res => DOMHelper.parseStrToDOM(res.data))
            .then(DOMHelper.wrapTextNodes)
            .then(DOMHelper.wrapImages)
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

        this.loadBackupList();
    }

    async save() {
        this.isLoading()
        const newDom = this.virtualDom.cloneNode(this.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        DOMHelper.unwrapImages(newDom);
        const html = DOMHelper.serializedDOMtoString(newDom);
        await axios
            .post("./api/savepage.php", {pageName: this.currentPage, html})
            .then(() => this.showNotification('Successful saved', 'success'))
            .catch(() => this.showNotification('Something was wrong. Please try again later or contact with IT specialist', 'danger'))
            .finally(this.isLoaded);

        this.loadBackupList();
    }

    enableEditing() {
        this.iframe.contentDocument.body.querySelectorAll("text-editor").forEach(element => {
            const id = element.getAttribute("nodeid");
            const virtualElement = this.virtualDom.body.querySelector(`[nodeid="${id}"]`)
            new EditorText(element, virtualElement)
        });

        this.iframe.contentDocument.body.querySelectorAll("[editableimgid]").forEach(element => {
            const id = element.getAttribute("editableimgid");
            const virtualElement = this.virtualDom.body.querySelector(`[editableimgid="${id}"]`)
            new EditorImages(element, virtualElement, this.isLoading, this.isLoaded, this.showNotification);
        });
    }

    injectStyles() {
        const style = this.iframe.contentDocument.createElement("style");
        style.innerHTML = `
            text-editor:hover {
                outline: 3px solid orange;
                outline-offset: 0px;
            }
            text-editor:focus {
                outline: 3px solid red;
                outline-offset: 0px;
            }
            [editableimgid]:hover {
                outline: 3px solid orange;
                outline-offset: 0px;
            }
            [editableimgid]:focus {
                outline: 3px solid red;
                outline-offset: 0px;
            }
            
        `;
        this.iframe.contentDocument.head.appendChild(style);
    }

    showNotification(message, status) {
        UIkit.notification({message, status});
    }


    loadPageList() {
        axios
            .get("./api/pageList.php")
            .then(res => this.setState({pageList: res.data}))
    }

    loadBackupList() {
        axios
            .get("./backups/backups.json")
            .then(res => this.setState({
                backupsList: res.data.filter(backup => {
                    return backup.page === this.currentPage
                })
            }))
    }

    restoreBackup(e, backup) {
        if (e) {
            e.preventDefault();
        }


        UIkit.modal.confirm("Do you really want to restore backup? All change will be deleted", {
            labels: {
                ok: 'Restore',
                cancel: 'Cancel'
            }
        }).then(() => {
            this.isLoading();
            return axios.post("./api/restoreBackup.php", {"page": this.currentPage, "file": backup})
        }).then(() => {
            this.open(this.currentPage, this.isLoaded)
        })
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
        const {loading, pageList, backupsList, auth} = this.state;
        let spinner;
        loading ? spinner = <Spinner active/> : spinner = <Spinner/>

        if (!auth) {
            return <Login login={this.login}/>
        }

        return (
            <>
                <iframe src="" frameBorder="0"/>
                <input id="imgUploader" type="file" accept="image/*" style={{display: 'none'}}/>
                {spinner}
                <Panel/>

                <ConfirmModal target={'modal-save'} method={this.save}/>
                <ChooseModal target={'modal-open'} data={pageList} redirect={this.init}/>
                <ChooseModal target={'modal-backup'} data={backupsList} redirect={this.restoreBackup}/>
                <EditorMeta target={'modal-meta'} virtualDom={this.virtualDom ? this.virtualDom : false}/>

            </>
        );
    }


}
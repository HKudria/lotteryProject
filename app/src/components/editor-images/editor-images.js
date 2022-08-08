import axios from "axios";
export default class EditorImages {
    constructor(element, virtualElement, ...[isLoading, isLoaded, showNotification]) {
        this.element = element;
        this.virtualElement = virtualElement;

        this.element.addEventListener('click', () => this.onClick());
        this.imgUploader = document.querySelector('#imgUploader');
        this.isLoading = isLoading;
        this.isLoaded = isLoaded;
        this.showNotification = showNotification;
    }

    onClick() {
        this.imgUploader.click();
        this.imgUploader.addEventListener('change', () => {
            if (this.imgUploader.files && this.imgUploader.files[0]) {
                let formData = new FormData();
                formData.append("image", this.imgUploader.files[0])
                this.isLoading();
                axios
                    .post('./api/uploadImage.php', formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then((res)=>{
                        this.virtualElement.src = this.element.src = `./img/${res.data.src}`;
                        this.showNotification('Successful uploaded', 'success')
                    })
                    .catch(() => this.showNotification('Something wrong', 'danger'))
                    .finally(()=>{
                        this.imgUploader.value = "";
                        this.isLoaded();
                    });

            }
        })
    }


}
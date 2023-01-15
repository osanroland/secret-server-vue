<template>
    <div class="showSecret">
        <h2>The message is:</h2>
        <p class="secretText"> {{ secretText }}</p>
        <p><strong>Remaining views: </strong> {{ remainingViews }}</p>
        <p><strong>Expires at: </strong> {{ expiresAt }}</p>
    </div>
</template>
<script>

const API_URL = `http://localhost:8000/secret/`
import axios from 'axios';

export default {
    props: ["hash"],
    
    data() {
        return {
            hash: this.hash,
            secretText: '',
            remainingViews: null,
            expiresAt: null
        }
    },
    created() {
        this.getSecret()
    },
    methods: {
        getSecret() {
            axios.get(API_URL + this.hash )
                .then((res) => {
                    console.log(res.data)
                    this.showMessage(res.data)
                })
                .catch((error) => {
                    let element = document.querySelector(".showSecret")
                    element.innerHTML = '<p class="expired">This secret is no longer available!</p>'
                }).finally(() => {
                    //Perform action in always
                });
        },
        showMessage(data) {
            this.secretText = data.secretText
            this.remainingViews = data.remainingViews
            this.expiresAt = data.expiresAt
        }
    }
};
</script>

<style>
h2{
    font-size: 24px;
}

.showSecret {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
}

.showSecret p {
    font-weight: 500;
}

p.expired {
    margin-top:3rem;
    font-size: 22px;
}
</style>
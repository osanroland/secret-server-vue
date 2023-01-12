<template>
    <h1>The message is: {{ secretText }}</h1>
    <p>Remaining views: {{ remainingViews }}</p>
    <p>Expires at: {{ expiresAt }}</p>
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
                    
                }).finally(() => {
                    //Perform action in always
                });
        },
        showMessage(data) {
            this.secretText = data.secretText
            this.remainingViews = data.remainingViews
            this.expiresAt = data.expires_at
        }
    }
};
</script>
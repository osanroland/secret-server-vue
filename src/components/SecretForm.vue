<script>

import axios from 'axios';

const API_URL = `http://localhost:8000/secret`
const SITE_URL = 'http://localhost:5173'
const PATH = 'secret'

export default {
    data() {
        return {
            form: {
                secretText: '',
                expireAfter: '',
                expireAfterViews: 1
                },
            createdLink: {
                url: '',
                visibility: 'hidden'
            }
        }
    },
    methods: {
        submitForm() {
            axios.post(API_URL, this.form)
                .then((res) => {
                    console.log(res.data)
                    this.createLink(res.data)
                    this.changeVisibility()
                    document.getElementById('linkToSecret').scrollIntoView()
            
                })
                .catch((error) => {
                    // error.response.status Check status code
                }).finally(() => {
                    //Perform action in always
                });
        },
        createLink(data) {
            const createdHash = data.hash
            const link = `${SITE_URL}/${PATH}/${createdHash}`
            this.createdLink.url = link
        },
        changeVisibility() {
            this.createdLink.visibility = this.createdLink.visibility == 'hidden' ? 'visible' : 'hidden'
        }
    }
}
</script>
<template>
    <h2 class="subtitle">Share your secrets</h2>
    <div class="secret-form">
        <form v-on:submit.prevent="submitForm">
            <div class="form-group">
                <label for="message" style="display:block">Your secret message: </label>
                <textarea id="message" v-model="form.secretText" placeholder="Write someting here" required>
                </textarea>
            </div>
            <div class="form-group inline">
                <div class="field-group-inline">
                    <label for="expiresAt">Expiry date: </label>
                    <input type="datetime-local" name="datetime" id="expiresAt" v-model="form.expireAfter" required/>
                </div>
                <div class="field-group-inline">
                    <label for="expireAfterViews">Will expire after views: </label>
                    <input type="number" id="expireAfterViews" v-model="form.expireAfterViews" required/>
                </div>
            </div>
            <div class="button">
                <button id="sendForm" type="submit">Create</button>
            </div>
        </form>
        
        <div id="linkToSecret" :class="createdLink.visibility">
            <h3>Your link is ready: </h3>
            <p>
                <a :href="createdLink.url">{{ this.createdLink.url }}</a>
            </p>
        </div>
    </div>
</template>

<style>
.hidden{
       display: none; 
    }

    .visible {
        display:block;
    }


    .secret-form {
        min-width: 50vw;
        max-width: 65vw;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group label {
        margin-bottom: 0.5rem;
        font-weight: 500;
        font-size: 16px;

    }

    .form-group.inline {
        display: flex;
        justify-content: space-between;
    }

    .field-group-inline {
        display: inline-block;
    }

    #message {
        width: 100%;
        max-width: 100%;
        font-family: inherit;
        height: 20vh;
        padding: 0.5rem;
        border:unset!important;

    }

    #expiresAt{
        border:none;
        height: 2rem;
        font-family: inherit;
        font-size: 14px;
        padding: 0.5rem;
        border-radius: 5px;
    }

    #expireAfterViews {
        height: 2rem;
        font-family: inherit;
        font-size: 14px;
        padding: 0.5rem;
        border-radius: 5px;
        border: none;
    }

    .button {
        margin: 0 auto;
        max-width: fit-content;
        margin-top: 3rem;
    }

    button#sendForm {
        border: 1px solid var(--color-btn-gr);
        background: var(--color-btn-gr);
        width: 120px;
        height: 40px;
        border-radius: 5px;
        color: white;
        font-size: 16px;
        font-weight: 700;  
        transition: 0.5s;
    }
    button#sendForm:hover {
        cursor: pointer;
        background: var(--color-btn-hvr);
        color: white;
    }

    textarea:focus-visible,
    input:focus-visible {
        outline: var(--color-btn-gr) auto 1px;
    }

    h2.subtitle {
        font-size: 28px;
        font-family: inherit;
        font-weight: 600;
        text-shadow: 4px 4px 5px rgba(0, 0, 0, 0.41);
        margin-bottom: 2.5rem
    }

    #linkToSecret {
        margin-top: 3rem;
        text-align: center;
        padding: 1rem;
        border: 1px solid var(--color-btn-gr);
        border-radius: 5px;
    }

    #linkToSecret h3 {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 0.5rem
    }

    #linkToSecret p{
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
    }
</style>
    



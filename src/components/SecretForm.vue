<script>

import axios from 'axios';

const API_URL = `http://localhost:8000/secret`
const SITE_URL = 'http://localhost:5173'
const PATH = 'secret'

export default {
    data() {
        return {
            form: {
                secretText: 'Write someting here',
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
    <form v-on:submit.prevent="submitForm">
        <div class="form-group">
            <label for="message">Your secret message: </label>
            <textarea id="message" v-model="form.secretText">
                    Write something here
                </textarea>
            {{ form.secretText }}
        </div>
        <div class="form-group">
            <label for="expiresAt">Expiriity date: </label>
            <input type="datetime-local" name="datetime" id="expiresAt" v-model="form.expireAfter" />
            {{ form.expireAfter }}
        </div>
        <div class="form-group">
            <label for="expireAfterViews">Number of times it can be read: </label>
            <input type="number" id="expireAfterViews" v-model="form.expireAfterViews" />
            {{ form.expireAfterViews }}
        </div>
        <button id="sendForm" type="submit">Create</button>
    </form>

    <div id="linkToSecret" :class="createdLink.visibility">
        <h3>Your link is ready: </h3>
        <p>
            <a :href="createdLink.url">{{ this.createdLink.url }}</a>
        </p>
    </div>
    
</template>

<style>
    .hidden{
       display: none; 
    }

    .visible {
        display:block;
    }
</style>
    



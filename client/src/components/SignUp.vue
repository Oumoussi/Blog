
<template>
    <header class="bg-gray-800 text-white body-font shadow w-full">
        <img class="logo" alt="Vue logo" src="../assets/logo.png" @click="home">
    </header>
    <div style="height: 30px;"></div>
    <div class="register-container">
        <div class="register-form">
            <form @submit.prevent="register">
                <div class="signup-redirect">
                Already have  an account? <a href="SignIn">SignIn</a>
                </div>
                <div class="divider"></div>
                <h2>Sign Up</h2>
                <div class="input-group">
                <label>Last name</label>
                <input type="Text" placeholder="Enter your last name" v-model="lastname" required>
                </div>
                <div class="input-group">
                <label>First name</label>
                <input type="Text" placeholder="Enter your first name" v-model="firstname" required>
                </div>
                <div class="input-group">
                <label>Birthday</label>
                <input type="date" v-model="birthday" required>
                </div>
                <div class="input-group">
                <label>E-mail adress</label>
                <input type="email" placeholder="Enter your email" v-model="email" required>
                </div>
                <div class="input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" v-model="password" required>
                </div>
                <button type="submit" >Sign Up</button>
            </form>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    import eventBus from '../services/eventBus';
    export default{
        data () {
            return {
            lastname: '',
            firstname: '',
            birthday: '',
            email: '',
            password: '',
            error: null
            }
        },
        methods: {

            async register () {
                const user = {
                    email: this.email,
                    password: this.password,
                };
                console.log(this.birthday)
                const author = {
                    lastname: this.lastname,
                    firstname: this.firstname,
                    birthday: this.birthday,
                };
                axios.post('http://localhost:8081/register', {user, author})
                    .then(response => {
                    this.$router.push({ name: 'Dashboard' });
                    eventBus.emit('show-toast', response.data);
                    this.lastname= '',
                    this.firstname= '',
                    this.birthday= '',
                    this.email = '';
                    this.password = '';
                    })
                    .catch(error => {
                    console.error(error);
                    alert('An error occurred during registration.');
                    });
            },
            home () {
              this.$router.push({ name: 'Dashboard' });
            },

        },
        created () {
            document.title = "SignUp";
        }
    }

</script>

<style>
    img {
        margin: auto auto;
        width: 60px;
        padding-bottom: 5px;
        cursor: pointer;
    }
    .register-container {
        max-width: 340px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: #fff;
    }

    .register-form h2 {
        text-align: center;
        margin-bottom: 20px;
        font-family: 'Times New Roman';
        font-size: 30px;
        font-weight: bolder;
    }

    .input-group {
        margin-bottom: 20px;
    }

    .input-group label {
        display: block;
        margin-bottom: 5px;
    }

    .input-group input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family:   Tahoma;
    }

    .register button{
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 8px;
        transition-duration: 0.4s;
    }
    .register label {
        display: block;
        margin-bottom: 5px;
        color: #333333;
        font-size: 14px;
        font-weight: bold;
    }
    .register button:hover {
        background-color: cyan;
        color: black;
    }
    button[type="submit"] {
        width: 100%;
        padding: 12px 20px;
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
        background-color: #28a745;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease;
    }

    button[type="submit"]:hover {
        background-color: #218838;
    }

    button[type="submit"]:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.5);
    }


    .divider {
        border-top: 1px solid #ccc;
        text-align: center;
        line-height: 0.1em;
        margin: 20px 0;
    }

    .divider:before {
        content: "";
        background: #fff;
        position: relative;
        top: -10px;
        padding-right: 10px;
    }

    .teachable-login {
        background-color: #55acee;
    }

    .teachable-login:hover {
        background-color: #3b88c3;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0;
    }

    .toast {
        position: fixed;
        right: 20px;
        bottom: 20px;
        background-color: #333;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1000;
    }
</style>
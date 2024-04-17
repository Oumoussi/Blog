
<template>
    <header class="bg-gray-800 text-white body-font shadow w-full">
        <img class="logo" alt="Vue logo" src="../assets/logo.png" @click="home">
    </header>
    <div style="height: 30px;"></div>
    <div class="login-container">
        <div class="login-form">
            <h2>Log in</h2>
            <form @submit.prevent="login">
                <div class="input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" v-model="email" required>
                </div>
                <div class="input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" v-model="password" required>
                </div>
                <div class="remember-forgot">
                <label><input type="checkbox" v-model="remember"> Remember Me</label>
                <a href="#">Forgot Password</a>
                </div>
                <button type="submit" >Log In</button>
                <div class="divider"></div>
                <div class="signup-redirect">
                Need an account? <a href="SignUp">Sign Up</a>
                </div>
            </form>
        </div>
  </div>
</template>

<script>
    import axios from 'axios';
    export default{
        data () {
            return {
                users: [],
                loggedIn: false,
                userName: '',
                error: null
            }
        },
        methods: {
            async login () {
                axios.post('http://localhost:8081/login', {
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                        localStorage.setItem('loggedIn', 'true');
                        localStorage.setItem('userName', response.data.username);
                        this.$router.push({ name: 'Dashboard' });
                        this.email = '';
                        this.password = '';
                    })
                    .catch(error => {
                        if (error.response) {
                            if (error.response.status === 404) {
                                this.error = "User not found. Please check your credentials.";
                            } else if (error.response.status === 401) {
                                this.error = "Incorrect password. Please try again.";
                            } else {
                                this.error = "An unexpected error occurred. Please try again later.";
                            }
                        } else if (error.request) {
                            this.error = "No response from the server. Please check your network connection.";
                        } else {
                            this.error = "An error occurred. Please try again.";
                        }
                        alert(this.error);
                    });

            },
            home () {
              this.$router.push({ name: 'Dashboard' });
            },

        },
        created () {
            document.title = "SignIn";
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


    .login-container {
        max-width: 340px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: #fff;
    }

    .login-form h2 {
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
        font-family:   Tahoma;
    }

    .input-group input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .remember-forgot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .remember-forgot a {
        text-decoration: none;
        color: #007bff;
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

    .signup-redirect {
        text-align: center;
    }

    .signup-redirect a {
        text-decoration: none;
        color: #007bff;
    }
</style>
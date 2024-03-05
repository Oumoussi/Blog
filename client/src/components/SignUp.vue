
<template>
    <img class="logo" alt="Vue logo" src="../assets/logo.png">
    <h1>SignUp</h1>
    <div class="register">
        <input type="email" placeholder="Entrez votre e-mail" v-model="email">
        <input type="password" placeholder="Entrez votre mot de passe" v-model="password">
        <button @click="register">S'enregistrer</button>
    </div>
</template>

<script>
    import AuthenticationService from '@/services/AuthenticationService'
    export default{
        data () {
            return {
            email: '',
            password: '',
            error: null
            }
        },
        methods: {
            async register () {
                try {
                    const response = await AuthenticationService.register({
                    email: this.email,
                    password: this.password
                    })
                    console.log(response.data)
                
                } catch (error) {
                    this.error = error.response.data.error
                }
            }
        }
    }

</script>

<style>
    .logo{
        width: 100px;
    }

    .register input {
        padding: 10px; 
        margin: auto auto; 
        margin-bottom: 20px; 
        display: inline-block; 
        border: 1px solid #ccc;
        border-radius: 4px; 
        box-sizing: border-box; 
        width: 25%; 
        display: block;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
        transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out; 
    }

    .register input:focus {
        border-color: #4CAF50; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); 
        outline: none; 
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
    .register button:hover {
        background-color: cyan; 
        color: black; 
    }
</style>@/services/Register
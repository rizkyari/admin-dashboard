import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

export function useLogin() {
    const router = useRouter();
    const auth = useAuthStore();

    const email = ref('');
    const password = ref('');
    const error = ref('');

    const handleLogin = async () => {
        error.value = '';
        console.log(email.value, password.value);
        
        try {
            await auth.login(email.value, password.value);
            router.push('/dashboard')
        } catch (err) {
            error.value = 'Login Failed'
        }
    };

    return {
        email,
        password,
        error,
        handleLogin,
    }
}
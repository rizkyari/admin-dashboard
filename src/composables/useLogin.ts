import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

export function useLogin() {
    const router = useRouter();
    const auth = useAuthStore();

    const email = ref('');
    const password = ref('');
    const error = ref('');
    const loading = ref(false);

    const handleLogin = async () => {
        error.value = '';
        loading.value = true;
        
        try {
            await auth.login(email.value, password.value);
            router.push('/dashboard')
        } catch (err) {
            error.value = 'Login Failed'
        } finally {
            loading.value = false;
        }
    };

    return {
        email,
        password,
        error,
        loading,
        handleLogin,
    }
}
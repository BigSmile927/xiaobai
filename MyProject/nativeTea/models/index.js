export default {
    namespace: 'user',
    state: {
        name: '',
        email: '',
        login: false
    },
    effects: {

    },
    reducers: {
        save(state, { payload }) {
            const { name, email, login } = payload
            return { ...state, name, email, login }
        }
    },
};
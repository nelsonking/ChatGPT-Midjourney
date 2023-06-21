class sessionService {
    /**
     * 是否已登录
     */
    authenticated = () => {
        return !!localStorage.getItem('admin_session');
    };
}

export default new sessionService();

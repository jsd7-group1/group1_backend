class UnAuthorizeError extends Error {
    constructor(message) {
      super(message);
      this.status = 401;
      this.name = 'UnAuthenticateError';
    }
  }

  export default UnAuthorizeError;
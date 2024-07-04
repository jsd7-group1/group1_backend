class BadRequestError extends Error {
    constructor(message) {
      super(message);
      this.name = 'BadRequestError';
      this.status = 400;
    }
  }
  
  export default BadRequestError;
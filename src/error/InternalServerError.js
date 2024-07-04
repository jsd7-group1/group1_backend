class InternalServerError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InternalServerError';
      this.status = 500;
    }
  }
  
  export default InternalServerError;
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.status = 400;
  }
<<<<<<< HEAD

  export default BadRequestError;
=======
}

export default BadRequestError;
>>>>>>> 67db2636671da71fb7d8c90328769f4c2aa2a04d

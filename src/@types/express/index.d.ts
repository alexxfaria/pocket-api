declare namespace Express {
  export interface Request {
    partners: {
      id: string;
    };
    user_id: string;
  }
}

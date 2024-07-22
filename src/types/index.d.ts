export interface user {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: user;
    }
  }
}

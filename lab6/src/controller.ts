import { Request, Response, NextFunction } from "express";
import { Game } from './interfaces/game';
import { users_db, games_db } from './db.mock';

export const default_controller = (_: Request, res: Response) => res.render("index.ejs");

export const set_headers = (_: Request, res: Response, next: NextFunction) => {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Origin", "*");
  next();
}

export const games = (req: Request, res: Response) => {
  let age: number;
  let games: Game[] = [];
  let error: string | null = null;

  try {
    age = parseInt(req.query.age as string);
    games = games_db.filter(game => game.age <= age);
  } catch (err) {
    console.log(err);
  }

  if (games.length === 0) {
    error = "Bad query!";
  }

  res.render("games.ejs", { games, error });
}

export const personal = (req: Request, res: Response) => {
  let metainfo: any = { isAuth: false };

  const login: string = req.session!.login;
  const password = req.session!.pass;

  if (login && password) {
    metainfo.isAuth = true;
    metainfo.user = users_db.find(user => user.login === login && user.pass === password);
  }

  if (req.error)
    metainfo.error = req.error;

  if (!metainfo.error)
    metainfo.error = false;

  res.render("personal.ejs", metainfo);
}

export const login = (req: Request, res: Response) => {
  const login = req.body.login;
  const password = req.body.pass;

  if (!login && !password)
    req.error = "No login or password";
  else {
    if (users_db.find(user => user.login === login && user.pass === password)) {
      req.session!.login = req.body.login;
      req.session!.pass = req.body.pass;
    } else {
      req.error = "No such user in database";
    }
  }

  personal(req, res);
}

export const exit = (req: Request, res: Response) => {
  req.session = null;
  res.redirect("/personal");
}

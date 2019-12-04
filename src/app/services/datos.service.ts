import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  db: SQLiteObject;
  isOpen = false;

  constructor(public storage: SQLite) {
    if (!this.isOpen) {
      this.storage = new SQLite();
      const conn = this.storage.create({ name: "data.db", location: "default" });
      if (conn != null) {
        conn.then(
          (db: SQLiteObject) => {
            this.db = db;
            this.isOpen = true;
          });
      }
    }
  }

  CreateUser(identification: number, name: string, lastname: string) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO users (identification, name, lastname) VALUES (?, ?, ?)";
      this.db.executeSql(sql, [identification, name, lastname]).then(
        (data) => { resolve(data); },
        (error) => {
          reject(error);
        });
    });
  }

  GetAllUsers() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM users", []).then((data) => {
        let arrayUsers = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayUsers.push({
              id: data.rows.item(i).id,
              identification: data.rows.item(i).identification,
              name: data.rows.item(i).name,
              lastname: data.rows.item(i).lastname
            });
          }
        }
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      })
    })
  }

}

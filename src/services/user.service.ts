import { UserModel } from "../models/user.model"



export class UserService { 


    static getUsers(): UserModel[] {
        if (!localStorage.getItem('users')) {
            const arr: UserModel[] = [
                {
                    id: '1',
                    username: 'admin',
                    password: 'admin123',
                    firstName: 'User',
                    lastName: 'User',
                    email: 'user@example.com',
                    phone: '+3816123456789',
                    address: 'Example Street 1, City',
                    favoriteGenres: ['Action', 'Comedy'],
                    cart: []
                }
            ]
            localStorage.setItem('users', JSON.stringify(arr))
        }
        return JSON.parse(localStorage.getItem('users')!)
    }

    static getActiveUser(): UserModel | null {
        if (!localStorage.getItem('active'))
            return null
        for (let user of this.getUsers()) {
            if (user.username == localStorage.getItem('active')) {
                return user
            }
        }
        return null
    }

     static createUser(model: UserModel) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.username === model.username)
                return false
        }

        users.push(model)
        localStorage.setItem('users', JSON.stringify(users))
        return true
    }

    static login(username: string, password: string): boolean {
        console.log('Attempting to log in with username:', username, 'and password:', password)
        for (let user of this.getUsers()) {
            console.log('Checking user:', user)
            if (user.username == username && user.password == password) {
                console.log('User found:', user)
                localStorage.setItem('active', user.username)
                return true
            }
        }
        return false
    }
    
    static updateUser(user: any): boolean {
      const users = this.getUsers();
      const index = users.findIndex(u => u.id === user.id);
      
      if (index === -1) return false;
      
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users));
      
      if (localStorage.getItem('active') === user.username) {
        localStorage.setItem('active', user.username);
      }
      
      return true;
    }

    getUserById(id: string): UserModel | null {
        const users = UserService.getUsers();
        return users.find(user => user.id === id) || null;
    }


}
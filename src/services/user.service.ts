import { UserModel } from "../models/user.model"



export class UserService { 


    static retrieveUsers(): UserModel[] {
        if (!localStorage.getItem('users')) {
            const arr: UserModel[] = [
                {
                    id: '1',
                    username: 'admin',
                    password: 'admin123',
                    firstName: 'Admin',
                    lastName: 'User',
                    email: 'admin@example.com',
                    phone: '+3816123456789',
                    address: 'Example Street 1, City',
                    favoriteGenres: ['Action', 'Comedy'],
                }
            ]
            localStorage.setItem('users', JSON.stringify(arr))
        }
        return JSON.parse(localStorage.getItem('users')!)
    }

        static getActiveUser(): UserModel | null {
        if (!localStorage.getItem('active'))
            return null

        for (let user of this.retrieveUsers()) {
            if (user.email == localStorage.getItem('active')) {
                return user
            }
        }

        return null
    }

    static login(email: string, password: string): boolean {
        for (let user of this.retrieveUsers()) {
            if (user.email == email && user.password == password) {
                localStorage.setItem('active', user.email)
                return true
            }
        }
        return false
    }


}
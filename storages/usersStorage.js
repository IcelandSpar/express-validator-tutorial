// storages/usersStorage.js
// This class lets us simulate interacting with a database.
class UsersStorage {
    constructor() {
      this.storage = {};
      this.id = 0;
    }
  
    addUser({ firstName, lastName, email, age, bio }) {
      const id = this.id;
      this.storage[id] = { id, firstName, lastName, email, age, bio };
      this.id++;
    }
  
    getUsers() {
      return Object.values(this.storage);
    }
  
    getUser(id) {
      return this.storage[id];
    }
  
    updateUser(id, { firstName, lastName, email, age, bio }) {
      this.storage[id] = { id, firstName, lastName, email, age, bio };
    }
  
    deleteUser(id) {
      delete this.storage[id];
    }

    getName(name) {
        let arrOfObjVals = Object.values(this.storage);
        let matchingResult = [];
        let parsedName = name.toLowerCase().trim().replace(/\s/g,'');

        arrOfObjVals.forEach(element => {
            let parsedString = (element.firstName + element.lastName).toLowerCase().trim().replace(/\s/g,'');
            console.log(parsedString, parsedName)
            if(parsedString.includes(parsedName)) {
                matchingResult.push(element);
            }
        });

        return matchingResult
    }
  }
  // Rather than exporting the class, we can export an instance of the class by instantiating it.
  // This ensures only one instance of this class can exist, also known as the "singleton" pattern.
  module.exports = new UsersStorage();
  
import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp } from '../firebaseAuth/component';
import { map, toJS } from 'mobx';

export class Todos {
    @observable todos = map({});

    constructor() {
        
        _firebaseApp.database().ref('todos').on('value', (snapshot) => {
            this.todos = snapshot.val();
        });
    }

    @computed get json() {
        const x =  toJS(this.todos);
        return x;
    }

    @action("Add new Item to Firebase")
    add = (name) => {
        const id = _firebaseApp.database().ref('todos').push().key;
        this.update(id, name);
    };

    @action("Update an existing item in Firebase")
    update = (id, name) => {
        _firebaseApp.database().ref('todos').update({[id]: {name}})
    };

    @action("Delete an item from Firebase")
    del = (id) => {
        _firebaseApp.database().ref('todos').child(id).remove();
    };
}

const todos = new Todos();
export {todos};

import {observable, action, IObservableArray, computed} from 'mobx';
import { FirebaseRef } from '../../firebase/firebase';
import { map, toJS } from 'mobx';

export class Todos {
    @observable todos = map({});

    constructor() {

        FirebaseRef.todos.on('value', (snapshot) => {
            this.todos = snapshot.val();
        });

        this.add('Gabor');
        this.add('Eric');
        this.add('Zoltan');
        this.add('Liana');
        this.add('Zsuzsanna');

    }

    @computed get json() {
        return toJS(this.todos);
    }

    @action("Add new Item to Firebase")
    add = (name) => {
        const id = FirebaseRef.todos.push().key;
        this.update(id, name);
    };

    @action("Update an existing item in Firebase")
    update = (id, name) => {
        FirebaseRef.todos.update({[id]: {name}})
    };

    @action("Delete an item from Firebase")
    del = (id) => {
        FirebaseRef.todos.child(id).remove();
    };
}

const todos = new Todos();
export {todos};

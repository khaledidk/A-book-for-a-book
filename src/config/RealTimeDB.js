
import { async } from "@firebase/util";

import { DBReal } from "./firebase";

import { getDatabase, set, ref, child, push, update } from "firebase/database";

export function CreatNewUser(email, password) {
    const newkey = push(child(ref(DBReal), 'users')).key;
    set(ref(DBReal, 'users/' + newkey), {

        email: email,
        password: password
    });
}

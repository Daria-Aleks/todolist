import { userReducer } from "./user-reducer";

test('should + age', () => {
    const startState = {age: 20, childrenCount: 2, name: "Daria"};

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2)
});

test('should + children', ()=> {
    const startState = {age: 20, childrenCount: 2, name: "Daria"}
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20);
})

test('should change name', () => {
    const startState = {name: "Daria", age: 20, childrenCount: 2};
    const endState = userReducer(startState, {type: 'CHANGE-NAME'});
    expect(endState.name).toBe('newName');
})
// 45:00

type ActionType = {
    type: string
    [key: string] :any
}


export const todolistReducer = (action: ActionType) :  => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState = {...state}
            newState.age = state.age + 1;
            return newState;
            
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case 'CHANGE-NAME':
            return{
                ...state,
                name: 'newName'
            }
        
        default:
            throw new Error("I do not understand this action type");
    }
}
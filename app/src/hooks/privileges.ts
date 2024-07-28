import {useAuthProvider} from "../providers/authProvider";
 const usePermissions=()=>{
    const {user}=useAuthProvider();
    
    const validate=(permissions=[])=>{
        return permissions.every(permission=>user.permissions.includes(permission));
    }
    return {
        validate
    }
}
export default usePermissions;
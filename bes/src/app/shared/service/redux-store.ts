
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../setup';
import { UserModel } from '../../modules/auth/models/UserModel';

export const GetLoginUser = () => {
    const user: UserModel = useSelector<RootState>(({ auth }) => 
        auth.user, shallowEqual) as UserModel;
    return user
}
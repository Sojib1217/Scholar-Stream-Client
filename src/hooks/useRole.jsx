import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';

import useAxios from './useAxios';

const useRole = () => {
    const { user } = useAuth()
    const axios=useAxios()
    const { isLoading:roleLoading, data:role } = useQuery({
        queryKey: ['user-email', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/users/${user.email}/role`)
            return res.data.role
        } 
    })
    return { role, roleLoading }
};

export default useRole;
import axios from 'axios';
import { useState }  from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useUserData = () => {
    const [unsubscribeStatus, setUnsubscribeStatus] = useState('emailUnsubscribe');
    const [loader, setLoader] = useState(false);
    const { query } = useRouter();

    const handleSubscription = async (type, status) => {
        try{
            setLoader(true);
            const response =  await axios({ method: 'post', url: '/users',data:
                {
                    'type': type,
                    'email': query?.email ?? ''
                }
            });
            if(response?.data?.message === 'ok'){
                setUnsubscribeStatus(status);
            }
        }
        catch(err){
            // Handle Error
        }finally{
            setLoader(false);
        }
    };

    const onSubscribe = (status) => handleSubscription('subscribe', status);

    const onUnsubscribe = (status) => handleSubscription('unsubscribe', status);

    const getUserByEmail =async (email) => {
        setLoader(true);
        try{
            const response =  await axios({ method: 'get', url: '/api/subscription/users/?email='+ email, });
            if(response.data && response.data?.consents?.email?.marketing === false){
                setUnsubscribeStatus('unsubscribe');
            }
        }catch(err){
            // Handle Error
        }
        finally{
            setLoader(false);
        }
    };


    useEffect(() => {
        if(query?.email) getUserByEmail(query?.email);
    }, [query?.email]);

    return {
        unsubscribeStatus,
        setUnsubscribeStatus,
        onSubscribe,
        onUnsubscribe,
        loader
    };
};

export default useUserData;
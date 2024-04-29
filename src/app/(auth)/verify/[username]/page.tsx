import { useToast } from '@/components/ui/use-toast';
import { signUpSchema } from '@/schemas/signUpSchema';
import { verifySchema } from '@/schemas/verifySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';

function VerifyAccount() {
    const router = useRouter();
    const params = useParams<{username: string}>();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
          username: '',
          email: '',
          password: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            await axios.post('/api/verify-code',{
                
            })
        } catch(error) {

        }
    }
    return (
        <div>
        
        </div>
    )
}

export default VerifyAccount

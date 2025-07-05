import { useState } from 'react';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from '@/components/ui/card';

export default function postCard(){

    

    return(
        <div>
            <Card>
                <CardHeader>
                    <CardTitle></CardTitle>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter></CardFooter>
            </Card>
        </div>
    )
}

'use client';


// import { FormProvider, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';

import {
  CheckoutSidebar,
  Container,
  Title,
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  WhiteBlock,
  CheckoutItemDetails,
  CheckoutItem,
} from '@/shared/components/shared';
import { Button, Input, Textarea } from '@/shared/components/ui';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
// import { CheckoutFormValues, checkoutFormSchema } from '@/shared/constants';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
// import { createOrder } from '@/app/actions';
// import toast from 'react-hot-toast';
import React from 'react';
// import { useSession } from 'next-auth/react';
// import { Api } from '@/shared/services/api-client';

const VAT = 25;
const DELIVERY_PRICE = 450;

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
//   const { data: session } = useSession();

//   const form = useForm<CheckoutFormValues>({
//     resolver: zodResolver(checkoutFormSchema),
//     defaultValues: {
//       email: '',
//       firstName: '',
//       lastName: '',
//       phone: '',
//       address: '',
//       comment: '',
//     },
//   });

//   React.useEffect(() => {
//     async function fetchUserInfo() {
//       const data = await Api.auth.getMe();
//       const [firstName, lastName] = data.fullName.split(' ');

//       form.setValue('firstName', firstName);
//       form.setValue('lastName', lastName);
//       form.setValue('email', data.email);
//     }

//     if (session) {
//       fetchUserInfo();
//     }
//   }, [session]);

//   const onSubmit = async (data: CheckoutFormValues) => {
//     try {
//       setSubmitting(true);

//       const url = await createOrder(data);

//       toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
//         icon: '✅',
//       });

//       if (url) {
//         location.href = url;
//       }
//     } catch (err) {
//       console.log(err);
//       setSubmitting(false);
//       toast.error('Не удалось создать заказ', {
//         icon: '❌',
//       });
//     }
//   };

  // TODO  move this function to useCart hook. And use it from useCart here and in CartDrawer
  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

      {/* <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}> */}
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-20">

                <WhiteBlock title='1. Cart'>
                  <div className="flex flex-col gap-5">
                    {
                      items.map((item) => (
                        <CheckoutItem 
                          key={item.id}
                          id={item.id} 
                          imageUrl={item.imageUrl} 
                          details={
                            getCartItemDetails(
                              item.ingredients,
                              item.pizzaType as PizzaType,
                              item.pizzaSize as PizzaSize,
                          )
                          } 
                          name={item.name} 
                          price={item.price} 
                          quantity={item.quantity} 
                          disabled={item.disabled}
                          onClickCountButton={(type) =>
                            onClickCountButton(item.id, item.quantity, type)
                          }
                          onClickRemove={() => removeCartItem(item.id)}
                        />
                      ))
                    }
                  </div>
                </WhiteBlock>

                <WhiteBlock title='2. Personal info'>
                  <div className="grid grid-cols-2 gap-5">
                    <Input name="firstName" className="text-base" placeholder="Name" />
                    <Input name="firstName" className="text-base" placeholder="Name" />
                    <Input name="firstName" className="text-base" placeholder="Name" />
                    <Input name="firstName" className="text-base" placeholder="Name" />
                  </div>
                </WhiteBlock>

                <WhiteBlock title='3. Delivery address'>
                  <div className="flex flex-col gap-5">
                    <Input name="firstName" className="text-base" placeholder="Address" />
                    <Textarea 
                      className="text-base" 
                      rows={5} 
                      placeholder="Coments to the order" 
                    />
                  </div>
                </WhiteBlock>
                
              {/* <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

              <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} /> */}
            </div>

            {/* Правая часть */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        {/* </form>
      </FormProvider> */}
    </Container>
  );
}
import axios from '@/api/axios';
import type { User } from '@/types/types';

type createUserProfileArgs = Pick<User, 'userName' | 'email' | 'photoURL'>;

export const createUserProfile = async (newUser: createUserProfileArgs) => {
  try {
    console.log(newUser);

    const {
      data: { _id },
    } = await axios.post('/users', newUser);

    await axios.post('/cart', {
      userId: _id,
      products: [],
    });

    // await axios.post('/wishlist', {
    //   userId: _id,
    //   products: [],
    // });
  } catch (error) {
    console.error(error);
  }
};

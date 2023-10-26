import axios from '@/api/axios';

export const createUserProfile = async (newUser: {
  email: string;
  userName: string;
}) => {
  try {
    const {
      data: { _id },
    } = await axios.post('/users', newUser);

    // await axios.post('/cart', {
    //   userId: _id,
    //   products: [],
    // });

    // await axios.post('/wishlist', {
    //   userId: _id,
    //   products: [],
    // });
  } catch (error) {
    console.error(error);
  }
};

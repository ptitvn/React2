export interface User {
  id: number;
  userName: string;
  gender: string;
  dateBirth: string;
  address: string;
}

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [
    {
      id: 1,
      userName: 'Nguyễn Văn A',
      gender: 'Nam',
      dateBirth: '20/11/2023',
      address: 'Thanh Xuân, Hà Nội',
    },
    {
      id: 2,
      userName: 'Nguyễn Thị B',
      gender: 'Nữ',
      dateBirth: '20/11/2023',
      address: 'Cầu Giấy, Hà Nội',
    },
  ],
};

export const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    default:
      return state;
  }
};
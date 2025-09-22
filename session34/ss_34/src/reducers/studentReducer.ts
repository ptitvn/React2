import type { Student } from '../utils/types';

const LOCAL_KEY = 'students';

const defaultStudents: Student[] = [
  {
    id: 'SV001',
    fullName: 'Nguyễn Văn A',
    age: 20,
    gender: true,
    dateOfBirth: '2005-01-01',
    placeOfBirth: 'Hà Nội',
    address: '123 Đường ABC',
  },
  {
    id: 'SV002',
    fullName: 'Nguyễn Văn B',
    age: 21,
    gender: false,
    dateOfBirth: '2004-02-02',
    placeOfBirth: 'Đà Nẵng',
    address: '456 Đường XYZ',
  },
  {
    id: 'SV003',
    fullName: 'Nguyễn Văn C',
    age: 19,
    gender: true,
    dateOfBirth: '2006-03-03',
    placeOfBirth: 'TP.HCM',
    address: '789 Đường DEF',
  },
];

const loadFromStorage = (): Student[] => {
  const data = localStorage.getItem(LOCAL_KEY);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
  }
  localStorage.setItem(LOCAL_KEY, JSON.stringify(defaultStudents));
  return defaultStudents;
};

const saveToStorage = (students: Student[]) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(students));
};

const initialState: Student[] = loadFromStorage();

interface Action {
  type: 'ADD_STUDENT' | 'DELETE_STUDENT' | 'UPDATE_STUDENT';
  payload: any;
}

export const studentReducer = (state = initialState, action: Action): Student[] => {
  let newState = state;

  switch (action.type) {
    case 'ADD_STUDENT':
      newState = [...state, action.payload];
      break;

    case 'DELETE_STUDENT':
      newState = state.filter((s) => s.id !== action.payload);
      break;

    case 'UPDATE_STUDENT':
      newState = state.map((s) =>
        s.id === action.payload.id ? { ...s, ...action.payload } : s
      );
      break;

    default:
      return state;
  }

  saveToStorage(newState);
  return newState;
};
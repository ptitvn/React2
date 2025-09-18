export interface CompanyState {
  name: string;
}
const initialState: CompanyState = {
  name: "Rikkei Academy",
};
export const companyReducer = (
  state = initialState,
  action: any
): CompanyState => {
  switch (action.type) {
    case "CHANGE_COMPANY":
      return { name: "Rikkeisoft" };
    default:
      return state;
  }
};
